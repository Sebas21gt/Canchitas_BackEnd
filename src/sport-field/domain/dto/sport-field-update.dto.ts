import { IsOptional, IsString } from "class-validator";

export class SportFieldUpdateDto {
    
    @IsOptional()
    @IsString()
    readonly name?: string;

    @IsOptional()
    @IsString()
    readonly direction?: string;

}