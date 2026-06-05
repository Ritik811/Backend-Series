import mongoose from "mongoose";
import { Chat } from "../models/chat.js";

export const index = async (req, res) => {
  let chats = await Chat.find();
  res.render("index", { chats });
};

export const renderNewForm = (req, res) => {
  res.render("new");
};

export const createChat = async (req, res) => {
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
};

export const renderEditForm = async (req, res) => {
  try {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("edit", { chat });
  } catch (error) {
    console.log(error);
  }
};

export const updateChat = async (req, res) => {
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
};

export const destroyChat = async (req, res) => {
  try {
    let { id } = req.params;
    let deleteData = await Chat.findByIdAndDelete(id);
    console.log(deleteData);
    res.redirect("/chats");
  } catch (error) {
    console.log(error);
  }
};
