import { Router } from "express";
import mongoose from "mongoose";
import { Chat } from "../models/chat.js";

const router = Router();

//READ Operation
router.get("/", async (req, res) => {
  let chats = await Chat.find();
  res.render("index", { chats });
});

// CREATE OPERATION
router.get("/new", (req, res) => {
  res.render("new");
});

router.post("/", async (req, res) => {
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

router.get("/:id/edit", async (req, res) => {
  try {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("edit", { chat });
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    let { from, to, msg } = req.body;
    let { id } = req.params;
    let updateData = await Chat.findByIdAndUpdate(
      id,
      { from, to, msg },
      { new: true },
    );
    console.log(updateData);
    res.redirect("/chats");
  } catch (error) {
    console.log(error);
  }
});

// DELETE Operation

router.delete("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let deleteData = await Chat.findByIdAndDelete(id);
    console.log(deleteData);
    res.redirect("/chats");
  } catch (error) {
    console.log(error);
  }
});

export default router;
