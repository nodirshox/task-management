import { autoInjectable } from "tsyringe";
import { Request, Response } from "express";
import { ApiError, ApiResponse, tryAsync } from "../../utils/index";
import ReportRepository from "./report.repository";

@autoInjectable()
export default class TaskService {
  constructor(private readonly repository: ReportRepository) {}

  findUsers = tryAsync(async (req: Request, res: Response) => {
    const [tasks, total] = await this.repository.findUsers();
    new ApiResponse({ tasks, total }).send(res);
  });

  findUserTasks = tryAsync(async (req: Request, res: Response) => {
    const userId = req.params.userId;

    const user = await this.repository.getUser(userId);

    if (!user) {
      throw new ApiError(404);
    }

    const [tasks, total] = await this.repository.findUserTasks(userId);

    const completedTasks: number = tasks.filter(
      (task) => task.isCompleted
    ).length;

    let average = 0;
    if (total > 0) {
      average = Number(((completedTasks / total) * 100).toFixed(2));
    }

    new ApiResponse({
      user,
      average,
      totalTasks: total,
      tasks,
    }).send(res);
  });
}
