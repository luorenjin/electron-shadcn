import { createMemoryHistory, createRouter } from "@tanstack/react-router";
import { rootTree } from "./routes";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const history = createMemoryHistory({
  initialEntries: ["/ai-assistant"],  // 将初始路由修改为对话页面
});
export const router = createRouter({ routeTree: rootTree, history: history });
