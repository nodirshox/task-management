export const create = {
  post: {
    tags: ["Task"],
    summary: "Create task",
    description: "Create task",
    operationId: "createTask",
    parameters: [] as string[],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/TaskCreate",
          },
        },
      },
    },
    responses: {
      "201": {
        description: "Task created successfully",
      },
      "500": {
        description: "Server error",
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
};
