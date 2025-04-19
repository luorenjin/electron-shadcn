// filepath: d:\Work\AiDev\electron-shadcn\src\components\CommandPalette.tsx
import React, { useEffect, useState, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import {
  Database,
  LineChart,
  Settings,
  Bot,
  Terminal,
  BookOpen,
  FileText,
  Filter,
  HelpCircle,
  RefreshCw,
  Save,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { commandPaletteEventBus } from "@/helpers/command-palette-bus";
import { router } from "@/routes/router";

// 定义应用路由路径类型，确保类型安全
type AppRoutePath = 
  | "/"
  | "/data-collect"
  | "/data-process" 
  | "/data-analysis"
  | "/ai-assistant"
  | "/knowledge-base"
  | "/settings"
  | "/second-page";

// 定义命令项类型
interface CommandItem {
  icon: ReactElement;
  name: string;
  shortcut: string;
  action: () => void;
}

export function CommandPalette() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const updateState = () => {
      setOpen(commandPaletteEventBus.open);
    };

    const unsubscribe = commandPaletteEventBus.subscribe(updateState);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        commandPaletteEventBus.toggle();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      unsubscribe();
    };
  }, []);

  const handleOpenChange = (value: boolean) => {
    if (commandPaletteEventBus.open !== value) {
      commandPaletteEventBus.setOpen(value);
    }
  };

  const runCommand = React.useCallback((command: () => void) => {
    commandPaletteEventBus.setOpen(false);
    command();
  }, []);

  // 定义一个与路由无关的导航函数
  const navigateTo = (path: AppRoutePath) => {
    router.navigate({ to: path });
  };

  const navigationCommands: CommandItem[] = [
    {
      icon: <Database className="mr-2 h-4 w-4" />,
      name: t("dataCollect"),
      shortcut: "D C",
      action: () => navigateTo("/data-collect"),
    },
    {
      icon: <Terminal className="mr-2 h-4 w-4" />,
      name: t("dataProcess"),
      shortcut: "D P",
      action: () => navigateTo("/data-process"),
    },
    {
      icon: <LineChart className="mr-2 h-4 w-4" />,
      name: t("dataAnalysis"),
      shortcut: "D A",
      action: () => navigateTo("/data-analysis"),
    },
    {
      icon: <Bot className="mr-2 h-4 w-4" />,
      name: t("aiAssistant"),
      shortcut: "A I",
      action: () => navigateTo("/ai-assistant"),
    },
    {
      icon: <BookOpen className="mr-2 h-4 w-4" />,
      name: t("knowledgeBase"),
      shortcut: "K B",
      action: () => navigateTo("/knowledge-base"),
    },
    {
      icon: <Settings className="mr-2 h-4 w-4" />,
      name: t("settings"),
      shortcut: "S T",
      action: () => navigateTo("/settings"),
    },
  ];

  const actionCommands: CommandItem[] = [
    {
      icon: <FileText className="mr-2 h-4 w-4" />,
      name: t("newProject"),
      shortcut: "N P",
      action: () => console.log("New project"),
    },
    {
      icon: <Filter className="mr-2 h-4 w-4" />,
      name: t("filterData"),
      shortcut: "F D",
      action: () => console.log("Filter data"),
    },
    {
      icon: <Save className="mr-2 h-4 w-4" />,
      name: t("saveWorkspace"),
      shortcut: "⌘S",
      action: () => console.log("Save workspace"),
    },
    {
      icon: <RefreshCw className="mr-2 h-4 w-4" />,
      name: t("refreshData"),
      shortcut: "⌘R",
      action: () => console.log("Refresh data"),
    },
  ];

  return (
    <CommandDialog
      open={open}
      onOpenChange={handleOpenChange}
      className="z-[100]" // 确保命令面板显示在最上层
    >
      <CommandInput placeholder={t("commandPalettePlaceholder")} autoFocus />
      <CommandList className="max-h-[60vh]">
        <CommandEmpty>{t("noResultsFound")}</CommandEmpty>
        <CommandGroup heading={t("navigation")}>
          {navigationCommands.map((command) => (
            <CommandItem
              key={command.name}
              onSelect={() => runCommand(command.action)}
              className="flex items-center"
            >
              {command.icon}
              <span>{command.name}</span>
              {command.shortcut && (
                <CommandShortcut>{command.shortcut}</CommandShortcut>
              )}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading={t("actions")}>
          {actionCommands.map((command) => (
            <CommandItem
              key={command.name}
              onSelect={() => runCommand(command.action)}
              className="flex items-center"
            >
              {command.icon}
              <span>{command.name}</span>
              {command.shortcut && (
                <CommandShortcut>{command.shortcut}</CommandShortcut>
              )}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading={t("help")}>
          <CommandItem
            onSelect={() => runCommand(() => console.log("Open documentation"))}
          >
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>{t("documentation")}</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}