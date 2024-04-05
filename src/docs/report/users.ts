export const users = {
  get: {
    tags: ["Reports [ADMIN]"],
    summary: "Users",
    description: "Users",
    operationId: "users",
    responses: {
      "200": {
        description: "Users",
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
};
