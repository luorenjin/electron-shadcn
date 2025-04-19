// filepath: d:\Work\AiDev\electron-shadcn\src\pages\AiAssistantPage.tsx
import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/utils/tailwind";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Send,
  Bot,
  User,
  PlusCircle,
  Share2,
  Trash2,
  BarChart2,
  BookmarkPlus,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";

// 消息类型定义
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isThinking?: boolean;
  hasChart?: boolean;
}

// 建议问题列表
const SUGGESTED_QUESTIONS = [
  "questionSuggestion1",
  "questionSuggestion2",
  "questionSuggestion3",
  "questionSuggestion4"
];

export default function AiAssistantPage() {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 自动滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 焦点到输入框
  useEffect(() => {
    // 短暂延迟，确保组件完全渲染
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // 发送消息处理函数
  const handleSend = async () => {
    if (!input.trim() && !isThinking) return;
    
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input,
      timestamp: new Date()
    };
    
    // 添加用户消息
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsThinking(true);
    
    // 添加思考中的消息
    const thinkingMessage: Message = {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content: "",
      timestamp: new Date(),
      isThinking: true
    };
    
    setMessages(prev => [...prev, thinkingMessage]);
    
    // 模拟 AI 回复（实际项目中会调用真实的 AI API）
    setTimeout(() => {
      setIsThinking(false);
      
      // 生成示例回复
      const reply = `这是对"${userMessage.content}"的回复。在实际产品中，这里会是真实的AI助手回答。`;
      
      // 添加一个随机图表示例（模拟真实数据可视化）
      const hasChart = userMessage.content.toLowerCase().includes("趋势") || 
                      userMessage.content.toLowerCase().includes("比较") || 
                      userMessage.content.toLowerCase().includes("分析");
      
      setMessages(prev => 
        prev.map(msg => 
          msg.isThinking ? {
            ...msg,
            content: reply,
            isThinking: false,
            hasChart
          } : msg
        )
      );
    }, 2000);
  };

  // 快速提问功能
  const handleQuickQuestion = (questionKey: string) => {
    setInput(t(questionKey));
    inputRef.current?.focus();
  };

  // 清除对话
  const handleClearConversation = () => {
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)]">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 px-4">
          <div className="w-full max-w-2xl text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Bot className="h-20 w-20 mx-auto mb-6 text-primary/60" />
              <h1 className="text-4xl font-bold tracking-tight mb-4">{t("conversation")}</h1>
              <p className="text-muted-foreground text-xl max-w-lg mx-auto">
                {t("askAnything")}
              </p>
            </motion.div>
            
            <div className="grid grid-cols-2 gap-3 mt-8">
              {SUGGESTED_QUESTIONS.map((key, index) => (
                <Button 
                  key={index}
                  variant="outline"
                  className="h-auto py-3 px-4 justify-start text-left"
                  onClick={() => handleQuickQuestion(key)}
                >
                  <span className="mr-2">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  {t(key)}
                </Button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <ScrollArea className="flex-1 px-4 py-4">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "flex max-w-[80%]",
                    message.role === "user" ? "flex-row" : "flex-row-reverse"
                  )}
                >
                  <div
                    className={cn(
                      "flex items-start justify-center rounded-full h-8 w-8 mt-1",
                      message.role === "user"
                        ? "bg-primary ml-2"
                        : "bg-muted mr-2"
                    )}
                  >
                    {message.role === "user" ? (
                      <User className="h-4 w-4 text-primary-foreground mt-2" />
                    ) : (
                      <Bot className="h-4 w-4 text-foreground mt-2" />
                    )}
                  </div>
                  <Card
                    className={cn(
                      "p-3",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    {message.isThinking ? (
                      <div className="flex items-center space-x-2">
                        <div className="text-sm">{t("aiThinking")}</div>
                        <div className="flex space-x-1">
                          <motion.span
                            className="h-1.5 w-1.5 bg-current rounded-full"
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ repeat: Infinity, duration: 0.8, repeatDelay: 0.2 }}
                          />
                          <motion.span
                            className="h-1.5 w-1.5 bg-current rounded-full"
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ repeat: Infinity, duration: 0.8, delay: 0.2, repeatDelay: 0.2 }}
                          />
                          <motion.span
                            className="h-1.5 w-1.5 bg-current rounded-full"
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ repeat: Infinity, duration: 0.8, delay: 0.4, repeatDelay: 0.2 }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                        
                        {/* 可视化图表示例（实际应用中会基于真实数据生成） */}
                        {message.hasChart && (
                          <div className="mt-3 p-3 bg-background/50 rounded-md">
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant="outline">数据可视化</Badge>
                              <p className="text-xs text-muted-foreground">示例图表</p>
                            </div>
                            <div className="h-[180px] bg-gradient-to-r from-primary/30 to-primary/10 rounded-md flex items-center justify-center">
                              <BarChart2 className="h-12 w-12 text-primary/50" />
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                              基于您的查询生成的数据可视化。在实际产品中，这里将是基于真实数据的交互式图表。
                            </p>
                          </div>
                        )}
                        
                        {/* 助手消息的操作按钮 */}
                        {message.role === "assistant" && !message.isThinking && (
                          <div className="flex items-center space-x-2 mt-3 justify-end">
                            <Button size="icon" variant="ghost" className="h-7 w-7">
                              <Share2 className="h-3.5 w-3.5" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-7 w-7">
                              <BookmarkPlus className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </Card>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      )}

      {/* 底部输入区域 */}
      <div className="border-t p-4 bg-background/80 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto flex flex-col space-y-2">
          <div className="flex space-x-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={t("typeYourQuestion")}
              className="flex-1"
              disabled={isThinking}
            />
            <Button onClick={handleSend} disabled={!input.trim() || isThinking}>
              <Send className="h-4 w-4 mr-1" />
              {t("sendMessage")}
            </Button>
          </div>
          
          {messages.length > 0 && (
            <div className="flex justify-between items-center pt-1">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground"
                onClick={handleClearConversation}
              >
                <Trash2 className="h-3.5 w-3.5 mr-1" />
                {t("clearConversation")}
              </Button>
              
              <div className="text-xs text-muted-foreground">
                {t("conversation")} · DeepData AI
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground"
              >
                <PlusCircle className="h-3.5 w-3.5 mr-1" />
                {t("saveToCollection")}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}