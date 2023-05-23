import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ArticleEntity } from '../entity/article.entity'
import { Repository } from 'typeorm'
import { ListDTO } from '../dto/list.dto'

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>
  ) {}

  async getAll(listDTO: ListDTO) {
    const { page = 1, pageSize = 10 } = listDTO
    const getAllQuery = this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.articleType', 'type')
      .leftJoinAndSelect('article.tags', 'tags')
      .leftJoinAndSelect('article.user', 'user')
      .where({ isDelete: false })
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getMany()
    return await getAllQuery
  }
}
