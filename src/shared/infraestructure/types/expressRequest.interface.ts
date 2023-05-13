import { UserEntity } from '@app/user/domain/model/user.entity'
import {Request} from 'express'

export interface ExpressRequest extends Request {
  user?: UserEntity
}