import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  VersionColumn,
  ManyToMany,
  JoinTable,
  OneToOne
} from 'typeorm'
import { TagEntity } from '../../tag/entity/tag.entity'
import { ArticleTypeEntity } from './article-type.entity'

@Entity('article')
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    default: false
  })
  isDelete: boolean

  @VersionColumn()
  version: number

  @Column('text')
  title: string

  @Column('text')
  description: string

  @Column('text')
  content: string

  @OneToOne(
    () => ArticleTypeEntity,
    (ArticleTypeEntity) => ArticleTypeEntity.article
  )
  type: ArticleTypeEntity

  @ManyToMany(() => TagEntity, (TagEntity) => TagEntity.articles)
  @JoinTable({ name: 'articles_tags' })
  tags: []

  @CreateDateColumn()
  createTime: Date

  @UpdateDateColumn()
  updateTime: Date
}
