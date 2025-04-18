import React from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { 
  LayoutDashboard, 
  Database, 
  LineChart, 
  Bot, 
  Terminal, 
  BookOpen,
  Settings
} from "lucide-react";

export default function NavigationMenu() {
  const { t } = useTranslation();
  const router = useRouter();
  
  const isActive = (path: string) => router.state.location.pathname === path;

  const menuItems = [
    { path: "/", label: "dashboard", icon: <LayoutDashboard className="mr-2 h-5 w-5" /> },
    { path: "/data-collect", label: "dataCollect", icon: <Database className="mr-2 h-5 w-5" /> },
    { path: "/data-process", label: "dataProcess", icon: <Terminal className="mr-2 h-5 w-5" /> },
    { path: "/data-analysis", label: "dataAnalysis", icon: <LineChart className="mr-2 h-5 w-5" /> },
    { path: "/ai-assistant", label: "aiAssistant", icon: <Bot className="mr-2 h-5 w-5" /> },
    { path: "/knowledge-base", label: "knowledgeBase", icon: <BookOpen className="mr-2 h-5 w-5" /> },
    { path: "/settings", label: "settings", icon: <Settings className="mr-2 h-5 w-5" /> },
  ];

  return (
    <nav className="w-56 bg-card text-card-foreground border-r h-full overflow-y-auto py-4 px-2">
      <div className="mb-6 px-4">
        <h2 className="font-bold text-2xl">DeepData</h2>
        <p className="text-xs text-muted-foreground">{t("aiDataAssistant")}</p>
      </div>
      
      <ul className="space-y-1">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link to={item.path} className={`flex items-center px-4 py-2 rounded-md transition-colors ${
              isActive(item.path) 
                ? 'bg-primary text-primary-foreground' 
                : 'hover:bg-accent hover:text-accent-foreground'
            }`}>
              {item.icon}
              <span>{t(item.label)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
