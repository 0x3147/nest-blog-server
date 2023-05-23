import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '../entity/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async findAll() {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.articles', 'articles')
      .getMany()
  }
}
