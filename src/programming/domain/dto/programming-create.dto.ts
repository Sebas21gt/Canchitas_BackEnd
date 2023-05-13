import { IsBoolean, IsDate, IsDateString, IsNotEmpty, IsNumber } from "class-validator";

export class ProgrammingCreateDto {

  @IsNotEmpty()
  @IsDateString()
  readonly date: Date;

  @IsNotEmpty()
  @IsNumber()
  championshipId!: number;

  @IsNotEmpty()
  @IsNumber()
  group!: number;
}