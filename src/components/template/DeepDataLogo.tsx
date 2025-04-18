// filepath: d:\Work\AiDev\electron-shadcn\src\components\template\DeepDataLogo.tsx
import React from "react";

interface LogoProps {
  size?: number;
  className?: string;
}

export default function DeepDataLogo({ size = 32, className = "" }: LogoProps) {
  return (
    <div className={`inline-flex items-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2"
      >
        {/* 海象身体 - 使用渐变蓝 */}
        <path
          d="M48 24C48 35.046 39.046 44 28 44C16.954 44 8 35.046 8 24C8 12.954 16.954 4 28 4C39.046 4 48 12.954 48 24Z"
          fill="url(#paint0_linear)"
        />
        {/* 海象牙齿 */}
        <path
          d="M24 34C24 36.2091 22.2091 38 20 38C17.7909 38 16 36.2091 16 34V26C16 23.7909 17.7909 22 20 22C22.2091 22 24 23.7909 24 26V34Z"
          fill="#F0F4F8"
        />
        <path
          d="M40 34C40 36.2091 38.2091 38 36 38C33.7909 38 32 36.2091 32 34V26C32 23.7909 33.7909 22 36 22C38.2091 22 40 23.7909 40 26V34Z"
          fill="#F0F4F8"
        />
        {/* 海象眼睛 */}
        <circle cx="22" cy="18" r="3" fill="#2D3748" />
        <circle cx="34" cy="18" r="3" fill="#2D3748" />
        {/* 海象鼻子 */}
        <path
          d="M32 28C32 30.2091 30.2091 32 28 32C25.7909 32 24 30.2091 24 28C24 25.7909 25.7909 24 28 24C30.2091 24 32 25.7909 32 28Z"
          fill="#2D3748"
        />
        {/* 数据元素 */}
        <path
          d="M56 16H48V24H56V16Z"
          fill="#4299E1"
          stroke="#2B6CB0"
          strokeWidth="2"
        />
        <path
          d="M56 28H48V36H56V28Z"
          fill="#4299E1"
          stroke="#2B6CB0"
          strokeWidth="2"
        />
        <path
          d="M56 40H48V48H56V40Z"
          fill="#4299E1"
          stroke="#2B6CB0"
          strokeWidth="2"
        />
        {/* 渐变定义 */}
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="8"
            y1="4"
            x2="48"
            y2="44"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#3182CE" />
            <stop offset="1" stopColor="#2C5282" />
          </linearGradient>
        </defs>
      </svg>
      <span className="font-bold text-lg">DeepData</span>
    </div>
  );
}