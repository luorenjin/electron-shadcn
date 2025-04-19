import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { 
  Terminal, 
  Brain, 
  BookOpen 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AiToolkitPage() {
  const { t } = useTranslation();
  
  const modules = [
    {
      title: "assistant",
      description: "aiAssistantDesc",
      icon: <Terminal className="h-8 w-8" />,
      path: "/ai-assistant"
    },
    {
      title: "models",
      description: "modelsDesc",
      icon: <Brain className="h-8 w-8" />,
      path: "/ai-models"
    },
    {
      title: "knowledge",
      description: "knowledgeDesc",
      icon: <BookOpen className="h-8 w-8" />,
      path: "/knowledge-base"
    }
  ];
  
  return (
    <div className="container py-6">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t("aiToolkit")}</h1>
        <p className="text-muted-foreground">{t("aiToolkitDesc")}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map(module => (
          <Card key={module.title} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-3">
                {module.icon}
                <CardTitle>{t(module.title)}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="min-h-[60px]">
                {t(module.description)}
              </CardDescription>
            </CardContent>
            <CardFooter className="pt-2">
              <Button asChild>
                <Link to={module.path}>
                  {t("open")}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}