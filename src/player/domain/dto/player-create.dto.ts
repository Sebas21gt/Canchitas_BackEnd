import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class PlayerCreateDto {

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    readonly firstName: string;

    @IsNotEmpty()
    @IsString()
    readonly lastName: string;

    @IsNotEmpty()
    @IsString()
    readonly ci: string;

    @IsNotEmpty()
    @IsDateString()
    readonly birthDate: Date;

    @IsNotEmpty()
    readonly photography: string;

    @IsNotEmpty()
    @IsNumber()
    readonly teamId: number;
}