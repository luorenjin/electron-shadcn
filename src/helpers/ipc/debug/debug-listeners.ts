// 调试模式监听器
// 用于注册主进程中处理调试相关事件的监听器

import { BrowserWindow, ipcMain } from "electron";
import { DEBUG_TOGGLE_DEV_TOOLS } from "./debug-channels";
import { toggleDevTools } from "./debug-context";

/**
 * 注册调试相关的事件监听器
 * @param window 主窗口实例
 */
export function registerDebugListeners(window: BrowserWindow): void {
  // 监听开发者工具控制命令
  ipcMain.on(DEBUG_TOGGLE_DEV_TOOLS, (_event, show: boolean) => {
    toggleDevTools(window, show);
  });
}