import { find } from "./find";
import { create } from "./create";
import { get } from "./get";
import { update } from "./update";
import { remove } from "./remove";
import { patch } from "./patch";
import { registration } from "../auth/registration";
import { login } from "../auth/login";

export const task = {
  paths: {
    "/tasks": {
      ...find,
      ...create,
    },
    "/tasks/{id}": {
      ...get,
      ...update,
      ...remove,
      ...patch,
    },
    "/auth/registration": {
      ...registration,
    },
    "/auth/login": {
      ...login,
    },
  },
};
