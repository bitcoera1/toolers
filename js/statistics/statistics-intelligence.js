/**
 * ==========================================================
 * ToolXone Statistics Intelligence
 * Version: 1.0.0
 * ==========================================================
 *
 * Analytics Brain of the ToolXone Statistics System.
 *
 * Responsibilities
 * ----------------------------------------------------------
 * - Analyze statistics data
 * - Generate analytics
 * - Determine insights
 * - Prepare dashboard data
 *
 * This module NEVER:
 * - Fetches APIs
 * - Updates HTML
 * - Manipulates CSS
 * - Records statistics
 *
 * ==========================================================
 */

const ToolXoneStatisticsIntelligence = (() => {

    /**
     * Internal analytics cache
     */
    let analytics = {

        totals: {},

        categories: {},

        mostUsedTool: null,

        topTools: [],

        generatedAt: null

    };

    /**
 * Analyze statistics
 *
 * @param {Array} summary
 * @param {Array} tools
 */


function analyze(summary = [], tools = []) {

    reset();

    /*
    ----------------------------------------
    Summary Statistics
    ----------------------------------------
    */

summary.forEach(item => {

    analytics.totals[item.stat_key] =
    Number(item.stat_value) || 0;

});

    /*
    ----------------------------------------
    Categories
    ----------------------------------------
    */

    analytics.categories = {

        finance: analytics.totals.finance_tools || 0,

        health: analytics.totals.health_tools || 0,

        utilities: analytics.totals.utilities || 0,

        qr: analytics.totals.qr_codes || 0,

        ai: analytics.totals.ai_banners || 0,

        text: analytics.totals.text_tools || 0,

        pdf: analytics.totals.pdf_tools || 0

    };

    /*
    ----------------------------------------
    Tool Rankings
    ----------------------------------------
    */

    analytics.topTools = [...tools]
        .sort((a, b) => b.usage_count - a.usage_count);

    analytics.mostUsedTool =
        analytics.topTools.length
            ? analytics.topTools[0]
            : null;

    /*
    ----------------------------------------
    Timestamp
    ----------------------------------------
    */

    analytics.generatedAt = new Date();

    return analytics;

}

    /**
     * Get latest analytics
     */
    function getAnalytics() {

        return analytics;

    }

    /**
     * Reset analytics
     */
    function reset() {

        analytics = {

            totals: {},

            categories: {},

            mostUsedTool: null,

            topTools: [],

            generatedAt: null

        };

    }

    return {

        analyze,

        getAnalytics,

        reset

    };

})();