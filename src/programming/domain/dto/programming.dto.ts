import { IsBoolean, IsDate, IsDateString, IsNotEmpty, IsNumber } from "class-validator";

export class ProgrammingDto {

  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  @IsNumber()
  championshipId!: number;

  @IsNotEmpty()
  @IsNumber()
  group!: number;

  @IsNotEmpty()
  @IsNumber()
  teamOneId!: number;

  @IsNotEmpty()
  @IsNumber()
  teamTwoId!: number;

}
