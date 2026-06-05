import express from "express";
import path from "path";
import mongoose from "mongoose";
import { Chat } from "./models/chat.js";
import methodOverride from "method-override";
import chatRouter from "./Routes/chatRouter.js";

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
app.use("/chats", chatRouter);

// app.get("/chats/login", (req, res) => {
//   res.render("loginPage");
// });

// app.get("/chats/register", (req, res) => {
//   res.render("registerPage");
// });

app.listen(PORT, () => {
  console.log("Server is Running PORT", PORT);
});
