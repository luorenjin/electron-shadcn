import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  Table, 
  Plus, 
  X, 
  Layers, 
  SplitSquareVertical,
  Maximize2,
  Download,
  Share2,
  Bookmark,
  PanelLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils/tailwind";
import { ScrollArea } from "@/components/ui/scroll-area";

// 定义可视化/组件类型
type WidgetType = 'bar-chart' | 'line-chart' | 'pie-chart' | 'data-table';

interface Widget {
  id: string;
  type: WidgetType;
  title: string;
  size: 'small' | 'medium' | 'large';
}

export default function DataAnalysisPage() {
  const { t } = useTranslation();
  const [widgets, setWidgets] = useState<Widget[]>([
    { id: '1', type: 'bar-chart', title: 'revenueTrends', size: 'medium' },
    { id: '2', type: 'line-chart', title: 'userGrowth', size: 'medium' },
    { id: '3', type: 'pie-chart', title: 'trafficSources', size: 'small' },
    { id: '4', type: 'data-table', title: 'topProducts', size: 'large' },
  ]);
  
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeDataset, setActiveDataset] = useState('sales_data');
  
  // 添加新组件
  const addWidget = (type: WidgetType) => {
    const newWidget: Widget = {
      id: Date.now().toString(),
      type,
      title: `newWidget${widgets.length + 1}`,
      size: 'medium'
    };
    setWidgets([...widgets, newWidget]);
  };
  
  // 删除组件
  const removeWidget = (id: string) => {
    setWidgets(widgets.filter(widget => widget.id !== id));
  };
  
  // 修改组件大小
  const changeSize = (id: string) => {
    const sizes: Record<string, 'small' | 'medium' | 'large'> = {
      small: 'medium',
      medium: 'large',
      large: 'small'
    };
    
    setWidgets(widgets.map(widget => {
      if (widget.id === id) {
        return { ...widget, size: sizes[widget.size] };
      }
      return widget;
    }));
  };
  
  // 根据类型获取组件图标
  const getWidgetIcon = (type: WidgetType) => {
    switch (type) {
      case 'bar-chart':
        return <BarChart3 className="h-5 w-5" />;
      case 'line-chart':
        return <LineChart className="h-5 w-5" />;
      case 'pie-chart':
        return <PieChart className="h-5 w-5" />;
      case 'data-table':
        return <Table className="h-5 w-5" />;
      default:
        return <BarChart3 className="h-5 w-5" />;
    }
  };
  
  // 模拟的数据集列表
  const datasets = [
    { id: 'sales_data', name: 'salesData', rows: 1254, updated: '2025-04-18' },
    { id: 'user_metrics', name: 'userMetrics', rows: 863, updated: '2025-04-17' },
    { id: 'inventory', name: 'inventoryData', rows: 542, updated: '2025-04-15' },
  ];
  
  return (
    <div className="flex h-full">
      {/* 侧边栏 - 数据集和组件选择器 */}
      {showSidebar && (
        <motion.div 
          initial={{ x: -280 }}
          animate={{ x: 0 }}
          className="w-72 bg-muted/30 border-r h-full flex flex-col"
        >
          {/* 数据集选择 */}
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold mb-3">{t('dataSources')}</h3>
            <div className="space-y-2">
              {datasets.map(dataset => (
                <div
                  key={dataset.id}
                  className={cn(
                    "p-3 rounded-md cursor-pointer flex items-center",
                    activeDataset === dataset.id 
                      ? "bg-primary/10 text-primary" 
                      : "hover:bg-accent"
                  )}
                  onClick={() => setActiveDataset(dataset.id)}
                >
                  <Layers className="h-4 w-4 mr-3 flex-shrink-0" />
                  <div className="overflow-hidden">
                    <div className="font-medium truncate">{t(dataset.name)}</div>
                    <div className="text-xs text-muted-foreground">
                      {dataset.rows.toLocaleString()} {t('rows')} • {t('updated')} {dataset.updated}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 组件库 */}
          <div className="p-4 flex-1">
            <h3 className="text-lg font-semibold mb-3">{t('addComponents')}</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                className="h-auto flex-col py-6 gap-2"
                onClick={() => addWidget('bar-chart')}
              >
                <BarChart3 className="h-8 w-8" />
                <span>{t('barChart')}</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto flex-col py-6 gap-2"
                onClick={() => addWidget('line-chart')}
              >
                <LineChart className="h-8 w-8" />
                <span>{t('lineChart')}</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto flex-col py-6 gap-2"
                onClick={() => addWidget('pie-chart')}
              >
                <PieChart className="h-8 w-8" />
                <span>{t('pieChart')}</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto flex-col py-6 gap-2"
                onClick={() => addWidget('data-table')}
              >
                <Table className="h-8 w-8" />
                <span>{t('dataTable')}</span>
              </Button>
            </div>
          </div>
          
          {/* 创建新图表按钮 */}
          <div className="p-4 border-t">
            <Button className="w-full" size="lg">
              <Plus className="h-4 w-4 mr-2" />
              {t('createNewChart')}
            </Button>
          </div>
        </motion.div>
      )}
      
      {/* 主画布区域 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 画布工具栏 */}
        <div className="bg-background border-b p-3 flex items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full mr-2"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              <PanelLeft className="h-4 w-4" />
            </Button>
            <h2 className="font-semibold">{t('myDataCanvas')}</h2>
            <Badge variant="outline" className="ml-2">
              {t('usingDataset', { name: t(datasets.find(d => d.id === activeDataset)?.name || '') })}
            </Badge>
          </div>
          
          <div className="flex space-x-1">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* 画布内容区域 */}
        <ScrollArea className="flex-1 p-6">
          <div className="grid grid-cols-6 gap-4 pb-6">
            {widgets.map(widget => {
              // 根据组件大小确定网格列宽
              const colSpan = {
                small: "col-span-2",
                medium: "col-span-3",
                large: "col-span-6"
              }[widget.size];
              
              // 根据组件类型选择不同的展示样式
              const renderWidgetContent = () => {
                switch (widget.type) {
                  case 'bar-chart':
                  case 'line-chart':
                  case 'pie-chart':
                    return (
                      <div className="h-48 bg-background rounded-md border-2 border-dashed border-muted flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                          {getWidgetIcon(widget.type)}
                          <p className="mt-2">{t('chartPreview')}</p>
                        </div>
                      </div>
                    );
                  case 'data-table':
                    return (
                      <div className="h-48 bg-background rounded-md border-2 border-dashed border-muted flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                          <Table className="h-5 w-5 mx-auto" />
                          <p className="mt-2">{t('tablePreview')}</p>
                        </div>
                      </div>
                    );
                  default:
                    return null;
                }
              };
              
              return (
                <motion.div
                  key={widget.id}
                  className={cn("rounded-lg shadow-sm", colSpan)}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card>
                    <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                      <div className="flex items-center">
                        {getWidgetIcon(widget.type)}
                        <CardTitle className="ml-2 text-sm">{t(widget.title)}</CardTitle>
                      </div>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full" onClick={() => changeSize(widget.id)}>
                          <SplitSquareVertical className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
                          <Maximize2 className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full" onClick={() => removeWidget(widget.id)}>
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      {renderWidgetContent()}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
            
            {/* 添加新组件卡片 */}
            <motion.div
              className="col-span-2"
              layout
            >
              <Card 
                className="border-dashed cursor-pointer h-full min-h-[100px] flex items-center justify-center hover:bg-accent/50 transition-colors"
                onClick={() => addWidget('bar-chart')}
              >
                <div className="flex flex-col items-center text-muted-foreground">
                  <Plus className="h-8 w-8 mb-1" />
                  <p className="text-sm font-medium">{t('addWidget')}</p>
                </div>
              </Card>
            </motion.div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}