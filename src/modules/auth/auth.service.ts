import { autoInjectable } from "tsyringe";
import { Request, Response } from "express";
import { ApiResponse, tryAsync, Password, Jwt } from "../../utils/index";
import AuthRepository from "./auth.repository";
import { ACCESS_TOKEN_EXPIRATION } from "../../configs/const";

@autoInjectable()
export default class AuthService {
  constructor(private readonly repository: AuthRepository) {}

  registration = tryAsync(async (req: Request, res: Response) => {
    const request = req.body;

    const existingUser = await this.repository.getByEmail(request.email);

    if (existingUser) {
      return new ApiResponse({ message: "Email exists" }, 400).send(res);
    }

    request.password = await new Password().hash(request.password);

    const user = await this.repository.createUser(request);

    new ApiResponse(
      {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      201
    ).send(res);
  });

  login = tryAsync(async (req: Request, res: Response) => {
    const request = req.body;

    const user = await this.repository.getByEmail(request.email);

    if (!user) {
      return new ApiResponse({ message: "Email does not exist" }, 400).send(
        res
      );
    }

    const isPasswordMatch = await new Password().check(
      request.password,
      user.password
    );

    if (!isPasswordMatch) {
      return new ApiResponse({ message: "Incorrect password" }, 400).send(res);
    }

    const jwt = {
      userId: user._id,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * ACCESS_TOKEN_EXPIRATION,
    };

    new ApiResponse(
      {
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        accessToken: await new Jwt().hash(jwt),
      },
      200
    ).send(res);
  });
}
