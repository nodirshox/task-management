import { NextFunction, Request, Response } from "express";
import Jwt from "./Jwt";

export default async function hasAccess(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.header("Authorization");

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const jwt = token.split(" ")[1];

  if (!jwt) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  let decoded: unknown = await new Jwt().decode(jwt);

  if (!decoded) {
    res.status(401).json({ message: "Token is expired" });
    return;
  }

  // res.locals.userId = decoded.userId;
  next();
}
