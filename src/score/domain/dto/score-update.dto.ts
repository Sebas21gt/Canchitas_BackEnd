import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ScoreUpdateDto {

  @IsNotEmpty()
  @IsString()
  readonly observation: string;

  @IsNotEmpty()
  @IsNumber()
  readonly scoreTeamOne: number;

  @IsNotEmpty()
  @IsNumber()
  readonly scoreTeamTwo: number;

  @IsNotEmpty()
  @IsBoolean()
  flagTeamOne: boolean;

  @IsNotEmpty()
  @IsBoolean()
  flagTeamTwo: boolean;

}