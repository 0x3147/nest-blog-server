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
  id: string

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

  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updateTime: Date
}
