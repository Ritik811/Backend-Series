import express from "express";
import path from "path";
import mongoose from "mongoose";
import { Chat } from "./models/chat.js";
import methodOverride from "method-override";
import chatRouter from "./Routes/chatRouter.js";
import { User } from "./models/register.js";

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


app.get("/chats/register", (req, res) => {
  res.render("registerPage");
});

app.post("/chats/register", async (req, res) => {
  try {
    let { username, password, email } = req.body;
    // console.log(username, password, email);
    // let newUser = new User({
    //   username,
    //   password,
    //   email,
    // });
    // let response = await newUser.save();
    // console.log(response);
    let response = await User.create({ username, email, password });
    console.log(response);
    res.redirect("/chats/login");
  } catch (error) {
    console.log(error);
  }
});

// app.get("/chats/login", (req, res) => {
//   res.render("loginPage");
// });

// app.post("/chats/login",(req,res) => {

// })

app.listen(PORT, () => {
  console.log("Server is Running PORT", PORT);
});
