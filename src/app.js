const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(400).json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs} = request.body;
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repository);

  return response.status(400).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs} = request.body;
  const { id } = request.params;
  const repository = repositories.find(repo => repo.id === id);
  if(!repository){
    return response.status(400).json({ message: 'Repositório não localizado!'});
  }

  repository.title = title;
  repository.url = url;
  repository.techs = techs;
  return response.status(400).json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;


  const repository = repositories.find(repo => repo.id === id);
  if(!repository){
    return response.status(400).json({ message: 'Repositório não existe!'});
  }

  repositories.map((r, index) => {
    if(r.id === id){
      repositories.splice(index, 1);
    }
  });

  return response.status(204).json();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repository = repositories.find(repo => repo.id === id);
  if(!repository){
    return response.status(400).json({ message: 'Repositório nao encontrado!'});
  }
  repository.likes ++;
  return response.status(400).json(repository);
});

module.exports = app;
