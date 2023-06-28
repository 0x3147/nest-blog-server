import { IsNotEmpty, Length, Matches } from 'class-validator'
import { regPassword } from '../../../util/regex'

export class RegisterDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @Length(5, 15, { message: '用户名长度为5~15个字符' })
  username: string

  @IsNotEmpty({ message: '密码不能为空' })
  @Matches(regPassword, {
    message: '密码必须包含大小写字母、数字、特殊字符，最小6位'
  })
  password: string

  @IsNotEmpty({ message: '邀请码不能为空' })
  @Length(6, 20, { message: '邀请码长度为6~20个字符' })
  inviteCode: string
}
