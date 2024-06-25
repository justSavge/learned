const fs = require("fs");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res, err) => {
  fs.readFile("../data/cities.json", (err, data) => {
    res.status(200).json({
      status: "ok",
      message: JSON.parse(data),
    });
  });
});
app.get("/:id", (req, res, err) => {
  fs.readFile("../data/cities.json", (err, data) => {
    const dataObj = JSON.parse(data).cities;

    const curr = dataObj.filter((ob) => {
      return ob.id === Number(req.params.id);
    });

    if (curr.length) {
      res.status(200).json(curr[0]);
    } else {
      res.status(404).json({
        status: "没有",
      });
    }
  });
});
app.listen(6657, () => {
  console.log("ok");
});
