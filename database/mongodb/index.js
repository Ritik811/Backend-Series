import mongoose from "mongoose";
import "dotenv/config";

const MONGO_URL = process.env.URL;
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("dataBase Connected Successfully ");
  } catch (err) {
    console.error("dataBase connect Problem", err);
    process.exit(1);
  }
};

connectDB();

const userSchema = mongoose.Schema({
  name: String,
  age: Number,
  email: String,
});

const User = mongoose.model("User", userSchema);

// const user1 = new User({
//   name: "Ritik",
//   age: 24,
//   email: "ritik@123",
// });

// const newUser = await User.insertMany([
//   {
//     name: "Tipu",
//     age: 25,
//     email: "tipu@123",
//   },
//   {
//     name: "Amit",
//     age: 36,
//     email: "amit@123",
//   },
// ]);

// const userFind = await User.find({age: {$gt: 30}});
// console.log(userFind);

// const userUpdate = await User.updateOne({ name: "Ritik", name: "Sonia" });
// console.log(userUpdate);

const userUpdate = await User.findOneAndUpdate(
  { name: "Ritik" },
  { age: "34" },
  { new: true },
);
console.log(userUpdate);
