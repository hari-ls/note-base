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

notes.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  readFromFile(file)
    .then((data) => JSON.parse(data))
    .then((json) => {
      console.log(json);
      const result = json.filter((note) => note.id === id);
      return result.length > 0 ? res.json(result) : res.json("No note found");
    });
});

notes.post("/", (req, res) => {
  res.json("POST");
});

notes.put("/", (req, res) => {
  res.json("PUT");
});

notes.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  readFromFile(file)
    .then((data) => JSON.parse(data))
    .then((json) => {
      console.log(json);
      const result = json.filter((note) => note.id !== id);
      writeToFile(file, result);
      res.json("Note deleted");
    });
});

module.exports = notes;
