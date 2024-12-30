import { IsOptional, IsString, IsEnum } from 'class-validator';

export class QueryTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsEnum(['New', 'In Progress', 'Completed'])
  status?: 'New' | 'In Progress' | 'Completed';

  @IsOptional()
  @IsString()
  projectId?: string;
}
