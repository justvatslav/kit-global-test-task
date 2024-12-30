import { IsString, IsOptional, IsEnum } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(['New', 'In Progress', 'Completed'])
  status?: 'New' | 'In Progress' | 'Completed';

  @IsOptional()
  @IsString()
  projectId?: string;
}
