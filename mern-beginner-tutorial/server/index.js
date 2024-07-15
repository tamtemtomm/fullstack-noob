const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const { dbPassword, dbUsername, dbName } = require("./db-config");
const UserModel = require("./models/Users");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.bd6rfzg.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`
);

app.get("/getUsers", async (req, res) => {
  let result = await UserModel.find({});
  res.status(200).json(result);
});

app.post("/createUser", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();

  res.json(user);
});

app.listen(3001, () => {
  console.log("SERVER RUNS PERFECTLY!");
});
