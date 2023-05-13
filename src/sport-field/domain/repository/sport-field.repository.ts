import { StatusEnum } from "@app/shared/infraestructure/enums/status.enum";
import { EntityRepository, Repository } from "typeorm";
import { SportFieldEntity } from "../model/sport-field.entity";
import { SportFieldCreateDto } from "../dto/sport-field-create.dto";



@EntityRepository(SportFieldEntity)
export class SportFieldRepository extends Repository<SportFieldEntity> {
    
    async createSportField(sportFieldDto: SportFieldCreateDto): Promise<any> {
    
        const field = new SportFieldEntity();
        Object.assign(field, sportFieldDto);
          
        try {
            field.status = StatusEnum.Active;
            field.userCreation = '123';
          await field.save();
        } catch (e) {
          console.log(e);
          return 'Error';
        }
    }
    
}