// 调试模式上下文
// 提供调试相关的操作

import { BrowserWindow, contextBridge, ipcRenderer } from "electron";
import { DEBUG_TOGGLE_DEV_TOOLS } from "./debug-channels";

/**
 * 控制开发者工具的显示/隐藏
 * @param window 目标窗口
 * @param show 是否显示开发者工具
 */
export function toggleDevTools(window: BrowserWindow, show: boolean): void {
  try {
    // 如果要显示开发者工具
    if (show) {
      // 如果开发者工具尚未打开
      if (!window.webContents.isDevToolsOpened()) {
        // 以独立模式打开开发者工具
        window.webContents.openDevTools({ mode: 'detach' });
        console.log('已打开开发者工具（独立窗口模式）');
      } else if (!window.webContents.devToolsWebContents?.isFocused()) {
        // 如果开发者工具已经打开但未获得焦点，则聚焦到开发者工具
        window.webContents.devToolsWebContents?.focus();
        console.log('开发者工具已聚焦');
      }
    } 
    // 如果要关闭开发者工具
    else if (!show && window.webContents.isDevToolsOpened()) {
      window.webContents.closeDevTools();
      console.log('已关闭开发者工具');
    }
  } catch (error) {
    console.error('控制开发者工具时出错:', error);
  }
}

// 暴露给渲染进程的调试上下文
export const debugContext = {
  [DEBUG_TOGGLE_DEV_TOOLS]: toggleDevTools,
};

/**
 * 将调试上下文暴露给渲染进程
 */
export function exposeDebugContext(): void {
  contextBridge.exposeInMainWorld('electronDebug', {
    toggleDevTools: (show: boolean) => ipcRenderer.send(DEBUG_TOGGLE_DEV_TOOLS, show),
  });
}