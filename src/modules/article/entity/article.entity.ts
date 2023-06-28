import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  VersionColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { TagEntity } from '../../tag/entity/tag.entity'
import { ArticleTypeEntity } from './article-type.entity'
import { UserEntity } from '../../user/entity/user.entity'
import { Exclude } from 'class-transformer'

@Entity('article')
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    default: false
  })
  @Exclude()
  isDelete: boolean

  @VersionColumn()
  version: number

  @Column('varchar', { length: 40 })
  title: string

  @Column('varchar', { length: 200 })
  description: string

  @Column('text')
  content: string

  @ManyToOne(() => UserEntity, (UserEntity) => UserEntity.articles)
  @JoinColumn()
  user: UserEntity

  @ManyToOne(
    () => ArticleTypeEntity,
    (ArticleTypeEntity) => ArticleTypeEntity.articles
  )
  @JoinColumn()
  articleType: ArticleTypeEntity

  @ManyToMany(() => TagEntity, (TagEntity) => TagEntity.articles)
  @JoinTable({ name: 'articles_tags' })
  tags: []

  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updateTime: Date
}
