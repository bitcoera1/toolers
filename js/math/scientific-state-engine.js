/**
 * ToolXone Professional Scientific Calculator
 * State & Control Engine
 * --------------------------------------------
 * Manages calculator operating state independently
 * from the UI and mathematical evaluation engine.
 */

(function () {
    "use strict";

    const DEFAULT_STATE = Object.freeze({
        angleMode: "DEG",

        shift: false,
        alpha: false,

        memory: 0,
        ans: 0,

        expression: "",
        result: "0",

        cursorPosition: 0,

        history: [],
        historyIndex: -1,

        displayMode: "NORM",

        soundEnabled: false
    });

    let state = createDefaultState();

    function createDefaultState() {
        return {
            ...DEFAULT_STATE,
            history: []
        };
    }

    /* =========================================
       STATE ACCESS
    ========================================= */

    function getState() {
        return {
            ...state,
            history: state.history.map(item => ({ ...item }))
        };
    }

    /* =========================================
   ANGLE MODE
========================================= */

function setAngleMode(mode) {
    const normalized = String(mode).trim().toUpperCase();

    const supportedModes = [
        "DEG",
        "RAD",
        "GRAD"
    ];

    if (!supportedModes.includes(normalized)) {
        throw new Error(
            `Unsupported angle mode: ${mode}`
        );
    }

    state.angleMode = normalized;

    return state.angleMode;
}

function toggleAngleMode() {
    const supportedModes = [
        "DEG",
        "RAD",
        "GRAD"
    ];

    const currentIndex =
        supportedModes.indexOf(state.angleMode);

    /*
     * If the current state is somehow invalid,
     * safely return to DEG.
     */
    if (currentIndex === -1) {
        state.angleMode = "DEG";
        return state.angleMode;
    }

    const nextIndex =
        (currentIndex + 1) % supportedModes.length;

    state.angleMode =
        supportedModes[nextIndex];

    return state.angleMode;
}

    /* =========================================
       SHIFT / ALPHA
    ========================================= */

    function toggleShift() {
        state.shift = !state.shift;

        return state.shift;
    }

    function clearShift() {
        state.shift = false;
    }

    function toggleAlpha() {
        state.alpha = !state.alpha;

        return state.alpha;
    }

    function clearAlpha() {
        state.alpha = false;
    }

    /* =========================================
       EXPRESSION + CURSOR
    ========================================= */

    function setExpression(expression) {
        state.expression = String(expression ?? "");

        state.cursorPosition =
            state.expression.length;

        return state.expression;
    }

    function getExpression() {
        return state.expression;
    }

    function setCursorPosition(position) {
        const numericPosition =
            Number(position);

        if (!Number.isFinite(numericPosition)) {
            return state.cursorPosition;
        }

        state.cursorPosition = Math.max(
            0,
            Math.min(
                Math.trunc(numericPosition),
                state.expression.length
            )
        );

        return state.cursorPosition;
    }

    function moveCursorLeft() {
        return setCursorPosition(
            state.cursorPosition - 1
        );
    }

    function moveCursorRight() {
        return setCursorPosition(
            state.cursorPosition + 1
        );
    }

    function insertAtCursor(value) {
        const text = String(value ?? "");

        const before =
            state.expression.slice(
                0,
                state.cursorPosition
            );

        const after =
            state.expression.slice(
                state.cursorPosition
            );

        state.expression =
            before + text + after;

        state.cursorPosition +=
            text.length;

        return state.expression;
    }

    function deleteBeforeCursor() {
        if (state.cursorPosition <= 0) {
            return state.expression;
        }

        const before =
            state.expression.slice(
                0,
                state.cursorPosition - 1
            );

        const after =
            state.expression.slice(
                state.cursorPosition
            );

        state.expression =
            before + after;

        state.cursorPosition--;

        return state.expression;
    }

    /* =========================================
       RESULT / ANS
    ========================================= */

    function setResult(value) {
        state.result = value;

        return state.result;
    }

    function setAns(value) {
        const number = Number(value);

        if (!Number.isFinite(number)) {
            return state.ans;
        }

        state.ans = number;

        return state.ans;
    }

    function getAns() {
        return state.ans;
    }

    /* =========================================
       MEMORY
    ========================================= */

    function memoryClear() {
        state.memory = 0;

        return state.memory;
    }

    function memoryRecall() {
        return state.memory;
    }

    function memoryStore(value) {
        const number = Number(value);

        if (!Number.isFinite(number)) {
            return state.memory;
        }

        state.memory = number;

        return state.memory;
    }

    function memoryAdd(value) {
        const number = Number(value);

        if (!Number.isFinite(number)) {
            return state.memory;
        }

        state.memory += number;

        return state.memory;
    }

    function memorySubtract(value) {
        const number = Number(value);

        if (!Number.isFinite(number)) {
            return state.memory;
        }

        state.memory -= number;

        return state.memory;
    }

    /* =========================================
       HISTORY / AUTO REPLAY
    ========================================= */
function addHistory(expression, result) {

    const last =
        state.history[state.history.length - 1];

    if (
        last &&
        last.expression === String(expression) &&
        last.result === result
    ) {
        return last;
    }

    const entry = {
        expression: String(expression),
        result,
        ans: state.ans,
        angleMode: state.angleMode,
        timestamp: Date.now()
    };

    state.history.push(entry);

    state.historyIndex =
        state.history.length;

    return entry;
}

    function historyUp() {

    if (state.history.length === 0) {
        return null;
    }

    state.historyIndex = Math.max(
        0,
        state.historyIndex - 1
    );

    const entry =
        state.history[state.historyIndex];

    state.expression =
        entry.expression;

    state.result =
        entry.result;

    state.cursorPosition =
        state.expression.length;

    return {
        ...entry
    };
}

    function historyDown() {

    if (state.history.length === 0) {
        return null;
    }

    if (
        state.historyIndex <
        state.history.length - 1
    ) {

        state.historyIndex++;

        const entry =
            state.history[state.historyIndex];

        state.expression =
            entry.expression;

        state.result =
            entry.result;

        state.cursorPosition =
            state.expression.length;

        return {
            ...entry
        };
    }

    state.historyIndex =
    state.history.length - 1;

const entry =
    state.history[state.historyIndex];

state.expression =
    entry.expression;

state.result =
    entry.result;

state.cursorPosition =
    state.expression.length;

return {
    ...entry
};

}

    function clearHistory() {
        state.history = [];
        state.historyIndex = -1;
    }

    /* =========================================
       DISPLAY MODE
    ========================================= */

    function setDisplayMode(mode) {
        const normalized =
            String(mode).toUpperCase();

        if (
            !["NORM", "SCI", "ENG", "FIX"]
                .includes(normalized)
        ) {
            throw new Error(
                `Unsupported display mode: ${mode}`
            );
        }

        state.displayMode = normalized;

        return state.displayMode;
    }

    /* =========================================
       SOUND
    ========================================= */

    function toggleSound() {
        state.soundEnabled =
            !state.soundEnabled;

        return state.soundEnabled;
    }

    /* =========================================
       RESET
    ========================================= */

    function reset() {
        state = createDefaultState();

        return getState();
    }

    /* =========================================
       PUBLIC API
    ========================================= */

    window.ToolXoneScientificState = {
        getState,

        setAngleMode,
        toggleAngleMode,

        toggleShift,
        clearShift,

        toggleAlpha,
        clearAlpha,

        setExpression,
        getExpression,

        setCursorPosition,
        moveCursorLeft,
        moveCursorRight,
        insertAtCursor,
        deleteBeforeCursor,

        setResult,

        setAns,
        getAns,

        memoryClear,
        memoryRecall,
        memoryStore,
        memoryAdd,
        memorySubtract,

        addHistory,
        historyUp,
        historyDown,
        clearHistory,

        setDisplayMode,

        toggleSound,

        reset
    };

})();