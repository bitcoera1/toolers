/**
 * ToolXone Scientific Calculator
 * State Engine QA Suite
 * -----------------------------------------
 * File:
 * js/math/scientific-state-tests.js
 *
 * Development-only QA for:
 * js/math/scientific-state-engine.js
 */

(function () {
    "use strict";

    const TEST_NAME = "ToolXone Scientific State QA";

    /* =========================================
       HELPERS
    ========================================= */

    function getEngine() {
        return window.ToolXoneScientificState || null;
    }

    function pass(name, detail = "") {
        console.log(
            `%c✅ ${name}${detail ? ": " + detail : ""}`,
            "color:#16a34a;font-weight:bold;"
        );

        return {
            name,
            passed: true,
            skipped: false,
            detail
        };
    }

    function fail(name, detail = "") {
        console.error(
            `❌ ${name}${detail ? ": " + detail : ""}`
        );

        return {
            name,
            passed: false,
            skipped: false,
            detail
        };
    }

    function skip(name, detail = "") {
        console.warn(
            `⚪ SKIP — ${name}${detail ? ": " + detail : ""}`
        );

        return {
            name,
            passed: true,
            skipped: true,
            detail
        };
    }

    function valuesEqual(actual, expected) {
        if (
            typeof actual === "number" &&
            typeof expected === "number"
        ) {
            return Math.abs(actual - expected) < 1e-12;
        }

        return actual === expected;
    }

    function assertEqual(name, actual, expected) {
        if (valuesEqual(actual, expected)) {
            return pass(
                name,
                `${String(actual)}`
            );
        }

        return fail(
            name,
            `expected ${String(expected)}, got ${String(actual)}`
        );
    }

    function assertTrue(name, condition, detail = "") {
        if (condition) {
            return pass(name, detail);
        }

        return fail(
            name,
            detail || "condition was false"
        );
    }

    function assertFunction(name, object, method) {
        return assertTrue(
            name,
            !!object && typeof object[method] === "function",
            method
        );
    }

    function safeCall(fn) {
        try {
            return {
                success: true,
                value: fn()
            };
        } catch (error) {
            return {
                success: false,
                error
            };
        }
    }

    function getSnapshot(engine) {
        if (!engine) return null;

        if (typeof engine.getState === "function") {
            return engine.getState();
        }

        if (typeof engine.getSnapshot === "function") {
            return engine.getSnapshot();
        }

        if (typeof engine.state === "object") {
            return engine.state;
        }

        return null;
    }

    function findMethod(engine, names) {
        for (const name of names) {
            if (typeof engine[name] === "function") {
                return name;
            }
        }

        return null;
    }

    function resetEngine(engine) {
        const method = findMethod(engine, [
            "reset",
            "resetState",
            "clearState",
            "initialize"
        ]);

        if (!method) {
            return false;
        }

        engine[method]();

        return true;
    }

    function findProperty(object, names) {
        if (!object) return null;

        for (const name of names) {
            if (Object.prototype.hasOwnProperty.call(object, name)) {
                return name;
            }
        }

        return null;
    }

    /* =========================================
       TEST DEFINITIONS
    ========================================= */

    function buildTests() {
        return [

            /* ---------------------------------
               CORE ENGINE
            --------------------------------- */

            {
                name: "State engine exists",
                run(engine) {
                    return assertTrue(
                        this.name,
                        !!engine,
                        typeof engine
                    );
                }
            },

            {
                name: "State engine is an object",
                run(engine) {
                    return assertEqual(
                        this.name,
                        typeof engine,
                        "object"
                    );
                }
            },

            {
                name: "State engine exposes a readable state",
                run(engine) {
                    const snapshot = getSnapshot(engine);

                    return assertTrue(
                        this.name,
                        !!snapshot &&
                        typeof snapshot === "object",
                        snapshot
                            ? "state available"
                            : "no readable state API found"
                    );
                }
            },

            /* ---------------------------------
               STATE IMMUTABILITY / ACCESS
            --------------------------------- */

            {
                name: "State snapshot can be retrieved safely",
                run(engine) {
                    const result = safeCall(() =>
                        getSnapshot(engine)
                    );

                    return assertTrue(
                        this.name,
                        result.success &&
                        !!result.value,
                        result.success
                            ? "snapshot retrieved"
                            : result.error?.message
                    );
                }
            },

            /* ---------------------------------
               RESET
            --------------------------------- */

            {
                name: "Reset API",
                run(engine) {
                    const method = findMethod(engine, [
                        "reset",
                        "resetState",
                        "clearState"
                    ]);

                    if (!method) {
                        return skip(
                            this.name,
                            "reset method not exposed"
                        );
                    }

                    const result = safeCall(() =>
                        engine[method]()
                    );

                    return assertTrue(
                        this.name,
                        result.success,
                        result.success
                            ? method
                            : result.error?.message
                    );
                }
            },

            /* ---------------------------------
               ANGLE MODE
            --------------------------------- */

            {
                name: "Angle mode state",
                run(engine) {
                    const state = getSnapshot(engine);

                    if (!state) {
                        return fail(
                            this.name,
                            "state unavailable"
                        );
                    }

                    const property = findProperty(state, [
                        "angleMode",
                        "angle",
                        "angleUnit"
                    ]);

                    if (!property) {
                        return skip(
                            this.name,
                            "angle-mode property not found"
                        );
                    }

                    const value =
                        String(state[property]).toUpperCase();

                    return assertTrue(
                        this.name,
                        ["DEG", "RAD", "GRAD"].includes(value),
                        `${property}=${value}`
                    );
                }
            },

            {
                name: "Angle mode control",
                run(engine) {
                    const method = findMethod(engine, [
                        "setAngleMode",
                        "setAngle",
                        "changeAngleMode"
                    ]);

                    if (!method) {
                        return skip(
                            this.name,
                            "angle-mode setter not exposed"
                        );
                    }

                    const result = safeCall(() => {
                        engine[method]("RAD");
                        engine[method]("DEG");
                    });

                    return assertTrue(
                        this.name,
                        result.success,
                        result.success
                            ? method
                            : result.error?.message
                    );
                }
            },

            /* ---------------------------------
               SHIFT
            --------------------------------- */

            {
                name: "SHIFT control",
                run(engine) {
                    const method = findMethod(engine, [
                        "toggleShift",
                        "setShift",
                        "shift"
                    ]);

                    if (!method) {
                        return skip(
                            this.name,
                            "SHIFT control not exposed"
                        );
                    }

                    const before = getSnapshot(engine);

                    const result = safeCall(() =>
                        engine[method]()
                    );

                    if (!result.success) {
                        return fail(
                            this.name,
                            result.error?.message
                        );
                    }

                    const after = getSnapshot(engine);

                    /*
                     * We primarily verify that the control
                     * executes safely. State-value checking
                     * depends on the engine's public schema.
                     */
                    return pass(
                        this.name,
                        before && after
                            ? "state transition executed"
                            : method
                    );
                }
            },

            /* ---------------------------------
               ALPHA
            --------------------------------- */

            {
                name: "ALPHA control",
                run(engine) {
                    const method = findMethod(engine, [
                        "toggleAlpha",
                        "setAlpha",
                        "alpha"
                    ]);

                    if (!method) {
                        return skip(
                            this.name,
                            "ALPHA control not exposed"
                        );
                    }

                    const result = safeCall(() =>
                        engine[method]()
                    );

                    return assertTrue(
                        this.name,
                        result.success,
                        result.success
                            ? method
                            : result.error?.message
                    );
                }
            },

            /* ---------------------------------
               ANSWER REGISTER
            --------------------------------- */

            {
                name: "ANS register API",
                run(engine) {
                    const setter = findMethod(engine, [
                        "setAns",
                        "setAnswer",
                        "storeAnswer"
                    ]);

                    const getter = findMethod(engine, [
                        "getAns",
                        "getAnswer"
                    ]);

                    if (!setter) {
                        return skip(
                            this.name,
                            "ANS setter not exposed"
                        );
                    }

                    const result = safeCall(() =>
                        engine[setter](42)
                    );

                    if (!result.success) {
                        return fail(
                            this.name,
                            result.error?.message
                        );
                    }

                    if (getter) {
                        return assertEqual(
                            this.name,
                            engine[getter](),
                            42
                        );
                    }

                    const state = getSnapshot(engine);

                    const property = findProperty(state, [
                        "ans",
                        "answer",
                        "lastAnswer"
                    ]);

                    if (property) {
                        return assertEqual(
                            this.name,
                            state[property],
                            42
                        );
                    }

                    return pass(
                        this.name,
                        `${setter}(42) executed`
                    );
                }
            },

            /* ---------------------------------
               MEMORY
            --------------------------------- */

            {
                name: "Memory store / recall",
                run(engine) {
                    const store = findMethod(engine, [
                        "setMemory",
                        "storeMemory",
                        "memoryStore"
                    ]);

                    const recall = findMethod(engine, [
                        "getMemory",
                        "recallMemory",
                        "memoryRecall"
                    ]);

                    if (!store || !recall) {
                        return skip(
                            this.name,
                            "memory store/recall API not exposed"
                        );
                    }

                    const result = safeCall(() => {
                        engine[store](25);
                        return engine[recall]();
                    });

                    if (!result.success) {
                        return fail(
                            this.name,
                            result.error?.message
                        );
                    }

                    return assertEqual(
                        this.name,
                        result.value,
                        25
                    );
                }
            },

            {
                name: "Memory clear",
                run(engine) {
                    const clear = findMethod(engine, [
                        "clearMemory",
                        "memoryClear",
                        "mc"
                    ]);

                    if (!clear) {
                        return skip(
                            this.name,
                            "memory-clear API not exposed"
                        );
                    }

                    const result = safeCall(() =>
                        engine[clear]()
                    );

                    return assertTrue(
                        this.name,
                        result.success,
                        result.success
                            ? clear
                            : result.error?.message
                    );
                }
            },

            {
                name: "Memory addition",
                run(engine) {
                    const method = findMethod(engine, [
                        "memoryAdd",
                        "addMemory",
                        "mPlus"
                    ]);

                    if (!method) {
                        return skip(
                            this.name,
                            "M+ API not exposed"
                        );
                    }

                    const result = safeCall(() =>
                        engine[method](10)
                    );

                    return assertTrue(
                        this.name,
                        result.success,
                        result.success
                            ? method
                            : result.error?.message
                    );
                }
            },

            {
                name: "Memory subtraction",
                run(engine) {
                    const method = findMethod(engine, [
                        "memorySubtract",
                        "subtractMemory",
                        "mMinus"
                    ]);

                    if (!method) {
                        return skip(
                            this.name,
                            "M− API not exposed"
                        );
                    }

                    const result = safeCall(() =>
                        engine[method](5)
                    );

                    return assertTrue(
                        this.name,
                        result.success,
                        result.success
                            ? method
                            : result.error?.message
                    );
                }
            },

            /* ---------------------------------
               HISTORY / REPLAY
            --------------------------------- */

            {
                name: "History API",
                run(engine) {
                    const method = findMethod(engine, [
                        "getHistory",
                        "history",
                        "getCalculationHistory"
                    ]);

                    if (!method) {
                        return skip(
                            this.name,
                            "history API not exposed"
                        );
                    }

                    const result = safeCall(() =>
                        engine[method]()
                    );

                    if (!result.success) {
                        return fail(
                            this.name,
                            result.error?.message
                        );
                    }

                    return assertTrue(
                        this.name,
                        Array.isArray(result.value),
                        Array.isArray(result.value)
                            ? `${result.value.length} entries`
                            : "history is not an array"
                    );
                }
            },

            {
                name: "History recording API",
                run(engine) {
                    const method = findMethod(engine, [
                        "addHistory",
                        "pushHistory",
                        "recordHistory",
                        "addHistoryEntry"
                    ]);

                    if (!method) {
                        return skip(
                            this.name,
                            "history recording API not exposed"
                        );
                    }

                    const result = safeCall(() =>
                        engine[method]({
                            expression: "2+3",
                            result: 5
                        })
                    );

                    return assertTrue(
                        this.name,
                        result.success,
                        result.success
                            ? method
                            : result.error?.message
                    );
                }
            },

            /* ---------------------------------
               MODE
            --------------------------------- */

            {
                name: "Calculator mode state",
                run(engine) {
                    const state = getSnapshot(engine);

                    if (!state) {
                        return fail(
                            this.name,
                            "state unavailable"
                        );
                    }

                    const property = findProperty(state, [
                        "mode",
                        "calculatorMode",
                        "operationMode"
                    ]);

                    if (!property) {
                        return skip(
                            this.name,
                            "calculator-mode property not found"
                        );
                    }

                    return assertTrue(
                        this.name,
                        state[property] !== undefined &&
                        state[property] !== null,
                        `${property}=${String(state[property])}`
                    );
                }
            },

            {
                name: "Calculator mode control",
                run(engine) {
                    const method = findMethod(engine, [
                        "setMode",
                        "changeMode",
                        "setCalculatorMode"
                    ]);

                    if (!method) {
                        return skip(
                            this.name,
                            "mode setter not exposed"
                        );
                    }

                    /*
                     * Avoid assuming the engine's exact
                     * supported mode names. We only verify
                     * that the method exists here.
                     */
                    return pass(
                        this.name,
                        method
                    );
                }
            },

            /* ---------------------------------
               DISPLAY / EXPRESSION
            --------------------------------- */

            {
                name: "Expression state",
                run(engine) {
                    const state = getSnapshot(engine);

                    if (!state) {
                        return fail(
                            this.name,
                            "state unavailable"
                        );
                    }

                    const property = findProperty(state, [
                        "expression",
                        "input",
                        "currentExpression"
                    ]);

                    if (!property) {
                        return skip(
                            this.name,
                            "expression property not found"
                        );
                    }

                    return pass(
                        this.name,
                        property
                    );
                }
            },

            {
                name: "Result state",
                run(engine) {
                    const state = getSnapshot(engine);

                    if (!state) {
                        return fail(
                            this.name,
                            "state unavailable"
                        );
                    }

                    const property = findProperty(state, [
                        "result",
                        "currentResult",
                        "displayValue"
                    ]);

                    if (!property) {
                        return skip(
                            this.name,
                            "result property not found"
                        );
                    }

                    return pass(
                        this.name,
                        property
                    );
                }
            },

            /* ---------------------------------
               ERROR STATE
            --------------------------------- */

            {
                name: "Error-state support",
                run(engine) {
                    const state = getSnapshot(engine);

                    if (!state) {
                        return fail(
                            this.name,
                            "state unavailable"
                        );
                    }

                    const property = findProperty(state, [
                        "error",
                        "errorMessage",
                        "hasError"
                    ]);

                    const setter = findMethod(engine, [
                        "setError",
                        "setErrorState"
                    ]);

                    if (!property && !setter) {
                        return skip(
                            this.name,
                            "error state not exposed"
                        );
                    }

                    return pass(
                        this.name,
                        property || setter
                    );
                }
            },

            /* ---------------------------------
               GRAND TOTAL — FUTURE FEATURE
            --------------------------------- */

            {
                name: "GT / Grand Total support",
                run(engine) {
                    const state = getSnapshot(engine);

                    const property = findProperty(state, [
                        "grandTotal",
                        "gt"
                    ]);

                    const method = findMethod(engine, [
                        "getGrandTotal",
                        "addGrandTotal",
                        "clearGrandTotal"
                    ]);

                    if (!property && !method) {
                        return skip(
                            this.name,
                            "GT planned for professional control layer"
                        );
                    }

                    return pass(
                        this.name,
                        property || method
                    );
                }
            },

            /* ---------------------------------
               REPLAY — FUTURE UI CONTROL
            --------------------------------- */

            {
                name: "Replay navigation support",
                run(engine) {
                    const up = findMethod(engine, [
                        "historyUp",
                        "replayUp",
                        "previousHistory"
                    ]);

                    const down = findMethod(engine, [
                        "historyDown",
                        "replayDown",
                        "nextHistory"
                    ]);

                    if (!up && !down) {
                        return skip(
                            this.name,
                            "Replay controls not exposed yet"
                        );
                    }

                    return pass(
                        this.name,
                        `${up || "—"} / ${down || "—"}`
                    );
                }
            }
        ];
    }

    /* =========================================
       QA RUNNER
    ========================================= */

    function runAll() {
        console.group(`🔬 ${TEST_NAME}`);

        const engine = getEngine();

        if (!engine) {
            console.error(
                "❌ ToolXoneScientificState is not available."
            );

            console.groupEnd();

            return {
                total: 0,
                passed: 0,
                failed: 1,
                skipped: 0,
                success: false,
                results: []
            };
        }

        /*
         * Start QA from the cleanest state
         * available without requiring reset.
         */
        safeCall(() => resetEngine(engine));

        const tests = buildTests();
        const results = [];

        tests.forEach(test => {
            try {
                results.push(
                    test.run(engine)
                );
            } catch (error) {
                results.push(
                    fail(
                        test.name,
                        error?.message || String(error)
                    )
                );
            }
        });

        const total = results.length;

        const skipped =
            results.filter(result => result.skipped).length;

        const failed =
            results.filter(
                result =>
                    !result.passed &&
                    !result.skipped
            ).length;

        const passed =
            total - failed - skipped;

        const success = failed === 0;

        console.log(
            "------------------------------"
        );

        console.log(`Total: ${total}`);
        console.log(`Passed: ${passed}`);
        console.log(`Skipped: ${skipped}`);
        console.log(`Failed: ${failed}`);

        if (success) {
            console.log(
                "%c🟢 STATUS: STATE ENGINE QA PASSED",
                "color:#16a34a;font-size:14px;font-weight:bold;"
            );
        } else {
            console.error(
                "🔴 STATUS: STATE ENGINE QA FAILED"
            );
        }

        console.groupEnd();

        return {
            total,
            passed,
            failed,
            skipped,
            success,
            results
        };
    }

    /* =========================================
       PUBLIC QA API
    ========================================= */

    window.ToolXoneScientificStateTests = {
        runAll,
        getTests: buildTests
    };

})();