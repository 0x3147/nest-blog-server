import { HttpException, HttpStatus } from '@nestjs/common'
import {
  BlogExceptionCodeEnum,
  BlogExceptionMsgEnum
} from '../enum/blog.exception-enum'

export class BlogException extends HttpException {
  constructor(errCode: BlogExceptionCodeEnum, errMsg: BlogExceptionMsgEnum) {
    super({ errCode, errMsg }, HttpStatus.OK)
  }
}
