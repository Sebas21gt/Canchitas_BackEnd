import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class UserCreateDto {

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    readonly firstName: string;

    @IsNotEmpty()
    @IsString()
    readonly lastName: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;  

    @IsNotEmpty()
    @IsString()
    readonly password: string;
}