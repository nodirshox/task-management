import { Router } from "express";
import AuthAPI from "./auth/auth.controller";
import TaskAPI from "./task/task.controller";
import ReportAPI from "./report/report.controller";
import swaggerUi from "swagger-ui-express";
import { docs } from "../docs/index";

const router = Router();

router.use("/swagger", swaggerUi.serve, swaggerUi.setup(docs));

router.use("/auth", AuthAPI);
router.use("/tasks", TaskAPI);
router.use("/reports", ReportAPI);

export default router;
