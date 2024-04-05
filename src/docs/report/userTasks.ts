export const userTasks = {
  get: {
    tags: ["Reports [ADMIN]"],
    summary: "User tasks",
    description: "User tasks",
    operationId: "userTasks",
    parameters: [
      {
        name: "userId",
        in: "path",
        schema: {
          $ref: "#/components/schemas/id",
        },
        required: true,
        description: "User tasks",
      },
    ],
    responses: {
      "200": {
        description: "User tasks",
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
};
