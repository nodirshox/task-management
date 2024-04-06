import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import MongoDB from "./configs/mongo";
import api from "./modules/index";
import { errorHandler } from "./utils";
import { rateLimit } from "express-rate-limit";
import cors from "cors";

dotenv.config();

new MongoDB().connect();

const app = express();

const corsOptions = {
  credentials: true,
  origin: ["http://localhost:3000", "https://api.task.nodirbek.uz"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 150 requests each IP in 1 minute
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 150,
  validate: {
    xForwardedForHeader: false,
  },
});

app.use(limiter);
app.use("/api/v1", api);

app.get("/", (_, res) => res.json({ message: "API_IS_WORKING" }));
app.use((_, res) => res.status(404).json({ message: "API_NOT_FOUND" }));

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started: ${port}`);
});
