import express from "express";
import { PORT } from "./env.js";

const app = express();

app.get("/", (req, res) => {
  res.send("hello World");
});

app.listen(PORT, () => {
  console.log(`Server is Running at PORT:  ${PORT}`);
});
