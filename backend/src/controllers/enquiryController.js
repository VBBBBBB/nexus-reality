import Enquiry from "../models/Enquiry.js";

export const createEnquiry = async (req, res) => {
  const { propertyId, message } = req.body;

  let enquiry = await Enquiry.create({
    buyer: req.user._id,
    property: propertyId,
    message
  });

  enquiry = await enquiry.populate([
    { path: "buyer", select: "name email phone" },
    { path: "property", select: "title location price customId listingType" }
  ]);

  res.json({ success: true, enquiry });
};

export const getAllEnquiries = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const { propertyId, minPrice, maxPrice, date, buyerName, contact, location, listingType } = req.query;

    const matchStage = {};

    if (date) {
      const startOfDay = new Date(date);
      const endOfDay = new Date(date);
      endOfDay.setDate(endOfDay.getDate() + 1);
      matchStage["createdAt"] = { $gte: startOfDay, $lt: endOfDay };
    }

    const pipeline = [
      {
        $lookup: {
          from: "properties",
          localField: "property",
          foreignField: "_id",
          as: "property"
        }
      },
      { $unwind: "$property" },
      {
        $lookup: {
          from: "users",
          localField: "buyer",
          foreignField: "_id",
          as: "buyer"
        }
      },
      { $unwind: "$buyer" },
      { $match: matchStage }
    ];

    // Apply filters on joined fields
    if (propertyId) {
      pipeline.push({ $match: { "property.customId": { $regex: propertyId, $options: "i" } } });
    }
    if (minPrice) {
      pipeline.push({ $match: { "property.price": { $gte: parseInt(minPrice) } } });
    }
    if (maxPrice) {
      pipeline.push({ $match: { "property.price": { $lte: parseInt(maxPrice) } } });
    }
    if (location) {
      pipeline.push({ $match: { "property.location": { $regex: location, $options: "i" } } });
    }
    if (listingType) {
      pipeline.push({ $match: { "property.listingType": { $regex: listingType, $options: "i" } } });
    }
    if (buyerName) {
      pipeline.push({ $match: { "buyer.name": { $regex: buyerName, $options: "i" } } });
    }
    if (contact) {
      pipeline.push({ $match: { "buyer.phone": { $regex: contact, $options: "i" } } });
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

    const result = await Enquiry.aggregate(pipeline);

    const total = result[0].metadata[0] ? result[0].metadata[0].total : 0;
    const pages = Math.ceil(total / limit);

    res.json({
      enquiries: result[0].data,
      page,
      pages,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getUserEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({ buyer: req.user._id })
      .populate("property", "title location price customId listingType images")
      .sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
