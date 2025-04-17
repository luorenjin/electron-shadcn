# electron-shadcn 项目 Copilot 指导

## 项目概述

electron-shadcn 是一个预配置的 Electron 桌面应用程序模板，集成了现代化的工具链和 UI 组件库，让开发者能够快速搭建美观、功能完善的桌面应用。

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

使用 shadcn/ui 的 canary 版本以确保与 React 19 和 Tailwind v4 的兼容性：

```bash
npx shadcn@canary add [组件名]
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

1. 确保使用 shadcn/ui 的 canary 版本，以避免与 React 19 和 Tailwind v4 的兼容性问题
2. 开发时使用 TypeScript 类型系统减少运行时错误
3. 使用 Zod 进行数据验证，特别是处理用户输入和外部 API 数据时
4. 测试 E2E 功能前需要先构建应用

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

---

本指导文档根据项目的 README.md 和实际配置创建，旨在帮助开发者更高效地使用此模板进行开发.