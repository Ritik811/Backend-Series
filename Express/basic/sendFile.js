import express from "express";
import { PORT } from "./env.js";
import path from "path";

const app = express();

const staticPath = path.join(import.meta.dirname, "public");
app.use("/public", express.static(staticPath));

app.get("/", (req, res) => {
  //   console.log(import.meta.dirname);
  //   console.log(import.meta.filename);
  //   const __fileName = import.meta.dirname;
  //   console.log(__fileName);

  const homePath = path.join(import.meta.dirname, "public", "index.html");
  return res.sendFile(homePath);
});

app.listen(PORT, () => {
  console.log("Server is Running PORT: ", PORT);
});
