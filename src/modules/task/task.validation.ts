import { Joi } from "express-validation";

export default {
  create: {
    body: Joi.object({
      title: Joi.string().required(),
    }),
  },
  update: {
    body: Joi.object({
      title: Joi.string().required(),
    }),
  },
  get: Joi.string().hex().length(24),
};
