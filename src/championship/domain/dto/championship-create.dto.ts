import { IsDateString, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class ChampionshipCreateDto {

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsDateString()
    readonly startDate: Date;

    @IsNotEmpty()
    @IsDateString()
    readonly finalDate: Date;

    @IsNotEmpty()
    @IsNumber()
    readonly disciplineId: number;
}