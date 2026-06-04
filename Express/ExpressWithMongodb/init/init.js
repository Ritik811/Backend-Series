import mongoose from "mongoose";
import { Chat } from "../models/chat.js";

const connectDataBase = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/chatDB");
    console.log("dataBase Connected Successfully");
  } catch (error) {
    console.log(error);
  }
};
connectDataBase();

const dummyChats = [
  {
    from: "ritik",
    to: "vishal",
    msg: "Bhai kal college aayega kya?",
    created_at: new Date(),
  },
  {
    from: "vishal",
    to: "ritik",
    msg: "Haan bhai, kal assignment submit karna hai.",
    created_at: new Date(),
  },
  {
    from: "sonia",
    to: "ritik",
    msg: "MERN project ka kitna kaam ho gaya?",
    created_at: new Date(),
  },
  {
    from: "ritik",
    to: "sonia",
    msg: "Backend ready hai, abhi Mongoose jodh raha hoon.",
    created_at: new Date(),
  },
  {
    from: "amit",
    to: "tipu",
    msg: "Bhai exam ki datesheet aa gayi kya?",
    created_at: new Date(),
  },
  {
    from: "tipu",
    to: "amit",
    msg: "Nahi bhai, abhi tak toh nahi aayi.",
    created_at: new Date(),
  },
  {
    from: "ritik",
    to: "tipu",
    msg: "LeetCode par aaj ka daily challenge kiya?",
    created_at: new Date(),
  },
  {
    from: "tipu",
    to: "ritik",
    msg: "Haan bhai, graph ka question tha maza aaya.",
    created_at: new Date(),
  },
  {
    from: "vishal",
    to: "sonia",
    msg: "Notes share kar dena please group par.",
    created_at: new Date(),
  },
  {
    from: "sonia",
    to: "vishal",
    msg: "Sure, thodi der mein scan karke bhejti hoon.",
    created_at: new Date(),
  },
];

let res = await Chat.insertMany(dummyChats);
console.log(res);
