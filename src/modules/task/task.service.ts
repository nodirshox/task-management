import { autoInjectable } from "tsyringe";
import { Request, Response } from "express";
import { ApiError, ApiResponse, tryAsync } from "../../utils/index";
import TaskRepository from "./task.repository";

@autoInjectable()
export default class TaskService {
  constructor(private readonly repository: TaskRepository) {}

  create = tryAsync(async (req: Request, res: Response) => {
    const request = req.body;
    const userId = res.locals.userId;

    const result = await this.repository.createTask(request, userId);

    new ApiResponse(result, 201).send(res);
  });

  find = tryAsync(async (req: Request, res: Response) => {
    const userId = res.locals.userId;
    const [tasks, total] = await this.repository.find(userId);
    new ApiResponse({ tasks, total }).send(res);
  });

  get = tryAsync(async (req: Request, res: Response) => {
    const taskId = req.params.id;
    const userId = res.locals.userId;

    const result = await this.getTask(taskId, userId);

    new ApiResponse(result).send(res);
  });

  update = tryAsync(async (req: Request, res: Response) => {
    const taskId = req.params.id;
    const userId = res.locals.userId;

    await this.getTask(taskId, userId);

    const newTask = req.body;

    const updateData = {
      title: newTask.title,
      updatedAt: new Date(),
    };
    const result = await this.repository.update(taskId, updateData, {
      new: true,
    });

    new ApiResponse(result).send(res);
  });

  completeTask = tryAsync(async (req: Request, res: Response) => {
    const taskId = req.params.id;
    const userId = res.locals.userId;

    await this.getTask(taskId, userId);

    const updateData = {
      isCompleted: true,
    };

    await this.repository.update(taskId, updateData, {
      new: true,
    });

    new ApiResponse({}, 204).send(res);
  });

  delete = tryAsync(async (req: Request, res: Response) => {
    const taskId = req.params.id;
    const userId = res.locals.userId;

    await this.getTask(taskId, userId);

    await this.repository.delete(taskId);

    new ApiResponse({}, 204).send(res);
  });

  private getTask = async (taskId: string, userId: string) => {
    const task = await this.repository.findOne(taskId);

    if (!task) {
      throw new ApiError(404);
    }
    if (task.user !== userId) {
      throw new ApiError(403);
    }

    return await this.repository.findOneWithUser(taskId);
  };
}
