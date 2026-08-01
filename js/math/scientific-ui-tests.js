/* =========================================================
   ToolXone Scientific Calculator
   Scientific UI Engine QA Suite
   ---------------------------------------------------------
   File:
   js/math/scientific-ui-tests.js

   Tests:
   - UI Engine availability
   - Initialization
   - Controller connection
   - State synchronization
   - Formatting
   - Input / operators
   - Evaluation
   - Clear controls
   - SHIFT / ALPHA
   - Angle modes
   - Calculator modes
   - ANS / constants
   - Powers / parentheses
   - Scientific functions
   - Memory
   - Replay
   - Grand Total
   - Generic dispatch
   - Invalid action safety
   - Recovery
   ========================================================= */

(function () {
    "use strict";

    const results = [];

    let passed = 0;
    let failed = 0;
    let skipped = 0;

    /* =====================================================
       REPORTING
       ===================================================== */

    function pass(name, details = "") {
        passed++;

        results.push({
            name,
            status: "PASS",
            details
        });

        console.log(
            `%c✅ ${name}${details ? ": " + details : ""}`,
            "color:#00a000;font-weight:bold;"
        );
    }

    function fail(name, details = "") {
        failed++;

        results.push({
            name,
            status: "FAIL",
            details
        });

        console.error(
            `❌ ${name}${details ? ": " + details : ""}`
        );
    }

    function skip(name, details = "") {
        skipped++;

        results.push({
            name,
            status: "SKIP",
            details
        });

        console.warn(
            `⚠️ ○ SKIP — ${name}${details ? ": " + details : ""}`
        );
    }

    function assert(name, condition, details = "") {
        if (condition) {
            pass(name, details);
        } else {
            fail(name, details);
        }
    }

    function approximatelyEqual(a, b, epsilon = 1e-10) {
        return (
            Number.isFinite(a) &&
            Number.isFinite(b) &&
            Math.abs(a - b) <= epsilon
        );
    }

    /* =====================================================
       ENGINE HELPERS
       ===================================================== */

    function getUI() {
        return window.ToolXoneScientificUI || null;
    }

    function getControl() {
        return window.ToolXoneScientificControl || null;
    }

    function getSnapshot() {
        const ui = getUI();

        if (
            ui &&
            typeof ui.getSnapshot === "function"
        ) {
            try {
                return ui.getSnapshot();
            } catch (error) {
                return null;
            }
        }

        return null;
    }

    function safeCall(object, method, ...args) {
        if (
            !object ||
            typeof object[method] !== "function"
        ) {
            return {
                called: false,
                value: undefined,
                error: null
            };
        }

        try {
            return {
                called: true,
                value: object[method](...args),
                error: null
            };
        } catch (error) {
            return {
                called: true,
                value: undefined,
                error
            };
        }
    }

    function resetCalculator() {
        const ui = getUI();
        const control = getControl();

        if (
            ui &&
            typeof ui.allClear === "function"
        ) {
            try {
                ui.allClear();
            } catch (_) {}
        } else if (
            control &&
            typeof control.allClear === "function"
        ) {
            try {
                control.allClear();
            } catch (_) {}
        }

        if (
            control &&
            typeof control.clearMemory === "function"
        ) {
            try {
                control.clearMemory();
            } catch (_) {}
        }

        if (
            control &&
            typeof control.memoryClear === "function"
        ) {
            try {
                control.memoryClear();
            } catch (_) {}
        }

        if (
            control &&
            typeof control.clearGrandTotal === "function"
        ) {
            try {
                control.clearGrandTotal();
            } catch (_) {}
        }

        if (
            control &&
            typeof control.setShift === "function"
        ) {
            try {
                control.setShift(false);
            } catch (_) {}
        }

        if (
            control &&
            typeof control.setAlpha === "function"
        ) {
            try {
                control.setAlpha(false);
            } catch (_) {}
        }

        if (
            control &&
            typeof control.setAngleMode === "function"
        ) {
            try {
                control.setAngleMode("DEG");
            } catch (_) {}
        }

        if (
            control &&
            typeof control.setMode === "function"
        ) {
            try {
                control.setMode("COMP");
            } catch (_) {}
        }

        if (
            ui &&
            typeof ui.render === "function"
        ) {
            try {
                ui.render();
            } catch (_) {}
        }
    }

    /* =====================================================
       MAIN TEST SUITE
       ===================================================== */

    function runAll() {
        results.length = 0;

        passed = 0;
        failed = 0;
        skipped = 0;

        console.group(
            "🔬 ToolXone Scientific UI Engine QA"
        );

        const ui = getUI();
        const control = getControl();

        /* -------------------------------------------------
           1. UI ENGINE EXISTS
           ------------------------------------------------- */

        assert(
            "UI Engine global API exists",
            !!ui &&
            typeof ui === "object"
        );

        if (!ui) {
            printSummary();
            console.groupEnd();

            return getReport();
        }

        /* -------------------------------------------------
           2. CONTROL ENGINE EXISTS
           ------------------------------------------------- */

        assert(
            "Control Engine available to UI",
            !!control &&
            typeof control === "object"
        );

        /* -------------------------------------------------
           3. INITIALIZATION
           ------------------------------------------------- */

        assert(
            "UI Engine reports initialized",
            typeof ui.isInitialized === "function" &&
            ui.isInitialized() === true
        );

        /* -------------------------------------------------
           4. CAPABILITIES
           ------------------------------------------------- */

        const capabilitiesCall =
            safeCall(
                ui,
                "getCapabilities"
            );

        assert(
            "UI capabilities API works",
            capabilitiesCall.called &&
            !capabilitiesCall.error &&
            capabilitiesCall.value &&
            typeof capabilitiesCall.value === "object"
        );

        if (
            capabilitiesCall.value &&
            typeof capabilitiesCall.value === "object"
        ) {
            const capabilities =
                capabilitiesCall.value;

            assert(
                "UI connected to controller",
                capabilities.controller === true
            );

            assert(
                "UI rendering capability",
                capabilities.rendering === true
            );

            assert(
                "UI keyboard capability",
                capabilities.keyboard === true
            );

            assert(
                "UI declarative button capability",
                capabilities.declarativeButtons === true
            );
        }

        /* -------------------------------------------------
           5. SNAPSHOT
           ------------------------------------------------- */

        resetCalculator();

        const initialState =
            getSnapshot();

        assert(
            "UI snapshot available",
            !!initialState &&
            typeof initialState === "object"
        );

        assert(
            "Initial calculator mode COMP",
            initialState &&
            initialState.mode === "COMP",
            initialState
                ? `mode = ${initialState.mode}`
                : ""
        );

        assert(
            "Initial angle mode DEG",
            initialState &&
            initialState.angleMode === "DEG",
            initialState
                ? `angle = ${initialState.angleMode}`
                : ""
        );

        /* -------------------------------------------------
           6. EXPRESSION FORMATTER
           ------------------------------------------------- */

        const formatExpression =
            safeCall(
                ui,
                "formatExpression",
                "12*3/4"
            );

        assert(
            "Expression formatter converts operators",
            formatExpression.called &&
            !formatExpression.error &&
            formatExpression.value ===
                "12×3÷4",
            formatExpression.called
                ? `formatted = ${formatExpression.value}`
                : ""
        );

        /* -------------------------------------------------
           7. RESULT FORMATTER
           ------------------------------------------------- */

        const formatZero =
            safeCall(
                ui,
                "formatResult",
                0
            );

        assert(
            "Result formatter handles zero",
            formatZero.called &&
            formatZero.value === "0"
        );

        const formatNegativeZero =
            safeCall(
                ui,
                "formatResult",
                -0
            );

        assert(
            "Result formatter normalizes negative zero",
            formatNegativeZero.called &&
            formatNegativeZero.value === "0"
        );

        /* -------------------------------------------------
           8. DIGIT INPUT
           ------------------------------------------------- */

        resetCalculator();

        safeCall(ui, "digit", "7");
        safeCall(ui, "digit", "3");

        let state =
            getSnapshot();

        assert(
            "Digit input updates expression",
            state &&
            state.expression === "73",
            state
                ? `expression = "${state.expression}"`
                : ""
        );

        /* -------------------------------------------------
           9. DECIMAL INPUT
           ------------------------------------------------- */

        resetCalculator();

        safeCall(ui, "digit", "2");
        safeCall(ui, "decimal");
        safeCall(ui, "digit", "5");

        state = getSnapshot();

        assert(
            "Decimal input updates expression",
            state &&
            state.expression === "2.5",
            state
                ? `expression = "${state.expression}"`
                : ""
        );

        /* -------------------------------------------------
           10. OPERATOR INPUT
           ------------------------------------------------- */

        resetCalculator();

        safeCall(ui, "digit", "8");
        safeCall(ui, "operator", "×");
        safeCall(ui, "digit", "4");

        state = getSnapshot();

        assert(
            "UI operator maps × to *",
            state &&
            state.expression === "8*4",
            state
                ? `expression = "${state.expression}"`
                : ""
        );

        /* -------------------------------------------------
           11. EXPRESSION EVALUATION
           ------------------------------------------------- */

        resetCalculator();

        safeCall(ui, "digit", "2");
        safeCall(ui, "operator", "+");
        safeCall(ui, "digit", "3");
        safeCall(ui, "operator", "×");
        safeCall(ui, "digit", "4");

        const evaluation =
            safeCall(
                ui,
                "equals"
            );

        state = getSnapshot();

        assert(
            "UI evaluation executes",
            evaluation.called &&
            !evaluation.error
        );

        assert(
            "UI evaluation respects precedence",
            state &&
            approximatelyEqual(
                Number(state.result),
                14
            ),
            state
                ? `result = ${state.result}`
                : ""
        );

        /* -------------------------------------------------
           12. DELETE
           ------------------------------------------------- */

        resetCalculator();

        safeCall(ui, "input", "123");
        safeCall(ui, "del");

        state = getSnapshot();

        assert(
            "DEL removes final character",
            state &&
            state.expression === "12",
            state
                ? `expression = "${state.expression}"`
                : ""
        );

        /* -------------------------------------------------
           13. CLEAR ENTRY
           ------------------------------------------------- */

        resetCalculator();

        safeCall(ui, "input", "456");
        safeCall(ui, "clearEntry");

        state = getSnapshot();

        assert(
            "CE clears current expression",
            state &&
            state.expression === "",
            state
                ? `expression = "${state.expression}"`
                : ""
        );

        /* -------------------------------------------------
           14. ALL CLEAR
           ------------------------------------------------- */

        resetCalculator();

        safeCall(ui, "input", "99");
        safeCall(ui, "allClear");

        state = getSnapshot();

        assert(
            "AC resets expression",
            state &&
            state.expression === ""
        );

        assert(
            "AC resets result",
            state &&
            approximatelyEqual(
                Number(state.result),
                0
            )
        );

        /* -------------------------------------------------
           15. SHIFT
           ------------------------------------------------- */

        resetCalculator();

        safeCall(ui, "shift");

        state = getSnapshot();

        assert(
            "SHIFT toggles ON through UI",
            state &&
            state.shift === true
        );

        safeCall(ui, "shift");

        state = getSnapshot();

        assert(
            "SHIFT toggles OFF through UI",
            state &&
            state.shift === false
        );

        /* -------------------------------------------------
           16. ALPHA
           ------------------------------------------------- */

        resetCalculator();

        safeCall(ui, "alpha");

        state = getSnapshot();

        assert(
            "ALPHA toggles ON through UI",
            state &&
            state.alpha === true
        );

        safeCall(ui, "alpha");

        state = getSnapshot();

        assert(
            "ALPHA toggles OFF through UI",
            state &&
            state.alpha === false
        );

        /* -------------------------------------------------
           17. ANGLE MODES
           ------------------------------------------------- */

        resetCalculator();

        safeCall(
            ui,
            "setAngle",
            "RAD"
        );

        state = getSnapshot();

        assert(
            "UI sets RAD mode",
            state &&
            state.angleMode === "RAD"
        );

        safeCall(
            ui,
            "setAngle",
            "GRAD"
        );

        state = getSnapshot();

        assert(
            "UI sets GRAD mode",
            state &&
            state.angleMode === "GRAD"
        );

        safeCall(
            ui,
            "setAngle",
            "DEG"
        );

        state = getSnapshot();

        assert(
            "UI restores DEG mode",
            state &&
            state.angleMode === "DEG"
        );

        /* -------------------------------------------------
           18. ANGLE CYCLING
           ------------------------------------------------- */

        resetCalculator();

        safeCall(
            ui,
            "cycleAngle"
        );

        state = getSnapshot();

        assert(
            "Angle cycle DEG → RAD",
            state &&
            state.angleMode === "RAD",
            state
                ? `angle = ${state.angleMode}`
                : ""
        );

        /* -------------------------------------------------
           19. CALCULATOR MODES
           ------------------------------------------------- */

        resetCalculator();

        const modes = [
            "STAT",
            "TABLE",
            "EQN",
            "COMP"
        ];

        for (const mode of modes) {
            const modeCall =
                safeCall(
                    ui,
                    "setMode",
                    mode
                );

            if (
                !modeCall.called ||
                modeCall.error
            ) {
                fail(
                    `Set calculator mode ${mode}`,
                    modeCall.error
                        ? modeCall.error.message
                        : "Method unavailable"
                );

                continue;
            }

            state = getSnapshot();

            assert(
                `Set calculator mode ${mode}`,
                state &&
                state.mode === mode,
                state
                    ? `mode = ${state.mode}`
                    : ""
            );
        }

        /* -------------------------------------------------
           20. PI
           ------------------------------------------------- */

        resetCalculator();

        safeCall(ui, "pi");

        state = getSnapshot();

        assert(
            "π control changes expression",
            state &&
            typeof state.expression === "string" &&
            state.expression.length > 0,
            state
                ? `expression = "${state.expression}"`
                : ""
        );

        /* -------------------------------------------------
           21. EULER CONSTANT
           ------------------------------------------------- */

        resetCalculator();

        safeCall(ui, "euler");

        state = getSnapshot();

        assert(
            "e control changes expression",
            state &&
            typeof state.expression === "string" &&
            state.expression.length > 0,
            state
                ? `expression = "${state.expression}"`
                : ""
        );

        /* -------------------------------------------------
           22. PARENTHESES
           ------------------------------------------------- */

        resetCalculator();

        safeCall(ui, "leftParenthesis");
        safeCall(ui, "digit", "2");
        safeCall(ui, "operator", "+");
        safeCall(ui, "digit", "3");
        safeCall(ui, "rightParenthesis");

        state = getSnapshot();

        assert(
            "Parenthesis controls build expression",
            state &&
            state.expression === "(2+3)",
            state
                ? `expression = "${state.expression}"`
                : ""
        );

        /* -------------------------------------------------
           23. SQUARE
           ------------------------------------------------- */

        resetCalculator();

        safeCall(ui, "digit", "5");
        safeCall(ui, "square");

        state = getSnapshot();

        assert(
            "Square control changes expression",
            state &&
            state.expression !== "5" &&
            state.expression.length > 1,
            state
                ? `expression = "${state.expression}"`
                : ""
        );

        /* -------------------------------------------------
           24. POWER
           ------------------------------------------------- */

        resetCalculator();

        safeCall(ui, "digit", "2");
        safeCall(ui, "power");
        safeCall(ui, "digit", "3");

        state = getSnapshot();

        assert(
            "Power control builds power expression",
            state &&
            state.expression.length >= 3,
            state
                ? `expression = "${state.expression}"`
                : ""
        );

        /* -------------------------------------------------
           25. PERCENT
           ------------------------------------------------- */

        resetCalculator();

        safeCall(ui, "digit", "5");
        safeCall(ui, "digit", "0");
        safeCall(ui, "percent");

        state = getSnapshot();

        assert(
            "Percent control changes expression",
            state &&
            state.expression !== "50",
            state
                ? `expression = "${state.expression}"`
                : ""
        );

        /* -------------------------------------------------
   26. SCIENTIFIC FUNCTION REGISTRY
   ------------------------------------------------- */

resetCalculator();

const functionCall =
    safeCall(
        ui,
        "dispatchAction",
        "registry-function",
        "sin"
    );

console.log(functionCall);

state = getSnapshot();

assert(
    "Registry scientific dispatch executes",
    functionCall.called &&
    !functionCall.error &&
    functionCall.value &&
    functionCall.value.success === true
);

assert(
    "Registry inserts sin into expression",
    state &&
    typeof state.expression === "string" &&
    state.expression.toLowerCase().includes("sin"),
    state
        ? `expression = "${state.expression}"`
        : ""
);

        /* -------------------------------------------------
           27. ANS
           ------------------------------------------------- */

        resetCalculator();

        safeCall(ui, "input", "6*7");
        safeCall(ui, "equals");

        const answerState =
            getSnapshot();

        const answer =
            answerState
                ? Number(answerState.ans)
                : NaN;

        assert(
            "Evaluation creates ANS",
            approximatelyEqual(
                answer,
                42
            ),
            `ANS = ${answer}`
        );

        safeCall(ui, "allClear");
        safeCall(ui, "ans");

        state = getSnapshot();

        assert(
            "ANS UI control executes safely",
            !!state &&
            typeof state.expression === "string",
            state
                ? `expression = "${state.expression}"`
                : ""
        );

        /* -------------------------------------------------
           28. MEMORY
           ------------------------------------------------- */

        resetCalculator();

        safeCall(ui, "input", "25");
        safeCall(ui, "equals");

        const memoryStore =
            safeCall(
                ui,
                "memoryStore"
            );

        state = getSnapshot();

        assert(
            "Memory store executes",
            memoryStore.called &&
            !memoryStore.error
        );

        assert(
            "Memory store produces numeric memory",
            state &&
            approximatelyEqual(
                Number(state.memory),
                25
            ),
            state
                ? `memory = ${state.memory}`
                : ""
        );

        safeCall(ui, "memoryAdd");

        state = getSnapshot();

        assert(
            "Memory add executes safely",
            state &&
            Number.isFinite(
                Number(state.memory)
            ),
            state
                ? `memory = ${state.memory}`
                : ""
        );

        safeCall(ui, "memorySubtract");

        state = getSnapshot();

        assert(
            "Memory subtract executes safely",
            state &&
            Number.isFinite(
                Number(state.memory)
            ),
            state
                ? `memory = ${state.memory}`
                : ""
        );

        safeCall(ui, "memoryClear");

        state = getSnapshot();

        assert(
            "Memory clear resets memory",
            state &&
            approximatelyEqual(
                Number(state.memory),
                0
            ),
            state
                ? `memory = ${state.memory}`
                : ""
        );

        /* -------------------------------------------------
           29. HISTORY / REPLAY
           ------------------------------------------------- */

        resetCalculator();

        safeCall(ui, "input", "2+2");
        safeCall(ui, "equals");

        safeCall(ui, "allClear");

        const historyUp =
            safeCall(
                ui,
                "historyUp"
            );

        assert(
            "Replay ↑ executes safely",
            historyUp.called &&
            !historyUp.error
        );

        const historyDown =
            safeCall(
                ui,
                "historyDown"
            );

        assert(
            "Replay ↓ executes safely",
            historyDown.called &&
            !historyDown.error
        );

        /* -------------------------------------------------
           30. GENERIC DISPATCH
           ------------------------------------------------- */

        resetCalculator();

        safeCall(
            ui,
            "dispatchAction",
            "digit",
            "9"
        );

        safeCall(
            ui,
            "dispatchAction",
            "operator",
            "+"
        );

        safeCall(
            ui,
            "dispatchAction",
            "digit",
            "1"
        );

        state = getSnapshot();

        assert(
            "Generic dispatch routes calculator input",
            state &&
            state.expression === "9+1",
            state
                ? `expression = "${state.expression}"`
                : ""
        );

        safeCall(
            ui,
            "dispatchAction",
            "equals"
        );

        state = getSnapshot();

        assert(
            "Generic dispatch routes evaluation",
            state &&
            approximatelyEqual(
                Number(state.result),
                10
            ),
            state
                ? `result = ${state.result}`
                : ""
        );

        /* -------------------------------------------------
           31. UNKNOWN ACTION SAFETY
           ------------------------------------------------- */

        const unknownAction =
            safeCall(
                ui,
                "dispatchAction",
                "__unknown_action__"
            );

        assert(
            "Unknown UI action handled safely",
            unknownAction.called &&
            !unknownAction.error &&
            unknownAction.value &&
            unknownAction.value.success === false
        );

        /* -------------------------------------------------
           32. INVALID EXPRESSION
           ------------------------------------------------- */

        resetCalculator();

        safeCall(
            ui,
            "input",
            "2+*3"
        );

        const invalidEvaluation =
            safeCall(
                ui,
                "equals"
            );

        state = getSnapshot();

        assert(
            "Invalid expression does not crash UI layer",
            invalidEvaluation.called &&
            !invalidEvaluation.error &&
            !!state
        );

        /* -------------------------------------------------
           33. RECOVERY AFTER ERROR
           ------------------------------------------------- */

        safeCall(
            ui,
            "allClear"
        );

        safeCall(
            ui,
            "input",
            "6*7"
        );

        safeCall(
            ui,
            "equals"
        );

        state = getSnapshot();

        assert(
            "UI recovers after invalid expression",
            state &&
            approximatelyEqual(
                Number(state.result),
                42
            ),
            state
                ? `result = ${state.result}`
                : ""
        );

        /* -------------------------------------------------
           34. UI / CONTROL SYNCHRONIZATION
           ------------------------------------------------- */

        resetCalculator();

        if (
            control &&
            typeof control.setExpression ===
                "function"
        ) {
            try {
                control.setExpression(
                    "11+4"
                );

                ui.render();

                state =
                    getSnapshot();

                assert(
                    "UI reads externally changed Control state",
                    state &&
                    state.expression === "11+4",
                    state
                        ? `expression = "${state.expression}"`
                        : ""
                );
            } catch (error) {
                fail(
                    "UI reads externally changed Control state",
                    error.message
                );
            }
        } else {
            skip(
                "UI / Control synchronization",
                "Control expression setter unavailable"
            );
        }

        /* -------------------------------------------------
           35. RENDER SAFETY
           ------------------------------------------------- */

        const renderCall =
            safeCall(
                ui,
                "render"
            );

        assert(
            "UI render executes safely",
            renderCall.called &&
            !renderCall.error &&
            !!renderCall.value
        );

        /* -------------------------------------------------
           36. FINAL CLEANUP
           ------------------------------------------------- */

        resetCalculator();

        printSummary();

        console.groupEnd();

        return getReport();
    }

    /* =====================================================
       SUMMARY
       ===================================================== */

    function printSummary() {
        console.log(
            "----------------------------"
        );

        console.log(
            `Total: ${passed + failed + skipped}`
        );

        console.log(
            `Passed: ${passed}`
        );

        console.log(
            `Skipped: ${skipped}`
        );

        console.log(
            `Failed: ${failed}`
        );

        if (failed === 0) {
            console.log(
                "%c🟢 STATUS: UI ENGINE QA PASSED",
                "color:#00a000;font-weight:bold;font-size:14px;"
            );
        } else {
            console.error(
                "🔴 STATUS: UI ENGINE QA FAILED"
            );
        }
    }

    function getReport() {
        return {
            total:
                passed +
                failed +
                skipped,

            passed,
            failed,
            skipped,

            success:
                failed === 0,

            results: [
                ...results
            ]
        };
    }

    /* =====================================================
       PUBLIC QA API
       ===================================================== */

    window.ToolXoneScientificUITests = {
        runAll,
        getResults() {
            return [
                ...results
            ];
        },
        getReport
    };

    /* =====================================================
       AUTO RUN
       ===================================================== */

    function autoRun() {
        if (
            window.ToolXoneScientificUI &&
            window.ToolXoneScientificControl
        ) {
            runAll();
        } else {
            console.warn(
                "⚠️ Scientific UI QA not started: required engines unavailable."
            );
        }
    }

    if (
        document.readyState === "loading"
    ) {
        document.addEventListener(
            "DOMContentLoaded",
            autoRun,
            {
                once: true
            }
        );
    } else {
        autoRun();
    }

})();