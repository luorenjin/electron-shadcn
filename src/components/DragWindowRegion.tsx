import {
  closeWindow,
  maximizeWindow,
  minimizeWindow,
} from "@/helpers/window_helpers";
import React, { type ReactNode, useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { commandPaletteEventBus } from "@/helpers/command-palette-bus";
import { useTranslation } from "react-i18next";

interface DragWindowRegionProps {
  title?: ReactNode;
}

export default function DragWindowRegion({ title }: DragWindowRegionProps) {
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState(false);
  
  // 监听命令面板状态变化，更新搜索框高亮状态
  useEffect(() => {
    const updateSearchHighlight = () => {
      setIsActive(commandPaletteEventBus.open);
    };
    
    const unsubscribe = commandPaletteEventBus.subscribe(updateSearchHighlight);
    
    return () => {
      unsubscribe();
    };
  }, []);
  
  // 使用事件总线来触发命令面板，与快捷键行为一致
  const handleCommandPaletteTrigger = () => {
    // 直接调用 toggle 方法，与快捷键触发的行为保持一致
    commandPaletteEventBus.toggle();
    
    // 添加点击视觉反馈
    setIsActive(true);
    setTimeout(() => {
      setIsActive(commandPaletteEventBus.open);
    }, 200);
  };

  return (
    <div className="flex w-full items-center border-b bg-card">
      <div className="draglayer flex w-full items-center justify-between py-1.5 px-3">
        <div className="flex items-center">
          {title ? (
            <div className="flex select-none items-center">
              <span className="font-medium text-sm">{title}</span>
            </div>
          ) : null}
        </div>
        
        {/* 全局搜索框 */}
        <div className="flex-1 flex justify-center max-w-xl mx-8">
          <Button 
            variant={isActive ? "secondary" : "outline"} 
            className={`relative h-8 w-full justify-start text-sm text-muted-foreground shadow-sm transition-all hover:bg-accent overflow-hidden group ${isActive ? 'ring-2 ring-primary/30' : ''}`}
            onClick={handleCommandPaletteTrigger}
            aria-label={t('openCommandPalette', '打开命令面板')}
            title={t('openCommandPaletteShortcut', '打开命令面板 (⌘K)')}
          >
            <Search className="h-3.5 w-3.5 mr-2 opacity-70" />
            <span className="flex-1 text-left truncate">
              {t('searchCommandsOrFeatures', '搜索命令或功能...')} 
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-70 ml-2">
                {navigator.platform.indexOf('Mac') > -1 ? '⌘K' : 'Ctrl+K'}
              </kbd>
            </span>
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          {/* 这里可以添加通知、用户头像等组件 */}
        </div>
      </div>
      <WindowButtons />
    </div>
  );
}

function WindowButtons() {
  return (
    <div className="flex">
      <button
        title="Minimize"
        type="button"
        className="p-2 hover:bg-slate-300 dark:hover:bg-slate-700"
        onClick={minimizeWindow}
      >
        <svg
          aria-hidden="true"
          role="img"
          width="12"
          height="12"
          viewBox="0 0 12 12"
        >
          <rect fill="currentColor" width="10" height="1" x="1" y="6"></rect>
        </svg>
      </button>
      <button
        title="Maximize"
        type="button"
        className="p-2 hover:bg-slate-300 dark:hover:bg-slate-700"
        onClick={maximizeWindow}
      >
        <svg
          aria-hidden="true"
          role="img"
          width="12"
          height="12"
          viewBox="0 0 12 12"
        >
          <rect
            width="9"
            height="9"
            x="1.5"
            y="1.5"
            fill="none"
            stroke="currentColor"
          ></rect>
        </svg>
      </button>
      <button
        type="button"
        title="Close"
        className="p-2 hover:bg-red-300 dark:hover:bg-red-700"
        onClick={closeWindow}
      >
        <svg
          aria-hidden="true"
          role="img"
          width="12"
          height="12"
          viewBox="0 0 12 12"
        >
          <polygon
            fill="currentColor"
            fillRule="evenodd"
            points="11 1.576 6.583 6 11 10.424 10.424 11 6 6.583 1.576 11 1 10.424 5.417 6 1 1.576 1.576 1 6 5.417 10.424 1"
          ></polygon>
        </svg>
      </button>
    </div>
  );
}
