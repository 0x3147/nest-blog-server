import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { ArticleEntity } from '../../article/entity/article.entity'
import { Exclude } from 'class-transformer'

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  username: string

  @Column({ nullable: true })
  @Exclude()
  password: string

  @Column()
  @Exclude()
  tel: string

  @Column({ nullable: true })
  avatar: string

  @Column()
  signature: string

  @OneToMany(() => ArticleEntity, (ArticleEntity) => ArticleEntity.user)
  articles: ArticleEntity[]

  @CreateDateColumn()
  createTime: Date

  @UpdateDateColumn()
  updateTime: Date
}
