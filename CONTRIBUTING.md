# 贡献指南

感谢您对心灵纽带NeuraLink项目的关注！这份文档将帮助您了解如何为项目做出贡献。

## 开发流程

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启一个 Pull Request

## 代码规范

### 通用规范

- 使用2个空格进行缩进
- 使用有意义的变量名和函数名
- 添加必要的注释，特别是对于复杂的逻辑
- 遵循DRY(Don't Repeat Yourself)原则

### 前端规范

- 使用TypeScript类型注解
- 组件采用函数式组件和React Hooks
- 使用ESLint和Prettier保持代码风格一致
- 遵循MVVM模式进行开发
- 组件文件名使用PascalCase命名法
- 工具函数文件名使用camelCase命名法

### 后端规范

- 使用TypeScript类型注解
- 遵循RESTful API设计原则
- 控制器、服务和路由分离，遵循模块化设计
- 使用ESLint保持代码风格一致

## 提交规范

提交信息应遵循以下格式：

```
<type>(<scope>): <subject>

<body>

<footer>
```

其中：

- `type`: 表示提交类型，如feat(新功能)、fix(修复)、docs(文档)、style(格式)、refactor(重构)、test(测试)、chore(构建/工具)
- `scope`: 表示影响范围，如frontend、backend、api等
- `subject`: 简短描述
- `body`: 详细描述
- `footer`: 关闭issue等信息

示例：

```
feat(frontend): 添加情绪图表组件

实现了情绪图表的基本功能，包括折线图和饼图展示，支持时间范围选择。

Closes #123
```

## 分支管理

- `main`: 主分支，保持稳定可发布状态
- `develop`: 开发分支，最新的开发状态
- `feature/*`: 特性分支，用于开发新功能
- `bugfix/*`: 修复分支，用于修复bug
- `release/*`: 发布分支，用于准备发布

## 测试

- 提交前请确保通过所有测试
- 新功能应添加相应的测试用例
- 修复bug时应添加相应的回归测试

## 文档

- 新功能应更新相应的文档
- API变更应更新API文档
- 重要的架构变更应更新架构文档

## 问题反馈

如果您发现任何问题或有任何建议，请创建一个issue，我们会尽快回复。

感谢您的贡献！