import Task from "../../models/Task";

export default class TaskRepository {
  createTask(task: object, userId: string) {
    return Task.create({ ...task, user: userId });
  }

  find(userId: string) {
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
    const filter = {
      user: userId,
    };
    return Promise.all([
      Task.find(filter, {}, options).populate({ path: "user" }),
      Task.countDocuments(filter),
    ]);
  }

  findOne(id: string) {
    return Task.findOne({ _id: id });
  }

  findOneWithUser(id: string) {
    return Task.findOne({ _id: id }).populate({ path: "user" });
  }

  update(id: string, update: object, options: object = {}) {
    return Task.findOneAndUpdate({ _id: id }, update, options);
  }

  delete(id: string) {
    return Task.deleteOne({ _id: id });
  }
}
