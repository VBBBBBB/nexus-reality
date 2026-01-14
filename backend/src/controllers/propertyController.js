import Property from "../models/Property.js";

export const createProperty = async (req, res) => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const dateString = `${day}${month}${year}`;

  // Find latest property created today to increment sequence
  const latestProperty = await Property.findOne({
    customId: new RegExp(`^${dateString}`)
  }).sort({ customId: -1 });

  let sequence = "01";
  if (latestProperty && latestProperty.customId) {
    const lastSequence = parseInt(latestProperty.customId.slice(-2));
    sequence = String(lastSequence + 1).padStart(2, "0");
  }

  const customId = `${dateString}${sequence}`;

  let images = [];
  if (req.files && req.files.length > 0) {
    images = req.files.map(file => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`);
  }

  const isSponsored = req.body.isSponsored === "true" || req.body.isSponsored === true;
  const status = isSponsored ? "approved" : "pending";

  const property = await Property.create({
    ...req.body,
    customId,
    images,
    seller: req.user._id,
    status,
    isSponsored
  });

  res.json(property);
};

export const getApprovedProperties = async (req, res) => {
  const { location, bhk, minPrice, maxPrice, type, propertyType, listingType } = req.query;

  let filter = { status: "approved" }; // Only show approved properties by default


  if (location) filter.location = new RegExp(location, "i");
  if (bhk) filter.bhk = bhk;
  if (type || propertyType) filter.propertyType = type || propertyType;
  if (listingType) filter.listingType = listingType;
  if (minPrice || maxPrice)
    filter.price = {
      ...(minPrice && { $gte: minPrice }),
      ...(maxPrice && { $lte: maxPrice })
    };

  const properties = await Property.find(filter).populate("seller", "name");
  res.json(properties);
};

export const getPropertyById = async (req, res) => {
  const property = await Property.findById(req.params.id).populate("seller");

  const similar = await Property.find({
    _id: { $ne: property._id },
    location: property.location,
    status: "approved"
  }).limit(4);

  res.json({ ...property.toObject(), similar });

};

export const getUserProperties = async (req, res) => {
  const properties = await Property.find({ seller: req.user._id });
  res.json(properties);
};

export const getAllPropertiesAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const { propertyId, minPrice, maxPrice, date, sellerName, contact, location, listingType, propertyType, status } = req.query;

    const matchStage = {};

    if (status) {
      matchStage["status"] = status;
    }

    if (date) {
      const startOfDay = new Date(date);
      const endOfDay = new Date(date);
      endOfDay.setDate(endOfDay.getDate() + 1);
      matchStage["createdAt"] = { $gte: startOfDay, $lt: endOfDay };
    }

    const pipeline = [
      {
        $lookup: {
          from: "users",
          localField: "seller",
          foreignField: "_id",
          as: "seller"
        }
      },
      { $unwind: "$seller" },
      { $match: matchStage }
    ];

    if (propertyId) {
      pipeline.push({ $match: { "customId": { $regex: propertyId, $options: "i" } } });
    }
    if (minPrice) {
      pipeline.push({ $match: { "price": { $gte: parseInt(minPrice) } } });
    }
    if (maxPrice) {
      pipeline.push({ $match: { "price": { $lte: parseInt(maxPrice) } } });
    }
    if (location) {
      pipeline.push({ $match: { "location": { $regex: location, $options: "i" } } });
    }
    if (listingType) {
      pipeline.push({ $match: { "listingType": { $regex: listingType, $options: "i" } } });
    }
    if (propertyType) {
      pipeline.push({ $match: { "propertyType": { $regex: propertyType, $options: "i" } } });
    }
    if (sellerName) {
      pipeline.push({ $match: { "seller.name": { $regex: sellerName, $options: "i" } } });
    }
    if (contact) {
      pipeline.push({ $match: { "seller.phone": { $regex: contact, $options: "i" } } });
    }

    pipeline.push(
      { $sort: { createdAt: -1 } },
      {
        $facet: {
          metadata: [{ $count: "total" }],
          data: [{ $skip: skip }, { $limit: limit }]
        }
      }
    );

    const result = await Property.aggregate(pipeline);

    const total = result[0].metadata[0] ? result[0].metadata[0].total : 0;
    const pages = Math.ceil(total / limit);

    res.json({
      properties: result[0].data,
      page,
      pages,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePropertyStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });

    // Check ownership or admin
    if (req.user.role !== "admin" && req.user.role !== "superadmin" && property.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this property" });
    }

    let images = property.images;
    if (req.files && req.files.length > 0) {
      images = req.files.map(file => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`);
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        images,
        status: "pending" // Reset status on edit
      },
      { new: true }
    );

    res.json(updatedProperty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });

    // Check if user is owner or admin
    if (req.user.role !== "admin" && req.user.role !== "superadmin" && property.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this property" });
    }

    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: "Property deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
