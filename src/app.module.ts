import { Logger, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as dotenv from 'dotenv'
import * as Joi from 'joi'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LogModule } from './modules/log/log.module'
import { connectionParams } from '../ormconfig'

const envFilePath = `.env.${process.env.NODE_ENV || 'dev'}`

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      load: [() => dotenv.config({ path: '.env' })],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod').default('dev'),
        DB_PORT: Joi.number().default(3306),
        DB_HOST: Joi.alternatives().try(
          Joi.string().ip(),
          Joi.string().domain()
        ),
        DB_TYPE: Joi.string().valid('mysql', 'postgres'),
        DB_DATABASE: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_SYNC: Joi.boolean().default(false),
        LOG_ON: Joi.boolean(),
        LOG_LEVEL: Joi.string()
      })
    }),
    TypeOrmModule.forRoot(connectionParams),
    LogModule
  ],
  providers: [Logger],
  exports: [Logger]
})
export class AppModule {}