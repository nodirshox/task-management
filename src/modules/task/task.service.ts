import { autoInjectable } from "tsyringe";
import { Request, Response } from "express";
import { ApiError, ApiResponse, tryAsync } from "../../utils/index";
import TaskRepository from "./task.repository";

@autoInjectable()
export default class TaskService {
  constructor(private readonly repository: TaskRepository) {}

  create = tryAsync(async (req: Request, res: Response) => {
    const request = req.body;

    const result = await this.repository.createTask(request);

    new ApiResponse(result, 201).send(res);
  });

  find = tryAsync(async (req: Request, res: Response) => {
    const [tasks, total] = await this.repository.find();
    new ApiResponse({ tasks, total }).send(res);
  });

  get = tryAsync(async (req: Request, res: Response) => {
    const taskId = req.params.id;

    const result = await this.getTask(taskId);

    new ApiResponse(result).send(res);
  });

  update = tryAsync(async (req: Request, res: Response) => {
    const taskId = req.params.id;
    const newTask = req.body;

    const updateData = {
      title: newTask.title,
      updatedAt: new Date(),
    };
    const result = await this.repository.update(taskId, updateData, {
      new: true,
    });

    if (!result) {
      throw new ApiError(404);
    }
    new ApiResponse(result).send(res);
  });

  completeTask = tryAsync(async (req: Request, res: Response) => {
    const taskId = req.params.id;

    await this.getTask(taskId);

    const updateData = {
      isCompleted: true,
    };

    await this.repository.update(taskId, updateData, {
      new: true,
    });

    new ApiResponse({}, 204).send(res);
  });

  remove = tryAsync(async (req: Request, res: Response) => {
    const taskId = req.params.id;

    await this.getTask(taskId);

    await this.repository.delete(taskId);

    new ApiResponse({}, 204).send(res);
  });

  private getTask = async (id: string) => {
    const task = await this.repository.findOne(id);

    if (!task) {
      throw new ApiError(404);
    }

    return task;
  };
}
