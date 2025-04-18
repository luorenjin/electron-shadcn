import { createRoute } from "@tanstack/react-router";
import { RootRoute } from "./__root";
import HomePage from "../pages/HomePage";
import SecondPage from "@/pages/SecondPage";
import DataCollectPage from "@/pages/DataCollectPage";
import DataProcessPage from "@/pages/DataProcessPage";
import DataAnalysisPage from "@/pages/DataAnalysisPage";
import AiAssistantPage from "@/pages/AiAssistantPage";
import KnowledgeBasePage from "@/pages/KnowledgeBasePage";
import SettingsPage from "@/pages/SettingsPage";

// 定义 DeepData 应用的所有路由

export const HomeRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/",
  component: HomePage,
});

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

export const AiAssistantRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/ai-assistant",
  component: AiAssistantPage,
});

export const KnowledgeBaseRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/knowledge-base",
  component: KnowledgeBasePage,
});

export const SettingsRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/settings",
  component: SettingsPage,
});

export const SecondPageRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/second-page",
  component: SecondPage,
});

export const rootTree = RootRoute.addChildren([
  HomeRoute, 
  DataCollectRoute,
  DataProcessRoute,
  DataAnalysisRoute,
  AiAssistantRoute,
  KnowledgeBaseRoute,
  SettingsRoute,
  SecondPageRoute
]);
