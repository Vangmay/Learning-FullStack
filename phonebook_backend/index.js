const express = require("express");
var morgan = require("morgan");
const app = express();
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
app.use(express.json());

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

const helloWorld = (request, response) => {
  response.send("<h1>Hello world</h1>");
};

const getPersons = (request, response) => {
  response.json(persons);
};

const getPersonById = (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id == id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
};

const deletePerson = (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => id != person.id);
  response.status(204).end();
};

const generateId = () => {
  const maxId =
    persons.length > 0 ? Math.max(...persons.map((n) => Number(n.id))) : 0;
  return String(maxId + 1);
};

const addPerson = (request, response) => {
  const body = request.body;
  if (!body.name) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  persons = persons.filter((person) => person.name == body.name);
  if (persons.length > 0 || !body.number) {
    response.json({ error: "name must be unique" });
  }

  const newPerson = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(newPerson);
  response.json(newPerson);
};

const getInfo = (request, response) => {
  const length = persons.length;
  response.send(`<p>Phonebook has info for ${length} people<p/> \n ${Date()}`);
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.get("/", helloWorld);
app.get("/info", getInfo);
app.get("/api/persons", getPersons);
app.get("/api/persons/:id", getPersonById);
app.delete("/api/persons/:id", deletePerson);
app.post("/api/persons", addPerson);

const PORT = 3001;
app.listen(PORT);
console.log(`...Listening on port ${PORT}`);
