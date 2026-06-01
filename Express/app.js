import express from "express";
import { PORT } from "./env.js";

const app = express();

app.get("/", (req, res) => {
  res.send("hello World");
});

// Params

app.get("/:username/article/:title", (req, res) => {
  console.log("params is ", req.params);
  const formatTitle = req.params.title.replaceAll("-", " ");
  res.send(
    `<h1>Hello Bro Welcome to My Website ${req.params.username} and article is ${formatTitle} </h1>`,
  );
});



app.listen(PORT, () => {
  console.log(`Server is Running at PORT:  ${PORT}`);
});
