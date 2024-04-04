import jwt from "jsonwebtoken";

export default class Jwt {
  async hash(info: object) {
    return await jwt.sign(info, `${process.env.ACCESS_TOKEN_SECRET}`);
  }

  async decode(token: string) {
    try {
      return await jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);
    } catch {
      return false;
    }
  }
}
