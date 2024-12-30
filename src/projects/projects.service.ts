import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './project.interface';

@Injectable()
export class ProjectsService {
  constructor(@InjectModel('Project') private readonly projectModel: Model<Project>) {}

  async create(createProjectDto: any): Promise<Project> {
    const project = new this.projectModel(createProjectDto);
    return project.save();
  }

  async findAll(): Promise<Project[]> {
    return this.projectModel.find().exec();
  }

  async findOne(id: string): Promise<Project> {
    return this.projectModel.findById(id).exec();
  }

  async update(id: string, updateDto: any): Promise<Project> {
    return this.projectModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Project> {
    return this.projectModel.findByIdAndRemove(id).exec();
  }
}
