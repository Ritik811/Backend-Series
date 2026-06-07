import express from "express";
import path from "path";
import mongoose from "mongoose";
import { Chat } from "./models/chat.js";
import methodOverride from "method-override";
import chatRouter from "./Routes/chatRouter.js";
import { User } from "./models/register.js";
import bcrypt from "bcrypt";
import cors from "cors";
import jwt from "jsonwebtoken";
import { verifyToken } from "./middlewares/authMiddleware.js";

const JWT_SECRET = "MeraSecretChatKey123";
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

app.use(cors());
app.use(express.json());
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
    let hashedPassword = await bcrypt.hash(password, 10);
    let response = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    console.log(response);
    res.status(200).json({
      success: true,
      message: "Registration Success",
      username: username,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
});

app.get("/chats/login", (req, res) => {
  res.render("loginPage");
});

app.post("/chats/login", async (req, res) => {
  try {
    let { username, password } = req.body;
    if (!username || !password) {
      console.log(
        `username is Empty ${username} password is Empty ${password}`,
      );
      res
        .status(400)
        .json({ success: false, message: "Username or Password Empty" });
      return;
    }

    let userExist = await User.findOne({ username });
    if (!userExist) {
      console.log("User Are Invalid Please First Register");
      res.status(404).json({ success: false, message: "User Not Found" });
      return;
    }
    console.log(userExist);

    let isMatch = await bcrypt.compare(password, userExist.password);

    if (isMatch) {
      console.log("user Valid Login");

      const token = jwt.sign(
        {
          userId: userExist._id,
          username: userExist.username,
        },

        JWT_SECRET,
        { expiresIn: "1d" },
      );

      res.status(200).json({
        success: true,
        message: "login Success",
        token: token,
        username: userExist.username,
      });
      // res.redirect("/chats");
    } else {
      console.log("password is Wrong ReEnter Password");
      return res.status(401).json({
        success: false,
        message: "Password is Wrong, Please Re-Enter",
      });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
});

app.get("/chats/dashboard-data", verifyToken, (req, res) => {
  // Kyunki verifyToken ne next() call kiya, toh hum yahan tak pahuche
  // req.user ke andar ab user ki id aur username pehle se maujood hai!

  res.status(200).json({
    success: true,
    message: "Welcome to the secret zone!",
    secretData: "Bhai, yeh data sirf logged-in user hi dekh sakta hai!",
    user: req.user, // Isme uski ID aur username hoga
  });
});

app.listen(PORT, () => {
  console.log("Server is Running PORT", PORT);
});
