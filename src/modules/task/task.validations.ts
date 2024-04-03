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
      isCompleted: Joi.boolean().required(),
    }),
  },
};
