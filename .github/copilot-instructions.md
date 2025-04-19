# DeepData 项目 Copilot 指导

## 项目概述

DeepData 是一个预配置的 Electron 桌面应用程序模板，集成了现代化的工具链和 UI 组件库，让开发者能够快速搭建美观、功能完善的桌面应用。本项目将基于此模板开发一款名为 **DeepData** 的 AI 数据助手产品。

DeepData 不仅仅是一款数据工具，它是数据思考的新范式，旨在打破复杂性的围墙，让每个人都能自由探索数据世界的无限可能。它的目标不是创造最强大的数据处理工具，而是创造最优雅的数据体验。

主要技术栈：
- Electron 35 作为桌面应用框架
- React 19 用于构建用户界面
- Vite 6 作为构建工具
- TypeScript 5.8 提供类型支持
- Tailwind CSS 4 用于样式设计
- shadcn/ui 提供预设 UI 组件
- TanStack Router 实现路由管理
- 集成 i18next 实现国际化

## 项目结构指南

```
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

### 目录使用规范

- 新的 UI 组件放置在 `src/components/` 目录下
- 页面组件放置在 `src/pages/` 目录下
- 全局样式定义在 `src/styles/global.css` 中
- IPC 通信相关逻辑添加到 `src/helpers/ipc/` 目录

### 自定义标题栏

项目默认使用自定义标题栏 (`titleBarStyle: hidden`)，可通过 `src/components/DragWindowRegion.tsx` 进行定制。

### 国际化实现

使用 i18next 进行国际化，相关配置在 `src/localization/` 目录：
- 添加新语言在 `langs.ts` 文件中配置
- 使用 `LangToggle` 组件切换语言

## 测试策略

### 单元测试 (Vitest)

```bash
npm run test         # 运行所有单元测试
npm run test:watch   # 监视模式运行测试
```

### E2E 测试 (Playwright)

在运行 E2E 测试前，需要先构建应用：

```bash
npm run make         # 构建应用
npm run test:e2e     # 运行 E2E 测试
```

### CI/CD 流程

项目配置了 GitHub Actions 工作流 (`.github/workflows/testing.yml`)：
- 推送到 main 分支或创建 PR 时自动运行测试
- 单元测试在 Ubuntu 环境运行
- E2E 测试在 Windows 环境运行

## 打包和发布

### 打包应用

```bash
npm run package      # 创建可执行包
npm run make         # 生成平台特定的分发包
npm run publish      # 发布应用
```

## 性能优化建议

1. 使用 React Compiler（默认启用）提高渲染性能
2. 避免在主渲染进程中执行耗时操作
3. 将复杂计算或 I/O 操作放在主进程中，通过 IPC 通信
4. 优化资源加载，特别是图片和字体
5. 合理使用 React Query 进行数据缓存和请求管理

## 注意事项

1. 确保使用 shadcn/ui 的 latest 版本，以避免与 React 19 和 Tailwind v4 的兼容性问题
2. **在编写页面和组件时，必须优先使用 shadcn/ui 组件库，非必要不要自行创建组件**，以保持界面风格统一
3. **图标使用必须遵循以下规范：**
   - **强制使用 Lucide 图标库**（`lucide-react`），保持整个应用的图标风格一致
   - 图标颜色应继承父元素颜色，除非特定场景需要强调
   - 图标尺寸应遵循统一规范：
     - 导航和侧边栏图标：`h-5 w-5`
     - 按钮内图标：`h-4 w-4`
     - 表单图标：`h-4 w-4`
     - 对话框和命令面板图标：`h-4 w-4`
   - 避免使用其他图标库或自定义 SVG，确保视觉语言统一
4. 开发时使用 TypeScript 类型系统减少运行时错误
5. 使用 Zod 进行数据验证，特别是处理用户输入和外部 API 数据时
6. 测试 E2E 功能前需要先构建应用

## 贡献指南

1. 确保代码通过所有测试 (`npm run test:all`)
2. 使用 Prettier 格式化代码 (`npm run format:write`)
3. 遵循 ESLint 规则 (`npm run lint`)
4. 提交前确保应用在目标平台上正常运行

## 国际化功能开发指南

### 添加新语言

1. 在 `src/localization/langs.ts` 文件中按以下顺序添加新语言（简体中文始终放在首位）：
   ```typescript
   export default [
     {
       key: "zh-CN",    // 简体中文始终放在第一位
       nativeName: "简体中文",
       prefix: "🇨🇳",
     },
     {
       key: "en",       // 英文放在第二位
       nativeName: "English",
       prefix: "🇺🇸",
     },
     // 其他语言...
   ]
   ```

2. 在 `src/localization/i18n.ts` 文件中添加对应语言的翻译资源：
   ```typescript
   resources: {
     "zh-CN": {
       translation: {
         // 简体中文翻译内容
       }
     },
     "en": {
       translation: {
         // 英文翻译内容
       }
     },
     // 其他语言...
   }
   ```

### 设置默认语言

1. 在 `src/localization/i18n.ts` 文件中设置默认语言为简体中文：
   ```typescript
   i18n.use(initReactI18next).init({
     fallbackLng: "zh-CN",
     // ...其他配置
   });
   ```

2. 确保 `src/helpers/language_helpers.ts` 中处理首次加载时的默认语言设置：
   ```typescript
   export function updateAppLanguage(i18n: i18n) {
     const localLang = localStorage.getItem(languageLocalStorageKey);
     if (!localLang) {
       // 如果没有保存语言设置，默认使用简体中文
       setAppLanguage("zh-CN", i18n);
       return;
     }
     // ...其他代码
   }
   ```

### 使用国际化功能

1. 在组件中使用 `useTranslation` hook 来获取翻译：
   ```tsx
   import { useTranslation } from "react-i18next";
   
   function MyComponent() {
     const { t } = useTranslation();
     return <h1>{t('titleKey')}</h1>;
   }
   ```

2. 组件中切换语言：
   ```tsx
   import { useTranslation } from "react-i18next";
   import { setAppLanguage } from "../helpers/language_helpers";
   
   function LanguageSwitcher() {
     const { i18n } = useTranslation();
     
     const switchToLanguage = (lang: string) => {
       setAppLanguage(lang, i18n);
     };
     
     // ...组件实现
   }
   ```

## 数据助手功能需求（AI 数据助手 PRD 摘要）

### 设计理念

1. **化繁为简**：真正伟大的工具是如此简单，以至于它几乎消失在使用过程中
2. **像人类一样思考**：数据交流应如同人际对话，自然且有洞察力
3. **探索的喜悦**：使用DeepData应该充满发现的惊喜，而非技术的困惑
4. **质感体验**：每个交互都应该感觉恰到好处，每个界面都应该美不胜收
5. **创造不可能**：让普通用户做到以前只有专家才能做到的事情

### 产品三支柱

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

### 技术标准

技术存在的唯一理由是服务于体验。我们的技术需要：

- **隐形**：用户不应该意识到底层技术的存在
- **即时**：响应必须在100毫秒内完成，创造心灵感应的错觉
- **可靠**：就像开灯开关，每次都能工作
- **适应性**：根据用户环境和习惯自我调整
- **本地优先**：尊重隐私，优先在本地处理数据

### 1. 数据收集
- 支持多种数据源接入（本地文件、API、数据库等）
- 可视化数据导入流程
- 数据格式自动识别与预处理
- 支持集成爬虫工具，实现对网页、API 等互联网数据的自动采集
- 提供爬虫任务配置、调度与结果预览界面
- 支持常见反爬机制处理（如 User-Agent、代理、验证码等）
- 采集结果可直接进入数据处理与格式化流程

### 2. 数据处理
- 提供常用数据清洗、转换、合并、去重等操作
- 支持自定义数据处理脚本（如 Python、SQL）
- 内置数据质量检测与修复建议
- 支持将原始数据（如文本、JSON、Excel、CSV 等）自动格式化为结构化的关系型数据表
- 提供字段映射、类型识别、主键/外键建议等辅助功能
- 支持数据规范化，便于后续保存到关系型数据库（如 MySQL、PostgreSQL 等）
- 可视化字段编辑与表结构预览
- 支持一键导出为 SQL 建表及插入语句

### 3. 数据分析
- 支持基础统计分析、可视化分析
- 集成 AI 驱动的数据洞察与预测能力
- 支持多模型对比分析

### 4. MCP 工具调用
- 可通过统一界面调用 Model Context Protocol (MCP) 工具
- 支持模型上下文管理、推理、微调等操作

### 5. 多平台大模型接入
- 支持主流大模型（如 OpenAI、Azure、阿里云、百度等）
- 可配置 API Key 与模型参数
- 支持模型切换与性能对比

### 6. 智能助手
- 内置 AI 助手，支持自然语言交互
- 可根据用户需求自动推荐数据处理与分析方案

### 7. 权限与安全
- 本地数据优先，保障数据隐私
- 支持多用户权限管理
- 操作日志与数据追溯

### 8. 知识库支持
- 内置知识库模块，支持 FAQ、文档、数据内容等结构化知识的存储与管理
- 支持知识条目的增删改查、标签分类、全文检索
- 支持与数据助手、智能助手等模块联动，实现知识问答、内容推荐等能力
- 支持本地存储，后续可扩展为数据库或云端知识库
- 提供知识库管理界面，支持多语言内容录入与展示

---

本指导文档根据项目的 README.md 和实际配置创建，旨在帮助开发者更高效地使用此模板进行开发.