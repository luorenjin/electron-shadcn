import { createRoute } from "@tanstack/react-router";
import { RootRoute } from "./__root";
import HomePage from "@/pages/HomePage";
import DataCollectPage from "@/pages/DataCollectPage";
import DataProcessPage from "@/pages/DataProcessPage";
import DataAnalysisPage from "@/pages/DataAnalysisPage";
import AiAssistantPage from "@/pages/AiAssistantPage";
import KnowledgeBasePage from "@/pages/KnowledgeBasePage";
import SettingsPage from "@/pages/SettingsPage";
import DataHubPage from "@/pages/DataHubPage";
import AiToolkitPage from "@/pages/AiToolkitPage";
import AiModelsPage from "@/pages/AiModelsPage";

// 定义 DeepData 应用的所有路由

// 主导航路由
export const HomeRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/",
  component: HomePage,
});

export const DataHubRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/data-hub",
  component: DataHubPage,
});

export const AiToolkitRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/ai-toolkit",
  component: AiToolkitPage,
});

export const SettingsRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/settings",
  component: SettingsPage,
});

// 子导航路由 - 数据中心
export const DataCollectRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/data-collect",
  component: DataCollectPage,
});

export const DataProcessRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/data-process",
  component: DataProcessPage,
});

export const DataAnalysisRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/data-analysis",
  component: DataAnalysisPage,
});

// 子导航路由 - AI 工具箱
export const AiAssistantRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/ai-assistant",
  component: AiAssistantPage,
});

export const AiModelsRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/ai-models", 
  component: AiModelsPage,
});

export const KnowledgeBaseRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/knowledge-base",
  component: KnowledgeBasePage,
});


export const rootTree = RootRoute.addChildren([
  HomeRoute,
  DataHubRoute,
  DataCollectRoute,
  DataProcessRoute,
  DataAnalysisRoute,
  AiToolkitRoute,
  AiAssistantRoute,
  AiModelsRoute,
  KnowledgeBaseRoute,
  SettingsRoute
]);
