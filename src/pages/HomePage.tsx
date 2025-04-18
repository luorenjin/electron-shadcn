import React from "react";
import { useTranslation } from "react-i18next";
import { 
  Database, 
  LineChart, 
  Bot, 
  BookOpen, 
  ArrowRight, 
  Layers,
  Activity
} from "lucide-react";
import { Link } from "@tanstack/react-router";

export default function HomePage() {
  const { t } = useTranslation();

  // 定义功能卡片数据
  const featureCards = [
    {
      title: "dataCollect",
      description: "dataCollectDesc",
      icon: <Database className="h-8 w-8" />,
      path: "/data-collect",
      color: "bg-blue-100 dark:bg-blue-900"
    },
    {
      title: "dataProcess",
      description: "dataProcessDesc",
      icon: <Layers className="h-8 w-8" />,
      path: "/data-process",
      color: "bg-green-100 dark:bg-green-900"
    },
    {
      title: "dataAnalysis",
      description: "dataAnalysisDesc",
      icon: <LineChart className="h-8 w-8" />,
      path: "/data-analysis",
      color: "bg-purple-100 dark:bg-purple-900"
    },
    {
      title: "aiAssistant",
      description: "aiAssistantDesc",
      icon: <Bot className="h-8 w-8" />,
      path: "/ai-assistant",
      color: "bg-amber-100 dark:bg-amber-900"
    },
    {
      title: "knowledgeBase",
      description: "knowledgeBaseDesc",
      icon: <BookOpen className="h-8 w-8" />,
      path: "/knowledge-base",
      color: "bg-rose-100 dark:bg-rose-900"
    }
  ];

  // 定义统计卡片数据
  const statsCards = [
    {
      title: "totalDataSources",
      value: "0",
      icon: <Database className="h-5 w-5" />,
      change: "+0%",
      changeType: "neutral" // 可选值: positive, negative, neutral
    },
    {
      title: "processedDatasets",
      value: "0",
      icon: <Layers className="h-5 w-5" />,
      change: "+0%",
      changeType: "neutral"
    },
    {
      title: "aiInteractions",
      value: "0",
      icon: <Bot className="h-5 w-5" />,
      change: "+0%",
      changeType: "neutral"
    },
    {
      title: "systemActivity",
      value: t("normal"),
      icon: <Activity className="h-5 w-5" />,
      change: "",
      changeType: "positive"
    }
  ];

  return (
    <div className="space-y-6">
      {/* 欢迎区域 */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t("welcomeMessage")}</h1>
        <p className="text-muted-foreground">{t("dashboardDescription")}</p>
      </div>
      
      {/* 统计卡片区域 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((card, index) => (
          <div key={index} className="bg-card rounded-lg border p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">{t(card.title)}</p>
              <div className="bg-primary/10 p-2 rounded-full">
                {card.icon}
              </div>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold">{card.value}</p>
              {card.change && (
                <p className={`text-xs ${
                  card.changeType === 'positive' ? 'text-green-500' :
                  card.changeType === 'negative' ? 'text-red-500' : 'text-muted-foreground'
                }`}>
                  {card.change}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* 功能卡片区域 */}
      <div>
        <h2 className="text-xl font-semibold mb-4">{t("features")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featureCards.map((card, index) => (
            <Link 
              key={index} 
              to={card.path}
              className="group flex flex-col bg-card rounded-lg border shadow-sm hover:shadow-md transition-all overflow-hidden"
            >
              <div className={`p-6 ${card.color}`}>
                <div className="h-12 w-12 rounded-full bg-white/90 dark:bg-gray-800/90 flex items-center justify-center">
                  {card.icon}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold mb-2">{t(card.title)}</h3>
                <p className="text-sm text-muted-foreground flex-1">{t(card.description)}</p>
                <div className="mt-4 flex items-center text-sm font-medium text-primary">
                  <span className="mr-1">{t("explore")}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* 快速提示区域 */}
      <div className="bg-card border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">{t("quickTips")}</h2>
        <ul className="space-y-2 list-disc list-inside text-sm">
          <li>{t("quickTip1")}</li>
          <li>{t("quickTip2")}</li>
          <li>{t("quickTip3")}</li>
        </ul>
      </div>
    </div>
  );
}
