export const components = {
  components: {
    schemas: {
      id: {
        type: "string",
        example: "objectId",
      },
      Registration: {
        type: "object",
        properties: {
          firstName: {
            type: "string",
            example: "John",
          },
          lastName: {
            type: "string",
            example: "Doe",
          },
          email: {
            type: "string",
            example: "user@mail.com",
          },
          password: {
            type: "string",
            example: "password",
          },
        },
      },
      Login: {
        type: "object",
        properties: {
          email: {
            type: "string",
            example: "user@mail.com",
          },
          password: {
            type: "string",
            example: "password",
          },
        },
      },
      Task: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            example: "string",
          },
          title: {
            type: "string",
            example: "Read a book",
          },
          isCompleted: {
            type: "boolean",
            example: true,
          },
          createdAt: {
            type: "string",
            example: new Date(),
          },
          updatedAt: {
            type: "string",
            example: new Date(),
          },
        },
      },
      TaskCreate: {
        type: "object",
        properties: {
          title: {
            type: "string",
            example: "Read a book",
          },
        },
      },
      TaskUpdate: {
        type: "object",
        properties: {
          title: {
            type: "string",
            example: "Read a book",
          },
        },
      },
      UserTasks: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            example: "User id",
          },
        },
      },
      Error: {
        type: "object",
        properties: {
          error: {
            type: "string",
          },
        },
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        in: "header",
        name: "Authorization",
        description: "Bearer token to access these api endpoints",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};
