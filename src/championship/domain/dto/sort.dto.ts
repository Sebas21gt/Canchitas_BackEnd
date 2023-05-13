import { IsDateString, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class SortDto {

    @IsNotEmpty()
    @IsNumber()
    readonly championshipId: number;
}