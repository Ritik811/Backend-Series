import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("hello World");
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is Running at PORT:  ${PORT}`);
});
