import express from "express";
import path from "path";
import mongoose from "mongoose";
import { Chat } from "./models/chat.js";

const app = express();
const PORT = 8080;

const connectDataBase = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/chatDB");
    console.log("dataBase Connected Successfully");
  } catch (error) {
    console.log(error);
  }
};

connectDataBase();

let newChat = new Chat({
  from: "Bihar",
  to: "Patna",
  msg: "Kya kr rha hai",
  createAt: new Date(),
});

let res = await newChat.save();
console.log(res);

app.set("view engine", "ejs");
app.use(express.static(path.join(import.meta.dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Working");
});

app.listen(PORT, () => {
  console.log("Server is Running PORT", PORT);
});
