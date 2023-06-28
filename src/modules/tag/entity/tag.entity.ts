import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { ArticleEntity } from '../../article/entity/article.entity'
import { Exclude } from 'class-transformer'

@Entity('tags')
export class TagEntity {
  @PrimaryGeneratedColumn()
  id: string

  @Column({
    default: false
  })
  @Exclude()
  isDelete: boolean

  @Column('text')
  tagName: string

  @ManyToMany(() => ArticleEntity, (ArticleEntity) => ArticleEntity.tags)
  articles: []

  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updateTime: Date
}
