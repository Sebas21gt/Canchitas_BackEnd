import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ScoreDto {

  @IsNotEmpty()
  @IsNumber()
  programmingId!: number;

  @IsNotEmpty()
  @IsString()
  observations: string;

  @IsNotEmpty()
  @IsNumber()
  scoreTeamOne: number;

  @IsNotEmpty()
  @IsNumber()
  scoreTeamTwo: number;
}