const notes = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const {
  readFromFile,
  writeToFile,
  readAndAppend,
} = require("../helpers/fsUtils");
const file = "./db/db.json";

// Get all notes
notes.get("/", (req, res) => {
  readFromFile(file).then((data) => res.json(JSON.parse(data)));
});
// Add new note
notes.post("/", (req, res) => {
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      id: uuidv4(),
      title,
      text,
    };
    readAndAppend(newNote, file);
    return res.json("New note added!");
  } else {
    return res.json("Something went wrong!");
  }
});
// Delte a note
notes.delete("/:id", (req, res) => {
  const id = req.params.id;
  readFromFile(file)
    .then((data) => JSON.parse(data))
    .then((json) => {
      console.log(json);
      const result = json.filter((note) => note.id !== id);
      writeToFile(file, result);
      return result.length < json.length
        ? res.json("Note deleted")
        : res.json("No note found");
    });
});

module.exports = notes;
