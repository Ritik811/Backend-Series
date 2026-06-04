import mongoose from "mongoose";

const chatSchema = new mongoose.Schema([
  {
    from: {
      type: String,
      require: true,
    },
  },
  {
    to: {
      type: String,
      require: true,
    },
  },
  {
    msg: {
      type: String,
      maxLength: 50,
    },
  },
  {
    created_at: {
      type: Date,
      require: true,
      default: Date.now(),
    },
  },
]);

export const Chat = mongoose.model("Chat", chatSchema);
