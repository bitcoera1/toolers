/* =========================================
   TOOLXONE INLINE VALIDATION UI
   Stage 5C.3
   Shared field-error presentation layer
========================================= */

(function () {
    "use strict";

    const ERROR_CLASS = "toolxone-field-error";
    const INVALID_CLASS = "toolxone-field-invalid";

    function getFieldElement(fieldId) {
        if (!fieldId) return null;
        return document.getElementById(fieldId);
    }

    function getErrorId(fieldId) {
        return `${fieldId}-error`;
    }

    function getErrorElement(fieldId) {
        return document.getElementById(getErrorId(fieldId));
    }

    function removeFieldError(fieldId) {
        const field = getFieldElement(fieldId);
        const errorElement = getErrorElement(fieldId);

        if (field) {
            field.classList.remove(INVALID_CLASS);
            field.setAttribute("aria-invalid", "false");

            /*
             * Keep aria-describedby because form-engine.js
             * permanently links the field to its error slot.
             */
        }

        if (errorElement) {
            errorElement.textContent = "";
            errorElement.classList.remove(ERROR_CLASS);
            errorElement.hidden = true;
        }
    }

    function showFieldError(fieldId, message) {
        const field = getFieldElement(fieldId);

        if (!field) return false;

        const errorId = getErrorId(fieldId);
        let errorElement = getErrorElement(fieldId);

        /*
         * Preferred path:
         * form-engine.js already created the validation slot.
         *
         * Fallback path:
         * support older/static forms that do not yet have one.
         */
        if (!errorElement) {
            errorElement = document.createElement("div");
            errorElement.id = errorId;
            errorElement.className = "validation-message";
            errorElement.setAttribute("role", "alert");
            errorElement.setAttribute("aria-live", "polite");

            field.insertAdjacentElement("afterend", errorElement);
        }

        errorElement.textContent = message;
        errorElement.classList.add(ERROR_CLASS);
        errorElement.hidden = false;

        field.classList.add(INVALID_CLASS);
        field.setAttribute("aria-invalid", "true");
        field.setAttribute("aria-describedby", errorId);

        return true;
    }

    function clearAllErrors(container = document) {
        container
            .querySelectorAll(`.${INVALID_CLASS}`)
            .forEach(field => {
                field.classList.remove(INVALID_CLASS);
                field.setAttribute("aria-invalid", "false");
            });

        container
            .querySelectorAll(".validation-message")
            .forEach(errorElement => {
                errorElement.textContent = "";
                errorElement.classList.remove(ERROR_CLASS);
                errorElement.hidden = true;
            });

        /*
         * Compatibility cleanup for dynamically-created
         * Stage 5C.3 error elements on older forms.
         */
        container
            .querySelectorAll(`.${ERROR_CLASS}:not(.validation-message)`)
            .forEach(errorElement => errorElement.remove());
    }

    function showErrors(errors = {}) {
        clearAllErrors();

        let firstInvalidField = null;

        Object.entries(errors).forEach(([fieldId, message]) => {
            const displayed = showFieldError(fieldId, message);

            if (displayed && !firstInvalidField) {
                firstInvalidField = getFieldElement(fieldId);
            }
        });

        return firstInvalidField;
    }

    function focusFirstInvalid(errors = {}) {
        for (const fieldId of Object.keys(errors)) {
            const field = getFieldElement(fieldId);

            if (field) {
                field.focus({
                    preventScroll: true
                });

                field.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

                return field;
            }
        }

        return null;
    }

    /* =========================================
   LIVE ERROR RECOVERY
   Stage 5C.3.6
========================================= */

function enableLiveRecovery(container = document) {

    if (!container || typeof container.addEventListener !== "function") {
        return false;
    }

    /*
     * Avoid attaching the same recovery
     * listener more than once.
     */
    if (container.dataset?.toolxoneValidationRecovery === "true") {
        return true;
    }

    function recoverField(event) {
        const field = event.target;

        if (
            !field ||
            !field.classList ||
            !field.classList.contains(INVALID_CLASS)
        ) {
            return;
        }

        /*
         * Only remove the stale error when
         * the browser's own field constraints
         * are satisfied.
         *
         * Full ToolXone validation still runs
         * when the form/calculator is submitted.
         */
        if (
            typeof field.checkValidity === "function" &&
            field.checkValidity()
        ) {
            removeFieldError(field.id);
        }
    }

    container.addEventListener(
        "input",
        recoverField
    );

    container.addEventListener(
        "change",
        recoverField
    );

    if (container.dataset) {
        container.dataset.toolxoneValidationRecovery =
            "true";
    }

    return true;
}

    window.ToolXoneValidationUI = {
    showFieldError,
    removeFieldError,
    clearAllErrors,
    showErrors,
    focusFirstInvalid,
    enableLiveRecovery
};

})();