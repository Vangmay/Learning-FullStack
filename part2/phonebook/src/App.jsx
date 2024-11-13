import { useEffect, useState } from "react";
import axios from "axios";
import personServices from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personServices.getAll().then((res) => {
      console.log("Data! Yummers");
      setPersons(res.data);
    });
  }, []);

  const handleAddPerson = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    };
    const updatedPersons = [...persons, newPerson];
    const filteredPerson = persons.filter(
      (person) => person.name == newPerson.name
    );
    if (filteredPerson.length > 0) {
      const targetPerson = filteredPerson[0];
      const updatedPerson = { ...targetPerson, number: newNumber };
      personServices.update(targetPerson.id, updatedPerson).then((res) => {
        setPersons(
          persons.map((person) =>
            person.id == targetPerson.id ? res.data : person
          )
        );
      });
    } else {
      personServices.create(newPerson).then((res) => {
        setPersons(updatedPersons);
      });
    }
    setNewName("");
    setNewNumber("");
  };

  const handleDeletePerson = (id) => {
    personServices.delete(id).then((res) => {
      const updatedPersons = persons.filter((person) => person.id != id);
      setPersons(updatedPersons);
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <p>filter shown with</p>
      <input onChange={(e) => setFilter(e.target.value)} value={filter} />
      <h2>Add a new</h2>
      <form>
        <div>
          <p>name:</p>
          <input onChange={(e) => setNewName(e.target.value)} value={newName} />
          <p>number:</p>
          <input
            onChange={(e) => setNewNumber(e.target.value)}
            value={newNumber}
          />
        </div>
        <div>
          <button type="submit" onClick={(e) => handleAddPerson(e)}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons
        .filter((person) => person.name.startsWith(filter))
        .map((person) => (
          <p key={person.id}>
            {person.name} : {person.number}
            <button onClick={() => handleDeletePerson(person.id)}>
              Delete
            </button>
          </p>
        ))}
    </div>
  );
};

export default App;
