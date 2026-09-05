/**
 * ToolXone Professional Scientific Math Engine
 * ------------------------------------------------
 * Core mathematical engine for the ToolXone
 * Scientific Calculator.
 *
 * Mission 1.1
 */

(function () {
    "use strict";

    /* =========================================
       CONSTANTS
    ========================================= */

    const CONSTANTS = Object.freeze({
        PI: Math.PI,
        E: Math.E
    });


    /* =========================================
       ANGLE MODE
    ========================================= */

    let angleMode = "DEG";

    const ANGLE_MODES = Object.freeze([
        "DEG",
        "RAD",
        "GRAD"
    
    ]);

    function setAngleMode(mode) {

        const normalizedMode =
            String(mode || "").toUpperCase();

        if (!ANGLE_MODES.includes(normalizedMode)) {
            throw new Error(
                `Unsupported angle mode: ${mode}`
            );
        }

        angleMode = normalizedMode;

        return angleMode;
    }

    function getAngleMode() {
        return angleMode;
    }


    /* =========================================
       ANGLE CONVERSION
    ========================================= */

    function degreesToRadians(value) {
        return value * Math.PI / 180;
    }

    function radiansToDegrees(value) {
        return value * 180 / Math.PI;
    }

    function gradsToRadians(value) {
    return value * Math.PI / 200;
    }

    function radiansToGrads(value) {
        return value * 200 / Math.PI;
    }

    function toRadians(value) {

    if (angleMode === "DEG") {
        return degreesToRadians(value);
    }

    if (angleMode === "GRAD") {
        return gradsToRadians(value);
    }

    return value;
    }

    function fromRadians(value) {

    if (angleMode === "DEG") {
        return radiansToDegrees(value);
    }

    if (angleMode === "GRAD") {
        return radiansToGrads(value);
    }

    return value;
    }


    /* =========================================
       TRIGONOMETRY
    ========================================= */

    function sin(value) {
        return Math.sin(toRadians(value));
    }

    function cos(value) {
        return Math.cos(toRadians(value));
    }

    function tan(value) {
        return Math.tan(toRadians(value));
    }

    function asin(value) {

        if (value < -1 || value > 1) {
            throw new Error(
                "asin domain is -1 to 1."
            );
        }

        return fromRadians(Math.asin(value));
    }

    function acos(value) {

        if (value < -1 || value > 1) {
            throw new Error(
                "acos domain is -1 to 1."
            );
        }

        return fromRadians(Math.acos(value));
    }

    function atan(value) {
        return fromRadians(Math.atan(value));
    }


    /* =========================================
       LOGARITHMS
    ========================================= */

    function log10(value) {

        if (value <= 0) {
            throw new Error(
                "Logarithm requires a positive number."
            );
        }

        return Math.log10(value);
    }

    function ln(value) {

        if (value <= 0) {
            throw new Error(
                "Natural logarithm requires a positive number."
            );
        }

        return Math.log(value);
    }


    /* =========================================
       POWERS & ROOTS
    ========================================= */

    function square(value) {
        return value * value;
    }

    function cube(value) {
        return value * value * value;
    }

    function power(base, exponent) {
        return Math.pow(base, exponent);
    }

    function pow10(value) {
    return Math.pow(10, value);
    }

    function exp(value) {
        return Math.exp(value);
    }

    function abs(value) {
        return Math.abs(value);
    }

    function sqrt(value) {

        if (value < 0) {
            throw new Error(
                "Square root requires a non-negative number."
            );
        }

        return Math.sqrt(value);
    }

    function cubeRoot(value) {
        return Math.cbrt(value);
    }

    function nthRoot(value, root) {

        if (!Number.isFinite(root) || root === 0) {
            throw new Error(
                "Root must be a non-zero finite number."
            );
        }

        /*
         * Negative values have real roots when
         * the root is an odd integer.
         */
        if (value < 0) {

            if (
                Number.isInteger(root) &&
                Math.abs(root % 2) === 1
            ) {
                return -Math.pow(
                    Math.abs(value),
                    1 / root
                );
            }

            throw new Error(
                "This root has no real result."
            );
        }

        return Math.pow(value, 1 / root);
    }


    /* =========================================
       FACTORIAL
    ========================================= */

    function factorial(value) {

        if (
            !Number.isInteger(value) ||
            value < 0
        ) {
            throw new Error(
                "Factorial requires a non-negative integer."
            );
        }

        /*
         * JavaScript Number overflows beyond 170!.
         */
        if (value > 170) {
            throw new Error(
                "Factorial result is too large."
            );
        }

        let result = 1;

        for (let i = 2; i <= value; i++) {
            result *= i;
        }

        return result;
    }


    /* =========================================
       PERMUTATIONS & COMBINATIONS
    ========================================= */

    function validateNR(n, r) {

        if (
            !Number.isInteger(n) ||
            !Number.isInteger(r) ||
            n < 0 ||
            r < 0 ||
            r > n
        ) {
            throw new Error(
                "n and r must be non-negative integers with r ≤ n."
            );
        }
    }

    function permutation(n, r) {

        validateNR(n, r);

        let result = 1;

        for (let i = 0; i < r; i++) {
            result *= (n - i);
        }

        return result;
    }

    function combination(n, r) {

        validateNR(n, r);

        /*
         * C(n,r) = C(n,n-r)
         * Using the smaller r reduces operations.
         */
        r = Math.min(r, n - r);

        let result = 1;

        for (let i = 1; i <= r; i++) {
            result *= (n - r + i) / i;
        }

        return result;
    }


    /* =========================================
       PERCENTAGE
    ========================================= */

    function percent(value) {
        return value / 100;
    }


    /* =========================================
       RECIPROCAL
    ========================================= */

    function reciprocal(value) {

        if (value === 0) {
            throw new Error(
                "Cannot divide by zero."
            );
        }

        return 1 / value;
    }


    /* =========================================
       SIGN
    ========================================= */

    function negate(value) {
        return -value;
    }


    /* =========================================
       RESULT NORMALIZATION
    ========================================= */

function normalizeResult(value) {

    /*
     * Invalid mathematical results must never
     * silently become 0.
     *
     * Examples:
     *   √(-4)  → invalid
     *   log(-1) → invalid
     *   ln(-1)  → invalid
     *   1/0    → invalid
     *
     * Valid Infinity / NaN results are rejected
     * so the evaluator can display Error.
     */
    if (!Number.isFinite(value)) {
        throw new Error(
            "Invalid mathematical result."
        );
    }

    /*
     * Reduce floating-point artifacts such as:
     *
     *   0.1 + 0.2
     *   0.30000000000000004
     *
     * while preserving useful precision.
     */
    return Number(
        value.toPrecision(15)
    );
}


    /* =========================================
       PUBLIC API
    ========================================= */

    window.ToolXoneScientificMath = Object.freeze({

        constants: CONSTANTS,

        setAngleMode,
        getAngleMode,

        degreesToRadians,
        radiansToDegrees,

        gradsToRadians,
        radiansToGrads,

        sin,
        cos,
        tan,

        asin,
        acos,
        atan,

        log10,
        ln,

        square,
        cube,
        power,
        pow10,
        exp,
        abs,

        sqrt,
        cubeRoot,
        nthRoot,

        factorial,

        permutation,
        combination,

        percent,
        reciprocal,
        negate,

        normalizeResult
    });

})();