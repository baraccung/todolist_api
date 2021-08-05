import express, { response } from "express";
import config from "config";
import cors from "cors"
import { v4 as uuidv4 } from 'uuid';
import logger from "morgan";

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

interface todoData {
  id: string,
  title: string,
  description: string | null,
  complete: boolean
}

const storage: Array<todoData> = [];

const addTodo = (data: todoData, storage: Array<todoData>) => {

  storage.push(data);
  return true;
}

const deleteTodo = (id: string, storage: Array<todoData>) => {
  const index = storage.findIndex(el => id === id);

  if (index === -1) return false;

  storage.splice(index, 1);
  return true;

}

const updateTodo = (id: string, storage: Array<todoData>) => {
  const item = storage.find(el => id === id);

  if (!item) return false;

  item.complete = (!item.complete);
  return true;
}

app.get('/', (req, res) => {
  const response = JSON.stringify(storage);
  res.status(200).send(response);
})

app.post('/', (req, res) => {
  const id = uuidv4();
  const data = { id, ...req.body };
  const add = addTodo(data, storage);
  if (!add) return res.status(500).send();
  res.status(201).send(data);
})

app.put('/', (req, res) => {

  const upd = updateTodo(req.body.id, storage);
  if (!upd) return res.status(500).send();
  res.status(204).send();
})

app.delete('/', (req, res) => {
  const del = deleteTodo(req.body.id, storage);
  if (!del) return res.status(500).send();

  res.status(204).send();
})


app.get('/healtcheck', (req, res) => {
  res.status(200).send()
})

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})