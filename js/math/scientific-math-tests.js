/**
 * ToolXone Scientific Math Test Suite
 * -----------------------------------
 * Regression tests for:
 * - scientific-math-engine.js
 * - expression-parser.js
 * - expression-evaluator.js
 *
 * Run manually in DevTools:
 * ToolXoneScientificMathTests.runAll()
 */

(function () {
    "use strict";

    const EPSILON = 1e-10;

    const tests = [
        // =========================================
        // BASIC ARITHMETIC
        // =========================================

        ["Addition", "2+3", 5],
        ["Subtraction", "10-4", 6],
        ["Multiplication", "6*7", 42],
        ["Division", "20/4", 5],
        ["Decimal arithmetic", "1.5+2.25", 3.75],

        // =========================================
        // OPERATOR PRECEDENCE
        // =========================================

        ["Multiplication before addition", "2+3*4", 14],
        ["Division before subtraction", "10-8/2", 6],
        ["Parentheses override precedence", "(2+3)*4", 20],

        // =========================================
        // POWERS
        // =========================================

        ["Square", "5^2", 25],
        ["Cube", "3^3", 27],
        ["Negative exponent", "2^-3", 0.125],

        // Exponentiation must be right-associative.
        ["Right associative exponent", "2^3^2", 512],

        // Unary minus must have lower precedence than ^.
        ["Unary minus with exponent", "-2^2", -4],
        ["Parenthesized negative power", "(-2)^2", 4],

        // =========================================
        // ROOTS
        // =========================================

        ["Square root", "sqrt(144)", 12],
        ["Square root decimal", "sqrt(2)", Math.sqrt(2)],

        // =========================================
        // CONSTANTS
        // =========================================

        ["Pi", "π", Math.PI],
        ["Euler constant", "e", Math.E],
        ["Pi multiplication", "2*π", 2 * Math.PI],

        // =========================================
        // IMPLICIT MULTIPLICATION
        // =========================================

        ["Number before parentheses", "3(4+5)", 27],
        ["Number before pi", "2π", 2 * Math.PI],
        ["Parentheses multiplication", "(2+3)(4+1)", 25],

        // =========================================
        // TRIGONOMETRY — DEGREE MODE
        // =========================================

        ["sin 0°", "sin(0)", 0],
        ["sin 30°", "sin(30)", 0.5],
        ["sin 90°", "sin(90)", 1],

        ["cos 0°", "cos(0)", 1],
        ["cos 60°", "cos(60)", 0.5],
        ["cos 90°", "cos(90)", 0],

        ["tan 0°", "tan(0)", 0],
        ["tan 45°", "tan(45)", 1],

        // =========================================
        // LOGARITHMS
        // =========================================

        ["Base-10 logarithm", "log(1000)", 3],
        ["Natural logarithm", "ln(e)", 1],

        // =========================================
        // FACTORIAL
        // =========================================

        ["0 factorial", "0!", 1],
        ["1 factorial", "1!", 1],
        ["5 factorial", "5!", 120],
        ["10 factorial", "10!", 3628800],

        // =========================================
        // PERCENTAGES
        // =========================================

        ["Ten percent", "10%", 0.1],
        ["Fifty percent", "50%", 0.5],
        ["Percentage multiplication", "200*10%", 20],

        // =========================================
        // COMBINATORICS
        // =========================================

        ["10 choose 3", "ncr(10,3)", 120],
        ["5 choose 2", "ncr(5,2)", 10],

        ["10 permute 3", "npr(10,3)", 720],
        ["5 permute 2", "npr(5,2)", 20],

        // =========================================
        // NESTED EXPRESSIONS
        // =========================================

        ["Nested arithmetic", "2*(3+(4*5))", 46],
        ["Function inside expression", "2+sqrt(16)*3", 14],
        ["Power inside parentheses", "(2^3)+4", 12],

        // =========================================
        // SIGN HANDLING
        // =========================================

        ["Negative number", "-5", -5],
        ["Addition of negative", "5+(-3)", 2],
        ["Double negative", "5-(-3)", 8],
        ["Negative multiplication", "-4*3", -12],
        ["Negative parentheses", "-(2+3)", -5],

        // =========================================
        // DECIMAL PRECISION
        // =========================================

        ["Decimal multiplication", "0.5*0.5", 0.25],
        ["Decimal division", "1/4", 0.25],

        // =========================================
        // COMPLEX COMBINATIONS
        // =========================================

        ["Mixed precedence", "10/2+3*4-1", 16],
        ["Power and multiplication", "2^3*4", 32],
        ["Parentheses and power", "(2+3)^2", 25],
        ["Trig arithmetic", "sin(30)+cos(60)", 1]
    ];

    function approximatelyEqual(actual, expected) {
        if (
            typeof actual !== "number" ||
            typeof expected !== "number"
        ) {
            return actual === expected;
        }

        if (!Number.isFinite(actual) || !Number.isFinite(expected)) {
            return Object.is(actual, expected);
        }

        return (
            Math.abs(actual - expected) <=
            EPSILON * Math.max(
                1,
                Math.abs(actual),
                Math.abs(expected)
            )
        );
    }

    function runSingleTest(name, expression, expected) {
        try {
            if (
                !window.ToolXoneExpressionEvaluator ||
                typeof window.ToolXoneExpressionEvaluator
                    .evaluateExpression !== "function"
            ) {
                throw new Error(
                    "ToolXoneExpressionEvaluator is not available."
                );
            }

            const actual =
                window.ToolXoneExpressionEvaluator
                    .evaluateExpression(expression);

            const passed = approximatelyEqual(
                actual,
                expected
            );

            if (passed) {
                console.log(
                    `✅ ${name}: ${expression} = ${actual}`
                );
            } else {
                console.error(
                    `❌ ${name}: ${expression}`,
                    {
                        expected,
                        actual
                    }
                );
            }

            return {
                name,
                expression,
                expected,
                actual,
                passed
            };
        } catch (error) {
            console.error(
                `❌ ${name}: ${expression}`,
                error
            );

            return {
                name,
                expression,
                expected,
                actual: undefined,
                passed: false,
                error: error?.message || String(error)
            };
        }
    }

    function runAll() {
        console.group(
            "🧪 ToolXone Scientific Math QA"
        );

        const results = tests.map(test =>
            runSingleTest(
                test[0],
                test[1],
                test[2]
            )
        );

        const passed =
            results.filter(result => result.passed).length;

        const failed = results.length - passed;

        console.log(
            "--------------------------------"
        );

        console.log(`Total:  ${results.length}`);
        console.log(`Passed: ${passed}`);
        console.log(`Failed: ${failed}`);

        if (failed === 0) {
            console.log(
                "🟢 STATUS: ALL TESTS PASSED"
            );
        } else {
            console.error(
                `🔴 STATUS: ${failed} TEST(S) FAILED`
            );

            console.table(
                results
                    .filter(result => !result.passed)
                    .map(result => ({
                        Test: result.name,
                        Expression: result.expression,
                        Expected: result.expected,
                        Actual: result.actual,
                        Error: result.error || ""
                    }))
            );
        }

        console.groupEnd();

        return {
            total: results.length,
            passed,
            failed,
            success: failed === 0,
            results
        };
    }

    function getTests() {
        return tests.map(test => ({
            name: test[0],
            expression: test[1],
            expected: test[2]
        }));
    }

    window.ToolXoneScientificMathTests = {
        runAll,
        getTests
    };

})();