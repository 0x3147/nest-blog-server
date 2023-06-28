export enum BlogExceptionCodeEnum {
  USER_EXIST = '10001',
  INVITE_CODE_ERROR = '10002',
  REGISTER_FAIL = '10003',
  USER_NOT_EXIST = '10004',
  PASSWORD_ERROR = '10005',
  Article_NOT_FOUND = '10006',
  ARTICLE_NOT_EXIST = '10007'
}

export enum BlogExceptionMsgEnum {
  USER_EXIST = '用户名已存在',
  INVITE_CODE_ERROR = '邀请码错误',
  REGISTER_FAIL = '注册失败，请联系管理员',
  USER_NOT_EXIST = '用户不存在',
  PASSWORD_ERROR = '密码错误',
  Article_NOT_FOUND = '未找到该文章',
  ARTICLE_NOT_EXIST = '该文章已不存在'
}
