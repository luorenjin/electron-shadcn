// filepath: d:\Work\AiDev\electron-shadcn\src\pages\KnowledgeBasePage.tsx
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { 
  Search, 
  PlusCircle, 
  Book, 
  BookOpen,
  Tag,
  MessageSquare,
  FileText,
  Link2,
  ChevronRight,
  MoreHorizontal,
  Star,
  Eye,
  CalendarClock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/utils/tailwind";
import { motion } from "framer-motion";

// 定义知识条目类型
type KnowledgeItemType = 'article' | 'faq' | 'documentation' | 'link';

interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  type: KnowledgeItemType;
  category: string;
  tags: string[];
  createdAt: string;
  views: number;
  starred: boolean;
}

// 定义知识分类
interface KnowledgeCategory {
  id: string;
  name: string;
  count: number;
  icon: React.ReactNode;
}

export default function KnowledgeBasePage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  
  // 模拟知识库分类
  const categories: KnowledgeCategory[] = [
    { id: 'all', name: 'allKnowledge', count: 27, icon: <BookOpen className="h-5 w-5" /> },
    { id: 'data-analysis', name: 'dataAnalysis', count: 9, icon: <FileText className="h-5 w-5" /> },
    { id: 'usage-guide', name: 'usageGuide', count: 7, icon: <Book className="h-5 w-5" /> },
    { id: 'faq', name: 'frequentlyAsked', count: 8, icon: <MessageSquare className="h-5 w-5" /> },
    { id: 'resources', name: 'externalResources', count: 3, icon: <Link2 className="h-5 w-5" /> },
  ];
  
  // 模拟知识条目
  const knowledgeItems: KnowledgeItem[] = [
    {
      id: '1',
      title: '如何开始使用数据分析功能',
      content: '本教程将指导您如何使用DeepData的数据分析功能。首先，进入数据分析页面，选择一个数据集，然后添加可视化组件。您可以拖拽组件调整位置和大小，还可以设置数据关联和刷新间隔...',
      type: 'article',
      category: 'data-analysis',
      tags: ['tutorial', 'beginners', 'data-analysis'],
      createdAt: '2025-04-15',
      views: 345,
      starred: true
    },
    {
      id: '2',
      title: '连接不同数据源的方法',
      content: 'DeepData支持多种数据源连接，包括本地文件、关系型数据库、NoSQL数据库和API等。本文将详细介绍每种连接方式的配置步骤...',
      type: 'documentation',
      category: 'usage-guide',
      tags: ['data-source', 'connection', 'setup'],
      createdAt: '2025-04-10',
      views: 287,
      starred: false
    },
    {
      id: '3',
      title: '常见问题：为什么我的数据可视化没有显示？',
      content: '如果您的数据可视化组件没有正确显示，可能有以下几种原因：1. 数据集格式不匹配，2. 选择的图表类型不适合您的数据结构，3. 数据源连接中断...',
      type: 'faq',
      category: 'faq',
      tags: ['troubleshooting', 'visualization', 'errors'],
      createdAt: '2025-04-08',
      views: 562,
      starred: true
    },
    {
      id: '4',
      title: '数据分析最佳实践指南',
      content: '高效的数据分析需要遵循一些最佳实践。本指南涵盖了数据准备、探索性分析、可视化选择和结果呈现的关键原则...',
      type: 'article',
      category: 'data-analysis',
      tags: ['best-practices', 'workflow', 'advanced'],
      createdAt: '2025-04-05',
      views: 421,
      starred: false
    },
    {
      id: '5',
      title: 'Kaggle数据科学资源',
      content: 'Kaggle是一个优秀的数据科学社区，提供大量数据集和教程。本文收集了一些最有用的资源链接...',
      type: 'link',
      category: 'resources',
      tags: ['external', 'datasets', 'learning'],
      createdAt: '2025-04-01',
      views: 189,
      starred: true
    },
    {
      id: '6',
      title: '如何使用AI助手回答数据问题',
      content: 'DeepData的AI助手可以帮助回答关于您数据的复杂问题。本教程将教您如何有效提问以获取最准确的答案...',
      type: 'article',
      category: 'usage-guide',
      tags: ['ai-assistant', 'natural-language', 'queries'],
      createdAt: '2025-03-28',
      views: 374,
      starred: false
    },
  ];
  
  // 获取所有唯一标签
  const allTags = Array.from(
    new Set(knowledgeItems.flatMap(item => item.tags))
  ).sort();
  
  // 根据搜索、分类和标签筛选知识条目
  const filteredItems = knowledgeItems.filter(item => {
    // 搜索词筛选
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // 分类筛选
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    
    // 标签筛选
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => item.tags.includes(tag));
    
    return matchesSearch && matchesCategory && matchesTags;
  });
  
  // 切换条目展开状态
  const toggleItemExpand = (id: string) => {
    if (expandedItem === id) {
      setExpandedItem(null);
    } else {
      setExpandedItem(id);
    }
  };
  
  // 获取条目类型对应图标
  const getTypeIcon = (type: KnowledgeItemType) => {
    switch (type) {
      case 'article': 
        return <FileText className="h-4 w-4" />;
      case 'faq': 
        return <MessageSquare className="h-4 w-4" />;
      case 'documentation': 
        return <Book className="h-4 w-4" />;
      case 'link': 
        return <Link2 className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };
  
  return (
    <div className="h-full flex">
      {/* 左侧分类导航 */}
      <div className="w-64 border-r bg-muted/20 h-full overflow-y-auto p-4">
        <h2 className="text-lg font-semibold mb-4">{t('knowledgeBase')}</h2>
        
        <div className="space-y-1">
          {categories.map(category => (
            <Button 
              key={category.id}
              variant="ghost"
              className={cn(
                "w-full justify-start",
                activeCategory === category.id && "bg-primary/10 text-primary font-medium"
              )}
              onClick={() => setActiveCategory(category.id)}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  {category.icon}
                  <span className="ml-2">{t(category.name)}</span>
                </div>
                <Badge variant="outline">{category.count}</Badge>
              </div>
            </Button>
          ))}
        </div>
        
        <div className="mt-8">
          <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
            <Tag className="h-4 w-4 mr-1.5" />
            {t('popularTags')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {allTags.slice(0, 10).map(tag => (
              <Badge 
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer capitalize"
                onClick={() => {
                  if (selectedTags.includes(tag)) {
                    setSelectedTags(selectedTags.filter(t => t !== tag));
                  } else {
                    setSelectedTags([...selectedTags, tag]);
                  }
                }}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="mt-8">
          <Button 
            className="w-full"
            onClick={() => {/* TODO: 添加新知识条目的逻辑 */}}
          >
            <PlusCircle className="h-4 w-4 mr-1.5" />
            {t('addKnowledge')}
          </Button>
        </div>
      </div>
      
      {/* 右侧内容区域 */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* 搜索栏 */}
        <div className="p-4 border-b bg-background/80 backdrop-blur-sm">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('searchKnowledgeBase')}
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* 知识条目列表 */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4 pb-6">
            {filteredItems.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-1">{t('noKnowledgeFound')}</h3>
                <p className="text-muted-foreground">{t('tryDifferentSearch')}</p>
              </div>
            ) : (
              filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <Card
                    className={cn(
                      "overflow-hidden transition-shadow",
                      expandedItem === item.id ? "shadow-md" : "hover:shadow-sm",
                    )}
                  >
                    <div 
                      className={cn(
                        "p-4 cursor-pointer flex items-center justify-between",
                        item.starred && "border-l-4 border-primary pl-3"
                      )}
                      onClick={() => toggleItemExpand(item.id)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className="bg-primary/10 p-1 rounded-md">
                            {getTypeIcon(item.type)}
                          </div>
                          <h3 className="font-medium">{item.title}</h3>
                          {item.starred && (
                            <Star className="h-3.5 w-3.5 text-amber-500" />
                          )}
                        </div>
                        
                        <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <CalendarClock className="h-3 w-3 mr-1" />
                            {item.createdAt}
                          </div>
                          <div className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            {item.views}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.tags.slice(0, 2).map(tag => (
                              <Badge key={tag} variant="outline" className="text-xs capitalize">
                                {tag}
                              </Badge>
                            ))}
                            {item.tags.length > 2 && (
                              <Badge variant="outline" className="text-xs">+{item.tags.length - 2}</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <ChevronRight className={cn(
                        "h-5 w-5 text-muted-foreground transition-transform",
                        expandedItem === item.id && "transform rotate-90"
                      )} />
                    </div>
                    
                    {expandedItem === item.id && (
                      <div className="p-4 pt-0 border-t mt-3">
                        <div className="prose prose-sm dark:prose-invert max-w-none py-2">
                          <p>{item.content}</p>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex gap-2">
                            {item.tags.map(tag => (
                              <Badge key={tag} variant="outline" className="capitalize">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex gap-1">
                            <Button variant="outline" size="sm">
                              <Star className="h-3.5 w-3.5 mr-1" />
                              {t('save')}
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}