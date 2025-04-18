// filepath: d:\Work\AiDev\electron-shadcn\src\pages\AiAssistantPage.tsx
import React from "react";
import { useTranslation } from "react-i18next";

export default function AiAssistantPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("aiAssistant")}</h1>
        <p className="text-muted-foreground">{t("aiAssistantDesc")}</p>
      </div>
      
      <div className="flex items-center justify-center p-20 border rounded-lg">
        <p className="text-muted-foreground">{t("pageUnderConstruction")}</p>
      </div>
    </div>
  );
}