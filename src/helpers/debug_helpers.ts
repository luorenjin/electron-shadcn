// 调试模式助手函数
// 提供全局调试模式的设置和获取功能

const debugModeKey = 'deepdata-debug-mode';

// 用于过滤的已知无害错误模式
const knownHarmlessErrors = [
  /Autofill\.enable.*wasn't found/i,
  /Autofill\.setAddresses.*wasn't found/i,
  /sandboxed_renderer\.bundle\.js script failed to run/i
];

/**
 * 设置调试模式状态
 * @param enabled 是否启用调试模式
 */
export function setDebugMode(enabled: boolean): void {
  localStorage.setItem(debugModeKey, String(enabled));
  
  // 使用事件通知系统其他部分调试模式状态变化
  window.dispatchEvent(new CustomEvent('debug-mode-changed', { 
    detail: { enabled } 
  }));
  
  // 如果开启调试模式，在控制台输出提示信息
  if (enabled) {
    console.info('🐛 调试模式已开启');
    setupErrorFilters();
  } else {
    console.info('🔒 调试模式已关闭');
  }
  
  // 控制开发者工具的显示/隐藏
  if (window.electronDebug) {
    // 开启调试模式，直接打开开发者工具
    if (enabled) {
      window.electronDebug.toggleDevTools(true);
    } 
    // 关闭调试模式时，延迟一点时间再关闭开发者工具，以便用户能看到关闭提示
    else {
      // 使用较长的延迟，确保不会与窗口最大化操作冲突
      setTimeout(() => {
        // 再次检查调试模式是否关闭，避免用户在延迟期间又重新开启
        if (!getDebugMode()) {
          window.electronDebug.toggleDevTools(false);
        }
      }, 1500);
    }
  }
}

// 定义控制台参数类型
type ConsoleArgument = string | number | boolean | object | null | undefined;

/**
 * 设置错误过滤器，减少不必要的警告干扰
 */
function setupErrorFilters(): void {
  // 保存原始的 console.error 方法
  const originalConsoleError = console.error;
  
  // 重写 console.error 方法，过滤已知的无害错误
  console.error = function(...args: ConsoleArgument[]) {
    // 检查错误消息是否匹配已知的无害错误模式
    if (args.length > 0 && typeof args[0] === 'string') {
      for (const pattern of knownHarmlessErrors) {
        if (pattern.test(args[0])) {
          // 将已知的无害错误降级为调试级别日志
          console.debug('🔍 [已过滤警告]', ...args);
          return; // 不再调用原始的 console.error
        }
      }
    }
    
    // 对于其他错误，仍然使用原始的 console.error 方法
    originalConsoleError.apply(console, args);
  };
  
  debugLog('已设置错误过滤器，已知无害错误将被降级为调试日志');
}

/**
 * 获取当前调试模式状态
 * @returns 当前是否启用调试模式
 */
export function getDebugMode(): boolean {
  return localStorage.getItem(debugModeKey) === 'true';
}

/**
 * 调试日志函数，仅在调试模式下输出日志
 */
export function debugLog(...args: ConsoleArgument[]): void {
  if (getDebugMode()) {
    console.log('🐛 [DEBUG]', ...args);
  }
}

/**
 * 调试警告，仅在调试模式下输出警告
 */
export function debugWarn(...args: ConsoleArgument[]): void {
  if (getDebugMode()) {
    console.warn('⚠️ [DEBUG]', ...args);
  }
}

/**
 * 调试错误，仅在调试模式下输出错误
 */
export function debugError(...args: ConsoleArgument[]): void {
  if (getDebugMode()) {
    console.error('❌ [DEBUG]', ...args);
  }
}

/**
 * 在应用启动时检查调试模式状态，如果开启则自动打开开发者工具
 */
export function initDebugMode(): void {
  if (getDebugMode()) {
    // 设置错误过滤器
    setupErrorFilters();
    
    if (window.electronDebug) {
      // 延迟一点时间再打开开发者工具，避免与应用启动时的其他操作冲突
      setTimeout(() => {
        // 再次检查调试模式是否开启
        if (getDebugMode()) {
          window.electronDebug.toggleDevTools(true);
        }
      }, 1000);
    }
  }
}