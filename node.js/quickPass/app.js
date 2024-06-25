const express = require("express");
const multer = require("multer");

const upload = multer({ dest: "public/" });
const app = express();

module.exports = app;
