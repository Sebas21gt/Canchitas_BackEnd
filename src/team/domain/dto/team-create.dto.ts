import { IsArray, IsNotEmpty, IsString} from "class-validator";

export class TeamCreateDto {

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly shieldPhotography: string;

    @IsNotEmpty()
    @IsString()
    readonly delegateName: string;

    @IsNotEmpty({
        message: "Disciplinas no tiene que ser vacio"
    })
    @IsArray({
        message: "Es necesario enviar disciplinas"
    })
    readonly disciplines: number[];
}