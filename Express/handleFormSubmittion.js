import express from "express";
import { PORT } from "./env.js";
import path from "path";

const app = express();

const staticPath = path.join(import.meta.dirname, "public");
app.use("public", express.static(staticPath));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const homePath = path.join(import.meta.dirname, "public", "index.html");
  res.sendFile(homePath);
});

// using get Req

// app.get("/contact", (req, res) => {
//   console.log(req.query);
//   res.redirect("/");
// });

// Using Post Request

app.post("/contact", (req, res) => {
  console.log(req.body);
  res.send("okh");
});

app.listen(PORT, () => {
  console.log("server is Running ", PORT);
});
