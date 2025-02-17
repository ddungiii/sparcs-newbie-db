const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const todoRouter = require("./routes/todo");

const app = express();
const port = 8081;

mongoose.connect("mongodb://localhost:27017/todo", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection;
db.once('open', () => {
  console.log("DB connected!");
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use("/todo", todoRouter);

app.get("/", (req, res) => {
  res.status(418).send("Hi");
});

app.listen(port, "0.0.0.0", () => {
    console.log(`Listening on port ${port}`);
});
