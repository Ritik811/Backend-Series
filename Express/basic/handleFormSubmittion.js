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

app.use((req, res) => {
  //   res.status(404).send(`<h1>Page is Not found</h1>`);
  res.status(404).sendFile(path.join(import.meta.dirname, "views", "404.html"));
});

app.listen(PORT, () => {
  console.log("server is Running ", PORT);
});
