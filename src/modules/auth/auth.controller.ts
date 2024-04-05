import { Router } from "express";
import { validate } from "express-validation";
import validation from "./auth.validation";
import AuthService from "./auth.service";
import { container } from "tsyringe";
import { hasAccess } from "../../utils/Middleware";
import { UserRole } from "../../models/User";

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

router
  .route("/info")
  .get(
    (req, res, next) =>
      hasAccess(req, res, next, [UserRole.ADMIN, UserRole.USER]),
    service.info
  );

export default router;
