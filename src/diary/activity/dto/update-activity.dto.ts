import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateActivityDto {
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  time: string;

  tags: string[] = [];

  @IsInt()
  @IsOptional()
  income: number;

  @IsInt()
  @IsOptional()
  outcome: number;
}
