import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { ExpressRequest } from '@app/shared/infraestructure/types/expressRequest.interface';
import { UserService } from '@app/user/infraestructure/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  usuarioSession: string;
  constructor(private readonly userService: UserService,) { }

  async use(req: ExpressRequest, _: Response, next: NextFunction) {

    req.user = null;    

    if (!req.headers.authorization) {
      next();
      return;
    }
    
    const token = req.headers.authorization.split(' ')[1];
    try {
      const decode = verify(token, process.env.JWT_ACCESS_TOKEN);   
      const user = await this.userService.getUser(decode['id']);      

      req.user = user;
      next();
    } catch (err) {
      console.log("err", err);
      next();
    }
  }
}