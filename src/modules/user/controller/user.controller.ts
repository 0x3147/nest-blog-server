import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors
} from '@nestjs/common'
import { UserService } from '../service/user.service'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  async findAllUser() {
    return await this.userService.findAll()
  }

  @Post('delete')
  deleteUser(@Body('id') id: number) {}
}
