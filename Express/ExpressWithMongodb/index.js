import express from "express";
import path from "path";
import mongoose from "mongoose";
import { Chat } from "./models/chat.js";
import methodOverride from "method-override";

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
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.send("Working");
});

//READ Operation
app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
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
    res.redirect("/chats");
  } catch (error) {
    console.log(error);
  }
});

// UPDATE Operation

app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  // console.log(id);
  let chat = await Chat.findById(id);
  res.render("edit", { chat });
});

app.put("/chats/:id", async (req, res) => {
  let { from, to, msg } = req.body;
  let { id } = req.params;
  let updateData = await Chat.findByIdAndUpdate(
    id,
    { from, to, msg },
    { new: true },
  );
  console.log(updateData);
  res.redirect("/chats");
});

app.listen(PORT, () => {
  console.log("Server is Running PORT", PORT);
});
