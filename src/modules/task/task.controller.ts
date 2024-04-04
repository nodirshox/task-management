import { Router } from "express";
import { validate } from "express-validation";
import validation from "./task.validation";
import TaskService from "./task.service";
import { container } from "tsyringe";
import hasAccess from "../../utils/Middleware";

const router = Router();
const service = container.resolve(TaskService);

router
  .route("/")
  .get(hasAccess, service.find)
  .post(validate(validation.create, { keyByField: true }), service.create);

router
  .route("/:id")
  .get(service.get)
  .put(validate(validation.update, { keyByField: true }), service.update)
  .patch(service.completeTask)
  .delete(service.remove);

export default router;
