import { IsNotEmpty, IsNumber } from "class-validator";

export class TeamRegisterDto {

    @IsNotEmpty()
    @IsNumber()
    readonly teamId: number;

    @IsNotEmpty()
    @IsNumber()
    readonly championshipId: number;

}