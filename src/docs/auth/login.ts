export const login = {
  post: {
    tags: ["Auth"],
    summary: "Login",
    description: "Login",
    operationId: "Login",
    parameters: [] as string[],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Login",
          },
        },
      },
    },
    responses: {
      "201": {
        description: "Login successful",
      },
      "500": {
        description: "Server error",
      },
    },
  },
};
