import { Body, Controller, Get, Post, Put, Delete, ValidationPipe, UsePipes, ParseIntPipe, HttpStatus} from '@nestjs/common';
import { Param } from '@nestjs/common/decorators';
import { AuthService } from './auth.service';
import { LoginDto } from '../domain/dto/login.dto';


@Controller('/login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UsePipes(new ValidationPipe())
  async authGenerate(@Body() loginDto:LoginDto): Promise<any> {
    const response = await this.authService.authGenerate(loginDto);
		if (response.statusCode != HttpStatus.OK) {
			return response;
		}

		return await this.authService.buildUserResponse(response.data);
  }
}