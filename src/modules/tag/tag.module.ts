import { Module } from '@nestjs/common'
import { TagController } from './controller/tag.controller'
import { TagService } from './service/tag.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TagEntity } from './entity/tag.entity'

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity])],
  controllers: [TagController],
  providers: [TagService]
})
export class TagModule {}
