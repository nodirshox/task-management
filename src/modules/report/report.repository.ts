import Task from "../../models/Task";
import User from "../../models/User";

export default class ReportRepository {
  findUsers() {
    interface IOptions {
      sort: {
        createdAt: string;
      };
    }

    const options: IOptions = {
      sort: {
        createdAt: "desc",
      },
    };
    const filter = {};
    return Promise.all([
      User.find(filter, {}, options),
      User.countDocuments(filter),
    ]);
  }

  getUser(userId: string) {
    return User.findById(userId);
  }

  findUserTasks(userId: string) {
    interface IOptions {
      sort: {
        createdAt: string;
      };
    }

    const options: IOptions = {
      sort: {
        createdAt: "desc",
      },
    };
    const filter = { user: userId };
    return Promise.all([
      Task.find(filter, {}, options),
      Task.countDocuments(filter),
    ]);
  }
}
