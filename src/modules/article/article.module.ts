import { Module } from '@nestjs/common'
import { ArticleController } from './controller/article.controller'
import { ArticleService } from './service/article.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ArticleEntity } from './entity/article.entity'
import { ArticleTypeEntity } from './entity/article-type.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity, ArticleTypeEntity])],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule {}
