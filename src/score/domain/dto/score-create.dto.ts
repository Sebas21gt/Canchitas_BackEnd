import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ScoreCreateDto {

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

  @IsNotEmpty()
  @IsBoolean()
  flagTeamOne: boolean;

  @IsNotEmpty()
  @IsBoolean()
  flagTeamTwo: boolean;
}