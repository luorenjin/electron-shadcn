import { exposeThemeContext } from "./theme/theme-context";
import { exposeWindowContext } from "./window/window-context";
import { exposeDebugContext } from "./debug/debug-context";

export default function exposeContexts() {
  exposeWindowContext();
  exposeThemeContext();
  exposeDebugContext();
}
