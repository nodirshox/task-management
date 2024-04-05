import { Router } from "express";
import ReportService from "./report.service";
import { container } from "tsyringe";
import { hasAccess } from "../../utils/Middleware";
import { UserRole } from "../../models/User";

const router = Router();
const service = container.resolve(ReportService);

// find users
router
  .route("/users")
  .get(
    (req, res, next) => hasAccess(req, res, next, [UserRole.ADMIN]),
    service.findUsers
  );

// find user tasks
router
  .route("/users/:userId")
  .get(
    (req, res, next) => hasAccess(req, res, next, [UserRole.ADMIN]),
    service.findUserTasks
  );

export default router;
