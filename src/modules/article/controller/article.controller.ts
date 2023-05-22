import { Get, Post, Query, Controller, Body } from '@nestjs/common'
import { ArticleService } from '../service/article.service'
import { ListDTO } from '../dto/list.dto'
import { NewArticleDto } from '../dto/new-article.dto'
import { EditArticleDto } from '../dto/edit-article.dto'

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('list')
  getAllArticles(@Query() listDTO: ListDTO) {
    this.articleService.getAll(listDTO)
  }

  @Get('detail/:id')
  getArticleDetail(@Query('id') id: number) {}

  @Post('create')
  createNewArticle(@Body() newArticleDTO: NewArticleDto) {}

  @Post('update/:id')
  updateArticle(@Body() editArticleDTO: EditArticleDto) {}

  @Post('delete/:id')
  deleteArticle(@Body('id') id: number) {}
}
