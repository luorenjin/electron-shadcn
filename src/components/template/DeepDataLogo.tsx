// filepath: d:\Work\AiDev\electron-shadcn\src\components\template\DeepDataLogo.tsx
import React from "react";

interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean; // 添加控制是否显示文字的属性
}

export default function DeepDataLogo({
  size = 64,
  className = "",
  showText = true // 默认显示文字
}: LogoProps) {
  return (
    <div className={`inline-flex items-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={showText ? "mr-2" : ""}
        aria-label="DeepData Logo"
      >
        {/* 海象侧面轮廓 - 主体，苗条的身体 */}
        <path 
          d="M48 36C48 28 44 20 34 20C24 20 16 26 16 36C16 46 24 50 34 50C44 50 48 44 48 36Z" 
          fill="#2563eb" 
        />
        
        {/* 海象头部 - 自然地扭头看向用户 */}
        <path 
          d="M26 20C22 20 14 22 13 27C12 32 14 36 19 36C24 36 27 33 28 30C29 27 30 20 26 20Z" 
          fill="#3b82f6" 
        />
        
        {/* 海象长牙 - 从头部自然延伸 */}
        <path 
          d="M16 30L13 37C12.5 38 13 39 13.5 39.5C14 40 15 40.2 16 39.5L19 33" 
          fill="#f1f5f9" 
          strokeWidth="1"
          stroke="#e2e8f0"
        />
        
        {/* 海象眼睛 - 注视用户 */}
        <circle cx="18" cy="26" r="1.5" fill="#1e293b" />
        
        {/* 海象侧面鼻子 */}
        <ellipse cx="15" cy="30" rx="1.5" ry="1" fill="#1e293b" />
        
        {/* 数据元素点线装饰，形成数据流网络 */}
        <circle cx="38" cy="22" r="2" fill="#38bdf8" />
        <circle cx="44" cy="28" r="1.5" fill="#38bdf8" />
        <circle cx="42" cy="36" r="1.5" fill="#38bdf8" />
        <circle cx="36" cy="44" r="1" fill="#38bdf8" />
        <circle cx="28" cy="48" r="1" fill="#38bdf8" />
        
        {/* 数据连接线，形成流动感 */}
        <line x1="38" y1="22" x2="44" y2="28" stroke="#38bdf8" strokeWidth="1" />
        <line x1="44" y1="28" x2="42" y2="36" stroke="#38bdf8" strokeWidth="1" />
        <line x1="42" y1="36" x2="36" y2="44" stroke="#38bdf8" strokeWidth="1" />
        <line x1="36" y1="44" x2="28" y2="48" stroke="#38bdf8" strokeWidth="1" />
      </svg>
      {showText && <span className="font-bold text-lg">DeepData</span>}
    </div>
  );
}