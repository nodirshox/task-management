import { Router } from "express";
import { validate } from "express-validation";
import validation from "./auth.validation";
import AuthService from "./auth.service";
import { container } from "tsyringe";

const router = Router();
const service = container.resolve(AuthService);

router
  .route("/registration")
  .post(
    validate(validation.registration, { keyByField: true }),
    service.registration
  );

router
  .route("/login")
  .post(validate(validation.login, { keyByField: true }), service.login);

export default router;
