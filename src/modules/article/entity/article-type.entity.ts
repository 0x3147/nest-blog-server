import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
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

  @OneToOne(() => ArticleEntity)
  @JoinColumn()
  article: ArticleEntity

  @CreateDateColumn()
  createTime: Date

  @UpdateDateColumn()
  updateTime: Date
}
