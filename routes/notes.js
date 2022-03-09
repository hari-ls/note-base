const notes = require("express").Router();

notes.get("/", (req, res) => {
  res.json("Static response");
});

module.exports = notes;
