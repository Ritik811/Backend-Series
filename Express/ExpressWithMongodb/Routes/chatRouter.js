import { Router } from "express";
import mongoose from "mongoose";
import { Chat } from "../models/chat.js";
import {
  createChat,
  destroyChat,
  index,
  renderEditForm,
  renderNewForm,
  updateChat,
} from "../controllers/chatControllers.js";

const router = Router();

//READ Operation
router.get("/", index);

// CREATE OPERATION
router.get("/new", renderNewForm);

router.post("/", createChat);

// UPDATE Operation

router.get("/:id/edit", renderEditForm);

router.put("/:id", updateChat);

// DELETE Operation

router.delete("/:id", destroyChat);

export default router;
