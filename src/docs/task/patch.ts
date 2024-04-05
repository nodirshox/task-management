export const patch = {
  patch: {
    tags: ["Tasks [USER]"],
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
      },
      "404": {
        description: "Task is not found",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
              example: {
                message: "We can't find the task",
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
