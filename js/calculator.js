/*
==========================================================
TOOLXONE BASIC CALCULATOR
----------------------------------------------------------
Features
--------
- Accurate arithmetic calculations
- Formatted number display
- Number-to-words results
- Keyboard support
- Safe operator handling
- Decimal validation
- Statistics integration
==========================================================
*/

let justCalculated = false;
let rawExpression = "";


/* =====================================================
   1. APPEND VALUE
   ===================================================== */

function appendValue(value) {

    const operators = [
        "+",
        "-",
        "*",
        "/"
    ];

    if (justCalculated) {

        if (operators.includes(value)) {

            justCalculated = false;

        } else if (
            isDigit(value) ||
            value === "."
        ) {

            rawExpression = "";
            justCalculated = false;

        }
    }

    if (operators.includes(value)) {

        appendOperator(value);

    } else {

        appendNumberCharacter(value);

    }

    updateDisplay();
}


/* =====================================================
   2. NUMBER INPUT
   ===================================================== */

function appendNumberCharacter(value) {

    if (value === ".") {

        if (currentNumberHasDecimal()) {
            return;
        }

        /*
         * Convert:
         * .5     → 0.5
         * 5+.2   → 5+0.2
         */
        if (
            !rawExpression ||
            isOperator(
                rawExpression.slice(-1)
            )
        ) {
            rawExpression += "0.";
        } else {
            rawExpression += ".";
        }

        clearNumberWords();
        return;
    }

    if (!isDigit(value)) {
        return;
    }

    rawExpression += value;

    clearNumberWords();
}


/* =====================================================
   3. OPERATOR INPUT
   ===================================================== */

function appendOperator(operator) {

    if (!isOperator(operator)) {
        return;
    }

    if (!rawExpression) {

        /*
         * Allow a negative starting number.
         */
        if (operator === "-") {
            rawExpression = "-";
        }

        return;
    }

    /*
     * A lone minus is not yet a complete number.
     */
    if (rawExpression === "-") {
        return;
    }

    const lastCharacter =
        rawExpression.slice(-1);

    /*
     * Replace the previous operator rather than
     * creating malformed expressions such as:
     *
     * 5++2
     * 8/*2
     * 10+-+3
     */
    if (isOperator(lastCharacter)) {
        rawExpression =
            rawExpression.slice(0, -1) +
            operator;
    } else if (lastCharacter === ".") {

        /*
         * Complete a trailing decimal:
         * 5. +  → 5.0+
         */
        rawExpression += "0" + operator;

    } else {
        rawExpression += operator;
    }

    clearNumberWords();
}


/* =====================================================
   4. CLEAR
   ===================================================== */

function clearDisplay() {
    rawExpression = "";
    justCalculated = false;

    updateDisplay();
    clearNumberWords();
}

/*
 * =====================================================
 * 5. TOGGLE SIGN (+/-)
 * =====================================================
 *
 * Examples:
 *
 * 5       → -5
 * -5      → 5
 * 12+5    → 12+-5
 * 12+-5   → 12+5
 * 12×5    → 12×-5
 */

function toggleSign() {

    if (!rawExpression) {
        return;
    }

    /*
     * If a result has just been calculated,
     * toggle the sign of the complete result.
     */
    if (justCalculated) {

        if (rawExpression.startsWith("-")) {

            rawExpression =
                rawExpression.slice(1);

        } else {

            rawExpression =
                "-" + rawExpression;

        }

        justCalculated = false;

        updateDisplay();
        clearNumberWords();

        return;
    }

    /*
     * Find the beginning of the current number.
     */
    let boundary = -1;

    for (
        let i = rawExpression.length - 1;
        i >= 0;
        i--
    ) {

        const character =
            rawExpression[i];

        /*
         * + * / are always expression boundaries.
         */
        if (
            character === "+" ||
            character === "*" ||
            character === "/"
        ) {

            boundary = i;
            break;
        }

        /*
         * A minus is a boundary only when
         * it is being used as an operator.
         *
         * In:
         * 12-5  → minus is an operator
         *
         * In:
         * 12+-5 → second minus is a sign
         */
        if (
            character === "-" &&
            i > 0 &&
            !isOperator(
                rawExpression[i - 1]
            )
        ) {

            boundary = i;
            break;
        }
    }

    const prefix =
        rawExpression.slice(
            0,
            boundary + 1
        );

    const currentNumber =
        rawExpression.slice(
            boundary + 1
        );

    if (!currentNumber) {
        return;
    }

    /*
     * Remove an existing negative sign.
     */
    if (
        currentNumber.startsWith("-")
    ) {

        rawExpression =
            prefix +
            currentNumber.slice(1);

    }

    /*
     * Add a negative sign.
     */
    else {

        rawExpression =
            prefix +
            "-" +
            currentNumber;

    }

    updateDisplay();
    clearNumberWords();
}

/*
 * =====================================================
 * 6. CALCULATOR-STYLE PERCENTAGE
 * =====================================================
 *
 * Examples:
 *
 * 50 %        → 0.5
 *
 * 200 + 10 %  → 200 + 20
 * 200 - 10 %  → 200 - 20
 * 200 * 10 %  → 200 * 0.1
 * 200 / 10 %  → 200 / 0.1
 *
 * Therefore:
 *
 * 200 + 10 % =
 * 220
 *
 * 200 - 10 % =
 * 180
 *
 * 200 * 10 % =
 * 20
 */

function calculatePercentage() {

    if (
        !rawExpression ||
        rawExpression === "-"
    ) {

        return;
    }

    /*
     * Look for:
     *
     * [left expression]
     * [operator]
     * [current number]
     */
    const match =
        rawExpression.match(
            /^(.*?)([+\-*/])(-?\d*\.?\d+)$/
        );

    /*
     * Standalone percentage.
     *
     * Example:
     * 50 %
     *
     * Result:
     * 0.5
     */
    if (!match) {

        const value =
            Number(rawExpression);

        if (
            !Number.isFinite(value)
        ) {

            showCalculatorError();
            return;
        }

        rawExpression =
            normalizeResult(
                value / 100
            );

        updateDisplay();

        showNumberWords(
            Number(rawExpression)
        );

        justCalculated = true;

        return;
    }

    const leftExpression =
        match[1];

    const operator =
        match[2];

    const rightValue =
        Number(match[3]);

    if (
        !leftExpression ||
        !Number.isFinite(rightValue)
    ) {

        return;
    }

    let leftValue;

    try {

        leftValue =
            Function(
                `"use strict"; return (${leftExpression});`
            )();

        if (
            !Number.isFinite(leftValue)
        ) {

            throw new Error(
                "Invalid percentage base."
            );
        }

    } catch (error) {

        showCalculatorError();

        console.error(
            "Percentage error:",
            error
        );

        return;
    }

    let percentageValue;

    /*
     * Addition/subtraction:
     *
     * 200 + 10%
     *
     * 10% of 200 = 20
     */
    if (
        operator === "+" ||
        operator === "-"
    ) {

        percentageValue =
            leftValue *
            (rightValue / 100);

    }

    /*
     * Multiplication/division:
     *
     * 200 × 10%
     *
     * 10% = 0.1
     */
    else {

        percentageValue =
            rightValue / 100;

    }

    rawExpression =
        leftExpression +
        operator +
        normalizeResult(
            percentageValue
        );

    justCalculated = false;

    updateDisplay();
    clearNumberWords();
}

/* =====================================================
   7. BACKSPACE
   ===================================================== */

function deleteLastCharacter() {

    rawExpression =
        rawExpression.slice(0, -1);

    justCalculated = false;

    updateDisplay();
    clearNumberWords();
}


/* =====================================================
   8. CALCULATE
   ===================================================== */

function calculate() {

    const display =
        document.getElementById("display");

    if (
        !display ||
        !rawExpression
    ) {
        return;
    }

    /*
     * A lone negative sign is not calculable.
     */
    if (rawExpression === "-") {
        return;
    }

    const lastCharacter =
        rawExpression.slice(-1);

    /*
     * Do not calculate incomplete expressions.
     */
    if (
        isOperator(lastCharacter) ||
        lastCharacter === "."
    ) {
        return;
    }

    /*
     * Defense-in-depth:
     * expression may contain only calculator
     * characters generated by this interface.
     */
    if (
        !/^-?[\d.+*/-]+$/.test(
            rawExpression
        )
    ) {
        showCalculatorError();
        return;
    }

    try {

        const result =
            Function(
                `"use strict"; return (${rawExpression});`
            )();

        if (!Number.isFinite(result)) {
            throw new Error(
                "Invalid calculation result."
            );
        }

        rawExpression =
            normalizeResult(result);

        display.value =
            formatExpression(
                rawExpression
            );

        showNumberWords(Number(rawExpression));

        /*
         * Record only successful calculations.
         */
        if (
            window.ToolXoneStatisticsEvents &&
            typeof ToolXoneStatisticsEvents
                .recordCalculation === "function"
        ) {
            ToolXoneStatisticsEvents
                .recordCalculation(
                    "basic-calculator"
                );
        }

        justCalculated = true;

    } catch (error) {

        showCalculatorError();

        console.error(
            "Calculator error:",
            error
        );
    }
}


/* =====================================================
   9. ERROR STATE
   ===================================================== */

function showCalculatorError() {

    const display =
        document.getElementById("display");

    if (display) {
        display.value = "Error";
    }

    rawExpression = "";
    justCalculated = true;

    clearNumberWords();
}


/* =====================================================
   10. DISPLAY FORMATTING
   ===================================================== */

function updateDisplay() {
    const display =
        document.getElementById(
            "display"
        );

    display.value =
        rawExpression
            ? formatExpression(rawExpression)
            : "0";
}


function formatExpression(expression) {

    if (!expression) {
        return "";
    }

    /*
     * Preserve a leading negative sign while
     * formatting individual numeric components.
     */
    const leadingNegative =
        expression.startsWith("-");

    const workingExpression =
        leadingNegative
            ? expression.slice(1)
            : expression;

    const formatted =
        workingExpression
            .split(/([+\-*/])/)
            .map(part => {

                if (
                    !part ||
                    isOperator(part)
                ) {
                    return part;
                }

                return formatNumberPart(
                    part
                );
            })
            .join("");

    return leadingNegative
        ? "-" + formatted
        : formatted;
}


function formatNumberPart(value) {

    if (
        value === "." ||
        value === "-"
    ) {
        return value;
    }

    const hasTrailingDecimal =
        value.endsWith(".");

    const [
        integerPart,
        decimalPart
    ] = value.split(".");

    const formattedInteger =
        formatIntegerString(
            integerPart
        );

    if (hasTrailingDecimal) {
        return `${formattedInteger}.`;
    }

    if (decimalPart !== undefined) {
        return (
            `${formattedInteger}.` +
            decimalPart
        );
    }

    return formattedInteger;
}


function formatIntegerString(value) {

    const sign =
        value.startsWith("-")
            ? "-"
            : "";

    const digits =
        value.replace("-", "");

    if (!digits) {
        return sign;
    }

    const formatted =
        digits.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ","
        );

    return sign + formatted;
}


/* =====================================================
   11. NUMBER WORDS
   ===================================================== */

function showNumberWords(value) {

    const wordsElement =
        document.getElementById(
            "numberWords"
        );

    if (!wordsElement) {
        return;
    }

    if (!window.ToolXoneNumberEngine) {
        wordsElement.textContent = "";
        wordsElement.hidden = true;
        return;
    }

    wordsElement.textContent =
        ToolXoneNumberEngine.words(
            value
        );

    wordsElement.hidden =
        !wordsElement.textContent;
}


function clearNumberWords() {

    const wordsElement =
        document.getElementById(
            "numberWords"
        );

    if (!wordsElement) {
        return;
    }

    wordsElement.textContent = "";
    wordsElement.hidden = true;
}


/* =====================================================
   12. HELPERS
   ===================================================== */

function isDigit(value) {
    return /^\d$/.test(
        String(value)
    );
}


function isOperator(value) {
    return [
        "+",
        "-",
        "*",
        "/"
    ].includes(value);
}


function currentNumberHasDecimal() {

    const parts =
        rawExpression.split(
            /[+\-*/]/
        );

    const currentNumber =
        parts[
            parts.length - 1
        ] || "";

    return currentNumber.includes(".");
}


function normalizeResult(value) {

    /*
     * Reduce floating-point artifacts such as:
     *
     * 0.1 + 0.2
     * 0.30000000000000004
     *
     * while preserving useful precision.
     */
    return String(
        Number(
            value.toPrecision(15)
        )
    );
}


/* =====================================================
   13. KEYBOARD SUPPORT
   ===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        /*
         * Do not intercept keyboard input while
         * the visitor is typing into another
         * editable field on the page.
         */
        const target =
            event.target;

        const isEditable =
            target &&
            (
                target.tagName === "TEXTAREA" ||
                target.tagName === "SELECT" ||
                (
                    target.tagName === "INPUT" &&
                    target.id !== "display"
                ) ||
                target.isContentEditable
            );

        if (isEditable) {
            return;
        }

        if (isDigit(event.key)) {

            event.preventDefault();

            appendValue(
                event.key
            );

            return;
        }

        if (
            [
                "+",
                "-",
                "*",
                "/",
                "."
            ].includes(event.key)
        ) {

            event.preventDefault();

            appendValue(
                event.key
            );

            return;
        }

        if (event.key === "%") {

    event.preventDefault();

    calculatePercentage();

    return;
}

        if (
            event.key === "Enter" ||
            event.key === "="
        ) {

            event.preventDefault();

            calculate();

            return;
        }

        if (event.key === "Backspace") {

            event.preventDefault();

            deleteLastCharacter();

            return;
        }

        if (
            event.key === "Delete" ||
            event.key === "Escape"
        ) {

            event.preventDefault();

            clearDisplay();
        }
    }
);


/* =====================================================
   14. INITIAL STATE
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {
        updateDisplay();
        clearNumberWords();
    }
);