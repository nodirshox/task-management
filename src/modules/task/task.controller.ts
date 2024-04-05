import { Router } from "express";
import { validate } from "express-validation";
import validation from "./task.validation";
import TaskService from "./task.service";
import { container } from "tsyringe";
import hasAccess from "../../utils/Middleware";

const router = Router();
const service = container.resolve(TaskService);

// find tasks
router.route("/").get(hasAccess, service.find);

// create task
router
  .route("/")
  .post(
    hasAccess,
    validate(validation.create, { keyByField: true }),
    service.create
  );

// get task
router.route("/:id").get(hasAccess, service.get);

// update
router
  .route("/:id")
  .put(
    hasAccess,
    validate(validation.update, { keyByField: true }),
    service.update
  );

// complete task
router.route("/:id").patch(hasAccess, service.completeTask);

// delete task
router.route("/:id").delete(hasAccess, service.delete);

export default router;
