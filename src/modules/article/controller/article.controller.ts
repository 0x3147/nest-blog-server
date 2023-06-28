import {
  Get,
  Post,
  Query,
  Controller,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  Param
} from '@nestjs/common'
import { ArticleService } from '../service/article.service'
import { ListDTO } from '../dto/list.dto'
import { NewArticleDto } from '../dto/new-article.dto'
import { EditArticleDto } from '../dto/edit-article.dto'

@Controller('article')
@UseInterceptors(ClassSerializerInterceptor)
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('list')
  async getAllArticles(@Query() listDTO: ListDTO) {
    return await this.articleService.getAllWithPagination(listDTO)
  }

  @Get('/list/count')
  async getAllArticlesCount() {
    return await this.articleService.getAllCount()
  }

  @Get('detail/:id')
  async getArticleDetail(@Param('id') id: number) {
    return await this.articleService.findOneArticle(id)
  }

  @Post('create')
  createNewArticle(@Body() newArticleDTO: NewArticleDto) {}

  @Post('update')
  updateArticle(@Body() editArticleDTO: EditArticleDto) {}

  @Post('remove')
  async removeArticle(@Body('id') id: number) {
    await this.articleService.removeArticle(id)
    const count = await this.articleService.getAllCount()
    return { effectiveCount: count }
  }
}
