import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  fallbackLng: "zh-CN",
  resources: {
    en: {
      translation: {
        appName: "DeepData",
        aiDataAssistant: "AI Data Assistant",
        
        // 三大核心支柱
        conversation: "Conversation",
        canvas: "Canvas",
        collection: "Collection",
        askAnything: "Ask anything about your data",
        dataCreationSpace: "Create interactive data stories",
        dataLibrary: "Your organized data collection",
        
        // 新导航菜单
        coreFeatures: "Core Features",
        toolsAndSettings: "Tools & Settings",
        overview: "Overview & Recent Activities",
        connectData: "Connect to data sources",
        processData: "Process & transform data",
        knowledgeBase: "Knowledge & insights",
        appSettings: "Application settings",
        connected: "Connected",
        minimize: "Minimize",
        
        // 导航菜单 - 重构后
        workspace: "Workspace",
        dataHub: "Data Hub",
        dataHubDesc: "Collect, process and analyze your data in one place",
        dataSources: "Data Sources",
        dataSourcesDesc: "Connect and collect data from various sources including files, APIs, databases and websites",
        datasets: "Datasets",
        datasetsDesc: "Transform, clean and prepare your data for analysis",
        analytics: "Analytics",
        analyticsDesc: "Visualize and gain insights from your data through charts and AI analysis",
        aiToolkit: "Toolkit",
        aiToolkitDesc: "Access AI tools and models to enhance your data workflow",
        assistant: "Assistant",
        models: "Models",
        modelsDesc: "Manage your AI models and their configurations",
        knowledge: "Knowledge",
        knowledgeDesc: "Organize and access your knowledge base for AI-powered assistance",
        settings: "Settings",
        
        // 对话页面
        typeYourQuestion: "What would you like to know?",
        sendMessage: "Send",
        clearConversation: "Clear conversation",
        suggestedQuestions: "Suggested questions",
        questionSuggestion1: "Show me trends in my sales data",
        questionSuggestion2: "Analyze customer feedback sentiment",
        questionSuggestion3: "Compare this month's metrics to last month",
        questionSuggestion4: "Find anomalies in my transaction data",
        aiThinking: "Thinking...",
        shareConversation: "Share this conversation",
        saveToCollection: "Save to collection",
        
        // 画布页面
        canvasEmptyState: "Start creating your data story",
        addVisualization: "Add visualization",
        addText: "Add text",
        addData: "Add data",
        layoutOptions: "Layout options",
        saveCanvas: "Save canvas",
        exportCanvas: "Export",
        canvasTemplates: "Templates",
        dragAndDrop: "Drag and drop elements here",
        
        // 藏品页面
        recentItems: "Recent items",
        favorites: "Favorites",
        allCollections: "All collections",
        addToCollection: "Add to collection",
        createCollection: "Create collection",
        searchCollections: "Search collections",
        noCollectionsFound: "No collections found",
        collectionDetails: "Collection details",
        
        // 按钮
        open: "Open",
        manage: "Manage",
        addModel: "Add Model",
        
        // 模型页面
        modelsPageDesc: "Manage and configure AI models for your applications",
        modelsTableCaption: "A list of your available AI models",
        modelName: "Model Name",
        provider: "Provider", 
        type: "Type",
        status: "Status",
        active: "Active",
        inactive: "Inactive",
        
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
        
        // 原有的导航菜单 - 保留向后兼容
        dashboard: "Dashboard",
        dataCollect: "Data Collection",
        dataProcess: "Data Processing",
        dataAnalysis: "Data Analysis",
        aiAssistant: "AI Assistant",
      },
    },
    "zh-CN": {
      translation: {
        appName: "DeepData",
        aiDataAssistant: "AI 数据助手",
        
        // 三大核心支柱
        conversation: "对话",
        canvas: "画布",
        collection: "藏品",
        askAnything: "询问任何数据相关问题",
        dataCreationSpace: "创建交互式数据故事",
        dataLibrary: "您的有序数据收藏",
        
        // 新导航菜单
        coreFeatures: "核心功能",
        toolsAndSettings: "工具与设置",
        overview: "概览与最近活动",
        connectData: "连接数据源",
        processData: "处理与转换数据",
        knowledgeBase: "知识与洞察",
        appSettings: "应用程序设置",
        connected: "已连接",
        minimize: "最小化",
        
        // 导航菜单 - 重构后
        workspace: "工作台",
        dataHub: "数据中心",
        dataHubDesc: "在一个地方收集、处理和分析您的数据",
        dataSources: "数据源",
        dataSourcesDesc: "连接并从文件、API、数据库和网站等各种来源收集数据",
        datasets: "数据集",
        datasetsDesc: "转换、清洗和准备数据以进行分析",
        analytics: "数据分析",
        analyticsDesc: "通过图表和AI分析可视化数据并获取洞察",
        aiToolkit: "工具箱",
        aiToolkitDesc: "访问AI工具和模型，增强数据工作流程",
        assistant: "智能助手",
        models: "模型管理",
        modelsDesc: "管理您的AI模型及其配置",
        knowledge: "知识库",
        knowledgeDesc: "组织和访问您的知识库，以获得AI驱动的帮助",
        settings: "设置",
        
        // 对话页面
        typeYourQuestion: "您想了解什么？",
        sendMessage: "发送",
        clearConversation: "清除对话",
        suggestedQuestions: "建议问题",
        questionSuggestion1: "显示我的销售数据趋势",
        questionSuggestion2: "分析客户反馈情绪",
        questionSuggestion3: "比较本月指标与上月的差异",
        questionSuggestion4: "查找交易数据中的异常",
        aiThinking: "思考中...",
        shareConversation: "分享此对话",
        saveToCollection: "保存到藏品",
        
        // 画布页面
        canvasEmptyState: "开始创建您的数据故事",
        addVisualization: "添加可视化",
        addText: "添加文本",
        addData: "添加数据",
        layoutOptions: "布局选项",
        saveCanvas: "保存画布",
        exportCanvas: "导出",
        canvasTemplates: "模板",
        dragAndDrop: "在此处拖放元素",
        
        // 藏品页面
        recentItems: "最近项目",
        favorites: "收藏夹",
        allCollections: "所有藏品",
        addToCollection: "添加到藏品",
        createCollection: "创建藏品",
        searchCollections: "搜索藏品",
        noCollectionsFound: "未找到藏品",
        collectionDetails: "藏品详情",
        
        // 按钮
        open: "打开",
        manage: "管理",
        addModel: "添加模型",
        
        // 模型页面
        modelsPageDesc: "管理和配置应用程序的AI模型",
        modelsTableCaption: "您可用的AI模型列表",
        modelName: "模型名称",
        provider: "提供商", 
        type: "类型",
        status: "状态",
        active: "活跃",
        inactive: "未激活",
        
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
        
        // 原有的导航菜单 - 保留向后兼容
        dashboard: "仪表盘",
        dataCollect: "数据采集",
        dataProcess: "数据处理",
        dataAnalysis: "数据分析",
        aiAssistant: "智能助手",
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
