import React, { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { 
  LayoutDashboard, 
  Database, 
  Bot, 
  BookOpen,
  Settings,
  Terminal,
  ChevronRight,
  Layers,
  BarChart3,
  FileCode,
  Brain
} from "lucide-react";
import { cn } from "@/utils/tailwind";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SubMenuItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

interface MenuItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  subMenu?: SubMenuItem[];
  expanded?: boolean;
}

export default function NavigationMenu() {
  const { t } = useTranslation();
  const routerState = useRouterState();
  const [activePath, setActivePath] = useState("/");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { 
      path: "/", 
      label: "workspace", 
      icon: <LayoutDashboard className="h-5 w-5" />,
      expanded: false
    },
    { 
      path: "/data-hub", 
      label: "dataHub", 
      icon: <Database className="h-5 w-5" />,
      expanded: false,
      subMenu: [
        { path: "/data-collect", label: "dataSources", icon: <Layers className="h-4 w-4" /> },
        { path: "/data-process", label: "datasets", icon: <FileCode className="h-4 w-4" /> },
        { path: "/data-analysis", label: "analytics", icon: <BarChart3 className="h-4 w-4" /> }
      ]
    },
    { 
      path: "/ai-toolkit", 
      label: "aiToolkit", 
      icon: <Bot className="h-5 w-5" />,
      expanded: false,
      subMenu: [
        { path: "/ai-assistant", label: "assistant", icon: <Terminal className="h-4 w-4" /> },
        { path: "/ai-models", label: "models", icon: <Brain className="h-4 w-4" /> },
        { path: "/knowledge-base", label: "knowledge", icon: <BookOpen className="h-4 w-4" /> }
      ]
    },
    { 
      path: "/settings", 
      label: "settings", 
      icon: <Settings className="h-5 w-5" />,
      expanded: false
    },
  ]);
  
  useEffect(() => {
    const currentPath = routerState.location.pathname;
    setActivePath(currentPath);
    
    // 展开包含当前路径的子菜单
    setMenuItems(prev => prev.map(item => {
      if (item.subMenu && item.subMenu.some(sub => currentPath === sub.path || currentPath.startsWith(`${sub.path}/`))) {
        return { ...item, expanded: true };
      }
      return item;
    }));
  }, [routerState.location.pathname]);
  
  const isActive = (path: string) => {
    // 确保路径完全匹配或者是子路径
    if (path === "/") {
      return activePath === path;
    }
    return activePath === path || activePath.startsWith(`${path}/`);
  };

  const toggleSubMenu = (index: number) => {
    setMenuItems(prev => prev.map((item, i) => 
      i === index ? { ...item, expanded: !item.expanded } : item
    ));
  };

  return (
    <div className="w-56 bg-card border-r h-full">
      <div className="flex flex-col h-full">
        <div className="p-4">
          <h2 className="font-bold text-2xl">DeepData</h2>
          <p className="text-xs text-muted-foreground">{t("aiDataAssistant")}</p>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-2">
            {menuItems.map((item, index) => {
              const active = isActive(item.path);
              const hasSubMenu = item.subMenu && item.subMenu.length > 0;
              
              return (
                <div key={item.path} className="mb-1">
                  {hasSubMenu ? (
                    <>
                      <Button
                        variant={active ? "default" : "ghost"}
                        className={cn(
                          "w-full justify-between mb-1",
                          active ? "bg-primary/10 text-primary" : "hover:bg-accent hover:text-accent-foreground"
                        )}
                        onClick={() => toggleSubMenu(index)}
                      >
                        <div className="flex items-center">
                          {item.icon}
                          <span className="ml-2">{t(item.label)}</span>
                        </div>
                        <ChevronRight 
                          className={cn("h-4 w-4 transition-transform", 
                            item.expanded ? "rotate-90" : ""
                          )} 
                        />
                      </Button>
                      
                      {item.expanded && item.subMenu && (
                        <div className="ml-4 pl-2 border-l border-border space-y-1 my-1">
                          {item.subMenu.map(subItem => {
                            const subActive = isActive(subItem.path);
                            
                            return (
                              <Button
                                key={subItem.path}
                                variant={subActive ? "default" : "ghost"}
                                className={cn(
                                  "w-full justify-start",
                                  subActive ? "bg-primary text-primary-foreground" : "hover:bg-accent hover:text-accent-foreground"
                                )}
                                asChild
                              >
                                <Link to={subItem.path} activeProps={{ className: "bg-primary text-primary-foreground" }}>
                                  {subItem.icon}
                                  <span className="ml-2">{t(subItem.label)}</span>
                                </Link>
                              </Button>
                            );
                          })}
                        </div>
                      )}
                    </>
                  ) : (
                    <Button
                      variant={active ? "default" : "ghost"}
                      className={cn(
                        "w-full justify-start mb-1",
                        active ? "bg-primary text-primary-foreground" : "hover:bg-accent hover:text-accent-foreground"
                      )}
                      asChild
                    >
                      <Link to={item.path} activeProps={{ className: "bg-primary text-primary-foreground" }}>
                        {item.icon}
                        <span className="ml-2">{t(item.label)}</span>
                      </Link>
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
