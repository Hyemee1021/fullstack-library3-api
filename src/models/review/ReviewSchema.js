import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive",
    },
    bookId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      default: null,
    },
    bookName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    burrowHistoryId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    rating: {
      type: Number,
      default: 5,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Review", ReviewSchema); // users
