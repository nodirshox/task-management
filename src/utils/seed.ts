import User, { UserRole } from "../models/User";
import Password from "./Password";
import AuthRepository from "../modules/auth/auth.repository";
import { container } from "tsyringe";

const repository = container.resolve(AuthRepository);

export default class Seed {
  async run() {
    // admin user
    const adminEmail = "admin@mail.com";
    const adminPassword = "password";
    const existingAdminUser = await User.findOne({ email: adminEmail });

    if (!existingAdminUser) {
      const password = await new Password().hash(adminPassword);

      await repository.createUser({
        firstName: "Admin",
        lastName: "User",
        email: adminEmail,
        password,
        role: UserRole.ADMIN,
      });
    }

    // regular user
    const userEmail = "user@mail.com";
    const userPassword = "password";
    const existingUser = await User.findOne({ email: userEmail });

    if (!existingUser) {
      const password = await new Password().hash(userPassword);

      await repository.createUser({
        firstName: "John",
        lastName: "Doe",
        email: userEmail,
        password,
      });
    }
  }
}
