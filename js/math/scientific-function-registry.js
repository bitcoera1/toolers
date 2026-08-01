/* =========================================================
   ToolXone Scientific Function Registry
   ---------------------------------------------------------
   File:
   js/math/scientific-function-registry.js

   Purpose:
   Central registry for scientific calculator functions,
   primary/SHIFT labels, tokens, actions and capabilities.

   Architecture:
   Math Engine
        ↓
   State Engine
        ↓
   Control Engine
        ↓
   Function Registry
        ↓
   UI Engine

   Version: 1.0.0
   ========================================================= */

(function () {
    "use strict";

    const VERSION = "1.0.0";

    /* =====================================================
       REGISTRY
       ===================================================== */

    const registry = {

        /* -------------------------
           TRIGONOMETRY
           ------------------------- */

        sin: {
            id: "sin",
            category: "trigonometry",

            primary: {
                label: "sin",
                action: "function",
                value: "sin"
            },

            shift: {
                label: "sin⁻¹",
                action: "function",
                value: "asin"
            }
        },

        cos: {
            id: "cos",
            category: "trigonometry",

            primary: {
                label: "cos",
                action: "function",
                value: "cos"
            },

            shift: {
                label: "cos⁻¹",
                action: "function",
                value: "acos"
            }
        },

        tan: {
            id: "tan",
            category: "trigonometry",

            primary: {
                label: "tan",
                action: "function",
                value: "tan"
            },

            shift: {
                label: "tan⁻¹",
                action: "function",
                value: "atan"
            }
        },


        /* -------------------------
           LOGARITHMS
           ------------------------- */

        log: {
            id: "log",
            category: "logarithm",

            primary: {
                label: "log",
                action: "function",
                value: "log"
            },

            shift: {
                label: "10ˣ",
                action: "function",
                value: "pow10"
            }
        },

        ln: {
            id: "ln",
            category: "logarithm",

            primary: {
                label: "ln",
                action: "function",
                value: "ln"
            },

            shift: {
                label: "eˣ",
                action: "function",
                value: "exp"
            }
        },


        /* -------------------------
           POWERS
           ------------------------- */

        square: {
            id: "square",
            category: "power",

            primary: {
                label: "x²",
                action: "square",
                value: null
            },

            shift: {
                label: "x⁻²",
                action: "inverse-square",
                value: null
            }
        },

        power: {
            id: "power",
            category: "power",

            primary: {
                label: "xʸ",
                action: "power",
                value: null
            },

            shift: {
                label: "ʸ√x",
                action: "nth-root",
                value: null
            }
        },


        /* -------------------------
           ROOTS
           ------------------------- */

        sqrt: {
            id: "sqrt",
            category: "root",

            primary: {
                label: "√",
                action: "function",
                value: "sqrt"
            },

            shift: {
                label: "∛",
                action: "function",
                value: "cbrt"
            }
        },


        /* -------------------------
           RECIPROCAL
           ------------------------- */

        reciprocal: {
            id: "reciprocal",
            category: "power",

            
            primary: {
                label: "1/x",
                action: "reciprocal",
                value: null
            },

            shift: {
                label: "|x|",
                action: "function",
                value: "abs"
                       
            
              }
                  
        
          },

        

        /* -------------------------
           FACTORIAL / COMBINATORICS
           ------------------------- */

        factorial: {
            id: "factorial",
            category: "combinatorics",

            primary: {
                label: "x!",
                action: "factorial",
                value: null
            },

            shift: {
                label: "nPr",
                action: "permutation",
                value: null
            }
        },

        combination: {
            id: "combination",
            category: "combinatorics",

            primary: {
                label: "nCr",
                action: "combination",
                value: null
            },

            shift: {
                label: "nPr",
                action: "permutation",
                value: null
            }
        }
    };


    /* =====================================================
       NORMALIZATION
       ===================================================== */

    function normalizeId(id) {
        return String(id || "")
            .trim()
            .toLowerCase();
    }


    /* =====================================================
       LOOKUP
       ===================================================== */

    function has(id) {
        const normalized =
            normalizeId(id);

        return Object.prototype.hasOwnProperty.call(
            registry,
            normalized
        );
    }


    function get(id) {
        const normalized =
            normalizeId(id);

        return registry[normalized] || null;
    }


    function getVariant(
        id,
        shiftActive = false
    ) {
        const entry =
            get(id);

        if (!entry) {
            return null;
        }

        const variant =
            shiftActive
                ? entry.shift
                : entry.primary;

        if (!variant) {
            return null;
        }

        return {
            id: entry.id,
            category: entry.category,
            shifted: !!shiftActive,

            label: variant.label,
            action: variant.action,
            value: variant.value
        };
    }


    /* =====================================================
       LABEL LOOKUP
       ===================================================== */

    function getLabel(
        id,
        shiftActive = false
    ) {
        const variant =
            getVariant(
                id,
                shiftActive
            );

        return variant
            ? variant.label
            : "";
    }


    /* =====================================================
       ACTION LOOKUP
       ===================================================== */

    function getAction(
        id,
        shiftActive = false
    ) {
        const variant =
            getVariant(
                id,
                shiftActive
            );

        return variant
            ? variant.action
            : null;
    }


    /* =====================================================
       VALUE LOOKUP
       ===================================================== */

    function getValue(
        id,
        shiftActive = false
    ) {
        const variant =
            getVariant(
                id,
                shiftActive
            );

        return variant
            ? variant.value
            : null;
    }


    /* =====================================================
       RESOLUTION
       -----------------------------------------------------
       Converts a registry key + SHIFT state into the exact
       instruction the UI/Control layer should execute.
       ===================================================== */

    function resolve(
        id,
        shiftActive = false
    ) {
        const variant =
            getVariant(
                id,
                shiftActive
            );

        if (!variant) {
            return {
                success: false,
                id: normalizeId(id),
                shifted: !!shiftActive,
                label: "",
                action: null,
                value: null
            };
        }

        return {
            success: true,
            ...variant
        };
    }


    /* =====================================================
       COLLECTION HELPERS
       ===================================================== */

    function getIds() {
        return Object.keys(registry);
    }


    function getAll() {
        return getIds().map(
            id => ({
                ...registry[id]
            })
        );
    }


    function getByCategory(category) {
        const normalized =
            String(category || "")
                .trim()
                .toLowerCase();

        return getAll().filter(
            entry =>
                entry.category === normalized
        );
    }


    /* =====================================================
       UI DECK
       -----------------------------------------------------
       Returns the currently visible function deck.
       ===================================================== */

    function getDeck(
        shiftActive = false
    ) {
        return getIds()
            .map(
                id =>
                    resolve(
                        id,
                        shiftActive
                    )
            )
            .filter(
                item =>
                    item.success
            );
    }


    /* =====================================================
       VALIDATION
       ===================================================== */

    function validateEntry(entry) {
        if (!entry) {
            return false;
        }

        if (
            typeof entry.id !== "string" ||
            !entry.id
        ) {
            return false;
        }

        if (
            typeof entry.category !== "string" ||
            !entry.category
        ) {
            return false;
        }

        if (!entry.primary) {
            return false;
        }

        if (
            typeof entry.primary.label !== "string" ||
            !entry.primary.label
        ) {
            return false;
        }

        if (
            typeof entry.primary.action !== "string" ||
            !entry.primary.action
        ) {
            return false;
        }

        if (entry.shift) {
            if (
                typeof entry.shift.label !== "string" ||
                !entry.shift.label
            ) {
                return false;
            }

            if (
                typeof entry.shift.action !== "string" ||
                !entry.shift.action
            ) {
                return false;
            }
        }

        return true;
    }


    function validateRegistry() {
        const ids =
            getIds();

        const invalid =
            [];

        ids.forEach(id => {
            const entry =
                registry[id];

            if (!validateEntry(entry)) {
                invalid.push(id);
            }
        });

        return {
            valid:
                invalid.length === 0,

            total:
                ids.length,

            invalid
        };
    }


    /* =====================================================
       CAPABILITIES
       ===================================================== */

    function getCapabilities() {
        return {
            version: VERSION,

            registry: true,
            shiftVariants: true,
            categories: true,
            resolution: true,
            validation: true,

            functions:
                getIds().length
        };
    }


    /* =====================================================
       PUBLIC API
       ===================================================== */

    window.ToolXoneScientificFunctions = {

        version: VERSION,

        has,
        get,

        getVariant,
        getLabel,
        getAction,
        getValue,

        resolve,

        getIds,
        getAll,
        getByCategory,
        getDeck,

        validateRegistry,
        getCapabilities
    };


    /* =====================================================
       INITIALIZATION
       ===================================================== */

    const validation =
        validateRegistry();

    if (!validation.valid) {
        console.warn(
            "⚠ ToolXone Scientific Function Registry contains invalid entries:",
            validation.invalid
        );
    }

    console.log(
        `🔬 ToolXone Scientific Function Registry v${VERSION} initialized — ${validation.total} functions registered`
    );

})();