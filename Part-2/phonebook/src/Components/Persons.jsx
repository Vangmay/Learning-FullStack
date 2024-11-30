import personService from "../services/personService";

const Persons = ({ personsList, setPersons, searchKeyWord }) => {
  const handleDeletePerson = (id) => {
    const updatedPersons = personsList.filter((person) => person.id != id);
    personService.delete(id).then((res) => {
      setPersons(updatedPersons);
    });
  };

  return (
    <ul>
      {personsList
        .filter((person) => person.name.startsWith(searchKeyWord))
        .map((person) => {
          console.log(person.id);
          return (
            <li key={person.id}>
              {person.name} : {person.number}
              <button onClick={() => handleDeletePerson(person.id)}>
                Delete
              </button>
            </li>
          );
        })}
    </ul>
  );
};

export default Persons;
