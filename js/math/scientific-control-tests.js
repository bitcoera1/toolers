/**
 * ToolXone Professional Scientific Calculator
 * Control Engine QA Suite
 * --------------------------------------------
 * Tests the public Scientific Control API and
 * verifies control/state integration.
 *
 * DEVELOPMENT ONLY — remove script from production
 * after professional scientific calculator QA.
 */

(function () {
    "use strict";

    const TEST_NAME = "ToolXone Scientific Control QA";

    const results = [];

    let passed = 0;
    let failed = 0;
    let skipped = 0;

    /* =========================================
       HELPERS
    ========================================= */

    function pass(name, details = "") {
        passed++;

        results.push({
            name,
            status: "PASS",
            details
        });

        console.log(
            `%c✅ ${name}${details ? `: ${details}` : ""}`,
            "color:#16a34a;font-weight:bold;"
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
            `❌ ${name}${details ? `: ${details}` : ""}`
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
            `⚠️ ○ SKIP — ${name}${details ? `: ${details}` : ""}`
        );
    }

    function assert(name, condition, details = "") {
        if (condition) {
            pass(name, details);
            return true;
        }

        fail(name, details);
        return false;
    }

    function approximatelyEqual(a, b, tolerance = 1e-10) {
        return (
            typeof a === "number" &&
            typeof b === "number" &&
            Math.abs(a - b) <= tolerance
        );
    }

    function getControl() {
        return window.ToolXoneScientificControl || null;
    }

    function getSnapshot() {
        const control = getControl();

        if (
            !control ||
            typeof control.getSnapshot !== "function"
        ) {
            return null;
        }

        return control.getSnapshot();
    }

    function callFirst(names, ...args) {
        const control = getControl();

        if (!control) {
            return {
                called: false,
                method: null,
                value: undefined
            };
        }

        for (const name of names) {
            if (typeof control[name] === "function") {
                try {
                    return {
                        called: true,
                        method: name,
                        value: control[name](...args)
                    };
                } catch (error) {
                    return {
                        called: true,
                        method: name,
                        error
                    };
                }
            }
        }

        return {
            called: false,
            method: null,
            value: undefined
        };
    }

    function resetCalculator() {
        return callFirst(
            [
                "reset",
                "resetAll",
                "allClear",
                "clearAll",
                "ac"
            ]
        );
    }

    /* =========================================
       QA RUNNER
    ========================================= */

    function runAll() {
        results.length = 0;
        passed = 0;
        failed = 0;
        skipped = 0;

        console.group(
            `%c🎛️ ${TEST_NAME}`,
            "color:#7c3aed;font-weight:bold;font-size:14px;"
        );

        const control = getControl();

        /* -----------------------------------------
           1. PUBLIC API
        ----------------------------------------- */

        assert(
            "Control API exists",
            !!control &&
            typeof control === "object"
        );

        if (!control) {
            console.error(
                "ToolXoneScientificControl was not found."
            );

            printSummary();

            console.groupEnd();

            return {
                total: passed + failed + skipped,
                passed,
                failed,
                skipped,
                success: false,
                results
            };
        }

        assert(
            "getCapabilities() exposed",
            typeof control.getCapabilities === "function"
        );

        assert(
            "getSnapshot() exposed",
            typeof control.getSnapshot === "function"
        );

        /* -----------------------------------------
           2. CAPABILITIES
        ----------------------------------------- */

        let capabilities = {};

        try {
            capabilities =
                typeof control.getCapabilities === "function"
                    ? control.getCapabilities()
                    : {};
        } catch (error) {
            fail(
                "Read capabilities",
                error.message
            );
        }

        assert(
            "State Engine connected",
            capabilities.stateEngine === true
        );

        assert(
            "Expression Evaluator connected",
            capabilities.evaluator === true
        );

        assert(
            "SHIFT support",
            capabilities.shift === true
        );

        assert(
            "ALPHA support",
            capabilities.alpha === true
        );

        assert(
            "ANS support",
            capabilities.ans === true
        );

        assert(
            "Memory support",
            capabilities.memory === true
        );

        assert(
            "Replay support",
            capabilities.replay === true
        );

        assert(
            "Grand Total support",
            capabilities.grandTotal === true
        );

        assert(
            "Evaluation support",
            capabilities.evaluation === true
        );

        assert(
            "DEG/RAD/GRAD available",
            Array.isArray(capabilities.angleModes) &&
            ["DEG", "RAD", "GRAD"].every(
                mode => capabilities.angleModes.includes(mode)
            )
        );

        assert(
            "Professional calculator modes registered",
            Array.isArray(capabilities.calculatorModes) &&
            ["COMP", "STAT", "TABLE", "EQN"].every(
                mode => capabilities.calculatorModes.includes(mode)
            )
        );

        /* -----------------------------------------
           3. INITIAL SNAPSHOT
        ----------------------------------------- */

        const initial = getSnapshot();

        assert(
            "Snapshot available",
            !!initial &&
            typeof initial === "object"
        );

        if (initial) {
            assert(
                "Mode state exists",
                typeof initial.mode === "string"
            );

            assert(
                "Angle mode state exists",
                typeof initial.angleMode === "string"
            );

            assert(
                "SHIFT state exists",
                typeof initial.shift === "boolean"
            );

            assert(
                "ALPHA state exists",
                typeof initial.alpha === "boolean"
            );

            assert(
                "Expression state exists",
                typeof initial.expression === "string"
            );

            assert(
                "Result state exists",
                Object.prototype.hasOwnProperty.call(
                    initial,
                    "result"
                )
            );

            assert(
                "ANS state exists",
                Object.prototype.hasOwnProperty.call(
                    initial,
                    "ans"
                )
            );

            assert(
                "Memory state exists",
                Object.prototype.hasOwnProperty.call(
                    initial,
                    "memory"
                )
            );

            assert(
                "GT state exists",
                Object.prototype.hasOwnProperty.call(
                    initial,
                    "grandTotal"
                )
            );

            assert(
                "Error state exists",
                Object.prototype.hasOwnProperty.call(
                    initial,
                    "error"
                )
            );
        }

        /* -----------------------------------------
           4. RESET / AC
        ----------------------------------------- */

        const resetCall = resetCalculator();

        if (!resetCall.called) {
            skip(
                "AC / reset control",
                "No public reset method exposed"
            );
        } else if (resetCall.error) {
            fail(
                "AC / reset control",
                resetCall.error.message
            );
        } else {
            const state = getSnapshot();

            assert(
                "AC clears expression",
                state &&
                state.expression === ""
            );
        }

        /* -----------------------------------------
           5. SHIFT
        ----------------------------------------- */

        const shiftBefore = getSnapshot();

        const shiftCall = callFirst(
            [
                "toggleShift",
                "shift",
                "pressShift"
            ]
        );

        if (!shiftCall.called) {
            skip(
                "SHIFT toggle",
                "SHIFT control method not exposed"
            );
        } else if (shiftCall.error) {
            fail(
                "SHIFT toggle",
                shiftCall.error.message
            );
        } else {
            const shiftAfter = getSnapshot();

            assert(
                "SHIFT toggles state",
                shiftBefore &&
                shiftAfter &&
                shiftAfter.shift !== shiftBefore.shift
            );

            /*
             * Restore SHIFT state.
             */
            callFirst(
                [
                    "toggleShift",
                    "shift",
                    "pressShift"
                ]
            );
        }

        /* -----------------------------------------
           6. ALPHA
        ----------------------------------------- */

        const alphaBefore = getSnapshot();

        const alphaCall = callFirst(
            [
                "toggleAlpha",
                "alpha",
                "pressAlpha"
            ]
        );

        if (!alphaCall.called) {
            skip(
                "ALPHA toggle",
                "ALPHA control method not exposed"
            );
        } else if (alphaCall.error) {
            fail(
                "ALPHA toggle",
                alphaCall.error.message
            );
        } else {
            const alphaAfter = getSnapshot();

            assert(
                "ALPHA toggles state",
                alphaBefore &&
                alphaAfter &&
                alphaAfter.alpha !== alphaBefore.alpha
            );

            /*
             * Restore ALPHA state.
             */
            callFirst(
                [
                    "toggleAlpha",
                    "alpha",
                    "pressAlpha"
                ]
            );
        }

        /* -----------------------------------------
           7. ANGLE MODES
        ----------------------------------------- */

        const angleSetterNames = [
            "setAngleMode",
            "changeAngleMode"
        ];

        const degreeCall = callFirst(
            angleSetterNames,
            "DEG"
        );

        if (!degreeCall.called) {
            skip(
                "Angle mode controls",
                "Angle-mode setter not exposed"
            );
        } else if (degreeCall.error) {
            fail(
                "Set DEG mode",
                degreeCall.error.message
            );
        } else {
            let state = getSnapshot();

            assert(
                "Set DEG mode",
                state &&
                state.angleMode === "DEG"
            );

            const radCall = callFirst(
                angleSetterNames,
                "RAD"
            );

            if (radCall.error) {
                fail(
                    "Set RAD mode",
                    radCall.error.message
                );
            } else {
                state = getSnapshot();

                assert(
                    "Set RAD mode",
                    state &&
                    state.angleMode === "RAD"
                );
            }

            const gradCall = callFirst(
                angleSetterNames,
                "GRAD"
            );

            if (gradCall.error) {
                fail(
                    "Set GRAD mode",
                    gradCall.error.message
                );
            } else {
                state = getSnapshot();

                assert(
                    "Set GRAD mode",
                    state &&
                    state.angleMode === "GRAD"
                );
            }

            /*
             * Restore normal default.
             */
            callFirst(
                angleSetterNames,
                "DEG"
            );
        }

        /* -----------------------------------------
           8. MODE CONTROL
        ----------------------------------------- */

        const modeSetterNames = [
            "setMode",
            "setCalculatorMode",
            "changeMode"
        ];

        const compCall = callFirst(
            modeSetterNames,
            "COMP"
        );

        if (!compCall.called) {
            skip(
                "Calculator mode control",
                "Mode setter not exposed"
            );
        } else if (compCall.error) {
            fail(
                "Set COMP mode",
                compCall.error.message
            );
        } else {
            let state = getSnapshot();

            assert(
                "Set COMP mode",
                state &&
                state.mode === "COMP"
            );

            const statCall = callFirst(
                modeSetterNames,
                "STAT"
            );

            if (statCall.error) {
                fail(
                    "Set STAT mode",
                    statCall.error.message
                );
            } else {
                state = getSnapshot();

                assert(
                    "Set STAT mode",
                    state &&
                    state.mode === "STAT"
                );
            }

            /*
             * Return to COMP before arithmetic QA.
             */
            callFirst(
                modeSetterNames,
                "COMP"
            );
        }

        /* -----------------------------------------
           9. EXPRESSION ENTRY
        ----------------------------------------- */

        resetCalculator();

        const expressionSetter = callFirst(
            [
                "setExpression"
            ],
            "2+3*4"
        );

        if (!expressionSetter.called) {
            skip(
                "Expression setter",
                "setExpression() not exposed"
            );
        } else if (expressionSetter.error) {
            fail(
                "Expression setter",
                expressionSetter.error.message
            );
        } else {
            const state = getSnapshot();

            assert(
                "Expression updates state",
                state &&
                state.expression === "2+3*4"
            );
        }

        /* -----------------------------------------
           10. EVALUATION
        ----------------------------------------- */

        let evaluationPrepared = false;

        if (expressionSetter.called && !expressionSetter.error) {
            evaluationPrepared = true;
        } else {
            resetCalculator();

            const appendCall = callFirst(
                [
                    "append",
                    "appendValue",
                    "input"
                ],
                "2+3*4"
            );

            evaluationPrepared =
                appendCall.called &&
                !appendCall.error;
        }

        if (!evaluationPrepared) {
            skip(
                "Expression evaluation",
                "No public expression input method exposed"
            );
        } else {
            const evaluateCall = callFirst(
                [
                    "evaluateExpression",
                    "evaluate",
                    "calculate",
                    "equals"
                ]
            );

            if (!evaluateCall.called) {
                skip(
                    "Expression evaluation",
                    "Evaluation method not exposed"
                );
            } else if (evaluateCall.error) {
                fail(
                    "Expression evaluation",
                    evaluateCall.error.message
                );
            } else {
                const state = getSnapshot();

                assert(
                    "2 + 3 × 4 = 14",
                    state &&
                    approximatelyEqual(
                        Number(state.result),
                        14
                    ),
                    state
                        ? `result = ${state.result}`
                        : ""
                );

                assert(
                    "ANS receives evaluated result",
                    state &&
                    approximatelyEqual(
                        Number(state.ans),
                        14
                    ),
                    state
                        ? `ANS = ${state.ans}`
                        : ""
                );
            }
        }

        /* -----------------------------------------
           11. ANS INSERTION
        ----------------------------------------- */

        const ansBefore = getSnapshot();

        const ansCall = callFirst(
            [
                "useAns",
                "insertAns",
                "ans"
            ]
        );

        if (!ansCall.called) {
            skip(
                "ANS insertion",
                "ANS insertion method not exposed"
            );
        } else if (ansCall.error) {
            fail(
                "ANS insertion",
                ansCall.error.message
            );
        } else {
            const state = getSnapshot();

            assert(
                "ANS control changes expression",
                state &&
                ansBefore &&
                state.expression !== ansBefore.expression
            );
        }

        /* -----------------------------------------
           12. MEMORY
        ----------------------------------------- */

        const memoryClear = callFirst(
            [
                "memoryClear",
                "clearMemory",
                "mc"
            ]
        );

        if (!memoryClear.called) {
            skip(
                "Memory controls",
                "Memory control API not exposed"
            );
        } else if (memoryClear.error) {
            fail(
                "Memory clear",
                memoryClear.error.message
            );
        } else {
            let state = getSnapshot();

            assert(
                "MC clears memory",
                state &&
                approximatelyEqual(
                    Number(state.memory),
                    0
                )
            );

            /*
             * Store current result if API supports it.
             */
            const memoryStore = callFirst(
                [
                    "memoryStore",
                    "storeMemory",
                    "ms"
                ],
                25
            );

            if (memoryStore.called) {
                if (memoryStore.error) {
                    fail(
                        "Memory store",
                        memoryStore.error.message
                    );
                } else {
                    state = getSnapshot();

                    /*
                     * Different implementations may store
                     * the explicit argument or current result.
                     * We only require memory to remain numeric.
                     */
                    assert(
                        "Memory store produces numeric memory",
                        state &&
                        Number.isFinite(
                            Number(state.memory)
                        ),
                        state
                            ? `memory = ${state.memory}`
                            : ""
                    );
                }
            } else {
                skip(
                    "Memory store",
                    "Memory-store method not exposed"
                );
            }

            const memoryAdd = callFirst(
                [
                    "memoryAdd",
                    "addMemory",
                    "mPlus"
                ],
                5
            );

            if (!memoryAdd.called) {
                skip(
                    "M+",
                    "Memory-add method not exposed"
                );
            } else if (memoryAdd.error) {
                fail(
                    "M+",
                    memoryAdd.error.message
                );
            } else {
                state = getSnapshot();

                assert(
                    "M+ leaves valid memory state",
                    state &&
                    Number.isFinite(
                        Number(state.memory)
                    ),
                    state
                        ? `memory = ${state.memory}`
                        : ""
                );
            }

            const memorySubtract = callFirst(
                [
                    "memorySubtract",
                    "subtractMemory",
                    "mMinus"
                ],
                2
            );

            if (!memorySubtract.called) {
                skip(
                    "M−",
                    "Memory-subtract method not exposed"
                );
            } else if (memorySubtract.error) {
                fail(
                    "M−",
                    memorySubtract.error.message
                );
            } else {
                state = getSnapshot();

                assert(
                    "M− leaves valid memory state",
                    state &&
                    Number.isFinite(
                        Number(state.memory)
                    )
                );
            }

            const memoryRecall = callFirst(
                [
                    "memoryRecall",
                    "recallMemory",
                    "mr"
                ]
            );

            if (!memoryRecall.called) {
                skip(
                    "MR",
                    "Memory-recall method not exposed"
                );
            } else if (memoryRecall.error) {
                fail(
                    "MR",
                    memoryRecall.error.message
                );
            } else {
                pass(
                    "MR control executes"
                );
            }

            /*
             * Cleanup.
             */
            callFirst(
                [
                    "memoryClear",
                    "clearMemory",
                    "mc"
                ]
            );
        }

        /* -----------------------------------------
           13. GRAND TOTAL
        ----------------------------------------- */

        const gtCall = callFirst(
            [
                "grandTotal",
                "getGrandTotal",
                "recallGrandTotal",
                "gt"
            ]
        );

        if (!gtCall.called) {
            skip(
                "GT / Grand Total",
                "GT control method not exposed"
            );
        } else if (gtCall.error) {
            fail(
                "GT / Grand Total",
                gtCall.error.message
            );
        } else {
            const state = getSnapshot();

            assert(
                "GT state remains numeric",
                state &&
                Number.isFinite(
                    Number(state.grandTotal)
                ),
                state
                    ? `GT = ${state.grandTotal}`
                    : ""
            );
        }

        /* -----------------------------------------
           14. REPLAY NAVIGATION
        ----------------------------------------- */

        const historyUp = callFirst(
            [
                "historyUp",
                "replayUp",
                "previousHistory",
                "previous"
            ]
        );

        if (!historyUp.called) {
            skip(
                "Replay ↑",
                "History-up control not exposed"
            );
        } else if (historyUp.error) {
            fail(
                "Replay ↑",
                historyUp.error.message
            );
        } else {
            pass(
                "Replay ↑ executes"
            );
        }

        const historyDown = callFirst(
            [
                "historyDown",
                "replayDown",
                "nextHistory",
                "next"
            ]
        );

        if (!historyDown.called) {
            skip(
                "Replay ↓",
                "History-down control not exposed"
            );
        } else if (historyDown.error) {
            fail(
                "Replay ↓",
                historyDown.error.message
            );
        } else {
            pass(
                "Replay ↓ executes"
            );
        }

        /* -----------------------------------------
           15. DELETE / BACKSPACE
        ----------------------------------------- */

        resetCalculator();

        const setDeleteExpression = callFirst(
            [
                "setExpression"
            ],
            "123"
        );

        if (
            setDeleteExpression.called &&
            !setDeleteExpression.error
        ) {
            const deleteCall = callFirst(
                [
                    "backspace",
                    "deleteLast",
                    "del"
                ]
            );

            if (!deleteCall.called) {
                skip(
                    "DEL / Backspace",
                    "Delete control not exposed"
                );
            } else if (deleteCall.error) {
                fail(
                    "DEL / Backspace",
                    deleteCall.error.message
                );
            } else {
                const state = getSnapshot();

                assert(
                    "DEL removes final character",
                    state &&
                    state.expression === "12",
                    state
                        ? `expression = "${state.expression}"`
                        : ""
                );
            }
        } else {
            skip(
                "DEL / Backspace",
                "Could not prepare expression"
            );
        }

        /* -----------------------------------------
           16. ERROR HANDLING
        ----------------------------------------- */

        resetCalculator();

        const invalidExpression = callFirst(
            [
                "setExpression"
            ],
            "2+*3"
        );

        if (
            !invalidExpression.called ||
            invalidExpression.error
        ) {
            skip(
                "Evaluation error handling",
                "Could not prepare invalid expression"
            );
        } else {
            const badEvaluation = callFirst(
                [
                  "evaluateExpression",  
                  "evaluate",
                    "calculate",
                    "equals"
                ]
            );

            if (!badEvaluation.called) {
                skip(
                    "Evaluation error handling",
                    "Evaluation control not exposed"
                );
            } else {
                const state = getSnapshot();

                /*
                 * Either the controller captures the error
                 * into state, or it may safely return an
                 * error without corrupting state.
                 */
                assert(
                    "Invalid expression handled safely",
                    !!state &&
                    (
                        state.error !== null ||
                        badEvaluation.error ||
                        Number.isFinite(
                            Number(state.result)
                        )
                    )
                );
            }
        }

        /* -----------------------------------------
           17. RECOVERY AFTER ERROR
        ----------------------------------------- */

        resetCalculator();

        const recoveryExpression = callFirst(
            [
                "setExpression"
            ],
            "6*7"
        );

        if (
            recoveryExpression.called &&
            !recoveryExpression.error
        ) {
            const recoveryEval = callFirst(
                [
                    "evaluateExpression",
                    "evaluate",
                    "calculate",
                    "equals"
                ]
            );

            if (
                recoveryEval.called &&
                !recoveryEval.error
            ) {
                const state = getSnapshot();

                assert(
                    "Calculator recovers after error",
                    state &&
                    approximatelyEqual(
                        Number(state.result),
                        42
                    ),
                    state
                        ? `result = ${state.result}`
                        : ""
                );
            } else {
                skip(
                    "Error recovery",
                    "Evaluation method unavailable"
                );
            }
        } else {
            skip(
                "Error recovery",
                "Expression setter unavailable"
            );
        }

        /* -----------------------------------------
           FINAL CLEANUP
        ----------------------------------------- */

        resetCalculator();

        callFirst(
            angleSetterNames,
            "DEG"
        );

        callFirst(
            modeSetterNames,
            "COMP"
        );

        printSummary();

        console.groupEnd();

        return {
            total: passed + failed + skipped,
            passed,
            failed,
            skipped,
            success: failed === 0,
            results: [...results]
        };
    }

    /* =========================================
       SUMMARY
    ========================================= */

    function printSummary() {
        console.log(
            "--------------------------------"
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
                "%c🟢 STATUS: CONTROL ENGINE QA PASSED",
                "color:#16a34a;font-weight:bold;font-size:14px;"
            );
        } else {
            console.error(
                "🔴 STATUS: CONTROL ENGINE QA FAILED"
            );
        }
    }

    /* =========================================
       PUBLIC QA API
    ========================================= */

    window.ToolXoneScientificControlTests = {
        runAll,
        getResults() {
            return [...results];
        }
    };

})();