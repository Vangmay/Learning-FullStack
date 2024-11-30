const Persons = ({ personsList, searchKeyWord }) => {
  console.log(personsList);
  return (
    <ul>
      {personsList
        .filter((person) => person.name.startsWith(searchKeyWord))
        .map((person) => {
          return (
            <li key={person.id}>
              {person.name} : {person.number}
            </li>
          );
        })}
    </ul>
  );
};

export default Persons;
