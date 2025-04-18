import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  fallbackLng: "zh-CN",
  resources: {
    en: {
      translation: {
        appName: "DeepData",
        aiDataAssistant: "AI Data Assistant",
        
        // 导航菜单
        dashboard: "Dashboard",
        dataCollect: "Data Collection",
        dataProcess: "Data Processing",
        dataAnalysis: "Data Analysis",
        aiAssistant: "AI Assistant",
        knowledgeBase: "Knowledge Base",
        settings: "Settings",
        
        // 首页
        welcomeMessage: "Welcome to DeepData",
        dashboardDescription: "Your intelligent data assistant, helping you collect, process, and analyze data efficiently.",
        features: "Core Features",
        explore: "Explore",
        quickTips: "Quick Tips",
        
        // 首页统计卡片
        totalDataSources: "Data Sources",
        processedDatasets: "Processed Datasets",
        aiInteractions: "AI Interactions",
        systemActivity: "System Status",
        normal: "Normal",
        
        // 功能描述
        dataCollectDesc: "Connect to various data sources and collect data from files, APIs, databases and web pages.",
        dataProcessDesc: "Clean, transform, merge and format your data for analysis and visualization.",
        dataAnalysisDesc: "Visualize data patterns and gain insights through interactive charts and AI-powered analysis.",
        aiAssistantDesc: "Leverage AI models to assist with data tasks and answer your questions through natural language.",
        knowledgeBaseDesc: "Store and manage your knowledge for easy retrieval and integration with AI assistants.",
        
        // 快速提示
        quickTip1: "Start by adding a data source in the Data Collection section.",
        quickTip2: "Use AI Assistant to help you analyze data through natural language.",
        quickTip3: "Save frequently used charts and insights to the Knowledge Base for future reference.",
        
        // 命令面板
        commandPalettePlaceholder: "Type a command or search...",
        noResultsFound: "No results found.",
        navigation: "Navigation",
        actions: "Actions",
        help: "Help",
        documentation: "Documentation",
        newProject: "New Project",
        filterData: "Filter Data",
        saveWorkspace: "Save Workspace",
        refreshData: "Refresh Data",
        
        // 其他页面
        titleHomePage: "Home",
        titleSecondPage: "Second Page",
        
        // 页面通用
        pageUnderConstruction: "Page under construction. Coming soon!",
        
        // 设置页面
        settingsDesc: "Configure your DeepData application preferences",
        appearance: "Appearance",
        theme: "Theme",
        language: "Language",
        selectLanguage: "Select Language",
        developer: "Developer Options",
        debugMode: "Debug Mode",
        debugModeDesc: "Enable to display detailed debug information and logs",
        
        // UI 元素
        close: "Close",
        cancel: "Cancel",
        confirm: "Confirm",
        save: "Save",
        edit: "Edit",
        delete: "Delete",
        search: "Search",
        loading: "Loading",
        noData: "No Data",
        
        // 数据采集页面
        dataSourceType: "Data Source Type",
        localFiles: "Local Files",
        database: "Database",
        apiEndpoint: "API Endpoint",
        webCrawler: "Web Crawler",
        addDataSource: "Add Data Source",
        dataSourceList: "Data Source List",
        
        // 数据处理页面
        dataTransform: "Data Transformation",
        dataClean: "Data Cleaning",
        dataMerge: "Data Merge",
        dataExport: "Data Export",
        
        // 数据分析页面
        visualization: "Visualization",
        statistics: "Statistics",
        prediction: "Prediction",
        insights: "Insights",
        
        // 智能助手页面
        askQuestion: "Ask a question",
        modelSettings: "Model Settings",
        historyConversation: "History Conversations",
        
        // 知识库页面
        addKnowledge: "Add Knowledge",
        knowledgeCategory: "Knowledge Category",
        searchKnowledge: "Search Knowledge",
      },
    },
    "zh-CN": {
      translation: {
        appName: "DeepData",
        aiDataAssistant: "AI 数据助手",
        
        // 导航菜单
        dashboard: "仪表盘",
        dataCollect: "数据采集",
        dataProcess: "数据处理",
        dataAnalysis: "数据分析",
        aiAssistant: "智能助手",
        knowledgeBase: "知识库",
        settings: "设置",
        
        // 首页
        welcomeMessage: "欢迎使用 DeepData",
        dashboardDescription: "您的智能数据助手，帮助您高效地收集、处理和分析数据。",
        features: "核心功能",
        explore: "立即探索",
        quickTips: "快速提示",
        
        // 首页统计卡片
        totalDataSources: "数据源数量",
        processedDatasets: "已处理数据集",
        aiInteractions: "AI 交互次数",
        systemActivity: "系统状态",
        normal: "正常",
        
        // 功能描述
        dataCollectDesc: "连接各种数据源，从文件、API、数据库和网页收集数据。",
        dataProcessDesc: "清洗、转换、合并和格式化数据，为分析和可视化做准备。",
        dataAnalysisDesc: "通过交互式图表和 AI 驱动的分析来可视化数据模式并获取洞察力。",
        aiAssistantDesc: "利用 AI 模型协助完成数据任务，并通过自然语言回答您的问题。",
        knowledgeBaseDesc: "存储和管理您的知识，以便于检索和与 AI 助手集成。",
        
        // 快速提示
        quickTip1: "从数据采集部分添加数据源开始。",
        quickTip2: "使用智能助手通过自然语言帮助您分析数据。",
        quickTip3: "将常用图表和见解保存到知识库，方便未来参考。",
        
        // 命令面板
        commandPalettePlaceholder: "输入命令或搜索...",
        noResultsFound: "未找到结果。",
        navigation: "导航",
        actions: "操作",
        help: "帮助",
        documentation: "文档",
        newProject: "新建项目",
        filterData: "筛选数据",
        saveWorkspace: "保存工作区",
        refreshData: "刷新数据",
        
        // 其他页面
        titleHomePage: "首页",
        titleSecondPage: "第二页",
        
        // 页面通用
        pageUnderConstruction: "页面正在建设中，敬请期待！",
        
        // 设置页面
        settingsDesc: "配置您的 DeepData 应用程序首选项",
        appearance: "外观",
        theme: "主题",
        language: "语言",
        selectLanguage: "选择语言",
        developer: "开发者选项",
        debugMode: "调试模式",
        debugModeDesc: "开启后将显示详细调试信息和日志",
        
        // UI 元素
        close: "关闭",
        cancel: "取消",
        confirm: "确认",
        save: "保存",
        edit: "编辑",
        delete: "删除",
        search: "搜索",
        loading: "加载中",
        noData: "无数据",
        
        // 数据采集页面
        dataSourceType: "数据源类型",
        localFiles: "本地文件",
        database: "数据库",
        apiEndpoint: "API 接口",
        webCrawler: "网页爬虫",
        addDataSource: "添加数据源",
        dataSourceList: "数据源列表",
        
        // 数据处理页面
        dataTransform: "数据转换",
        dataClean: "数据清洗",
        dataMerge: "数据合并",
        dataExport: "数据导出",
        
        // 数据分析页面
        visualization: "可视化",
        statistics: "统计分析",
        prediction: "预测分析",
        insights: "数据洞察",
        
        // 智能助手页面
        askQuestion: "提问",
        modelSettings: "模型设置",
        historyConversation: "历史对话",
        
        // 知识库页面
        addKnowledge: "添加知识",
        knowledgeCategory: "知识分类",
        searchKnowledge: "搜索知识",
      },
    },
    // 简化其他语言的翻译，留下基本结构
    "pt-BR": {
      translation: {
        appName: "DeepData",
        aiDataAssistant: "Assistente de Dados IA",
        
        // UI 元素
        close: "Fechar",
        cancel: "Cancelar",
        confirm: "Confirmar",
        save: "Salvar",
        // ...其他翻译
      },
    },
    "zh-TW": {
      translation: {
        appName: "DeepData",
        aiDataAssistant: "AI 數據助手",
        
        // UI 元素
        close: "關閉",
        cancel: "取消",
        confirm: "確認",
        save: "保存",
        // ...其他翻译
      },
    },
  },
});
