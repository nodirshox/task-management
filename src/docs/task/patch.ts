export const patch = {
  patch: {
    tags: ["Task"],
    summary: "Mark task completed",
    description: "Complete task",
    operationId: "completeTask",
    parameters: [
      {
        name: "id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/id",
        },
        required: true,
        description: "Complete task",
      },
    ],
    responses: {
      "204": {
        description: "Task is marked completed",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Task",
            },
          },
        },
      },
      "404": {
        description: "Task is not found",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
              example: {
                message: "We can't find the todo",
                internal_code: "Invalid id",
              },
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
};
