export const info = {
  get: {
    tags: ["Auth"],
    summary: "User info",
    description: "User info",
    operationId: "userInfo",
    parameters: [] as string[],
    responses: {
      "200": {
        description: "User is obtained",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UserInfo",
            },
          },
        },
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
