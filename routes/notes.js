const notes = require("express").Router();
const {
  readFromFile,
  writeToFile,
  readAndAppend,
} = require("../helpers/fsUtils");
const file = "./db/db.json";

notes.get("/", (req, res) => {
  readFromFile(file).then((data) => res.json(JSON.parse(data)));
});

notes.get("/:num", (req, res) => {
  const num = req.params.num;
  readFromFile(file)
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json[num - 1];
      return result ? res.json(result) : res.json("No note found");
    });
});

notes.post("/", (req, res) => {
  res.json("POST");
});

notes.put("/", (req, res) => {
  res.json("PUT");
});

notes.delete("/:id", (req, res) => {
  res.json("DELETE");
});

module.exports = notes;
