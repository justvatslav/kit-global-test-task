import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.interface';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async create(taskDto: any): Promise<Task> {
    const task = new this.taskModel(taskDto);
    return task.save();
  }

  async findAll(query: any): Promise<Task[]> {
    return this.taskModel.find(query).exec();
  }

  async findOne(id: string): Promise<Task> {
    return this.taskModel.findById(id).exec();
  }

  async update(id: string, updateDto: any): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Task> {
    return this.taskModel.findByIdAndRemove(id).exec();
  }
}
