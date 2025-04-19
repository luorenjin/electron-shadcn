import React, { useState, useEffect } from "react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import langs from "@/localization/langs";
import { useTranslation } from "react-i18next";
import { setAppLanguage } from "@/helpers/language_helpers";

// 添加一个自定义 hook 来监听窗口大小
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // 添加窗口大小变化的监听器
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    
    // 组件卸载时移除监听器
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

export default function LangToggle() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const { width } = useWindowSize();
  
  // 根据窗口宽度确定布局方式，这里设置了一个阈值，可以根据实际情况调整
  const isCompactView = width < 600;

  function onValueChange(value: string) {
    setAppLanguage(value, i18n);
  }

  // 在窗口较小时使用下拉菜单形式
  if (isCompactView) {
    return (
      <Select value={currentLang} onValueChange={onValueChange}>
        <SelectTrigger className="w-[120px]">
          <SelectValue>
            {langs.find(lang => lang.key === currentLang)?.prefix} {langs.find(lang => lang.key === currentLang)?.nativeName}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {langs.map((lang) => (
            <SelectItem key={lang.key} value={lang.key}>
              {`${lang.prefix} ${lang.nativeName}`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  // 在窗口较大时使用原来的 ToggleGroup 形式
  return (
    <ToggleGroup
      type="single"
      onValueChange={onValueChange}
      value={currentLang}
      className="flex flex-wrap gap-1"
    >
      {langs.map((lang) => (
        <ToggleGroupItem key={lang.key} value={lang.key}>
          {`${lang.prefix} ${lang.nativeName}`}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
