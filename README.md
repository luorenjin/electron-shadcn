# DeepData

DeepData 是一款预配置的 Electron 桌面应用程序，集成了现代化的工具链和 UI 组件库，旨在打造一款强大的 AI 数据助手产品。它不仅仅是一款数据工具，而是数据思考的新范式，致力于让每个人都能自由探索数据世界的无限可能。

![Demo GIF](https://github.com/LuanRoger/electron-shadcn/blob/main/images/demo.gif)

## 设计理念

1. **化繁为简**：真正伟大的工具是如此简单，以至于它几乎消失在使用过程中
2. **像人类一样思考**：数据交流应如同人际对话，自然且有洞察力
3. **探索的喜悦**：使用DeepData应该充满发现的惊喜，而非技术的困惑
4. **质感体验**：每个交互都应该感觉恰到好处，每个界面都应该美不胜收
5. **创造不可能**：让普通用户做到以前只有专家才能做到的事情

## 产品三支柱

DeepData基于三个简单而强大的支柱：

1. **对话（Conversation）**
   - 超越文本的会话界面
   - 用自然语言询问任何数据问题
   - 通过语音、手势或文字与数据交流
   - 得到清晰、视觉化、可操作的答案
   - 持续对话，深入探索数据背后的故事

2. **画布（Canvas）**
   - 数据创作空间，超越表格和图表
   - 通过自然手势整理和探索数据元素
   - 创建动态的、交互式的数据故事板
   - 实时看到数据变化的影响
   - 无缝在洞察与细节之间切换

3. **藏品（Collection）**
   - 智能组织数据，无需手动目录管理
   - 自动发现数据间的关系和依赖
   - 学习用户偏好和工作方式
   - 创建安全的个人数据生态系统
   - 无缝连接各种数据源，保持单一真相来源

## 技术栈 🚀

### 核心框架 🏍️

- [Electron 35](https://www.electronjs.org)
- [Vite 6](https://vitejs.dev)
- [React 19](https://reactjs.org)
- [TypeScript 5.8](https://www.typescriptlang.org)

### 界面设计 🎨

- [Tailwind 4](https://tailwindcss.com)
- [Shadcn UI](https://ui.shadcn.com)
- [TanStack Router](https://tanstack.com/router)
- [Lucide](https://lucide.dev) 作为统一图标库
- [Geist](https://vercel.com/font) 作为默认字体

### 开发体验 🛠️

- [ESLint 9](https://eslint.org)
- [Prettier](https://prettier.io)
- [Zod](https://zod.dev)
- [TanStack Query](https://react-query.tanstack.com)
- [React Compiler](https://react.dev/learn/react-compiler)

### 国际化 🌐

- [i18next](https://www.i18next.com)
- 默认支持简体中文和英文

### 测试工具 🧪

- [Vitest](https://vitest.dev)
- [Playwright](https://playwright.dev)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)

### 打包与分发 📦

- [Electron Forge](https://www.electronforge.io)

### CI/CD 🚀

- 预配置的 [GitHub Actions 工作流](https://github.com/LuanRoger/electron-shadcn/blob/main/.github/workflows/testing.yml)，用于自动化测试

## 项目结构

```plaintext
src/
├── assets/          # 存放字体、图片等静态资源
├── components/      # UI 组件
│   ├── template/    # 模板特定组件
│   └── ui/          # shadcn/ui 组件
├── helpers/         # 辅助函数
│   └── ipc/         # IPC 通信相关
├── layouts/         # 页面布局组件
├── localization/    # 国际化相关
├── pages/           # 应用页面
├── routes/          # 路由配置
├── styles/          # 全局样式
├── tests/           # 测试文件
│   ├── e2e/         # Playwright E2E 测试
│   └── unit/        # Vitest 单元测试
└── types/           # 类型定义
```

## 功能模块

### 1. 数据收集
- 支持多种数据源接入（本地文件、API、数据库等）
- 可视化数据导入流程
- 数据格式自动识别与预处理
- 网页爬虫与数据采集工具

### 2. 数据处理
- 提供常用数据清洗、转换、合并、去重等操作
- 支持自定义数据处理脚本
- 内置数据质量检测与修复建议
- 自动格式化为结构化的关系型数据表

### 3. 数据分析
- 支持基础统计分析、可视化分析
- 集成 AI 驱动的数据洞察与预测能力
- 支持多模型对比分析

### 4. 智能助手
- 内置 AI 助手，支持自然语言交互
- 可根据用户需求自动推荐数据处理与分析方案

### 5. 多平台大模型接入
- 支持主流大模型（如 OpenAI、Azure、阿里云、百度等）
- 可配置 API Key 与模型参数
- 支持模型切换与性能对比

### 6. 知识库支持
- 内置知识库模块，支持结构化知识的存储与管理
- 支持知识条目的增删改查、标签分类、全文检索
- 支持与数据助手、智能助手等模块联动

## 开发指南

### 安装依赖

```bash
npm install
```

### 开发模式启动

```bash
npm run start
```

### 添加 shadcn/ui 组件

使用 shadcn/ui 的 latest 版本以确保与 React 19 和 Tailwind v4 的兼容性：

```bash
npx shadcn@latest add [组件名]
```

### 运行测试

```bash
npm run test         # 运行所有单元测试
npm run test:watch   # 监视模式运行测试
npm run test:e2e     # 运行 E2E 测试
npm run test:all     # 运行所有测试
```

> 运行 E2E 测试前，需要先构建应用：`npm run make`

### 打包和发布

```bash
npm run package      # 创建可执行包
npm run make         # 生成平台特定的分发包
npm run publish      # 发布应用
```

## 项目配置特点

- 使用上下文隔离（Context isolation）
- 启用 React Compiler 提高性能
- 使用自定义标题栏 (`titleBarStyle: hidden`)
- 默认使用 Geist 字体
- 内置 React DevTools

## 开发规范

1. **使用 shadcn/ui 组件库**：非必要不要自行创建组件，以保持界面风格统一
2. **图标使用规范**：
   - 强制使用 Lucide 图标库（`lucide-react`）
   - 图标尺寸标准化：
     - 导航和侧边栏图标：`h-5 w-5`
     - 按钮内图标：`h-4 w-4`
     - 表单图标：`h-4 w-4`
     - 对话框和命令面板图标：`h-4 w-4`
3. **多语言支持**：
   - 简体中文作为默认语言
   - 英文作为第二语言
   - 使用 `useTranslation` hook 获取翻译
   - 所有用户界面文案必须支持国际化

## 许可证

本项目基于 MIT 许可证 - 详见 [LICENSE](https://github.com/LuanRoger/electron-shadcn/blob/main/LICENSE) 文件。
