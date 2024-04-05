import User from "../../models/User";

export default class AuthRepository {
  createUser(user: object) {
    return User.create(user);
  }

  getByEmail(email: string) {
    return User.findOne({ email }).select("+password");
  }

  getById(userId: string) {
    return User.findById(userId);
  }
}
