import {
  Get,
  Post,
  Query,
  Controller,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor
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
  getArticleDetail(@Query('id') id: number) {}

  @Post('create')
  createNewArticle(@Body() newArticleDTO: NewArticleDto) {}

  @Post('update')
  updateArticle(@Body() editArticleDTO: EditArticleDto) {}

  @Post('delete')
  deleteArticle(@Body('id') id: number) {}
}
