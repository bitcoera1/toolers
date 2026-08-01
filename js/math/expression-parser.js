/**
 * ToolXone Professional Expression Parser
 * -----------------------------------------
 * Mission 1.2
 *
 * Stage 1.2A:
 * Mathematical tokenizer foundation.
 */

(function () {
    "use strict";


    /* =========================================
       TOKEN TYPES
    ========================================= */

    const TOKEN = Object.freeze({
        NUMBER: "NUMBER",
        IDENTIFIER: "IDENTIFIER",
        CONSTANT: "CONSTANT",

        PLUS: "PLUS",
        MINUS: "MINUS",
        MULTIPLY: "MULTIPLY",
        DIVIDE: "DIVIDE",
        POWER: "POWER",

        FACTORIAL: "FACTORIAL",
        PERCENT: "PERCENT",

        LEFT_PAREN: "LEFT_PAREN",
        RIGHT_PAREN: "RIGHT_PAREN",

        COMMA: "COMMA",

        EOF: "EOF"
    });


    /* =========================================
       CHARACTER HELPERS
    ========================================= */

    function isDigit(character) {
        return (
            character >= "0" &&
            character <= "9"
        );
    }


    function isLetter(character) {
        return /^[A-Za-z]$/.test(
            character || ""
        );
    }


    function isIdentifierCharacter(character) {
        return /^[A-Za-z0-9_]$/.test(
            character || ""
        );
    }


    /* =========================================
       TOKEN CREATOR
    ========================================= */

    function createToken(
        type,
        value,
        position
    ) {
        return {
            type,
            value,
            position
        };
    }


    /* =========================================
       INPUT NORMALIZATION
    ========================================= */

    function normalizeInput(input) {

        return String(input ?? "")
            .replace(/×/g, "*")
            .replace(/÷/g, "/")
            .replace(/[−–—]/g, "-")
            .replace(/√/g, "sqrt")
            .replace(/π/g, "pi");
    }


    /* =========================================
       NUMBER READER
    ========================================= */

    function readNumber(
        input,
        startPosition
    ) {

        let position =
            startPosition;

        let value = "";
        let decimalFound = false;

        while (
            position < input.length
        ) {

            const character =
                input[position];

            if (isDigit(character)) {
                value += character;
                position++;
                continue;
            }

            if (
                character === "." &&
                !decimalFound
            ) {
                decimalFound = true;
                value += character;
                position++;
                continue;
            }

            break;
        }

        /*
         * Reject a standalone decimal point.
         */
        if (
            value === "." ||
            value === ""
        ) {
            throw createSyntaxError(
                "Invalid number.",
                startPosition
            );
        }

        const number =
            Number(value);

        if (!Number.isFinite(number)) {
            throw createSyntaxError(
                "Invalid numeric value.",
                startPosition
            );
        }

        return {
            token: createToken(
                TOKEN.NUMBER,
                number,
                startPosition
            ),

            nextPosition:
                position
        };
    }


    /* =========================================
       IDENTIFIER READER
    ========================================= */

    function readIdentifier(
        input,
        startPosition
    ) {

        let position =
            startPosition;

        let value = "";

        while (
            position < input.length &&
            isIdentifierCharacter(
                input[position]
            )
        ) {
            value +=
                input[position];

            position++;
        }

        const normalized =
            value.toLowerCase();

        /*
         * Mathematical constants.
         */
        if (
            normalized === "pi" ||
            normalized === "e"
        ) {
            return {
                token: createToken(
                    TOKEN.CONSTANT,
                    normalized,
                    startPosition
                ),

                nextPosition:
                    position
            };
        }

        return {
            token: createToken(
                TOKEN.IDENTIFIER,
                normalized,
                startPosition
            ),

            nextPosition:
                position
        };
    }


    /* =========================================
       SYNTAX ERROR
    ========================================= */

    function createSyntaxError(
        message,
        position
    ) {

        const error =
            new SyntaxError(
                `${message} Position ${position}.`
            );

        error.position =
            position;

        return error;
    }


    /* =========================================
       TOKENIZER
    ========================================= */

    function tokenize(source) {

        const input =
            normalizeInput(source);

        const tokens = [];

        let position = 0;

        while (
            position < input.length
        ) {

            const character =
                input[position];


            /* -----------------------------
               WHITESPACE
            ----------------------------- */

            if (/\s/.test(character)) {
                position++;
                continue;
            }


            /* -----------------------------
               NUMBERS
            ----------------------------- */

            if (
                isDigit(character) ||
                character === "."
            ) {

                const result =
                    readNumber(
                        input,
                        position
                    );

                tokens.push(
                    result.token
                );

                position =
                    result.nextPosition;

                continue;
            }


            /* -----------------------------
               IDENTIFIERS / FUNCTIONS
            ----------------------------- */

            if (
                isLetter(character)
            ) {

                const result =
                    readIdentifier(
                        input,
                        position
                    );

                tokens.push(
                    result.token
                );

                position =
                    result.nextPosition;

                continue;
            }


            /* -----------------------------
               OPERATORS
            ----------------------------- */

            const operatorMap = {
                "+": TOKEN.PLUS,
                "-": TOKEN.MINUS,
                "*": TOKEN.MULTIPLY,
                "/": TOKEN.DIVIDE,
                "^": TOKEN.POWER,
                "!": TOKEN.FACTORIAL,
                "%": TOKEN.PERCENT,
                "(": TOKEN.LEFT_PAREN,
                ")": TOKEN.RIGHT_PAREN,
                ",": TOKEN.COMMA
            };

            const tokenType =
                operatorMap[
                    character
                ];

            if (tokenType) {

                tokens.push(
                    createToken(
                        tokenType,
                        character,
                        position
                    )
                );

                position++;
                continue;
            }


            /* -----------------------------
               UNKNOWN CHARACTER
            ----------------------------- */

            throw createSyntaxError(
                `Unsupported character "${character}".`,
                position
            );
        }


        tokens.push(
            createToken(
                TOKEN.EOF,
                null,
                position
            )
        );

        return tokens;
    }

    /* =========================================
   AST NODE BUILDERS
========================================= */

function createNumberNode(value) {
    return {
        type: "NumberLiteral",
        value
    };
}


function createConstantNode(name) {
    return {
        type: "Constant",
        name
    };
}


function createFunctionNode(
    name,
    argumentsList
) {
    return {
        type: "FunctionCall",
        name,
        arguments: argumentsList
    };
}


function createUnaryNode(
    operator,
    operand
) {
    return {
        type: "UnaryExpression",
        operator,
        operand
    };
}


function createBinaryNode(
    operator,
    left,
    right
) {
    return {
        type: "BinaryExpression",
        operator,
        left,
        right
    };
}


function createPostfixNode(
    operator,
    operand
) {
    return {
        type: "PostfixExpression",
        operator,
        operand
    };
}


/* =========================================
   PARSER
========================================= */

function parse(source) {

    const tokens =
        tokenize(source);

    let current = 0;


    /* -----------------------------------------
       TOKEN HELPERS
    ----------------------------------------- */

    function peek(offset = 0) {
        return (
            tokens[current + offset] ||
            tokens[tokens.length - 1]
        );
    }


    function previous() {
        return tokens[current - 1];
    }


    function check(type) {
        return peek().type === type;
    }


    function advance() {

        if (
            !check(TOKEN.EOF)
        ) {
            current++;
        }

        return previous();
    }


    function match(...types) {

        for (const type of types) {

            if (check(type)) {
                advance();
                return true;
            }
        }

        return false;
    }


    function consume(
        type,
        message
    ) {

        if (check(type)) {
            return advance();
        }

        throw createSyntaxError(
            message,
            peek().position
        );
    }


    /* =========================================
       EXPRESSION ENTRY
    ========================================= */

    function parseExpression() {
        return parseAddition();
    }


    /* =========================================
       ADDITION / SUBTRACTION
    ========================================= */

    function parseAddition() {

        let expression =
            parseMultiplication();

        while (
            match(
                TOKEN.PLUS,
                TOKEN.MINUS
            )
        ) {

            const operator =
                previous();

            const right =
                parseMultiplication();

            expression =
                createBinaryNode(
                    operator.value,
                    expression,
                    right
                );
        }

        return expression;
    }


    /* =========================================
       MULTIPLICATION / DIVISION
       + IMPLICIT MULTIPLICATION
    ========================================= */

    function parseMultiplication() {

        let expression =
            parseUnary();

        while (true) {

            if (
                match(
                    TOKEN.MULTIPLY,
                    TOKEN.DIVIDE
                )
            ) {

                const operator =
                    previous();

                const right =
                    parseUnary();

                expression =
                    createBinaryNode(
                        operator.value,
                        expression,
                        right
                    );

                continue;
            }


            /*
             * Implicit multiplication:
             *
             * 2π
             * 2sin(30)
             * 3(4 + 5)
             * π(2)
             * (2 + 3)(4 + 5)
             */

            if (
                startsImplicitFactor(
                    peek()
                )
            ) {

                const right =
                    parseUnary();

                expression =
                    createBinaryNode(
                        "*",
                        expression,
                        right
                    );

                continue;
            }

            break;
        }

        return expression;
    }


    function startsImplicitFactor(token) {

        return [
            TOKEN.NUMBER,
            TOKEN.CONSTANT,
            TOKEN.IDENTIFIER,
            TOKEN.LEFT_PAREN
        ].includes(
            token.type
        );
    }


    /* =========================================
       UNARY + / -
       
       Important:
       -2^2 = -(2^2)
    ========================================= */

    function parseUnary() {

        if (
            match(
                TOKEN.PLUS,
                TOKEN.MINUS
            )
        ) {

            const operator =
                previous();

            const operand =
                parseUnary();

            return createUnaryNode(
                operator.value,
                operand
            );
        }

        return parsePower();
    }


    /* =========================================
       POWER

       Right associative:

       2^3^2
       =
       2^(3^2)
    ========================================= */

    function parsePower() {

        let expression =
            parsePostfix();

        if (
            match(
                TOKEN.POWER
            )
        ) {

            const operator =
                previous();

            /*
             * parseUnary() on the RHS allows:
             *
             * 2^-3
             *
             * while retaining:
             *
             * -2^2 = -(2^2)
             */

            const right =
                parseUnary();

            expression =
                createBinaryNode(
                    operator.value,
                    expression,
                    right
                );
        }

        return expression;
    }


    /* =========================================
       POSTFIX OPERATORS

       5!
       25%
       5!%
    ========================================= */

    function parsePostfix() {

        let expression =
            parsePrimary();

        while (
            match(
                TOKEN.FACTORIAL,
                TOKEN.PERCENT
            )
        ) {

            const operator =
                previous();

            expression =
                createPostfixNode(
                    operator.value,
                    expression
                );
        }

        return expression;
    }


    /* =========================================
       PRIMARY EXPRESSIONS
    ========================================= */

    function parsePrimary() {

        /* NUMBER */

        if (
            match(
                TOKEN.NUMBER
            )
        ) {
            return createNumberNode(
                previous().value
            );
        }


        /* CONSTANT */

        if (
            match(
                TOKEN.CONSTANT
            )
        ) {
            return createConstantNode(
                previous().value
            );
        }


        /* FUNCTION */

        if (
            match(
                TOKEN.IDENTIFIER
            )
        ) {

            const identifier =
                previous();

            consume(
                TOKEN.LEFT_PAREN,
                `Expected "(" after ${identifier.value}.`
            );

            const argumentsList = [];


            /*
             * Allow argument lists such as:
             *
             * root(27, 3)
             * ncr(10, 3)
             */

            if (
                !check(
                    TOKEN.RIGHT_PAREN
                )
            ) {

                do {

                    argumentsList.push(
                        parseExpression()
                    );

                } while (
                    match(
                        TOKEN.COMMA
                    )
                );
            }


            consume(
                TOKEN.RIGHT_PAREN,
                `Expected ")" after ${identifier.value}.`
            );


            return createFunctionNode(
                identifier.value,
                argumentsList
            );
        }


        /* GROUPING */

        if (
            match(
                TOKEN.LEFT_PAREN
            )
        ) {

            const expression =
                parseExpression();

            consume(
                TOKEN.RIGHT_PAREN,
                'Expected ")" after expression.'
            );

            return expression;
        }


        throw createSyntaxError(
            "Expected a number, constant, function or expression.",
            peek().position
        );
    }


    /* =========================================
       BUILD AST
    ========================================= */

    if (
        check(
            TOKEN.EOF
        )
    ) {
        throw createSyntaxError(
            "Expression is empty.",
            peek().position
        );
    }


    const ast =
        parseExpression();


    /*
     * Everything must have been consumed.
     */

    if (
        !check(
            TOKEN.EOF
        )
    ) {
        throw createSyntaxError(
            `Unexpected token "${peek().value}".`,
            peek().position
        );
    }


    return ast;
}

    /* =========================================
       PUBLIC API
    ========================================= */

    window.ToolXoneExpressionParser =
    Object.freeze({

        TOKEN,

        normalizeInput,

        tokenize,

        parse
    });

})();