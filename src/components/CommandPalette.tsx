// filepath: d:\Work\AiDev\electron-shadcn\src\components\CommandPalette.tsx
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "@tanstack/react-router";
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

export function CommandPalette() {
  const { t } = useTranslation();
  const router = useRouter();
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

  const navigationCommands = [
    {
      icon: <Database className="mr-2 h-4 w-4" />,
      name: t("dataCollect"),
      shortcut: "D C",
      action: () => router.navigate({ to: "/data-collect" as any }),
    },
    {
      icon: <Terminal className="mr-2 h-4 w-4" />,
      name: t("dataProcess"),
      shortcut: "D P",
      action: () => router.navigate({ to: "/data-process" as any }),
    },
    {
      icon: <LineChart className="mr-2 h-4 w-4" />,
      name: t("dataAnalysis"),
      shortcut: "D A",
      action: () => router.navigate({ to: "/data-analysis" as any }),
    },
    {
      icon: <Bot className="mr-2 h-4 w-4" />,
      name: t("aiAssistant"),
      shortcut: "A I",
      action: () => router.navigate({ to: "/ai-assistant" as any }),
    },
    {
      icon: <BookOpen className="mr-2 h-4 w-4" />,
      name: t("knowledgeBase"),
      shortcut: "K B",
      action: () => router.navigate({ to: "/knowledge-base" as any }),
    },
    {
      icon: <Settings className="mr-2 h-4 w-4" />,
      name: t("settings"),
      shortcut: "S T",
      action: () => router.navigate({ to: "/settings" as any }),
    },
  ];

  const actionCommands = [
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