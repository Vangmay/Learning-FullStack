import { useState } from "react";

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const handleAddPerson = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newPhone,
      id: String(persons.length + 1),
    };
    const updatedPersons = [...persons, newPerson];
    persons.filter(
      (person) =>
        person.name == newPerson.name && person.number == newPerson.number
    ).length > 0
      ? alert(newName + " is already added to the phonebook")
      : setPersons(updatedPersons);
    setNewName("");
    setNewPhone("");
  };

  return (
    <>
      <form onSubmit={handleAddPerson}>
        <div>
          name:{" "}
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
          <br></br>
          phone:{" "}
          <input
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
