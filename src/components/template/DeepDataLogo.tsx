// filepath: d:\Work\AiDev\electron-shadcn\src\components\template\DeepDataLogo.tsx
import React from "react";

interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean; // 添加控制是否显示文字的属性
}

export default function DeepDataLogo({
  size = 32,
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
        {/* 海象侧面轮廓 - 主体 */}
        <path 
          d="M12 32C12 22 18 14 30 14C42 14 52 20 52 32C52 44 42 48 30 48C18 48 12 42 12 32Z" 
          fill="#2563eb" 
        />
        
        {/* 海象侧面头部 */}
        <path 
          d="M40 24C44 24 50 26 50 32C50 38 46 40 40 40C34 40 35 36 35 32C35 28 36 24 40 24Z" 
          fill="#3b82f6" 
        />
        
        {/* 海象长牙 - 突出的特征 */}
        <path 
          d="M38 38L38 50C38 51.1 39.1 52 40 52C40.9 52 42 51.1 42 50L42 38" 
          fill="#f1f5f9" 
          strokeWidth="1"
          stroke="#e2e8f0"
        />
        
        {/* 海象眼睛 */}
        <circle cx="44" cy="28" r="2" fill="#1e293b" />
        
        {/* 海象侧面鼻子 */}
        <ellipse cx="49" cy="32" rx="2" ry="1.5" fill="#1e293b" />
        
        {/* 数据元素点线装饰 */}
        <circle cx="20" cy="24" r="2" fill="#38bdf8" />
        <circle cx="16" cy="32" r="1.5" fill="#38bdf8" />
        <circle cx="20" cy="40" r="1" fill="#38bdf8" />
        
        {/* 数据连接线 */}
        <line x1="20" y1="24" x2="16" y2="32" stroke="#38bdf8" strokeWidth="1" />
        <line x1="16" y1="32" x2="20" y2="40" stroke="#38bdf8" strokeWidth="1" />
      </svg>
      {showText && <span className="font-bold text-lg">DeepData</span>}
    </div>
  );
}