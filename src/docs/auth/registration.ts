export const registration = {
  post: {
    tags: ["Auth"],
    summary: "Registration",
    description: "Registration",
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
