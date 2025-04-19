import React, { useState } from "react";
import DragWindowRegion from "@/components/DragWindowRegion";
import NavigationMenu from "@/components/template/NavigationMenu";
import Footer from "@/components/template/Footer";
import { useLocation } from "@tanstack/react-router";
import { cn } from "@/utils/tailwind";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  const [showNav, setShowNav] = useState(false);
  
  // 根据页面路径决定背景色和导航可见性
  const isConversationMode = location.pathname === "/ai-assistant";
  const isCanvasMode = location.pathname === "/data-analysis";
  const isCollectionMode = ["/data-hub", "/data-collect", "/data-process"].includes(location.pathname);

  return (
    <div className={cn(
      "flex flex-col h-screen transition-colors duration-500",
      isConversationMode && "bg-slate-50 dark:bg-slate-950",
      isCanvasMode && "bg-slate-100 dark:bg-slate-900",
      isCollectionMode && "bg-slate-200 dark:bg-slate-800",
    )}>
      <DragWindowRegion title="DeepData" />
      
      <div className="flex flex-1 overflow-hidden">
        {/* 浮动菜单按钮 */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-12 left-4 z-50 rounded-full bg-background/80 backdrop-blur-sm shadow-md hover:bg-background"
          onClick={() => setShowNav(!showNav)}
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        {/* 使用AnimatePresence实现菜单动画 */}
        <AnimatePresence>
          {showNav && (
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute top-12 left-0 z-40 h-[calc(100%-48px)]"
            >
              <NavigationMenu />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* 主内容区域 */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
      
      <Footer />
    </div>
  );
}
