import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { 
  Layers, 
  FileCode, 
  BarChart3 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DataHubPage() {
  const { t } = useTranslation();
  
  const modules = [
    {
      title: "dataSources",
      description: "dataSourcesDesc",
      icon: <Layers className="h-8 w-8" />,
      path: "/data-collect"
    },
    {
      title: "datasets",
      description: "datasetsDesc",
      icon: <FileCode className="h-8 w-8" />,
      path: "/data-process"
    },
    {
      title: "analytics",
      description: "analyticsDesc",
      icon: <BarChart3 className="h-8 w-8" />,
      path: "/data-analysis"
    }
  ];
  
  return (
    <div className="container py-6">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t("dataHub")}</h1>
        <p className="text-muted-foreground">{t("dataHubDesc")}</p>
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