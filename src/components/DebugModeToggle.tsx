import React, { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { getDebugMode, setDebugMode } from "@/helpers/debug_helpers";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";

export default function DebugModeToggle() {
  const { t } = useTranslation();
  const [isDebugMode, setIsDebugMode] = useState<boolean>(getDebugMode());

  // 同步本地存储中的调试模式状态
  useEffect(() => {
    setIsDebugMode(getDebugMode());
    
    // 监听调试模式变化事件
    const handleDebugModeChange = (event: CustomEvent) => {
      setIsDebugMode(event.detail?.enabled || false);
    };
    
    window.addEventListener('debug-mode-changed', handleDebugModeChange as EventListener);
    
    return () => {
      window.removeEventListener('debug-mode-changed', handleDebugModeChange as EventListener);
    };
  }, []);

  // 切换调试模式
  const toggleDebugMode = (checked: boolean) => {
    setDebugMode(checked);
  };

  return (
    <div className="flex items-center justify-between space-y-0">
      <div className="flex flex-col space-y-1">
        <Label htmlFor="debug-mode-toggle">{t("debugMode", "调试模式")}</Label>
        <p className="text-sm text-muted-foreground">
          {t("debugModeDesc", "开启后将显示详细调试信息和日志")}
        </p>
      </div>
      <Switch
        id="debug-mode-toggle"
        checked={isDebugMode}
        onCheckedChange={toggleDebugMode}
        aria-label={t("debugMode", "调试模式")}
      />
    </div>
  );
}