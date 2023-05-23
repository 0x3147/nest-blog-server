import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { ArticleEntity } from './article.entity'

@Entity('article_type')
export class ArticleTypeEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  articleTypeName: string

  @OneToMany(() => ArticleEntity, (ArticleEntity) => ArticleEntity.articleType)
  articles: ArticleEntity[]

  @CreateDateColumn()
  createTime: Date

  @UpdateDateColumn()
  updateTime: Date
}
