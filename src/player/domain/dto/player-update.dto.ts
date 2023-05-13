import { IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class PlayerUpdateDto {
    
    @IsOptional()
    @IsString()
    @MaxLength(50)
    readonly firstName?: string;

    @IsOptional()
    @IsString()
    readonly lastName?: string;

    @IsOptional()
    @IsNumber()
    readonly ci?: number;

    @IsOptional()
    readonly birthDate?: Date;

    @IsOptional()
    readonly photography?: string;
}