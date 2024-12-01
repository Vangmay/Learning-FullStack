const express = require("express");
var morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");
const app = express();
app.use(cors());

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(express.json());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :body",
    {
      skip: function (req) {
        return req.method !== "POST";
      },
    }
  )
);

morgan.token("body", (req) => JSON.stringify(req.body));

persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateId = () => {
  const maxId =
    persons.length > 0 ? Math.max(...persons.map((n) => Number(n.id))) : 0;
  return String(maxId + 1);
};

const welcomeMessage = (request, response) => {
  response.send("<h1>Welcome to Phonebook</h1>");
};

const getPersons = (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
};

const getPersonById = (req, res) => {
  // const id = req.params.id;
  // const person = persons.find((person) => person.id == id);
  // if (person) {
  //   res.json(person);
  // } else {
  //   res.status(404).end();
  // }
  Person.findById(req.params.id).then((person) => {
    res.json(person);
  });
};

const deletePerson = (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
};

const getInfo = async (req, res) => {
  const count = await Person.countDocuments({});
  res.send(`<p>Phonebook has info for ${count} people</p>  <p>${Date()}</p>`);
};

const addPerson = (request, response) => {
  const body = request.body;
  if (!body.name) {
    return response.status(400).json({
      error: "content missing",
    });
  }
  const filteredPersons = persons.filter((person) => person.name == body.name);
  if (filteredPersons.length > 0 || !body.number) {
    response.json({ error: "Name shall be unique" });
  }

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  });

  newPerson.save().then((savedPerson) => {
    persons = persons.concat(newPerson);
    response.json(newPerson);
  });
};

const updatePerson = (request, response) => {
  const body = request.body;
  const person = {
    name: body.name,
    number: body.number,
  };
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: error.message });
  } else if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

app.get("/", welcomeMessage);
app.get("/api/persons", getPersons);
app.get("/api/persons/:id", getPersonById);
app.delete("/api/persons/:id", deletePerson);
app.get("/info", getInfo);
app.post("/api/persons", addPerson);
app.put("/api/persons/:id", updatePerson);
app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
