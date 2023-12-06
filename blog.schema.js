import mongoose from "mongoose";

const blogShema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { collection: "blogs", timestamps: true }
);

const blog = mongoose.model("blog", blogShema);

export default blog;