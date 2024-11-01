import { useState, useEffect } from "react";
import axios from "axios";
import personServices from "../services/personServices";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("Name");
  const [newNumber, setNewNumber] = useState("Phone number");
  const [filter, setFilter] = useState("Arto Hellas");

  useEffect(() => {
    personServices.getAll().then((res) => {
      setPersons(res.data);
    });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    console.log("meh");

    const baseUrl = "http://localhost:3001/persons";

    const filteredList = persons.filter((person) => person.name == newName);

    if (filteredList.length > 0) {
      const id = filteredList[0].id;
      const editedPerson = {
        name: filteredList[0].name,
        id: id,
        number: newNumber,
      };
      personServices.update(id, editedPerson).then((res) => {
        setPersons(
          persons.map((person) => (person.id == id ? res.data : person))
        );
      });
    } else {
      const newPerson = {
        name: newName,
        id: String(persons.length + 1),
        number: newNumber,
      };

      personServices.create(newPerson).then((res) => {
        setPersons(persons.concat(newPerson));
        setNewName("");
        setNewNumber("");
      });
    }
  }

  function handleDelete(id) {
    personServices.delete(id).then(console.log("Deleted"));
    setPersons(persons.filter((person) => person.id != id));
  }
  return (
    <div>
      <h2>Phonebook</h2>

      <p>Filter shown with</p>
      <input
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
          console.log(filter);
        }}
      />

      <h2>Add a new</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          name:{" "}
          <input
            value={newName}
            onChange={(e) => {
              setNewName(e.target.value);
            }}
          />
          <input
            value={newNumber}
            onChange={(e) => {
              setNewNumber(e.target.value);
            }}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons
        .filter((person) => person.name.toLowerCase().startsWith(filter))
        .map((person) => {
          return (
            <p key={person.id}>
              {person.name} | {person.number} |{" "}
              <button
                onClick={() => {
                  handleDelete(person.id);
                }}
              >
                Delete
              </button>
            </p>
          );
        })}
    </div>
  );
};

export default App;
