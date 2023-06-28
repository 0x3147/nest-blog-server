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
  id: string

  @Column('text')
  articleTypeName: string

  @OneToMany(() => ArticleEntity, (ArticleEntity) => ArticleEntity.articleType)
  articles: ArticleEntity[]

  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updateTime: Date
}
