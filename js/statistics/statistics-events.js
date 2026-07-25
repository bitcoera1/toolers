/**
 * ==========================================================
 * ToolXone Statistics Events
 * Version: 1.1.0
 * ==========================================================
 * Public event layer for ToolXone.
 *
 * Every ToolXone tool should call these methods instead of
 * talking directly to the Statistics Engine.
 * ==========================================================
 */

const ToolXoneStatisticsEvents = (() => {

    /*
    ----------------------------------------
    Internal Event Recorder
    ----------------------------------------
    */
   async function recordEvent(toolId) {

    ToolXoneStatistics.record(toolId);

    try {

        await StatisticsService.recordTool(toolId);

    }

    catch (error) {

        console.error(
            "Statistics Router Error:",
            error
        );

    }

}

    /**
     * Successful calculator action
     */
    function recordCalculation(toolId) {

    return recordEvent(toolId);

}

    /**
     * Successful converter action
     */
    function recordConversion(toolId) {

    return recordEvent(toolId);

}

    /**
     * Successful utility action
     */
    function recordUtility(toolId) {

    return recordEvent(toolId);

}

    /**
     * Successful AI generation
     */
    function recordAIGeneration(toolId) {

    return recordEvent(toolId);

}

    return {

        recordCalculation,

        recordConversion,

        recordUtility,

        recordAIGeneration

    };

})();