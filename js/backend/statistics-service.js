/*
====================================================

ToolXone Backend

Statistics Service

Version:
1.0.0

Responsibility

Handle statistics
business logic.

====================================================
*/

const StatisticsService = {

    _summary: [],

    _tools: [],

    _isRefreshing: false,

    async incrementToolAction() {

        return StatisticsAPI.increment(
            "tool_actions"
        );

    },

    
    async incrementCalculation() {

        await StatisticsAPI.increment(
            "calculations"
        );

        await this.incrementToolAction();

    },

    async incrementUtility() {

    return StatisticsAPI.increment(
        "utilities"
    );

},

    async incrementConversion() {

        await StatisticsAPI.increment(
            "conversions"
        );

        await this.incrementToolAction();

    },

    async incrementFinanceTool() {

        await StatisticsAPI.increment(
            "finance_tools"
        );

        await this.incrementToolAction();

    },

    async incrementHealthTool() {

        await StatisticsAPI.increment(
            "health_tools"
        );

        await this.incrementToolAction();

    },

    async incrementQRCode() {

        await StatisticsAPI.increment(
            "qr_codes"
        );

        await this.incrementToolAction();

    },

    async incrementAIBanner() {

        await StatisticsAPI.increment(
            "ai_banners"
        );

        await this.incrementToolAction();

    },

    async incrementPDFTool() {

        await StatisticsAPI.increment(
            "pdf_tools"
        );

        await this.incrementToolAction();

    },

    async incrementTextTool() {

        await StatisticsAPI.increment(
            "text_tools"
        );

        await this.incrementToolAction();

    },

    async recordTool(toolId) {

    const tool = ToolXoneToolsRegistry.find(

        item => item.id === toolId

    );

    if (!tool) {

        console.warn(

            "Statistics Router: Unknown tool:",

            toolId

        );

        
        return;

    }

    await StatisticsAPI.recordTool(
    tool.id,
    tool.name
);

    const statisticsCategory = tool.statisticsCategory;

    switch (statisticsCategory) {

    case "calculator":

        await this.incrementCalculation();

        break;

    case "finance":

        await this.incrementCalculation();

        await this.incrementFinanceTool();

        break;

    case "health":

        await this.incrementCalculation();

        await this.incrementHealthTool();

        break;

    case "converter":

        await this.incrementConversion();

        break;

    case "utility":

    await this.incrementUtility();
    await this.incrementToolAction();

    break;

    case "qr":

        await this.incrementQRCode();

        break;

    case "ai":

        await this.incrementAIBanner();

        break;

    case "pdf":

        await this.incrementPDFTool();

        break;

    case "text":

        await this.incrementTextTool();

        break;

    default:

        console.warn(

            "Statistics Router: Unknown statistics category:",

            statisticsCategory

        );

}

},

    async refreshStatistics() {

    if (this._isRefreshing) {

        return false;

    }

    this._isRefreshing = true;

    try {

        const response = await StatisticsAPI.getAll();

        if (
            !response ||
            !response.success
        ) {

            return false;

        }

        const summary = response.summary || [];

        const tools = response.tools || [];

        this._summary = summary;

        this._tools = tools;

        ToolXoneStatisticsIntelligence.analyze(

            summary,

            tools

        );

        ToolXoneStatisticsDashboard.refresh();

        return true;

    }

    finally {

        this._isRefreshing = false;

    }

},

    getSummary() {

        return this._summary;

    },

    getTools() {

        return this._tools;

    }

};

Object.freeze(StatisticsService);