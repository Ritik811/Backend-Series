import express from "express";
import path from "path";
import { v4 } from "uuid";
import methodOverride from "method-override";

const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(import.meta.dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

let posts = [
  {
    id: v4(),
    username: "Ritik Rajput",
    content: "I Love Coding",
  },
  {
    id: v4(),
    username: "Sonia",
    content: "I Love Not Coding",
  },
  {
    id: v4(),
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
  let { username, content } = req.body;
  let id = v4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((post) => post.id === id);
  console.log(post);
  res.render("show", { post });
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  console.log(id);
  let post = posts.find((post) => post.id === id);
  res.render("edit", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((post) => post.id === id);
  post.content = newContent;
  res.redirect("/posts");
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  console.log(id);
  posts = posts.filter((post) => post.id !== id);
  res.redirect("/posts");
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log("Server is listing port", PORT);
});
