function renderCalculator(config) {

    document.querySelector(".calculator-title").textContent =
        `${config.icon} ${config.title}`;

    document.querySelector(".tool-subtitle").textContent =
        config.subtitle;

    renderForm("calculatorForm", config.fields);


    /* ======================================
       LIVE VALIDATION RECOVERY
       Stage 5C.3.6
    ====================================== */

    if (
        window.ToolXoneValidationUI &&
        typeof ToolXoneValidationUI.enableLiveRecovery === "function"
    ) {
        const calculatorForm =
            document.getElementById("calculatorForm");

        if (calculatorForm) {
            ToolXoneValidationUI.enableLiveRecovery(
                calculatorForm
            );
        }
    }

}