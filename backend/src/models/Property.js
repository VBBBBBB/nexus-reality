import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    customId: {
      type: String,
      unique: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    bhk: {
      type: Number,
      required: true
    },
    area: {
      type: Number,
      required: true
    },
    listingType: {
      type: String,
      enum: ["Resale", "New", "Rent"],
      required: true
    },
    propertyType: {
      type: String,
      enum: ["apartment", "independent house", "villa"],
      required: true
    },
    furnished: {
      type: Boolean,
      default: false
    },
    floor: {
      type: Number,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    images: {
      type: [String],
      required: true,
      validate: [(val) => val.length > 0, "At least one image is required"]
    },
    isSponsored: {
      type: Boolean,
      default: false
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Property", propertySchema);
