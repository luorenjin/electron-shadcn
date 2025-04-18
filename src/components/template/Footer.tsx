import React from "react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t py-2 px-4 flex justify-between items-center text-sm text-muted-foreground">
      <p>© {currentYear} DeepData {t("aiDataAssistant")}</p>
      <div className="flex items-center gap-2">
        <span>Powered by Electron 35 + React 19</span>
      </div>
    </footer>
  );
}
