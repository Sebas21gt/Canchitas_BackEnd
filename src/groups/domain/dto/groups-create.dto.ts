import { IsNotEmpty, IsNumber, IsString} from "class-validator";

export class GroupsCreateDto {

    @IsNotEmpty()
    @IsNumber()
    readonly championshipId: number;

    @IsNotEmpty()
    @IsNumber()
    readonly group: number;
}