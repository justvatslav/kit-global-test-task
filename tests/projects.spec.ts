import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from '../src/projects/projects.controller';
import { ProjectsService } from '../src/projects/projects.service';
import { CreateProjectDto } from '../src/projects/dto/create-project.dto';

describe('ProjectsController', () => {
  let controller: ProjectsController;
  let service: ProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        {
          provide: ProjectsService,
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

    controller = module.get<ProjectsController>(ProjectsController);
    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should call create project', async () => {
    const createProjectDto: CreateProjectDto = { name: 'Test Project' };
    jest.spyOn(service, 'create').mockResolvedValue(createProjectDto as any);
    expect(await controller.create(createProjectDto)).toEqual(createProjectDto);
  });

  it('should call findAll', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValue([]);
    expect(await controller.findAll()).toEqual([]);
  });

  it('should call findOne with correct id', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue({ id: '1', name: 'Test Project' } as any);
    expect(await controller.findOne('1')).toEqual({ id: '1', name: 'Test Project' });
  });

  it('should call update with correct id and data', async () => {
    const updateProjectDto: CreateProjectDto = { name: 'Updated Project' };
    jest.spyOn(service, 'update').mockResolvedValue(updateProjectDto as any);
    expect(await controller.update('1', updateProjectDto)).toEqual(updateProjectDto);
  });

  it('should call remove with correct id', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue({ id: '1' } as any);
    expect(await controller.remove('1')).toEqual({ id: '1' });
  });
});
