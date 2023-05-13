import { IsDate, IsOptional, IsString } from "class-validator";

export class ChampionshipUpdateDto {
    
    @IsOptional()
    @IsString()
    readonly name?: string;

    @IsOptional()
    @IsDate()
    readonly startDate?: Date;

    @IsOptional()
    @IsDate()
    readonly finalDate?: Date;

}