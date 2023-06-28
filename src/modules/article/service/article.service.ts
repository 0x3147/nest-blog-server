import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ArticleEntity } from '../entity/article.entity'
import { Repository } from 'typeorm'
import { ListDTO } from '../dto/list.dto'
import {
  BlogExceptionCodeEnum,
  BlogExceptionMsgEnum
} from '../../../enum/blog.exception-enum'
import { BlogException } from '../../../exception/blog.exception'

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>
  ) {}

  /**
   * @desc 查询所有文章
   * @Author 康佳星
   * @Date 2023-04-24 18:33:30
   * @param listDTO 查询所有文章的DTO
   */
  async getAllWithPagination(listDTO: ListDTO) {
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

  async findOneArticle(id: number) {
    const article = await this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.articleType', 'type')
      .leftJoinAndSelect('article.tags', 'tags')
      .leftJoinAndSelect('article.user', 'user')
      .where({ id })
      .andWhere({ isDelete: false })
      .getOne()
    if (!article) {
      throw new BlogException(
        BlogExceptionCodeEnum.Article_NOT_FOUND,
        BlogExceptionMsgEnum.Article_NOT_FOUND
      )
    }
    return article
  }

  /**
   * @desc 查询所有文章的数量
   * @Author 康佳星
   * @Date 2023-04-24 18:34:53
   */
  async getAllCount() {
    const getAllQuery = this.articleRepository
      .createQueryBuilder('article')
      .where({ isDelete: false })
      .getCount()
    return await getAllQuery
  }

  async removeArticle(id: number) {
    const article = await this.findOneArticle(id)
    if (!article) {
      throw new BlogException(
        BlogExceptionCodeEnum.ARTICLE_NOT_EXIST,
        BlogExceptionMsgEnum.ARTICLE_NOT_EXIST
      )
    }
    return await this.articleRepository.remove(article)
  }
}
