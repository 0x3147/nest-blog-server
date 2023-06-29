import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException
} from '@nestjs/common'
import { Request, Response } from 'express'
import { execPath } from 'process'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = exception.getStatus()
    const message = exception.message

    const exceptionResponse: any = exception.getResponse()
    let validatorMessage = exceptionResponse
    let validatorCode
    if (validatorMessage instanceof Array) {
      validatorMessage = exceptionResponse.message[0]
    } else if (validatorMessage instanceof Object) {
      validatorMessage =
        exceptionResponse.errMsg || exceptionResponse.message[0]
      validatorCode = exceptionResponse.errCode || exceptionResponse.statusCode
    }

    response.status(status).json({
      success: false,
      code: validatorCode || status,
      message: validatorMessage || message,
      timeStamps: new Date().toLocaleString()
    })
  }
}
