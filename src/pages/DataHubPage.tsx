import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { 
  Database, 
  FileText, 
  BarChart3,
  Table,
  Search,
  Plus,
  Star,
  StarOff,
  Filter,
  Clock,
  Settings,
  FileSpreadsheet,
  MessageSquare,
  BookOpen,
  ChevronRight,
  ListFilter
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils/tailwind";

// 定义数据项类型
interface DataItem {
  id: string;
  title: string;
  description: string;
  type: "database" | "csv" | "excel" | "api" | "conversation" | "canvas" | "knowledge";
  tags: string[];
  date: string;
  size?: string;
  format?: string;
  isFavorite: boolean;
  thumbnail?: string;
}

// 示例数据
const EXAMPLE_DATA: DataItem[] = [
  {
    id: "data-001",
    title: "销售数据 2025 Q1",
    description: "第一季度全球销售数据，包含区域、产品类别和销售额",
    type: "excel",
    tags: ["销售", "季度报告", "财务"],
    date: "2025-03-15",
    size: "2.4MB",
    format: "XLSX",
    isFavorite: true
  },
  {
    id: "data-002",
    title: "客户反馈分析",
    description: "基于NPS调查的客户满意度分析",
    type: "csv",
    tags: ["客户", "分析", "满意度"],
    date: "2025-04-01",
    size: "1.1MB",
    format: "CSV",
    isFavorite: false
  },
  {
    id: "data-003",
    title: "产品库存数据库",
    description: "实时产品库存管理系统数据库连接",
    type: "database",
    tags: ["库存", "产品", "数据库"],
    date: "2025-04-10",
    format: "PostgreSQL",
    isFavorite: true
  },
  {
    id: "data-004",
    title: "市场趋势分析",
    description: "基于最近三年销售数据的市场趋势可视化",
    type: "canvas",
    tags: ["分析", "市场", "趋势"],
    date: "2025-04-05",
    isFavorite: false
  },
  {
    id: "data-005",
    title: "客户服务对话",
    description: "与AI助手关于客户服务改进的对话记录",
    type: "conversation",
    tags: ["客户服务", "对话", "AI"],
    date: "2025-04-18",
    isFavorite: false
  },
  {
    id: "data-006",
    title: "产品开发知识库",
    description: "产品开发流程、最佳实践和常见问题解答",
    type: "knowledge",
    tags: ["产品", "知识库", "开发"],
    date: "2025-04-12",
    isFavorite: true
  }
];

// 获取数据项的图标
const getItemIcon = (type: DataItem["type"]) => {
  switch (type) {
    case "database":
      return <Database className="h-6 w-6" />;
    case "csv":
    case "excel":
      return <FileSpreadsheet className="h-6 w-6" />;
    case "api":
      return <FileText className="h-6 w-6" />;
    case "conversation":
      return <MessageSquare className="h-6 w-6" />;
    case "canvas":
      return <BarChart3 className="h-6 w-6" />;
    case "knowledge":
      return <BookOpen className="h-6 w-6" />;
    default:
      return <Table className="h-6 w-6" />;
  }
};

// 获取数据项的颜色
const getItemColor = (type: DataItem["type"]) => {
  switch (type) {
    case "database":
      return "text-blue-500 bg-blue-500/10";
    case "csv":
      return "text-green-500 bg-green-500/10";
    case "excel":
      return "text-emerald-500 bg-emerald-500/10";
    case "api":
      return "text-purple-500 bg-purple-500/10";
    case "conversation":
      return "text-yellow-500 bg-yellow-500/10";
    case "canvas":
      return "text-orange-500 bg-orange-500/10";
    case "knowledge":
      return "text-rose-500 bg-rose-500/10";
    default:
      return "text-gray-500 bg-gray-500/10";
  }
};

// 子导航项
const COLLECTION_CATEGORIES = [
  { id: "recent", label: "recentItems", icon: <Clock className="h-4 w-4" /> },
  { id: "favorites", label: "favorites", icon: <Star className="h-4 w-4" /> },
  { id: "all", label: "allCollections", icon: <Database className="h-4 w-4" /> },
];

export default function DataHubPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("recent");
  const [activeView, setActiveView] = useState<"grid" | "list">("grid");
  const [selectedItem, setSelectedItem] = useState<DataItem | null>(null);
  
  // 过滤数据
  const getFilteredData = () => {
    let filtered = [...EXAMPLE_DATA];
    
    // 根据搜索词过滤
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query) ||
        item.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // 根据类别过滤
    if (activeCategory === "favorites") {
      filtered = filtered.filter(item => item.isFavorite);
    } else if (activeCategory === "recent") {
      // 按日期排序，最近的在前面
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      // 只显示最近的几条
      filtered = filtered.slice(0, 4);
    }
    
    return filtered;
  };

  // 切换收藏状态
  const toggleFavorite = (id: string) => {
    const updatedData = EXAMPLE_DATA.map(item => 
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    );
    
    // 在真实应用中，这里会更新状态和后端数据
    // 这里只是模拟示例，所以仅打印操作
    console.log("Toggled favorite for item:", id);
    
    // 如果当前选中的项是被修改的项，也更新selectedItem
    if (selectedItem && selectedItem.id === id) {
      const updatedItem = updatedData.find(item => item.id === id);
      if (updatedItem) {
        setSelectedItem(updatedItem);
      }
    }
  };
  
  const filteredData = getFilteredData();
  
  return (
    <div className="h-[calc(100vh-100px)] flex flex-col">
      {/* 顶部搜索和操作栏 */}
      <div className="border-b p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{t("collection")}</h1>
            <p className="text-sm text-muted-foreground">{t("dataLibrary")}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              {t("filter")}
            </Button>
            <Button variant="default" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              {t("addToCollection")}
            </Button>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("searchCollections")}
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant={activeView === "grid" ? "default" : "outline"}
            size="icon"
            className="h-9 w-9"
            onClick={() => setActiveView("grid")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <rect width="7" height="7" x="3" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="3" rx="1" />
              <rect width="7" height="7" x="3" y="14" rx="1" />
              <rect width="7" height="7" x="14" y="14" rx="1" />
            </svg>
          </Button>
          <Button
            variant={activeView === "list" ? "default" : "outline"}
            size="icon"
            className="h-9 w-9"
            onClick={() => setActiveView("list")}
          >
            <ListFilter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* 主内容区 */}
      <div className="flex-1 flex overflow-hidden">
        {/* 侧边导航 */}
        <div className="w-56 border-r p-3 flex flex-col">
          <div className="space-y-1">
            {COLLECTION_CATEGORIES.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveCategory(category.id)}
              >
                {category.icon}
                <span className="ml-2">{t(category.label)}</span>
              </Button>
            ))}
          </div>
          
          <div className="h-px bg-border my-3"></div>
          
          <div className="space-y-1">
            <h3 className="text-sm font-medium px-3 py-1">{t("dataSources")}</h3>
            <Button variant="ghost" className="w-full justify-start text-muted-foreground">
              <Database className="h-4 w-4 mr-2" />
              数据库
            </Button>
            <Button variant="ghost" className="w-full justify-start text-muted-foreground">
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              本地文件
            </Button>
            <Button variant="ghost" className="w-full justify-start text-muted-foreground">
              <MessageSquare className="h-4 w-4 mr-2" />
              对话历史
            </Button>
          </div>
          
          <div className="mt-auto pt-4">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link to="/settings">
                <Settings className="h-4 w-4 mr-2" />
                {t("settings")}
              </Link>
            </Button>
          </div>
        </div>
        
        {/* 主内容 */}
        <div className="flex-1 flex overflow-hidden">
          {/* 数据列表 */}
          <div className={cn(
            "overflow-auto",
            selectedItem ? "hidden md:block md:w-1/2 lg:w-2/3 border-r" : "w-full"
          )}>
            <ScrollArea className="h-full">
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-4">
                  {t(COLLECTION_CATEGORIES.find(c => c.id === activeCategory)?.label || '')}
                </h2>
                
                {filteredData.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Database className="h-12 w-12 text-muted-foreground/30 mb-4" />
                    <p className="text-muted-foreground text-center">
                      {t("noCollectionsFound")}
                    </p>
                  </div>
                ) : activeView === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredData.map((item) => (
                      <Card 
                        key={item.id} 
                        className={cn(
                          "cursor-pointer transition-all hover:shadow-md",
                          selectedItem?.id === item.id && "ring-2 ring-primary"
                        )}
                        onClick={() => setSelectedItem(item)}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <div className={cn(
                              "p-2 rounded-md",
                              getItemColor(item.type)
                            )}>
                              {getItemIcon(item.type)}
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 -mr-2 -mt-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(item.id);
                              }}
                            >
                              {item.isFavorite ? (
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              ) : (
                                <StarOff className="h-4 w-4 text-muted-foreground/40" />
                              )}
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-3">
                          <h3 className="font-medium truncate mb-1">{item.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 h-10">
                            {item.description}
                          </p>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center pt-0">
                          <div className="flex gap-1">
                            {item.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {item.tags.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{item.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {new Date(item.date).toLocaleDateString()}
                          </p>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredData.map((item) => (
                      <div 
                        key={item.id}
                        className={cn(
                          "flex items-center p-3 rounded-md border cursor-pointer transition-all hover:bg-accent",
                          selectedItem?.id === item.id && "bg-accent"
                        )}
                        onClick={() => setSelectedItem(item)}
                      >
                        <div className={cn(
                          "p-2 rounded-md mr-3",
                          getItemColor(item.type)
                        )}>
                          {getItemIcon(item.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium truncate">{item.title}</h3>
                          <p className="text-sm text-muted-foreground truncate">
                            {item.description}
                          </p>
                          <div className="flex items-center mt-1">
                            <p className="text-xs text-muted-foreground">
                              {new Date(item.date).toLocaleDateString()}
                            </p>
                            <div className="mx-2 w-1 h-1 rounded-full bg-muted-foreground"></div>
                            <div className="flex gap-1">
                              {item.tags.slice(0, 1).map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {item.tags.length > 1 && (
                                <Badge variant="outline" className="text-xs">
                                  +{item.tags.length - 1}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="ml-2 flex items-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(item.id);
                            }}
                          >
                            {item.isFavorite ? (
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ) : (
                              <StarOff className="h-4 w-4 text-muted-foreground/40" />
                            )}
                          </Button>
                          <ChevronRight className="h-4 w-4 text-muted-foreground ml-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
          
          {/* 详情面板 */}
          {selectedItem && (
            <motion.div 
              className="w-full md:w-1/2 lg:w-1/3 border-l overflow-auto"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">{t("collectionDetails")}</h2>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="md:hidden"
                    onClick={() => setSelectedItem(null)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </Button>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <div className={cn(
                      "p-3 rounded-md",
                      getItemColor(selectedItem.type)
                    )}>
                      {getItemIcon(selectedItem.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-medium">{selectedItem.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(selectedItem.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleFavorite(selectedItem.id)}
                    >
                      {selectedItem.isFavorite ? (
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ) : (
                        <StarOff className="h-5 w-5 text-muted-foreground/40" />
                      )}
                    </Button>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">
                      {t("description")}
                    </h4>
                    <p className="text-sm">
                      {selectedItem.description}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">
                      {t("tags")}
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedItem.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {(selectedItem.size || selectedItem.format) && (
                    <div className="pt-2 border-t">
                      <div className="grid grid-cols-2 gap-2">
                        {selectedItem.format && (
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground">
                              {t("format")}
                            </h4>
                            <p className="text-sm">{selectedItem.format}</p>
                          </div>
                        )}
                        {selectedItem.size && (
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground">
                              {t("size")}
                            </h4>
                            <p className="text-sm">{selectedItem.size}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-4">
                    <Button className="w-full">
                      {selectedItem.type === "conversation" ? t("openConversation") :
                       selectedItem.type === "canvas" ? t("openCanvas") :
                       selectedItem.type === "knowledge" ? t("openKnowledge") :
                       t("open")}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}