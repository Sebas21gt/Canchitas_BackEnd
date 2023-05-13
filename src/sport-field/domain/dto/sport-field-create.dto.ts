import { IsNotEmpty, IsString} from "class-validator";

export class SportFieldCreateDto {

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly direction: string;

}