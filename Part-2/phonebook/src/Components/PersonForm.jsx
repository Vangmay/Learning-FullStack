import { useState } from "react";
import personService from "../services/personService";

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
    const filteredPersons = persons.filter(
      (person) => person.name == newPerson.name
    );
    if (filteredPersons.length > 0) {
      const targetPerson = filteredPersons[0];
      const updatedPerson = { ...targetPerson, number: newPhone };
      personService.update(targetPerson.id, updatedPerson).then((res) => {
        setPersons(
          persons.map((person) =>
            person.id == targetPerson.id ? res.data : person
          )
        );
      });
    } else {
      personService.create(newPerson).then((res) => {
        setPersons(persons.concat(res.data));
      });
    }

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
