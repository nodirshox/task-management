export const registration = {
  post: {
    tags: ["Auth"],
    summary: "Registration",
    description: "Create user with User role",
    operationId: "Registration",
    parameters: [] as string[],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Registration",
          },
        },
      },
    },
    responses: {
      "201": {
        description: "User created successfully",
      },
      "500": {
        description: "Server error",
      },
    },
  },
};
