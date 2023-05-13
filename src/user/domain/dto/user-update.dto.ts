import { IsEmail, IsOptional, IsString, MaxLength } from "class-validator";

export class UserUpdateDto {

    @IsString()
    @MaxLength(50)
    @IsOptional()
    readonly firstName?: string;

    @IsString()
    @IsOptional()
    readonly lastName?: string;

    @IsEmail()
    @IsOptional()
    readonly email?: string;  
}