import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { ArticleEntity } from '../../article/entity/article.entity'

@Entity()
export class TagEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    default: false
  })
  isDelete: boolean

  @Column('text')
  tagName: string

  @ManyToMany(() => ArticleEntity, (ArticleEntity) => ArticleEntity.tags)
  articles: []

  @CreateDateColumn()
  createTime: Date

  @UpdateDateColumn()
  updateTime: Date
}
