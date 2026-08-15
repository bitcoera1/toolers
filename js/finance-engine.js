// ======================================
// TOOLXONE FINANCE ENGINE
// ======================================

function createFinanceCalculator(config) {

    // Build calculator UI
    renderCalculator(config);

    // Reviews section
renderToolReviews(
    "tool-reviews",
    config.title || "ToolXone Tool"
);

    // Feedback
renderFinanceFeedback(
    "financeFeedback",
    config.title || "ToolXone Tool"
);

    // Related Tools

}