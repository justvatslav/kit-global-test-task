import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from '../src/tasks/tasks.controller';
import { TasksService } from '../src/tasks/tasks.service';
import { CreateTaskDto } from '../src/tasks/dto/create-task.dto';
import { QueryTaskDto } from '../src/tasks/dto/query-task.dto';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should call create task', async () => {
    const createTaskDto: CreateTaskDto = { title: 'Test Task' };
    jest.spyOn(service, 'create').mockResolvedValue(createTaskDto as any);
    expect(await controller.create(createTaskDto)).toEqual(createTaskDto);
  });

  it('should call findAll with query', async () => {
    const queryDto: QueryTaskDto = { status: 'New' };
    jest.spyOn(service, 'findAll').mockResolvedValue([]);
    expect(await controller.findAll(queryDto)).toEqual([]);
  });

  it('should call findOne with correct id', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue({ id: '1', title: 'Test Task' } as any);
    expect(await controller.findOne('1')).toEqual({ id: '1', title: 'Test Task' });
  });

  it('should call update with correct id and data', async () => {
    const updateTaskDto: CreateTaskDto = { title: 'Updated Task' };
    jest.spyOn(service, 'update').mockResolvedValue(updateTaskDto as any);
    expect(await controller.update('1', updateTaskDto)).toEqual(updateTaskDto);
  });

  it('should call remove with correct id', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue({ id: '1' } as any);
    expect(await controller.remove('1')).toEqual({ id: '1' });
  });
});
