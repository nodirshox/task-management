import jwt from "jsonwebtoken";

interface DecodedJWT {
  userId: string;
}

export default class Jwt {
  async hash(info: object) {
    return await jwt.sign(info, `${process.env.ACCESS_TOKEN_SECRET}`);
  }

  async decode(token: string): Promise<DecodedJWT | boolean> {
    try {
      return (await jwt.verify(
        token,
        `${process.env.ACCESS_TOKEN_SECRET}`
      )) as DecodedJWT;
    } catch {
      return false;
    }
  }
}
