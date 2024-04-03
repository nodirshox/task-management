import { Router } from "express";
import TaskAPI from "./task";

const router = Router();

router.use("/tasks", TaskAPI);

export default router;
