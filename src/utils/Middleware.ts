import { NextFunction, Request, Response } from "express";
import Jwt from "./Jwt";
import User, { UserRole } from "../models/User";

export async function hasAccess(
  req: Request,
  res: Response,
  next: NextFunction,
  roles: UserRole[]
) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const jwt = token.split(" ")[1];

  if (!jwt) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decoded = await new Jwt().decode(jwt);

  if (!decoded || typeof decoded === "boolean") {
    return res.status(401).json({ message: "Token is expired" });
  }
  const userId = decoded.userId;

  const user = await User.findOne({ _id: userId });

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  const hasRole = roles.some((role) => user.role.includes(role));

  if (!hasRole) {
    return res
      .status(403)
      .json({ message: "User does not have required role" });
  }

  res.locals.userId = userId;
  res.locals.role = "USER";

  next();
}
