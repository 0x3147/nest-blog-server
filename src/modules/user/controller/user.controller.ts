import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Res,
  UseInterceptors
} from '@nestjs/common'
import { UserService } from '../service/user.service'
import { LoginDto } from '../dto/login.dto'
import { RegisterDto } from '../dto/register.dto'
import { JwtService } from '@nestjs/jwt'

import type { Response } from 'express'

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
  ) {}

  @Post('login')
  async login(
    @Body() user: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const loginUser = await this.userService.login(user)

    if (loginUser) {
      const token = await this.jwtService.signAsync({
        user: {
          id: loginUser.id,
          username: loginUser.username
        }
      })
      res.setHeader('authorization', `bearer ${token}`)
      return '登录成功'
    } else {
      return '登陆失败'
    }
  }

  @Post('register')
  async register(@Body() user: RegisterDto) {
    return await this.userService.register(user)
  }

  @Get('all')
  async findAllUser() {
    return await this.userService.findAll()
  }

  @Post('delete')
  deleteUser(@Body('id') id: number) {}
}
