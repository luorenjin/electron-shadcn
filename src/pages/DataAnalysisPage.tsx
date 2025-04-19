import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/utils/tailwind";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart3,
  PieChart,
  LineChart,
  LayoutGrid,
  LayoutList,
  Plus,
  Download,
  Save,
  Type,
  Table,
  Grip,
  Image,
  Undo,
  Redo,
  Share2,
  Maximize,
  Grid,
  Rows,
  Columns,
  Settings
} from "lucide-react";
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// 定义画布元素类型
interface CanvasElement {
  id: string;
  type: "chart" | "text" | "data" | "image";
  position: { x: number; y: number };
  size: { width: number; height: number };
  title: string;
  content?: string;
  chartType?: "bar" | "line" | "pie" | "scatter";
}

// 可用的模板布局选项
const layoutOptions = ["grid", "rows", "columns", "free"];

export default function DataAnalysisPage() {
  const { t } = useTranslation();
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [currentLayout, setCurrentLayout] = useState<string>("grid");
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isGridVisible, setIsGridVisible] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // 添加新的画布元素
  const addElement = (type: CanvasElement["type"]) => {
    const newElement: CanvasElement = {
      id: `element-${Date.now()}`,
      type,
      position: { x: 100, y: 100 },
      size: { width: 300, height: 200 },
      title: type === "chart" ? t("visualization") :
             type === "text" ? t("text") :
             type === "data" ? t("data") : t("image")
    };

    if (type === "chart") {
      newElement.chartType = "bar";
    }

    setElements((prev) => [...prev, newElement]);
  };

  // 切换布局
  const changeLayout = (layout: string) => {
    setCurrentLayout(layout);
    
    // 在真实实现中，这里会重新排列元素位置
    // 这是一个简化的实现
    if (layout !== "free") {
      const newElements = [...elements];
      const gap = 20;
      const startX = 50;
      const startY = 50;
      
      if (layout === "grid") {
        const cols = 2;
        newElements.forEach((element, index) => {
          const col = index % cols;
          const row = Math.floor(index / cols);
          element.position = {
            x: startX + col * (element.size.width + gap),
            y: startY + row * (element.size.height + gap)
          };
        });
      } else if (layout === "rows") {
        newElements.forEach((element, index) => {
          element.position = {
            x: startX,
            y: startY + index * (element.size.height + gap)
          };
          // 在行布局中，元素宽度自动填充画布宽度
          element.size = { ...element.size, width: 800 };
        });
      } else if (layout === "columns") {
        newElements.forEach((element, index) => {
          element.position = {
            x: startX + index * (element.size.width + gap),
            y: startY
          };
          // 在列布局中，元素高度自动填充画布高度
          element.size = { ...element.size, height: 600 };
        });
      }
      
      setElements(newElements);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)]">
      {/* 顶部工具栏 */}
      <div className="border-b p-3 flex justify-between items-center bg-background/80 backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => addElement("chart")}
              title={t("addVisualization")}
            >
              <BarChart3 className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => addElement("text")}
              title={t("addText")}
            >
              <Type className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => addElement("data")}
              title={t("addData")}
            >
              <Table className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => addElement("image")}
              title={t("addImage")}
            >
              <Image className="h-5 w-5" />
            </Button>
          </div>

          <div className="h-6 border-r mx-1"></div>

          <div className="flex items-center space-x-1">
            <Button
              variant={currentLayout === "grid" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => changeLayout("grid")}
              title={t("gridLayout")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={currentLayout === "rows" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => changeLayout("rows")}
              title={t("rowsLayout")}
            >
              <Rows className="h-4 w-4" />
            </Button>
            <Button
              variant={currentLayout === "columns" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => changeLayout("columns")}
              title={t("columnsLayout")}
            >
              <Columns className="h-4 w-4" />
            </Button>
            <Button
              variant={currentLayout === "free" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => changeLayout("free")}
              title={t("freeLayout")}
            >
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="h-6 border-r mx-1"></div>

          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {}} // 实际应用中会实现撤销功能
              title={t("undo")}
            >
              <Undo className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {}} // 实际应用中会实现重做功能
              title={t("redo")}
            >
              <Redo className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="h-6 border-r mx-1"></div>
          
          {/* 添加视图切换按钮组 */}
          <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as "grid" | "list")}>
            <ToggleGroupItem value="grid" title={t("gridView")}>
              <LayoutGrid className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" title={t("listView")}>
              <LayoutList className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
          
          {/* 添加布局选择器下拉菜单 */}
          <Select value={currentLayout} onValueChange={changeLayout}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder={t("selectLayout")} />
            </SelectTrigger>
            <SelectContent>
              {layoutOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {t(option + "Layout")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {}}
            title={t("shareCanvas")}
          >
            <Share2 className="h-4 w-4 mr-1" />
            {t("share")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {}}
            title={t("exportCanvas")}
          >
            <Download className="h-4 w-4 mr-1" />
            {t("export")}
          </Button>
          <Button
            size="sm"
            onClick={() => {}}
            title={t("saveCanvas")}
          >
            <Save className="h-4 w-4 mr-1" />
            {t("save")}
          </Button>
        </div>
      </div>

      {/* 主画布区域 */}
      <ScrollArea className="flex-1 p-4">
        {elements.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <BarChart3 className="h-20 w-20 mx-auto mb-6 text-primary/60" />
              <h2 className="text-3xl font-bold mb-3">{t("canvas")}</h2>
              <p className="text-muted-foreground max-w-md mb-8">
                {t("dataCreationSpace")}
              </p>
              
              <div className="flex flex-col items-center space-y-4">
                <p className="text-sm text-muted-foreground">{t("dragAndDrop")}</p>
                
                <Button onClick={() => addElement("chart")}>
                  <Plus className="h-4 w-4 mr-2" />
                  {t("addVisualization")}
                </Button>
                
                <div className="flex space-x-2 mt-2">
                  <Button variant="outline" size="sm" onClick={() => {}}>
                    {t("canvasTemplates")}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        ) : viewMode === "grid" ? (
          <div
            className={cn(
              "h-full min-h-[800px] relative",
              isGridVisible && "bg-grid-pattern bg-background"
            )}
          >
            {elements.map((element) => (
              <motion.div
                key={element.id}
                className={cn(
                  "absolute shadow-md rounded-md overflow-hidden border bg-card",
                  isDragging && "ring-2 ring-primary ring-offset-2"
                )}
                style={{
                  left: element.position.x,
                  top: element.position.y,
                  width: element.size.width,
                  height: element.size.height,
                }}
                drag={currentLayout === "free"}
                dragMomentum={false}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={() => setIsDragging(false)}
              >
                <div className="p-2 border-b flex items-center justify-between bg-card/80 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <Grip className="h-4 w-4 text-muted-foreground cursor-move" />
                    <p className="text-sm font-medium">{element.title}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {element.type === "chart" && (
                      <div className="flex items-center space-x-1">
                        <Button
                          variant={element.chartType === "bar" ? "secondary" : "ghost"}
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => {
                            const newElements = [...elements];
                            const index = newElements.findIndex((e) => e.id === element.id);
                            newElements[index] = { ...newElements[index], chartType: "bar" };
                            setElements(newElements);
                          }}
                        >
                          <BarChart3 className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant={element.chartType === "line" ? "secondary" : "ghost"}
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => {
                            const newElements = [...elements];
                            const index = newElements.findIndex((e) => e.id === element.id);
                            newElements[index] = { ...newElements[index], chartType: "line" };
                            setElements(newElements);
                          }}
                        >
                          <LineChart className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant={element.chartType === "pie" ? "secondary" : "ghost"}
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => {
                            const newElements = [...elements];
                            const index = newElements.findIndex((e) => e.id === element.id);
                            newElements[index] = { ...newElements[index], chartType: "pie" };
                            setElements(newElements);
                          }}
                        >
                          <PieChart className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 h-[calc(100%-40px)] flex items-center justify-center">
                  {element.type === "chart" && (
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      {element.chartType === "bar" && (
                        <div className="w-full h-full bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 rounded-md flex items-center justify-center">
                          <BarChart3 className="h-12 w-12 text-primary/50" />
                        </div>
                      )}
                      {element.chartType === "line" && (
                        <div className="w-full h-full bg-gradient-to-r from-blue-400/20 via-blue-500/30 to-blue-400/20 rounded-md flex items-center justify-center">
                          <LineChart className="h-12 w-12 text-blue-500/50" />
                        </div>
                      )}
                      {element.chartType === "pie" && (
                        <div className="w-full h-full bg-gradient-to-r from-purple-400/20 via-purple-500/30 to-purple-400/20 rounded-md flex items-center justify-center">
                          <PieChart className="h-12 w-12 text-purple-500/50" />
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground mt-2">
                        {t("dragAndDrop")}
                      </p>
                    </div>
                  )}
                  {element.type === "text" && (
                    <div className="w-full h-full flex flex-col">
                      <p className="text-sm text-muted-foreground">
                        双击添加文本内容...
                      </p>
                    </div>
                  )}
                  {element.type === "data" && (
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <Table className="h-12 w-12 text-muted-foreground/40" />
                      <p className="text-xs text-muted-foreground mt-2">
                        点击导入数据
                      </p>
                    </div>
                  )}
                  {element.type === "image" && (
                    <div className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/20 rounded-md">
                      <Image className="h-12 w-12 text-muted-foreground/40" />
                      <p className="text-xs text-muted-foreground mt-2">
                        点击添加图像
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          // 列表视图实现
          <div className="space-y-4">
            {elements.map((element) => (
              <Card key={element.id} className="w-full">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {element.type === "chart" && <BarChart3 className="h-5 w-5 text-primary" />}
                      {element.type === "text" && <Type className="h-5 w-5 text-blue-500" />}
                      {element.type === "data" && <Table className="h-5 w-5 text-green-500" />}
                      {element.type === "image" && <Image className="h-5 w-5 text-purple-500" />}
                      
                      <div>
                        <p className="font-medium">{element.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {element.type === "chart" ? t("chartElement") : 
                           element.type === "text" ? t("textElement") :
                           element.type === "data" ? t("dataElement") : t("imageElement")}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Settings className="h-3.5 w-3.5 mr-1" />
                        {t("edit")}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </ScrollArea>

      {/* 底部状态栏 */}
      <div className="border-t py-2 px-4 flex justify-between items-center bg-background/80 backdrop-blur-sm text-xs text-muted-foreground">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Button
              variant={isGridVisible ? "secondary" : "ghost"}
              size="sm"
              className="h-7 text-xs gap-1"
              onClick={() => setIsGridVisible(!isGridVisible)}
            >
              <Grid className="h-3 w-3" />
              {isGridVisible ? t("hideGrid") : t("showGrid")}
            </Button>
          </div>
        </div>
        <div>
          {elements.length} {t("elements")} | {viewMode === "grid" ? t("gridView") : t("listView")}
        </div>
      </div>
    </div>
  );
}