/**
 * ToolXone Professional Expression Evaluator
 * --------------------------------------------
 * Mission 1.3
 *
 * Evaluates AST nodes produced by:
 * js/math/expression-parser.js
 *
 * Mathematical operations are delegated to:
 * js/math/scientific-math-engine.js
 */

(function () {
    "use strict";


    /* =========================================
       DEPENDENCY
    ========================================= */

    function getMathEngine() {

        const math =
            window.ToolXoneScientificMath;

        if (!math) {
            throw new Error(
                "ToolXone Scientific Math Engine is not loaded."
            );
        }

        return math;
    }


    /* =========================================
       ARGUMENT VALIDATION
    ========================================= */

    function requireArguments(
        functionName,
        args,
        expected
    ) {

        if (args.length !== expected) {
            throw new Error(
                `${functionName} expects ${expected} argument${
                    expected === 1 ? "" : "s"
                }.`
            );
        }
    }


    /* =========================================
       CONSTANTS
    ========================================= */

    function evaluateConstant(node) {

        const math =
            getMathEngine();

        switch (node.name) {

            case "pi":
                return math.constants.PI;

            case "e":
                return math.constants.E;

            default:
                throw new Error(
                    `Unknown constant: ${node.name}`
                );
        }
    }


    /* =========================================
       UNARY EXPRESSIONS
    ========================================= */

    function evaluateUnary(
        node,
        evaluate
    ) {

        const math =
            getMathEngine();

        const value =
            evaluate(node.operand);

        switch (node.operator) {

            case "+":
                return value;

            case "-":
                return math.negate(value);

            default:
                throw new Error(
                    `Unsupported unary operator: ${node.operator}`
                );
        }
    }


    /* =========================================
       POSTFIX EXPRESSIONS
    ========================================= */

    function evaluatePostfix(
        node,
        evaluate
    ) {

        const math =
            getMathEngine();

        const value =
            evaluate(node.operand);

        switch (node.operator) {

            case "!":
                return math.factorial(value);

            case "%":
                return math.percent(value);

            default:
                throw new Error(
                    `Unsupported postfix operator: ${node.operator}`
                );
        }
    }


    /* =========================================
       BINARY EXPRESSIONS
    ========================================= */

    function evaluateBinary(
        node,
        evaluate
    ) {

        const math =
            getMathEngine();

        const left =
            evaluate(node.left);

        const right =
            evaluate(node.right);

        let result;

        switch (node.operator) {

            case "+":
                result =
                    left + right;
                break;

            case "-":
                result =
                    left - right;
                break;

            case "*":
                result =
                    left * right;
                break;

            case "/":

                if (right === 0) {
                    throw new Error(
                        "Cannot divide by zero."
                    );
                }

                result =
                    left / right;
                break;

            case "^":
                result =
                    math.power(
                        left,
                        right
                    );
                break;

            default:
                throw new Error(
                    `Unsupported binary operator: ${node.operator}`
                );
        }

        return math.normalizeResult(
            result
        );
    }


    /* =========================================
       FUNCTION CALLS
    ========================================= */

    function evaluateFunction(
        node,
        evaluate
    ) {

        const math =
            getMathEngine();

        const args =
            node.arguments.map(
                argument =>
                    evaluate(argument)
            );

        switch (node.name) {

            /* -----------------------------
               TRIGONOMETRY
            ----------------------------- */

            case "sin":
                requireArguments(
                    "sin",
                    args,
                    1
                );

                return math.sin(
                    args[0]
                );


            case "cos":
                requireArguments(
                    "cos",
                    args,
                    1
                );

                return math.cos(
                    args[0]
                );


            case "tan":
                requireArguments(
                    "tan",
                    args,
                    1
                );

                return math.tan(
                    args[0]
                );


            /* -----------------------------
               INVERSE TRIGONOMETRY
            ----------------------------- */

            case "asin":
                requireArguments(
                    "asin",
                    args,
                    1
                );

                return math.asin(
                    args[0]
                );


            case "acos":
                requireArguments(
                    "acos",
                    args,
                    1
                );

                return math.acos(
                    args[0]
                );


            case "atan":
                requireArguments(
                    "atan",
                    args,
                    1
                );

                return math.atan(
                    args[0]
                );


            /* -----------------------------
               LOGARITHMS
            ----------------------------- */

            case "log":
            case "log10":

                requireArguments(
                    node.name,
                    args,
                    1
                );

                return math.log10(
                    args[0]
                );


            case "ln":

                requireArguments(
                    "ln",
                    args,
                    1
                );

                return math.ln(
                    args[0]
                );


            /* -----------------------------
               ROOTS
            ----------------------------- */

            case "sqrt":

                requireArguments(
                    "sqrt",
                    args,
                    1
                );

                return math.sqrt(
                    args[0]
                );


            case "cbrt":

                requireArguments(
                    "cbrt",
                    args,
                    1
                );

                return math.cubeRoot(
                    args[0]
                );


            case "root":

                requireArguments(
                    "root",
                    args,
                    2
                );

                return math.nthRoot(
                    args[0],
                    args[1]
                );


            /* -----------------------------
               POWERS
            ----------------------------- */

            case "square":

                requireArguments(
                    "square",
                    args,
                    1
                );

                return math.square(
                    args[0]
                );


            case "cube":

                requireArguments(
                    "cube",
                    args,
                    1
                );

                return math.cube(
                    args[0]
                );


            case "pow":

                requireArguments(
                    "pow",
                    args,
                    2
                );

                return math.power(
                    args[0],
                    args[1]
                );
            case "pow10":

                requireArguments(
                    "pow10",
                    args,
                    1
                );

                return math.pow10(
                    args[0]
                );


            case "exp":

                requireArguments(
                    "exp",
                    args,
                    1
                );

                return math.exp(
                    args[0]
                );


            case "abs":

                requireArguments(
                    "abs",
                    args,
                    1
                );

                return math.abs(
                    args[0]
                );

            /* -----------------------------
               COMBINATORICS
            ----------------------------- */

            case "ncr":

                requireArguments(
                    "nCr",
                    args,
                    2
                );

                return math.combination(
                    args[0],
                    args[1]
                );


            case "npr":

                requireArguments(
                    "nPr",
                    args,
                    2
                );

                return math.permutation(
                    args[0],
                    args[1]
                );


            /* -----------------------------
               RECIPROCAL
            ----------------------------- */

            case "reciprocal":

                requireArguments(
                    "reciprocal",
                    args,
                    1
                );

                return math.reciprocal(
                    args[0]
                );


            default:
                throw new Error(
                    `Unknown function: ${node.name}`
                );
        }
    }


    /* =========================================
       AST EVALUATOR
    ========================================= */

    function evaluate(node) {

        if (
            !node ||
            typeof node !== "object"
        ) {
            throw new Error(
                "Invalid expression node."
            );
        }

        let result;

        switch (node.type) {

            case "NumberLiteral":
                result =
                    node.value;
                break;

            case "Constant":
                result =
                    evaluateConstant(
                        node
                    );
                break;

            case "UnaryExpression":
                result =
                    evaluateUnary(
                        node,
                        evaluate
                    );
                break;

            case "PostfixExpression":
                result =
                    evaluatePostfix(
                        node,
                        evaluate
                    );
                break;

            case "BinaryExpression":
                result =
                    evaluateBinary(
                        node,
                        evaluate
                    );
                break;

            case "FunctionCall":
                result =
                    evaluateFunction(
                        node,
                        evaluate
                    );
                break;

            default:
                throw new Error(
                    `Unsupported AST node: ${node.type}`
                );
        }


        return getMathEngine()
            .normalizeResult(
                result
            );
    }


    /* =========================================
       EXPRESSION ENTRY POINT
    ========================================= */

    function evaluateExpression(
        source
    ) {

        const parser =
            window.ToolXoneExpressionParser;

        if (!parser) {
            throw new Error(
                "ToolXone Expression Parser is not loaded."
            );
        }

        const ast =
            parser.parse(
                source
            );

        return evaluate(
            ast
        );
    }


    /* =========================================
       PUBLIC API
    ========================================= */

    window.ToolXoneExpressionEvaluator =
        Object.freeze({

            evaluate,

            evaluateExpression
        });

})();