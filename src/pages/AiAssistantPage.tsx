// filepath: d:\Work\AiDev\electron-shadcn\src\pages\AiAssistantPage.tsx
import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { 
  Send, 
  Mic, 
  Image as ImageIcon, 
  File, 
  Settings, 
  MessageSquare, 
  Sparkles, 
  Bot, 
  RefreshCw,
  ChevronDown,
  MoreHorizontal,
  Save,
  Share,
  Search,
  Database,
  BarChart2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/tailwind";

// 定义视觉数据类型
interface ChartData {
  chartType: string;
  title: string;
  description: string;
}

interface TableData {
  columns: string[];
  rows: string[][];
}

interface InsightData {
  title: string;
  points: string[];
}

// 定义视觉数据项的联合类型
type VisualDataType = {
  type: 'chart';
  data: ChartData;
} | {
  type: 'table';
  data: TableData;
} | {
  type: 'insight';
  data: InsightData;
};

// 定义消息类型
interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  isLoading?: boolean;
  visualData?: VisualDataType[];
  suggestions?: string[];
}

// 定义模型选项
interface ModelOption {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
}

export default function AiAssistantPage() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [conversationTitle, setConversationTitle] = useState(t('newConversation'));
  
  // 模拟的大模型列表
  const modelOptions: ModelOption[] = [
    { id: 'gpt-4', name: 'GPT-4', description: 'highCapacity', isActive: true },
    { id: 'claude-3', name: 'Claude 3', description: 'balancedModel', isActive: false },
    { id: 'qwen-plus', name: 'Qwen Plus', description: 'fastResponses', isActive: false },
  ];

  // 建议提问模板
  const suggestedQueries = [
    { title: 'dataAnalysis', icon: <Sparkles className="h-4 w-4" />, query: t('suggestedQuery1') },
    { title: 'dataInsight', icon: <BarChart2 className="h-4 w-4" />, query: t('suggestedQuery2') },
    { title: 'dataExploration', icon: <Search className="h-4 w-4" />, query: t('suggestedQuery3') },
    { title: 'dataConnection', icon: <Database className="h-4 w-4" />, query: t('suggestedQuery4') }
  ];
  
  // 消息发送处理
  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    // 创建用户消息
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: 'user',
      timestamp: new Date()
    };
    
    // 创建模拟的助手回复（加载状态）
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: '',
      role: 'assistant',
      timestamp: new Date(),
      isLoading: true
    };
    
    setMessages([...messages, userMessage, assistantMessage]);
    setInputValue('');
    setIsLoading(true);
    
    // 如果是空会话，设置会话标题
    if (messages.length === 0) {
      setConversationTitle(truncateTitle(inputValue));
    }
    
    // 模拟异步响应
    setTimeout(() => {
      const mockVisualData = generateMockVisualData(inputValue);
      const mockSuggestions = generateMockSuggestions();
      
      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages];
        const lastMessageIndex = updatedMessages.length - 1;
        
        updatedMessages[lastMessageIndex] = {
          ...updatedMessages[lastMessageIndex],
          content: `${t('这是对')} "${inputValue}" ${t('的分析结果。')}${getMockResponse(inputValue)}`,
          isLoading: false,
          visualData: mockVisualData,
          suggestions: mockSuggestions
        };
        
        return updatedMessages;
      });
      
      setIsLoading(false);
    }, 1500);
  };

  // 根据输入生成模拟视觉数据
  const generateMockVisualData = (query: string): VisualDataType[] => {
    // 根据查询内容决定返回什么类型的视觉数据
    if (query.includes('销售') || query.includes('趋势') || query.includes('分析') || 
        query.includes('sales') || query.includes('trends') || query.includes('analysis')) {
      return [{
        type: 'chart',
        data: {
          chartType: 'bar',
          title: t('季度销售趋势分析'),
          description: t('过去12个月的销售数据展示了明显的季节性模式')
        }
      }];
    }
    
    if (query.includes('数据') || query.includes('表格') || 
        query.includes('data') || query.includes('table')) {
      return [{
        type: 'table',
        data: {
          columns: [t('产品'), t('数量'), t('金额')],
          rows: [
            [t('产品A'), '120', '¥12,000'],
            [t('产品B'), '85', '¥8,500'],
            [t('产品C'), '200', '¥20,000']
          ]
        }
      }];
    }
    
    // 默认返回洞察类型
    return [{
      type: 'insight',
      data: {
        title: t('数据洞察'),
        points: [
          t('数据显示最近一个季度的增长率达到8%'),
          t('西部市场表现突出，增长了15%'),
          t('新产品线贡献了22%的增长')
        ]
      }
    }];
  };

  // 生成模拟的后续建议
  const generateMockSuggestions = () => {
    return [
      t('深入分析增长原因'),
      t('按区域比较销售表现'),
      t('预测下一季度趋势')
    ];
  };

  // 生成模拟的回应内容
  const getMockResponse = (query: string) => {
    if (query.includes('销售') || query.includes('sales')) {
      return t('销售数据显示上季度总计¥1,250万，同比增长8%。主要增长来自西部市场和新产品线。');
    }
    
    if (query.includes('趋势') || query.includes('trends')) {
      return t('数据显示呈现明显的上升趋势，特别是在过去6个月。趋势斜率约为每月2.5%的增长。');
    }
    
    if (query.includes('比较') || query.includes('compare')) {
      return t('对比分析显示A组比B组表现好15%，主要差异在转化率和客单价两个方面。');
    }
    
    return t('分析结果显示，数据中存在一些有趣的模式。您可以进一步探索特定维度或请求更详细的分析。');
  };
  
  // 截断长标题
  const truncateTitle = (text: string) => {
    return text.length > 20 ? text.substring(0, 20) + '...' : text;
  };
  
  // 处理Enter键发送消息
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 处理上下文菜单
  const handleContextMenu = (e: React.MouseEvent, messageId: string) => {
    e.preventDefault();
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    setSelectedMessageId(messageId);
    setIsContextMenuOpen(true);
  };

  // 处理上下文菜单项点击
  const handleContextMenuAction = (action: string) => {
    setIsContextMenuOpen(false);
    
    switch (action) {
      case 'explore':
        toast.success(t('exploreStarted'));
        break;
      case 'save':
        toast.success(t('itemSaved'));
        break;
      case 'export':
        toast.success(t('exportSuccessful'));
        break;
      default:
        break;
    }
  };

  // 处理建议点击
  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    // 自动聚焦输入框
    textareaRef.current?.focus();
  };
  
  // 自动调整输入框高度
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [inputValue]);
  
  // 滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // 获取当前激活的模型
  const activeModel = modelOptions.find(model => model.isActive);

  // 渲染消息中的视觉内容
  const renderVisualContent = (visualData: VisualDataType[]) => {
    if (!visualData || visualData.length === 0) return null;

    return visualData.map((item, index) => {
      switch (item.type) {
        case 'chart': {
          return (
            <div key={index} className="mt-3 bg-background border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-sm">{item.data.title}</h4>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <BarChart2 className="mr-2 h-4 w-4" />
                      <span>{t('changeChartType')}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Save className="mr-2 h-4 w-4" />
                      <span>{t('saveChart')}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Share className="mr-2 h-4 w-4" />
                      <span>{t('shareChart')}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="h-40 bg-muted/30 rounded flex items-center justify-center">
                <span className="text-muted-foreground text-sm">[{item.data.chartType} {t('chart')}]</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{item.data.description}</p>
            </div>
          );
        }
        case 'table': {
          return (
            <div key={index} className="mt-3 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-muted">
                    {item.data.columns.map((col, i) => (
                      <th key={i} className="border px-4 py-2 text-left font-medium">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {item.data.rows.map((row, i) => (
                    <tr key={i} className="border-b hover:bg-muted/50">
                      {row.map((cell, j) => (
                        <td key={j} className="border-x px-4 py-2">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        case 'insight': {
          return (
            <div key={index} className="mt-3 bg-primary/5 rounded-lg p-3">
              <h4 className="font-medium text-sm mb-2">{item.data.title}</h4>
              <ul className="space-y-1">
                {item.data.points.map((point, i) => (
                  <li key={i} className="text-sm flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        }
        default: {
          // TypeScript 类型守卫确保所有可能的类型都被处理
          const _exhaustiveCheck: never = item;
          return _exhaustiveCheck;
        }
      }
    });
  };
  
  return (
    <div className="flex h-full">
      {/* 左侧主会话区域 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部工具栏 - 默认最小化，滚动时显示 */}
        <div className="h-12 px-4 flex items-center justify-between border-b bg-background/80 backdrop-blur-sm">
          <h2 className="font-medium truncate">{conversationTitle}</h2>
          <div className="flex items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <Save className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{t('saveConversation')}</TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <Share className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{t('shareConversation')}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Database className="mr-2 h-4 w-4" />
                  <span>{t('manageDataSource')}</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bot className="mr-2 h-4 w-4" />
                  <span>{t('changeModel')}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>{t('conversationSettings')}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* 会话历史 */}
        <div className="flex-1 overflow-hidden relative">
          <ScrollArea className="h-full px-4 py-6">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-lg"
                >
                  <div className="bg-primary/10 p-4 rounded-full mb-4 mx-auto">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-3">{t('welcomeToDeepData')}</h3>
                  <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                    {t('conversationDescription')}
                  </p>
                  
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-md mx-auto">
                    {suggestedQueries.map((suggestion, i) => (
                      <Button
                        key={i}
                        variant="outline"
                        className="flex items-start text-left h-auto p-3 justify-start"
                        onClick={() => {
                          setInputValue(suggestion.query);
                          textareaRef.current?.focus();
                        }}
                      >
                        <div className="bg-primary/10 p-1.5 rounded-full mr-2">
                          {suggestion.icon}
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">{t(suggestion.title)}</h4>
                          <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                            {suggestion.query}
                          </p>
                        </div>
                      </Button>
                    ))}
                  </div>
                </motion.div>
              </div>
            ) : (
              <div className="max-w-3xl mx-auto space-y-6">
                <AnimatePresence>
                  {messages.map(message => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={cn(
                        "group",
                        message.role === 'user' ? "flex justify-end" : "flex justify-start"
                      )}
                    >
                      <div 
                        className={cn(
                          "max-w-[85%] rounded-2xl p-4",
                          message.role === 'user' 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-muted hover:bg-muted/80 transition-colors"
                        )}
                        onContextMenu={(e) => handleContextMenu(e, message.id)}
                      >
                        {message.isLoading ? (
                          <div className="flex items-center space-x-2 min-w-[60px]">
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            <span>{t('thinking')}</span>
                          </div>
                        ) : (
                          <div>
                            <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                            
                            {/* 视觉内容渲染（图表、表格等） */}
                            {message.role === 'assistant' && message.visualData && renderVisualContent(message.visualData)}
                            
                            {/* 建议按钮 */}
                            {message.role === 'assistant' && message.suggestions && (
                              <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t">
                                {message.suggestions.map((suggestion, index) => (
                                  <Button 
                                    key={index} 
                                    variant="secondary" 
                                    size="sm"
                                    className="h-7 text-xs bg-background hover:bg-background/90"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                  >
                                    {suggestion}
                                  </Button>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                        
                        {/* 悬停时显示的操作栏 */}
                        {message.role === 'assistant' && !message.isLoading && (
                          <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="flex">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                                      <Search className="h-3 w-3" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent side="bottom">{t('explore')}</TooltipContent>
                                </Tooltip>
                                
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                                      <Save className="h-3 w-3" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent side="bottom">{t('save')}</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>
            )}
          </ScrollArea>
        </div>
        
        {/* 输入区域 */}
        <div className="bg-background/70 backdrop-blur-sm p-4 border-t">
          <div className="mx-auto max-w-3xl relative">
            {/* 活跃模型标识 */}
            <div className="flex justify-center mb-2">
              <Badge variant="outline" className="bg-background/50 backdrop-blur-sm">
                <Bot className="h-3 w-3 mr-1" />
                {activeModel?.name} - {t(activeModel?.description || '')}
              </Badge>
            </div>
            
            <div className="flex items-end bg-background border rounded-2xl shadow-sm">
              <Textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={t('askAboutData')}
                className="min-h-[60px] max-h-[200px] border-0 focus-visible:ring-0 resize-none py-3 px-4 rounded-2xl"
                rows={1}
              />
              
              <div className="flex items-center px-3 pb-3">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" disabled={isLoading} className="rounded-full h-8 w-8">
                        <File className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">{t('attachFile')}</TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" disabled={isLoading} className="rounded-full h-8 w-8">
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">{t('attachImage')}</TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" disabled={isLoading} className="rounded-full h-8 w-8">
                        <Mic className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">{t('voiceInput')}</TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant={inputValue.trim() === '' ? "ghost" : "default"}
                        size="icon" 
                        className="rounded-full h-8 w-8 ml-1" 
                        disabled={inputValue.trim() === '' || isLoading}
                        onClick={handleSendMessage}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">{t('sendMessage')}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            
            {/* 底部说明文字 */}
            <p className="text-xs text-center text-muted-foreground mt-2">
              {t('dataPrivacyNotice')}
            </p>
          </div>
        </div>
      </div>
      
      {/* 右侧设置面板 - 可通过媒体查询在小屏幕上隐藏 */}
      <div className="w-80 border-l bg-muted/10 p-4 hidden lg:block">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-base font-medium">{t('conversationSettings')}</h3>
          <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-6">
          {/* 模型选择 */}
          <div>
            <h4 className="text-sm font-medium mb-2">{t('selectedModel')}</h4>
            <div className="space-y-2">
              {modelOptions.map(model => (
                <div
                  key={model.id}
                  className={cn(
                    "px-4 py-3 rounded-lg border cursor-pointer transition-colors",
                    model.isActive 
                      ? "bg-primary/10 border-primary" 
                      : "bg-background hover:bg-accent"
                  )}
                >
                  <div className="flex justify-between items-center">
                    <div className="font-medium text-sm">{model.name}</div>
                    {model.isActive && (
                      <Badge variant="default" className="text-[10px] h-5">
                        {t('active')}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t(model.description)}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* 上下文设置 */}
          <div>
            <h4 className="text-sm font-medium mb-2">{t('contextSettings')}</h4>
            <div className="space-y-1">
              {[
                { label: 'memoryLength', value: t('medium') },
                { label: 'responseStyle', value: t('balanced') },
                { label: 'expertiseLevel', value: t('advanced') }
              ].map((setting, i) => (
                <div key={i} className="flex justify-between items-center py-1.5">
                  <span className="text-sm text-muted-foreground">{t(setting.label)}</span>
                  <Badge variant="outline" className="bg-background text-[10px]">
                    {setting.value}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
          
          {/* 工具箱 */}
          <Collapsible className="border rounded-lg bg-background p-2">
            <CollapsibleTrigger asChild>
              <div className="flex justify-between items-center p-2 cursor-pointer hover:bg-accent rounded-md">
                <div className="flex items-center">
                  <Sparkles className="h-4 w-4 mr-2" />
                  <h4 className="text-sm font-medium">{t('toolbox')}</h4>
                </div>
                <ChevronDown className="h-4 w-4" />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="pt-2 space-y-1">
                {[
                  { name: 'dataProcessor', icon: <Database className="h-3.5 w-3.5" /> },
                  { name: 'dataVisualizer', icon: <BarChart2 className="h-3.5 w-3.5" /> },
                  { name: 'scriptExecutor', icon: <File className="h-3.5 w-3.5" /> }
                ].map((tool, idx) => (
                  <Button
                    key={idx}
                    variant="ghost"
                    className="w-full justify-start text-sm h-9"
                  >
                    <span className="mr-2">{tool.icon}</span>
                    {t(tool.name)}
                  </Button>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
          
          {/* 快速操作 */}
          <div>
            <h4 className="text-sm font-medium mb-2">{t('quickActions')}</h4>
            <div className="space-y-1">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Save className="h-3.5 w-3.5 mr-2" />
                {t('saveConversation')}
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Share className="h-3.5 w-3.5 mr-2" />
                {t('exportResults')}
              </Button>
            </div>
          </div>
          
          {/* 键盘快捷键 */}
          <div>
            <h4 className="text-sm font-medium mb-2">{t('keyboardShortcuts')}</h4>
            <div className="text-xs space-y-1.5 bg-muted/30 rounded-lg p-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Enter</span>
                <span>{t('sendMessage')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shift + Enter</span>
                <span>{t('newLine')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ctrl/⌘ + /</span>
                <span>{t('showAllShortcuts')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 使用selectedMessageId，避免警告 */}
      {isContextMenuOpen && selectedMessageId && (
        <div 
          className="fixed bg-background border rounded-lg shadow-md py-1 z-50 w-48"
          style={{ 
            left: `${contextMenuPosition.x}px`, 
            top: `${contextMenuPosition.y}px` 
          }}
        >
          <button
            className="flex items-center w-full px-3 py-1.5 text-sm hover:bg-accent"
            onClick={() => handleContextMenuAction('explore')}
          >
            <Search className="mr-2 h-4 w-4" />
            <span>{t('explore')}</span>
          </button>
          <button
            className="flex items-center w-full px-3 py-1.5 text-sm hover:bg-accent"
            onClick={() => handleContextMenuAction('save')}
          >
            <Save className="mr-2 h-4 w-4" />
            <span>{t('saveToCollection')}</span>
          </button>
          <button
            className="flex items-center w-full px-3 py-1.5 text-sm hover:bg-accent"
            onClick={() => handleContextMenuAction('export')}
          >
            <Share className="mr-2 h-4 w-4" />
            <span>{t('export')}</span>
          </button>
        </div>
      )}
    </div>
  );
}