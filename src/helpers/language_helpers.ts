import type { i18n } from "i18next";

const languageLocalStorageKey = "lang";

export function setAppLanguage(lang: string, i18n: i18n) {
  localStorage.setItem(languageLocalStorageKey, lang);
  i18n.changeLanguage(lang);
  document.documentElement.lang = lang;
}

export function updateAppLanguage(i18n: i18n) {
  const localLang = localStorage.getItem(languageLocalStorageKey);
  if (!localLang) {
    // 如果没有保存语言设置，默认使用简体中文
    setAppLanguage("zh-CN", i18n);
    return;
  }

  i18n.changeLanguage(localLang);
  document.documentElement.lang = localLang;
}
