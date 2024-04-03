import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import MongoDB from "./configs/mongo";
import api from "./modules/index";

dotenv.config();

new MongoDB().connect();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", api);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started: ${port}`);
});
