import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { TransformInterceptor } from './common/interceptor/transform.interceptor'
import { ValidationPipe } from '@nestjs/common'
import { HttpExceptionFilter } from './common/filter/http-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {})

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))

  app.enableCors()

  app.setGlobalPrefix('api')

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    })
  )

  app.useGlobalInterceptors(new TransformInterceptor())

  app.useGlobalFilters(new HttpExceptionFilter())

  await app.listen(3001)
}
bootstrap()
