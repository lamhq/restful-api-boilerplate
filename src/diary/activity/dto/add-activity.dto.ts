import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

export class AddActivityDto {
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  time: string;

  tags: string[] = [];

  @IsOptional()
  @IsPositive()
  income: number;

  @IsOptional()
  @IsPositive()
  outcome: number;
}
