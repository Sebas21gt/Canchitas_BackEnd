import { IsBoolean, IsDate, IsNotEmpty, IsOptional } from "class-validator";

export class ProgrammingUpdateDto {

  @IsOptional()
  @IsDate()
  readonly date: Date;

  @IsOptional()
  @IsBoolean()
  statusProgramming?: boolean;

}