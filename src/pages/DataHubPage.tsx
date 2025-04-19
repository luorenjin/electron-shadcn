import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { 
  Filter, 
  Search, 
  Plus, 
  Grid3x3, 
  List as ListIcon, 
  Database,
  FileText,
  Image as ImageIcon,
  File,
  Folder,
  MoreHorizontal,
  Star,
  StarOff,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils/tailwind";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

// 数据项类型
type DataItemType = 'database' | 'document' | 'image' | 'folder' | 'file';

interface DataItem {
  id: string;
  name: string;
  type: DataItemType;
  size: string;
  lastModified: string;
  favorite: boolean;
  tags: string[];
}

export default function DataHubPage() {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [favoriteFilter, setFavoriteFilter] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // 模拟数据集列表
  const [dataItems, setDataItems] = useState<DataItem[]>([
    { 
      id: '1', 
      name: 'salesDatabase2025', 
      type: 'database', 
      size: '156 MB', 
      lastModified: '2025-04-18', 
      favorite: true,
      tags: ['sales', 'database', 'finance']
    },
    { 
      id: '2', 
      name: 'customerAnalytics', 
      type: 'document', 
      size: '2.4 MB', 
      lastModified: '2025-04-17', 
      favorite: false,
      tags: ['customers', 'analysis', 'report']
    },
    { 
      id: '3', 
      name: 'marketingMaterials', 
      type: 'folder', 
      size: '452 MB', 
      lastModified: '2025-04-16', 
      favorite: true,
      tags: ['marketing', 'assets']
    },
    { 
      id: '4', 
      name: 'productCatalog', 
      type: 'image', 
      size: '6.2 MB', 
      lastModified: '2025-04-15', 
      favorite: false,
      tags: ['products', 'catalog', 'images']
    },
    { 
      id: '5', 
      name: 'financialReport2025', 
      type: 'file', 
      size: '1.8 MB', 
      lastModified: '2025-04-14', 
      favorite: false,
      tags: ['finance', 'report', '2025']
    },
    { 
      id: '6', 
      name: 'inventoryDatabase', 
      type: 'database', 
      size: '87 MB', 
      lastModified: '2025-04-13', 
      favorite: true,
      tags: ['inventory', 'database', 'products']
    },
  ]);
  
  // 筛选数据项
  const filteredItems = dataItems.filter(item => {
    // 搜索过滤
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // 收藏过滤
    const matchesFavorite = !favoriteFilter || item.favorite;
    
    // 标签过滤
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => item.tags.includes(tag));
    
    return matchesSearch && matchesFavorite && matchesTags;
  });
  
  // 常用标签列表（从所有数据项中提取）
  const availableTags = Array.from(
    new Set(dataItems.flatMap(item => item.tags))
  ).sort();
  
  // 切换收藏状态
  const toggleFavorite = (id: string) => {
    setDataItems(dataItems.map(item => 
      item.id === id ? { ...item, favorite: !item.favorite } : item
    ));
  };
  
  // 根据类型获取图标
  const getTypeIcon = (type: DataItemType) => {
    switch (type) {
      case 'database':
        return <Database className="h-5 w-5" />;
      case 'document':
        return <FileText className="h-5 w-5" />;
      case 'image':
        return <ImageIcon className="h-5 w-5" />;
      case 'folder':
        return <Folder className="h-5 w-5" />;
      case 'file':
        return <File className="h-5 w-5" />;
      default:
        return <File className="h-5 w-5" />;
    }
  };
  
  // 获取类型颜色
  const getTypeColor = (type: DataItemType) => {
    switch (type) {
      case 'database':
        return "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300";
      case 'document':
        return "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300";
      case 'image':
        return "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300";
      case 'folder':
        return "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300";
      case 'file':
        return "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300";
      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300";
    }
  };
  
  return (
    <div className="h-full flex flex-col">
      {/* 工具栏 */}
      <div className="p-4 border-b bg-background/80 backdrop-blur-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('searchCollections')}
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant={favoriteFilter ? "default" : "outline"} 
              size="sm"
              onClick={() => setFavoriteFilter(!favoriteFilter)}
              className="gap-1.5"
            >
              {favoriteFilter ? <Star className="h-4 w-4" /> : <StarOff className="h-4 w-4" />}
              <span className="hidden sm:inline">{t('favorites')}</span>
            </Button>
            
            <Button variant="outline" size="sm" className="gap-1.5">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">{t('filter')}</span>
            </Button>
            
            <div className="border rounded-md flex">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "rounded-none", 
                  viewMode === 'grid' && "bg-muted"
                )}
                onClick={() => setViewMode('grid')}
              >
                <Grid3x3 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "rounded-none", 
                  viewMode === 'list' && "bg-muted"
                )}
                onClick={() => setViewMode('list')}
              >
                <ListIcon className="h-4 w-4" />
              </Button>
            </div>
            
            <Button className="gap-1.5">
              <Plus className="h-4 w-4" />
              <span>{t('new')}</span>
            </Button>
          </div>
        </div>
        
        {/* 标签过滤器 */}
        <div className="relative max-w-full mt-4">
          <ScrollArea className="max-w-full">
            <div className="flex gap-2 py-1 px-0.5">
              {availableTags.map(tag => (
                <Badge 
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer capitalize whitespace-nowrap"
                  onClick={() => {
                    if (selectedTags.includes(tag)) {
                      setSelectedTags(selectedTags.filter(t => t !== tag));
                    } else {
                      setSelectedTags([...selectedTags, tag]);
                    }
                  }}
                >
                  #{tag}
                </Badge>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
      
      {/* 内容区域 */}
      <ScrollArea className="flex-1 p-4">
        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-10 text-center">
            <div className="bg-muted p-4 rounded-full mb-4">
              <Database className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium mb-2">{t('noItemsFound')}</h3>
            <p className="text-muted-foreground max-w-xs">{t('noItemsFoundDescription')}</p>
          </div>
        ) : (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-6">
              {filteredItems.map(item => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
                    <div className={cn("p-6 flex justify-center items-center", getTypeColor(item.type))}>
                      <div className="h-12 w-12 rounded-full bg-white/90 dark:bg-gray-800/90 flex items-center justify-center">
                        {getTypeIcon(item.type)}
                      </div>
                    </div>
                    <CardHeader className="p-4 pb-2 space-y-0">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base truncate" title={item.name}>
                          {item.name}
                        </CardTitle>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-full"
                          onClick={() => toggleFavorite(item.id)}
                        >
                          {item.favorite ? 
                            <Star className="h-4 w-4 text-amber-500" /> : 
                            <StarOff className="h-4 w-4 text-muted-foreground" />
                          }
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 flex-1">
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.tags.slice(0, 2).map(tag => (
                          <Badge key={tag} variant="outline" className="capitalize">
                            {tag}
                          </Badge>
                        ))}
                        {item.tags.length > 2 && (
                          <Badge variant="outline">+{item.tags.length - 2}</Badge>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-2 border-t">
                      <div className="flex justify-between items-center w-full text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {item.lastModified}
                        </div>
                        <div>{item.size}</div>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-muted/50 sticky top-0">
                  <tr>
                    <th className="text-left p-3 text-muted-foreground font-medium">{t('name')}</th>
                    <th className="text-left p-3 text-muted-foreground font-medium">{t('type')}</th>
                    <th className="text-left p-3 text-muted-foreground font-medium">{t('tags')}</th>
                    <th className="text-left p-3 text-muted-foreground font-medium">{t('lastModified')}</th>
                    <th className="text-left p-3 text-muted-foreground font-medium">{t('size')}</th>
                    <th className="w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item, index) => (
                    <motion.tr 
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="border-b"
                    >
                      <td className="p-3">
                        <div className="flex items-center space-x-3">
                          <div className={cn("p-2 rounded-md", getTypeColor(item.type))}>
                            {getTypeIcon(item.type)}
                          </div>
                          <span className="font-medium">{item.name}</span>
                        </div>
                      </td>
                      <td className="p-3 capitalize">{item.type}</td>
                      <td className="p-3">
                        <div className="flex flex-wrap gap-1">
                          {item.tags.slice(0, 3).map(tag => (
                            <Badge key={tag} variant="outline" className="capitalize">
                              {tag}
                            </Badge>
                          ))}
                          {item.tags.length > 3 && (
                            <Badge variant="outline">+{item.tags.length - 3}</Badge>
                          )}
                        </div>
                      </td>
                      <td className="p-3">{item.lastModified}</td>
                      <td className="p-3">{item.size}</td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <Button 
                            variant="ghost"
                            size="icon" 
                            className="h-8 w-8 rounded-full"
                            onClick={() => toggleFavorite(item.id)}
                          >
                            {item.favorite ? 
                              <Star className="h-4 w-4 text-amber-500" /> : 
                              <StarOff className="h-4 w-4 text-muted-foreground" />
                            }
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </ScrollArea>
    </div>
  );
}