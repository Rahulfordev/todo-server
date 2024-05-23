const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

// ...rest of your code

const app = express();
app.use(cors());
app.use(bodyParser.json());

// mongoose.connect("", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/mydatabase",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const Item = mongoose.model(
  "Item",
  new mongoose.Schema({
    name: String,
    description: String,
  })
);

app.get("/items", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.post("/items", async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.json(newItem);
});

app.put("/items/:id", async (req, res) => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(item);
});

app.delete("/items/:id", async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
