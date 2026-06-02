import express from "express";
import path from "path";

const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(import.meta.dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let posts = [
  {
    username: "Ritik Rajput",
    content: "I Love Coding",
  },
  {
    username: "Sonia",
    content: "I Love Not Coding",
  },
  {
    username: "Vishal Billa",
    content: "I Love Traveling",
  },
];

app.get("/posts", (req, res) => {
  res.render("index", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new");
});

app.post("/posts/new", (req, res) => {
  const { username, content } = req.body;
  posts.push({ username, content });
  res.redirect("/posts");
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log("Server is listing port", PORT);
});
