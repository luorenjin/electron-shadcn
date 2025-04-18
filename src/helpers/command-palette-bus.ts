// 使用一个全局事件发布订阅系统来替代 Context API
// 这样可以避免跨 Electron 进程/渲染器上下文的问题

// 创建一个简单的事件总线
const commandPaletteEventBus = {
  open: false,
  listeners: new Set<() => void>(),
  
  toggle() {
    try {
      this.open = !this.open;
      console.log(`[CommandPalette] 切换命令面板状态: ${this.open ? '打开' : '关闭'}`);
      this.notify();
    } catch (error) {
      console.error('[CommandPalette] 切换命令面板时发生错误:', error);
    }
  },
  
  setOpen(value: boolean) {
    try {
      if (this.open !== value) {
        this.open = value;
        console.log(`[CommandPalette] 设置命令面板状态: ${value ? '打开' : '关闭'}`);
        this.notify();
      }
    } catch (error) {
      console.error('[CommandPalette] 设置命令面板状态时发生错误:', error);
    }
  },
  
  subscribe(callback: () => void) {
    try {
      this.listeners.add(callback);
      console.log('[CommandPalette] 新的监听器已添加');
      return () => {
        this.listeners.delete(callback);
        console.log('[CommandPalette] 监听器已移除');
      };
    } catch (error) {
      console.error('[CommandPalette] 添加监听器时发生错误:', error);
      return () => {};
    }
  },
  
  notify() {
    try {
      console.log(`[CommandPalette] 通知 ${this.listeners.size} 个监听器状态变更`);
      this.listeners.forEach(callback => callback());
    } catch (error) {
      console.error('[CommandPalette] 通知监听器时发生错误:', error);
    }
  }
};

export { commandPaletteEventBus };