import { Router } from "express";
import TaskAPI from "./task/task.controller";
import AuthAPI from "./auth/auth.controller";
import swaggerUi from "swagger-ui-express";
import { docs } from "../docs/index";

const router = Router();

router.use("/swagger", swaggerUi.serve, swaggerUi.setup(docs));

router.use("/tasks", TaskAPI);
router.use("/auth", AuthAPI);

export default router;
