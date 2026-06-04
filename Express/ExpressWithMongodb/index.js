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

app.set("view engine", "ejs");
app.use(express.static(path.join(import.meta.dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Working");
});

//READ Operation
app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  console.log(chats);
  res.render("index", { chats });
});

// CREATE OPERATION
app.get("/chats/new", (req, res) => {
  res.render("new");
});

app.post("/chats", async (req, res) => {
  try {
    let { from, to, msg } = req.body;
    console.log(from, to, msg);
    let newMsg = new Chat({
      from,
      to,
      msg,
      created_at: new Date(),
    });
    let response = await newMsg.save();
    console.log(response);
    res.redirect("/chats");
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log("Server is Running PORT", PORT);
});
