import { Module } from '@nestjs/common'
import { utilities, WinstonModule, WinstonModuleOptions } from 'nest-winston'
import { ConfigService } from '@nestjs/config'
import * as winston from 'winston'
import { Console } from 'winston/lib/winston/transports'
import * as DailyRotateFile from 'winston-daily-rotate-file'
import { LogEnum } from '../../enum/config'

function createDailyRotateTransport(level: string, filename: string) {
  return new DailyRotateFile({
    level,
    dirname: 'logs',
    filename: `${filename}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.simple()
    )
  })
}

@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const consoleTransports = new Console({
          level: 'info',
          format: winston.format.combine(
            winston.format.timestamp(),
            utilities.format.nestLike()
          )
        })

        return {
          transports: [
            consoleTransports,
            ...(configService.get(LogEnum.LOG_ON)
              ? [
                  createDailyRotateTransport('info', 'application'),
                  createDailyRotateTransport('warn', 'error')
                ]
              : [])
          ]
        } as WinstonModuleOptions
      }
    })
  ]
})
export class LogModule {}
