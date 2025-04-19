import React from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { 
  LayoutDashboard, 
  Database, 
  MessageSquare, 
  BookOpen,
  Settings,
  Layers,
  BarChart3,
  FileCode,
  PanelLeft,
  X
} from "lucide-react";
import { cn } from "@/utils/tailwind";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import DeepDataLogo from "./DeepDataLogo";

interface MenuItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  description?: string;
  pillText?: string;
  isNew?: boolean;
}

// 重新定义导航菜单项，按照三大支柱进行组织
const CORE_MENU: MenuItem[] = [
  { 
    path: "/", 
    label: "workspace", 
    icon: <LayoutDashboard className="h-5 w-5" />,
    description: "overview"
  },
  { 
    path: "/ai-assistant", 
    label: "conversation", 
    icon: <MessageSquare className="h-5 w-5" />,
    description: "askAnything"
  },
  { 
    path: "/data-analysis", 
    label: "canvas", 
    icon: <BarChart3 className="h-5 w-5" />,
    description: "dataCreationSpace"
  },
  { 
    path: "/data-hub", 
    label: "collection", 
    icon: <Database className="h-5 w-5" />,
    description: "dataLibrary"
  }
];

const TOOL_MENU: MenuItem[] = [
  { 
    path: "/data-collect", 
    label: "dataSources", 
    icon: <Layers className="h-5 w-5" />,
    description: "connectData"
  },
  { 
    path: "/data-process", 
    label: "datasets", 
    icon: <FileCode className="h-5 w-5" />,
    description: "processData"
  },
  { 
    path: "/knowledge-base", 
    label: "knowledge", 
    icon: <BookOpen className="h-5 w-5" />,
    description: "knowledgeBase"
  },
  { 
    path: "/settings", 
    label: "settings", 
    icon: <Settings className="h-5 w-5" />,
    description: "appSettings"
  },
];

export default function NavigationMenu() {
  const { t } = useTranslation();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  
  return (
    <motion.div 
      className="w-64 bg-background/95 backdrop-blur-sm border-r h-full shadow-lg flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <DeepDataLogo className="h-8 w-8 mr-2" />
          <h2 className="font-bold text-xl">DeepData</h2>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full">
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4">
          {/* 核心功能区 - 三大支柱 */}
          <div className="mb-6">
            <h3 className="text-xs font-medium text-muted-foreground mb-2 px-2">{t('coreFeatures')}</h3>
            <div className="space-y-1">
              {CORE_MENU.map((item) => {
                const isActive = currentPath === item.path;
                
                return (
                  <Button
                    key={item.path}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start",
                      isActive ? "bg-primary/10 text-primary font-medium" : "hover:bg-accent hover:text-accent-foreground",
                      "px-2 py-5 h-auto"
                    )}
                    asChild
                  >
                    <Link to={item.path}>
                      <div className="flex flex-col items-start">
                        <div className="flex items-center">
                          {item.icon}
                          <span className="ml-2 text-base">{t(item.label)}</span>
                          {item.isNew && (
                            <Badge className="ml-2" variant="outline">NEW</Badge>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground mt-1 ml-7">
                          {t(item.description || '')}
                        </span>
                      </div>
                    </Link>
                  </Button>
                );
              })}
            </div>
          </div>
          
          {/* 工具与设置区 */}
          <div>
            <h3 className="text-xs font-medium text-muted-foreground mb-2 px-2">{t('toolsAndSettings')}</h3>
            <div className="space-y-1">
              {TOOL_MENU.map((item) => {
                const isActive = currentPath === item.path;
                
                return (
                  <Button
                    key={item.path}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start",
                      isActive ? "bg-primary/10 text-primary" : "hover:bg-accent hover:text-accent-foreground"
                    )}
                    asChild
                  >
                    <Link to={item.path}>
                      {item.icon}
                      <span className="ml-2">{t(item.label)}</span>
                      {item.pillText && (
                        <Badge variant="outline" className="ml-auto">
                          {item.pillText}
                        </Badge>
                      )}
                    </Link>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </ScrollArea>
      
      {/* 底部状态区 */}
      <div className="p-4 border-t bg-muted/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
            <span className="text-xs text-muted-foreground">{t('connected')}</span>
          </div>
          <Button variant="outline" size="sm" className="h-7 px-2">
            <PanelLeft className="h-3 w-3 mr-1" />
            <span className="text-xs">{t('minimize')}</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
