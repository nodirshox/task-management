import bcrypt from "bcryptjs";

export default class Password {
  async hash(password: string) {
    return await bcrypt.hash(password, 10);
  }
  async check(password: string, hashed: string) {
    try {
      return await bcrypt.compare(password, hashed);
    } catch {
      return false;
    }
  }
}
