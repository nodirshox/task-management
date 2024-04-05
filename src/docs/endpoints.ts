import { registration } from "./auth/registration";
import { login } from "./auth/login";
import { find } from "./task/find";
import { create } from "./task/create";
import { get } from "./task/get";
import { update } from "./task/update";
import { remove } from "./task/remove";
import { patch } from "./task/patch";
import { users } from "./report/users";
import { userTasks } from "./report/userTasks";

export const endpoints = {
  paths: {
    "/auth/registration": {
      ...registration,
    },
    "/auth/login": {
      ...login,
    },
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
    "/reports/users": {
      ...users,
    },
    "/reports/users/{userId}": {
      ...userTasks,
    },
  },
};
