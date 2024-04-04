import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import MongoDB from "./configs/mongo";
import api from "./modules/index";
import { errorHandler } from "./utils";

dotenv.config();

new MongoDB().connect();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", api);

app.get("/", (_, res) => res.json({ message: "API_IS_WORKING" }));
app.use((_, res) => res.status(404).json({ message: "API_NOT_FOUND" }));

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started: ${port}`);
});
