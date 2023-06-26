import { Body, Controller, Get, Post, Put, Delete, ValidationPipe, UsePipes, ParseIntPipe} from '@nestjs/common';
import { Param, Req, UseGuards } from '@nestjs/common/decorators';
import { UserCreateDto } from '../domain/dto/user-create.dto';
import { UserUpdateDto } from '../domain/dto/user-update.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@app/shared/infraestructure/guards/auth.guard';
const jwt = require('jsonwebtoken');

@Controller('/user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @UsePipes(new ValidationPipe())
  async userRegister(@Body() userCreateDto:UserCreateDto): Promise<any> {
    return await this.userService.userRegister(userCreateDto);
  }
  // async userCreate(@Req() request: Request, @Body() userCreateDto:UserCreateDto): Promise<any> {
  //   const authorization = request.headers['authorization'];
  //   const token = authorization.split(' ')[1];
  //   var decoded = jwt.decode(token, process.env.JWT_ACCESS_TOKEN);
  //   return await this.userService.userCreate(userCreateDto, decoded.email);
  // }

  @Put('/:id')
  userUpdate(@Param('id', ParseIntPipe) id:number, @Body() userUpdateDto: UserUpdateDto): any {
    return this.userService.userUpdate(id, userUpdateDto);
  }

  @Get()
  async getAll(): Promise <any> {
    return await this.userService.getAll();
  }

  @Delete('/:id')
  userDelete(@Param('id') id:number): any {
    return this.userService.userDelete(id);
  }
}