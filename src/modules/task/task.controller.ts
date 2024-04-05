import { Router } from "express";
import { validate } from "express-validation";
import validation from "./task.validation";
import TaskService from "./task.service";
import { container } from "tsyringe";
import { hasAccess } from "../../utils/Middleware";
import { UserRole } from "../../models/User";

const router = Router();
const service = container.resolve(TaskService);

// find tasks
router
  .route("/")
  .get(
    (req, res, next) => hasAccess(req, res, next, [UserRole.USER]),
    service.find
  );

// create task
router
  .route("/")
  .post(
    (req, res, next) => hasAccess(req, res, next, [UserRole.USER]),
    validate(validation.create, { keyByField: true }),
    service.create
  );

// get task
router
  .route("/:id")
  .get(
    (req, res, next) => hasAccess(req, res, next, [UserRole.USER]),
    service.get
  );

// update
router
  .route("/:id")
  .put(
    (req, res, next) => hasAccess(req, res, next, [UserRole.USER]),
    validate(validation.update, { keyByField: true }),
    service.update
  );

// complete task
router
  .route("/:id")
  .patch(
    (req, res, next) => hasAccess(req, res, next, [UserRole.USER]),
    service.completeTask
  );

// delete task
router
  .route("/:id")
  .delete(
    (req, res, next) => hasAccess(req, res, next, [UserRole.USER]),
    service.delete
  );

export default router;
