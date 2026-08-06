// ======================================
// TOOLXONE FINANCE ENGINE
// ======================================

function createFinanceCalculator(config) {

    // Build calculator UI
    renderCalculator(config);

    // Info section
    if (config.info) {
        renderFinanceInfo(
            "financeInfo",
            config.info.title,
            config.info.description
        );
    }

    // FAQ section
    if (config.faq) {
        renderFinanceFAQ(
            "financeFAQ",
            config.faq
        );
    }

     // Reviews section
    renderToolReviews(
    "tool-reviews",
    "Scientific Calculator"
);

    // Feedback
renderFinanceFeedback(
    "financeFeedback",
    config.title || "ToolXone Tool"
);

    // Related Tools
    initializeRelatedTools(config.id);

}