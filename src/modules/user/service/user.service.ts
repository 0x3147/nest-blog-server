import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '../entity/user.entity'
import { Repository } from 'typeorm'
import { RegisterDto } from '../dto/register.dto'
import { LoginDto } from '../dto/login.dto'
import {
  BlogExceptionCodeEnum,
  BlogExceptionMsgEnum
} from '../../../enum/blog.exception-enum'
import { BlogException } from '../../../exception/blog.exception'
import * as crypto from 'crypto'

/**
 * @desc md5加密
 * @Author bk0x114
 * @Date 2023-06-28 22:49:50
 * @param str 需要加密的字符串
 */
const md5 = (str: string) => {
  const hash = crypto.createHash('md5')
  return hash.update(str).digest('hex')
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async login(user: LoginDto) {
    const foundUser = await this.userRepository.findOneBy({
      username: user.username
    })

    if (!foundUser) {
      throw new BlogException(
        BlogExceptionCodeEnum.USER_NOT_EXIST,
        BlogExceptionMsgEnum.USER_NOT_EXIST
      )
    }

    if (foundUser.password !== md5(user.password)) {
      throw new BlogException(
        BlogExceptionCodeEnum.PASSWORD_ERROR,
        BlogExceptionMsgEnum.PASSWORD_ERROR
      )
    }

    return foundUser
  }

  async register(user: RegisterDto) {
    if (user.inviteCode !== 'fallinlove990814') {
      throw new BlogException(
        BlogExceptionCodeEnum.INVITE_CODE_ERROR,
        BlogExceptionMsgEnum.INVITE_CODE_ERROR
      )
    }

    const foundUser = await this.userRepository.findOneBy({
      username: user.username
    })

    if (foundUser) {
      throw new BlogException(
        BlogExceptionCodeEnum.USER_EXIST,
        BlogExceptionMsgEnum.USER_EXIST
      )
    }

    const newUser = new UserEntity()
    newUser.username = user.username
    newUser.password = md5(user.password)

    try {
      await this.userRepository.save(newUser)
      return '注册成功'
    } catch (e) {
      throw new BlogException(
        BlogExceptionCodeEnum.REGISTER_FAIL,
        BlogExceptionMsgEnum.REGISTER_FAIL
      )
    }
  }

  async findAll() {
    return await this.userRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.articles', 'articles')
      .getMany()
  }
}
