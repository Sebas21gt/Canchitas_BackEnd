import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AssingDateTimeDto {

  @IsNotEmpty()
  @IsNumber()
  championshipId!: number;

  @IsNotEmpty()
  @IsNumber()
  group!: number;

  @IsNotEmpty()
  @IsNumber()
  dateNumber!: number;

  // @IsNotEmpty()
  // @IsDate()
  // @Type(() => Date)
  @IsString()
  dateNow!: string;

  @IsNotEmpty()
  @IsNumber()
  sportFieldId!: number;
}
