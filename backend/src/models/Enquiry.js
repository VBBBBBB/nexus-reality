import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property"
    },
    message: String,
    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Enquiry", enquirySchema);
