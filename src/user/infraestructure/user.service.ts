import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusEnum } from 'src/shared/infraestructure/enums/status.enum';
import { UserCreateDto } from '../domain/dto/user-create.dto';
import { UserUpdateDto } from '../domain/dto/user-update.dto';
import { UserRepository } from '../domain/repository/user.repository';
import { MessageResponse } from '@app/shared/domain/model/message.response';
import { MessageEnum } from '@app/shared/infraestructure/enums/message.enum';

@Injectable()
export class UserService {
	constructor(@InjectRepository(UserRepository)
	private readonly userRepository: UserRepository,	
  ) { }
  
  async userCreate(userCreateDto:UserCreateDto, username: string): Promise<any> {
		const user = await this.userRepository.findOne({
		where: { email: userCreateDto.email.trim(), status: StatusEnum.Active},
		});

		if (user){
			return new MessageResponse(HttpStatus.OK, MessageEnum.USER_EXIST, null);
		}

		return this.userRepository.createUser(userCreateDto, username);
  }

  async getAll(): Promise<any> {
		
		const users = await this.userRepository.find({
		 	where: { status: StatusEnum.Active },
		});

		if (users.length < 1) {
			return new MessageResponse(HttpStatus.NOT_FOUND, MessageEnum.ENTITY_SELECT_EMPTY, null);
		}

		return users;
	}

	async getUser(id:number): Promise<any> {
		const user = await this.userRepository.findOne({
			where: {
				id,
				status: StatusEnum.Active 
			},
		});
		return user;
	}

	async userUpdate(id:number, userUpdateDto: UserUpdateDto){
		const user = await this.userRepository.findOne({
			where: {
				id,
				status: StatusEnum.Active
			}
		});
		if (!user){
			return new MessageResponse(HttpStatus.NOT_FOUND, MessageEnum.USER_NOT_EXIST, null);
		}
		Object.assign(user, userUpdateDto);
		await this.userRepository.update(id, user);
		return new MessageResponse(HttpStatus.OK, MessageEnum.USER_UPDATE, user);
	}

	async userDelete(id:number){
		const user = await this.userRepository.findOne({
			where: {
				id,
				status: StatusEnum.Active
			}
		});
		if (!user){
			return new MessageResponse(HttpStatus.NOT_FOUND, MessageEnum.USER_NOT_EXIST, null);;
		}
		return new MessageResponse(HttpStatus.OK, MessageEnum.USER_DELETE, this.userRepository.update(id, {status:StatusEnum.Deleted}));
	}
}