import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  fallbackLng: "zh-CN",
  resources: {
    en: {
      translation: {
        appName: "electron-shadcn",
        titleHomePage: "Home Page",
        titleSecondPage: "Second Page",
      },
    },
    "pt-BR": {
      translation: {
        appName: "electron-shadcn",
        titleHomePage: "Página Inicial",
        titleSecondPage: "Segunda Página",
      },
    },
    "zh-CN": {
      translation: {
        appName: "electron-shadcn",
        titleHomePage: "首页",
        titleSecondPage: "第二页",
      },
    },
    "zh-TW": {
      translation: {
        appName: "electron-shadcn",
        titleHomePage: "首頁",
        titleSecondPage: "第二頁",
      },
    },
  },
});
