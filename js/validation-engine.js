/**
 * ToolXone Shared Validation Engine
 * ----------------------------------
 * Reusable field validation for calculators, converters,
 * finance tools, and future ToolXone interfaces.
 */

(function () {
    "use strict";

    /**
     * Convert a possible numeric value to a finite number.
     */
    function toFiniteNumber(value) {
        if (value === null || value === undefined || value === "") {
            return null;
        }

        const number = Number(value);

        return Number.isFinite(number) ? number : null;
    }

    /**
     * Validate one field using its configuration.
     *
     * @param {Object} field - Field configuration.
     * @param {string|number} rawValue - Current field value.
     * @returns {{ valid: boolean, message: string }}
     */
    function validateField(field, rawValue) {
        if (!field || !field.id) {
            return {
                valid: false,
                message: "Invalid field configuration."
            };
        }

        const value =
            typeof rawValue === "string"
                ? rawValue.trim()
                : rawValue;

        const label = field.label || "This field";

        // Required validation
        if (
            field.required &&
            (value === "" || value === null || value === undefined)
        ) {
            return {
                valid: false,
                message:
                    field.requiredMessage ||
                    `${label} is required.`
            };
        }

        // Empty optional fields are valid.
        if (value === "" || value === null || value === undefined) {
            return {
                valid: true,
                message: ""
            };
        }

        // Numeric validation
        if (field.type === "number") {
            const number = toFiniteNumber(value);

            if (number === null) {
                return {
                    valid: false,
                    message:
                        field.numberMessage ||
                        `Enter a valid ${label.toLowerCase()}.`
                };
            }

            const min = toFiniteNumber(field.min);

            if (min !== null && number < min) {
                return {
                    valid: false,
                    message:
                        field.minMessage ||
                        `${label} must be at least ${field.min}.`
                };
            }

            const max = toFiniteNumber(field.max);

            if (max !== null && number > max) {
                return {
                    valid: false,
                    message:
                        field.maxMessage ||
                        `${label} must not exceed ${field.max}.`
                };
            }
        }

        return {
            valid: true,
            message: ""
        };
    }

    /**
     * Validate a collection of fields against the current DOM values.
     *
     * @param {Array} fields - Field configuration array.
     * @returns {{
     *   valid: boolean,
     *   errors: Object,
     *   values: Object
     * }}
     */
    function validateForm(fields) {
        const errors = {};
        const values = {};

        if (!Array.isArray(fields)) {
            return {
                valid: false,
                errors: {
                    form: "Invalid form configuration."
                },
                values
            };
        }

        fields.forEach(field => {
            if (!field || !field.id) return;

            const element = document.getElementById(field.id);

            if (!element) {
                errors[field.id] = `${field.label || field.id} field was not found.`;
                return;
            }

            const value = element.value;

            values[field.id] = value;

            const result = validateField(field, value);

            if (!result.valid) {
                errors[field.id] = result.message;
            }
        });

        return {
            valid: Object.keys(errors).length === 0,
            errors,
            values
        };
    }

    /**
     * Public API
     */
    window.ToolXoneValidation = {
        validateField,
        validateForm
    };
})();