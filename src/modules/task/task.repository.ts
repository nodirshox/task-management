import Task from "../../models/Task";

export default class TaskRepository {
  createTask(task: object) {
    return Task.create(task);
  }

  find() {
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
    return Promise.all([Task.find({}, {}, options), Task.countDocuments()]);
  }

  findOne(id: string) {
    return Task.findOne({ _id: id });
  }

  update(id: string, update: object, options: object = {}) {
    return Task.findOneAndUpdate({ _id: id }, update, options);
  }

  delete(id: string) {
    return Task.deleteOne({ _id: id });
  }
}
