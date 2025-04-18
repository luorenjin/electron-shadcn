// filepath: d:\Work\AiDev\electron-shadcn\src\pages\SettingsPage.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import ToggleTheme from "@/components/ToggleTheme";
import LangToggle from "@/components/LangToggle";
import DebugModeToggle from "@/components/DebugModeToggle";

export default function SettingsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("settings")}</h1>
        <p className="text-muted-foreground">{t("settingsDesc")}</p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-medium mb-4">{t("appearance")}</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">{t("theme")}</p>
              <ToggleTheme />
            </div>
          </div>
        </div>
        
        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-medium mb-4">{t("language")}</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">{t("selectLanguage")}</p>
              <LangToggle />
            </div>
          </div>
        </div>
        
        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-medium mb-4">{t("developer", "开发者选项")}</h3>
          <div className="space-y-4">
            <DebugModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}