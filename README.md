# 🌱 个人博客后端服务

- 接口文档：[还未出具....😁]

## 📝 项目介绍

- 一个基于nestjs，用于个人博客的后端服务，主要包括用户管理、文章管理、评论管理、分类管理、标签管理、权限管理等模块。
- ORM框架使用typeorm，数据库使用mysql，未来开发完毕后打算上云，到时候在腾讯云和阿里云里选择一个😂
- 项目里的异常处理、统一返回格式都是仿照我为数不多的spring boot的经验来的，所以可能有点奇怪，nest人称小spring，所以也没啥问题??🤣
- 包管理工具使用了pnpm，不为别的，就为了快和省空间，pnpm真香！❤️
- 项目使用MIT开源协议，欢迎大家提出建议和意见~😁

## 📦 项目依赖安装

```shell
pnpm install
```

## 🚀 项目启动

```shell
pnpm run start:dev
```

## 🌸 项目提交规范

| Type     | 作用                                                                                   |
| -------- | -------------------------------------------------------------------------------------- |
| feat     | 新增特性 (feature)                                                                     |
| fix      | 修复 Bug(bug fix)                                                                      |
| docs     | 修改文档 (documentation)                                                               |
| style    | 代码格式修改(white-space, formatting, missing semi colons, etc)                        |
| refactor | 代码重构(refactor)                                                                     |
| perf     | 改善性能(A code change that improves performance)                                      |
| test     | 测试(when adding missing tests)                                                        |
| build    | 变更项目构建或外部依赖（例如 scopes: webpack、gulp、npm 等）                           |
| ci       | 更改持续集成软件的配置文件和 package 中的 scripts 命令，例如 scopes: Travis, Circle 等 |
| chore    | 变更构建流程或辅助工具(比如更改测试环境)                                               |
| revert   | 代码回退                                                                               |

