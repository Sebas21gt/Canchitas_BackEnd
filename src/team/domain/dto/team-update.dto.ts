import { IsOptional, IsString } from "class-validator";

export class TeamUpdateDto {
    
    @IsOptional()
    @IsString()
    readonly name?: string;

    @IsOptional()
    @IsString()
    readonly shieldPhotography?: string;

    @IsOptional()
    @IsString()
    readonly delegateName?: string;
}