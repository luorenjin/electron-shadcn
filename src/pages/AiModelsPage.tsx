import React from "react";
import { useTranslation } from "react-i18next";
import { Brain, PlusCircle } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ModelItem {
  id: string;
  name: string;
  provider: string;
  type: string;
  status: "active" | "inactive";
}

export default function AiModelsPage() {
  const { t } = useTranslation();
  
  // 模拟一些模型数据
  const models: ModelItem[] = [
    { id: "1", name: "GPT-4o", provider: "OpenAI", type: "text-generation", status: "active" },
    { id: "2", name: "Claude 3", provider: "Anthropic", type: "text-generation", status: "active" },
    { id: "3", name: "Gemini Pro", provider: "Google", type: "multimodal", status: "inactive" },
    { id: "4", name: "Embedding Model", provider: "OpenAI", type: "embedding", status: "active" },
    { id: "5", name: "Qwen-7B", provider: "Aliyun", type: "text-generation", status: "active" },
  ];
  
  return (
    <div className="container py-6">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Brain className="h-6 w-6" />
            <h1 className="text-3xl font-bold tracking-tight">{t("models")}</h1>
          </div>
          <p className="text-muted-foreground">{t("modelsPageDesc")}</p>
        </div>
        
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          {t("addModel")}
        </Button>
      </div>
      
      <Table>
        <TableCaption>{t("modelsTableCaption")}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>{t("modelName")}</TableHead>
            <TableHead>{t("provider")}</TableHead>
            <TableHead>{t("type")}</TableHead>
            <TableHead>{t("status")}</TableHead>
            <TableHead className="text-right">{t("actions")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {models.map(model => (
            <TableRow key={model.id}>
              <TableCell className="font-medium">{model.name}</TableCell>
              <TableCell>{model.provider}</TableCell>
              <TableCell>{model.type}</TableCell>
              <TableCell>
                <Badge variant={model.status === "active" ? "default" : "secondary"}>
                  {model.status === "active" ? t("active") : t("inactive")}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm">
                  {t("manage")}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}