import Note from "./Components/Note";
import { useState, useEffect } from "react";
import axios from "axios";
import noteService from "./services/notes";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    noteService.getAll().then((response) => {
      setNotes(response.data);
    });
  }, []);

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const addNote = (event) => {
    event.preventDefault();
    console.log("Button has been clicked", event.target);

    const noteObject = {
      content: note,
      important: Math.random() < 0.5,
    };

    noteService.create(noteObject).then((res) => {
      setNotes(notes.concat(res.data));
      setNote("");
    });
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id === id ? returnedNote : note)));
      })
      .catch((error) => {
        alert(`the note '${note.content}' was already deleted from server`);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  return (
    <div>
      <form onSubmit={addNote}>
        <input
          name="note"
          value={note}
          onChange={(e) => {
            setNote(e.target.value);
          }}
        />
        <button type="submit">Submit</button>
      </form>

      <h1>Notes</h1>

      <div>
        {" "}
        <button onClick={() => setShowAll(!showAll)}>
          {" "}
          show {showAll ? "important" : "all"}{" "}
        </button>{" "}
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
