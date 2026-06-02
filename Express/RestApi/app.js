import express from "express";
import path from "path";

const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(import.meta.dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Start Project Rest API");
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log("Server is listing port", PORT);
});
