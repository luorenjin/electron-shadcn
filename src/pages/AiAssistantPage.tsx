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
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { cn } from "@/utils/tailwind";

// 定义消息类型
interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  isLoading?: boolean;
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // 模拟的大模型列表
  const modelOptions: ModelOption[] = [
    { id: 'gpt-4', name: 'GPT-4', description: 'highCapacity', isActive: true },
    { id: 'claude-3', name: 'Claude 3', description: 'balancedModel', isActive: false },
    { id: 'qwen-plus', name: 'Qwen Plus', description: 'fastResponses', isActive: false },
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
    
    // 模拟异步响应
    setTimeout(() => {
      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages];
        const lastMessageIndex = updatedMessages.length - 1;
        
        updatedMessages[lastMessageIndex] = {
          ...updatedMessages[lastMessageIndex],
          content: `这是对 "${inputValue}" 的模拟响应。在实际应用中，这里将是AI模型的真实回复。`,
          isLoading: false
        };
        
        return updatedMessages;
      });
      
      setIsLoading(false);
    }, 1500);
  };
  
  // 处理Enter键发送消息
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // 滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // 获取当前激活的模型
  const activeModel = modelOptions.find(model => model.isActive);
  
  return (
    <div className="flex h-full">
      {/* 左侧主会话区域 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 会话历史 */}
        <div className="flex-1 overflow-hidden relative">
          <Card className="border-none bg-transparent shadow-none h-full flex flex-col">
            <ScrollArea className="flex-1 px-4 py-2">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                    <MessageSquare className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t('startConversation')}</h3>
                  <p className="text-muted-foreground max-w-md mb-8">{t('aiAssistantDescription')}</p>
                  
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 w-full max-w-2xl">
                    {[
                      { title: 'dataAnalysis', icon: <Sparkles className="h-5 w-5" />, query: t('suggestedQuery1') },
                      { title: 'textProcessing', icon: <Bot className="h-5 w-5" />, query: t('suggestedQuery2') },
                      { title: 'codeGeneration', icon: <File className="h-5 w-5" />, query: t('suggestedQuery3') },
                      { title: 'brainstorming', icon: <MessageSquare className="h-5 w-5" />, query: t('suggestedQuery4') }
                    ].map((suggestion, i) => (
                      <Button
                        key={i}
                        variant="outline"
                        className="flex items-start text-left h-auto p-4 justify-start"
                        onClick={() => {
                          setInputValue(suggestion.query);
                        }}
                      >
                        <div className="bg-primary/10 p-2 rounded-full mr-3">
                          {suggestion.icon}
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">{t(suggestion.title)}</h4>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {suggestion.query}
                          </p>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-6 pb-6">
                  {messages.map(message => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex",
                        message.role === 'user' ? "justify-end" : "justify-start"
                      )}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={cn(
                          "max-w-[80%] rounded-lg p-4",
                          message.role === 'user' 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-muted"
                        )}
                      >
                        {message.isLoading ? (
                          <div className="flex items-center space-x-2">
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            <span>{t('thinking')}</span>
                          </div>
                        ) : (
                          <div className="whitespace-pre-wrap">{message.content}</div>
                        )}
                      </motion.div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </ScrollArea>
          </Card>
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
            
            <div className="flex items-center bg-background border rounded-lg shadow-sm">
              <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={t('typeMessage')}
                className="min-h-[60px] max-h-[200px] border-0 focus-visible:ring-0 resize-none py-3 px-4"
              />
              
              <div className="flex items-center px-3 gap-1">
                <Button variant="ghost" size="icon" disabled={isLoading} className="rounded-full">
                  <File className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" disabled={isLoading} className="rounded-full">
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" disabled={isLoading} className="rounded-full">
                  <Mic className="h-4 w-4" />
                </Button>
                <Button 
                  size="icon" 
                  className="rounded-full ml-1" 
                  disabled={inputValue.trim() === '' || isLoading}
                  onClick={handleSendMessage}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 右侧设置面板 - 可通过媒体查询在小屏幕上隐藏 */}
      <div className="w-80 border-l bg-muted/30 p-4 hidden lg:block">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">{t('conversationSettings')}</h3>
          <Button variant="outline" size="icon" className="rounded-full">
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
                    "px-4 py-3 rounded-lg border cursor-pointer",
                    model.isActive 
                      ? "bg-primary/10 border-primary" 
                      : "bg-background hover:bg-accent"
                  )}
                >
                  <div className="flex justify-between items-center">
                    <div className="font-medium">{model.name}</div>
                    {model.isActive && (
                      <Badge variant="default" className="text-xs">
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
                <div key={i} className="flex justify-between items-center py-1">
                  <span className="text-sm text-muted-foreground">{t(setting.label)}</span>
                  <Badge variant="outline" className="bg-background">
                    {setting.value}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}