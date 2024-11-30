import { useState, useEffect } from "react";
import Filter from "./Components/Filter";
import PersonForm from "./Components/PersonForm";
import Persons from "./Components/Persons";
import axios from "axios";
import personService from "./services/personService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchKeyWord, setSearchKeyWord] = useState("");

  useEffect(() => {
    personService.getAll().then((res) => {
      setPersons(res.data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        searchKeyWord={searchKeyWord}
        setSearchKeyWord={setSearchKeyWord}
      />
      <h3>Add a new person</h3>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons
        searchKeyWord={searchKeyWord}
        setPersons={setPersons}
        personsList={persons}
      />
    </div>
  );
};

export default App;
