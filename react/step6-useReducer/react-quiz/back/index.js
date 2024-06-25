const fs = require("fs");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res, err) => {
  fs.readFile("../data/questions.json", (err, data) => {
    res.status(200).json({
      status: "ok",
      message: JSON.parse(data),
    });
  });
});
app.listen(4000, () => {});
