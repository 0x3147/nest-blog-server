import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {})

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))

  app.enableCors()

  app.setGlobalPrefix('api')

  await app.listen(3000)
}
bootstrap()
