import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const handleAddPerson = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    };
    const updatedPersons = [...persons, newPerson];
    console.log(newPerson);
    persons.filter(
      (person) =>
        person.name == newPerson.name && person.number == newPerson.number
    ).length > 0
      ? alert("Person already exists")
      : setPersons(updatedPersons);
    setNewName("");
    setNewNumber("");
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
          </p>
        ))}
    </div>
  );
};

export default App;
