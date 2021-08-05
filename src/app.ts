import express, { response } from "express";
import config from "config";
import cors from "cors"
import logger from "morgan";
import { tasksRouter } from "./modules/tasks/tasks.router";

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/tasks', tasksRouter);

app.get('/healtcheck', (req, res) => {
  res.status(200).send("it works")
})

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})