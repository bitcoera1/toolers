/**
 * ==========================================================
 * ToolXone Statistics Dashboard
 * Version: 1.0
 * ==========================================================
 * Updates statistics in the UI.
 * ==========================================================
 */

const ToolXoneStatisticsDashboard = (() => {
    let previousAnalytics = null;

    function updateElement(id, value) {

    const element = document.getElementById(id);

    if (!element) {

        return;

    }

    if (typeof value === "number") {

        ToolXoneStatisticsAnimation.animateValue(

            element,

            value

        );

    }

    else {

        element.textContent = value;

    }

}

function updateIfChanged(id, newValue, oldValue) {

    if (newValue !== oldValue) {

        updateElement(id, newValue);

    }

}

    function refresh() {

        
    const analytics =
        ToolXoneStatisticsIntelligence.getAnalytics();

       
    if (!analytics) {

        return;

    }

    /*
    ----------------------------------------
    Totals
    ----------------------------------------
    */

    updateElement(

        "tx-total-actions",

        analytics.totals.tool_actions || 0

    );

    updateElement(

        "tx-total-calculations",

        analytics.totals.calculations || 0

    );

    updateElement(

        "tx-total-conversions",

        analytics.totals.conversions || 0

    );

    updateElement(

        "tx-total-utilities",

        analytics.totals.utilities || 0

    );

    updateElement(

        "tx-total-ai",

        analytics.categories.ai || 0

    );

updateElement(
    "totalToolActions",
    analytics.totals.tool_actions || 0
);

updateIfChanged(

    "totalFinance",

    analytics.categories.finance || 0,

    previousAnalytics
        ? previousAnalytics.categories.finance
        : undefined

);

updateElement(

    "totalHealth",

    analytics.categories.health || 0

);

updateElement(

    "totalQR",

    analytics.categories.qr || 0

);

updateElement(

    "totalAI",

    analytics.categories.ai || 0

);

updateElement(

    "totalPDF",

    analytics.categories.pdf || 0

);

updateElement(

    "totalText",

    analytics.categories.text || 0

);

updateIfChanged(

    "mostUsedTool",

    analytics.mostUsedTool
        ? analytics.mostUsedTool.tool_name
        : "No Data",

    previousAnalytics?.mostUsedTool?.tool_name

);

previousAnalytics = structuredClone(analytics);

}

    return {

        refresh

    };

})();