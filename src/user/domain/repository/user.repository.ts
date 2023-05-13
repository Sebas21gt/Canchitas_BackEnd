import { StatusEnum } from "@app/shared/infraestructure/enums/status.enum";
import { EntityRepository, Repository } from "typeorm";
import { UserCreateDto } from "../dto/user-create.dto";
import { UserEntity } from "../model/user.entity";
import { MessageResponse } from "@app/shared/domain/model/message.response";
import { MessageEnum } from "@app/shared/infraestructure/enums/message.enum";
import { HttpStatus } from "@nestjs/common";

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
    
  async createUser(userDto: UserCreateDto, username: string): Promise<any> {
    
    const user = new UserEntity();
    Object.assign(user, userDto);
          
    try {
      user.email = user.email.trim();
      user.status = StatusEnum.Active;
      user.userCreation = username;
      await user.save();
    } catch (e) {
      console.log(e);
      return new MessageResponse(HttpStatus.NOT_FOUND, MessageEnum.ENTITY_ERROR_CREATE, null);
    }
    
    delete user.password;
      return user;
  } 
}