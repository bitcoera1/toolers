/*
===========================================================
ToolXone Weight Converter
Weight Converter Engine v2.0.0

Supported Units:
- Kilogram (kg)
- Gram (g)
- Milligram (mg)
- Microgram (µg)
- Metric Ton / Tonne (t)
- Pound (lb)
- Ounce (oz)
- Stone (st)
- Carat (ct)
- Troy Ounce (ozt)

Internal Base Unit:
Kilogram (kg)
===========================================================
*/

(function () {

    "use strict";


    /*=========================================================
      UNIT DEFINITIONS
    =========================================================*/

    const UNITS = Object.freeze({

        kg: {
            name: "Kilogram",
            symbol: "kg",
            factor: 1
        },

        g: {
            name: "Gram",
            symbol: "g",
            factor: 0.001
        },

        mg: {
            name: "Milligram",
            symbol: "mg",
            factor: 0.000001
        },

        ug: {
            name: "Microgram",
            symbol: "µg",
            factor: 0.000000001
        },

        t: {
            name: "Metric Ton",
            symbol: "t",
            factor: 1000
        },

        lb: {
            name: "Pound",
            symbol: "lb",
            factor: 0.45359237
        },

        oz: {
            name: "Ounce",
            symbol: "oz",
            factor: 0.028349523125
        },

        st: {
            name: "Stone",
            symbol: "st",
            factor: 6.35029318
        },

        ct: {
            name: "Carat",
            symbol: "ct",
            factor: 0.0002
        },

        ozt: {
            name: "Troy Ounce",
            symbol: "ozt",
            factor: 0.0311034768
        }

    });


    /*=========================================================
      DOM HELPERS
    =========================================================*/

    function getElement(id) {

        return document.getElementById(id);

    }


    /*=========================================================
      FORMAT NUMBER
    =========================================================*/

    function formatNumber(value) {

        if (!Number.isFinite(value)) {

            return "";

        }

        const absolute = Math.abs(value);

        let maximumFractionDigits = 8;

        if (absolute >= 1000) {

            maximumFractionDigits = 4;

        }
        else if (absolute >= 1) {

            maximumFractionDigits = 6;

        }

        return new Intl.NumberFormat(
            "en-US",
            {
                maximumFractionDigits
            }
        ).format(value);

    }


    /*=========================================================
      CONVERT TO BASE UNIT
    =========================================================*/

    function toKilograms(value, unit) {

        const definition = UNITS[unit];

        if (!definition) {

            throw new Error(
                "Unsupported source unit."
            );

        }

        return value * definition.factor;

    }


    /*=========================================================
      CONVERT FROM BASE UNIT
    =========================================================*/

    function fromKilograms(value, unit) {

        const definition = UNITS[unit];

        if (!definition) {

            throw new Error(
                "Unsupported target unit."
            );

        }

        return value / definition.factor;

    }


    /*=========================================================
      MAIN CONVERSION
    =========================================================*/

    function convertWeight() {

        const valueInput =
            getElement("value");

        const fromUnit =
            getElement("fromUnit");

        const toUnit =
            getElement("toUnit");

        const resultBox =
            getElement("result");

        if (
            !valueInput ||
            !fromUnit ||
            !toUnit ||
            !resultBox
        ) {

            return;

        }


        const value =
            Number.parseFloat(
                valueInput.value
            );


        if (
            !Number.isFinite(value)
        ) {

            resultBox.textContent =
                "Please enter a valid value.";

            return;

        }


        if (value < 0) {

            resultBox.textContent =
                "Please enter a positive value.";

            return;

        }


        const source =
            fromUnit.value;

        const target =
            toUnit.value;


        if (
            !UNITS[source] ||
            !UNITS[target]
        ) {

            resultBox.textContent =
                "Please select valid units.";

            return;

        }


        try {

            const kilograms =
                toKilograms(
                    value,
                    source
                );


            const converted =
                fromKilograms(
                    kilograms,
                    target
                );


            const sourceDefinition =
                UNITS[source];

            const targetDefinition =
                UNITS[target];


            resultBox.innerHTML = `

                <div class="weight-result-label">
                    Conversion Result
                </div>

                <div class="weight-result-value">

                    ${formatNumber(value)}

                    ${sourceDefinition.symbol}

                    =

                    ${formatNumber(converted)}

                    ${targetDefinition.symbol}

                </div>

                <div class="weight-result-details">

                    ${sourceDefinition.name}
                    →
                    ${targetDefinition.name}

                </div>

            `;


            if (
                window.ToolXoneStatisticsEvents &&
                typeof
                window.ToolXoneStatisticsEvents.recordCalculation
                === "function"
            ) {

                window.ToolXoneStatisticsEvents
                    .recordCalculation(
                        "weight-converter"
                    );

            }

        }

        catch (error) {

            console.error(
                "Weight conversion failed:",
                error
            );

            resultBox.textContent =
                "Unable to perform this conversion.";

        }

    }


    /*=========================================================
      SWAP UNITS
    =========================================================*/

    function swapWeightUnits() {

        const fromUnit =
            getElement("fromUnit");

        const toUnit =
            getElement("toUnit");

        if (
            !fromUnit ||
            !toUnit
        ) {

            return;

        }


        const currentFrom =
            fromUnit.value;


        fromUnit.value =
            toUnit.value;

        toUnit.value =
            currentFrom;


        const valueInput =
            getElement("value");

        if (
            valueInput &&
            valueInput.value !== ""
        ) {

            convertWeight();

        }

    }


    /*=========================================================
      ENTER KEY SUPPORT
    =========================================================*/

    function handleEnter(event) {

        if (
            event.key === "Enter"
        ) {

            event.preventDefault();

            convertWeight();

        }

    }


    /*=========================================================
      INITIALIZATION
    =========================================================*/

    function initialize() {

        const valueInput =
            getElement("value");

        const convertButton =
            getElement("convertButton");

        const swapButton =
            getElement("swapButton");


        if (convertButton) {

            convertButton.addEventListener(
                "click",
                convertWeight
            );

        }


        if (swapButton) {

            swapButton.addEventListener(
                "click",
                swapWeightUnits
            );

        }


        if (valueInput) {

            valueInput.addEventListener(
                "keydown",
                handleEnter
            );

        }

    }


    /*=========================================================
      PUBLIC API
    =========================================================*/

    window.ToolXoneWeightConverter = Object.freeze({

        version: "2.0.0",

        units: UNITS,

        convert: convertWeight,

        swap: swapWeightUnits,

        initialize

    });


    /*=========================================================
      INITIALIZE
    =========================================================*/

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initialize,
            {
                once: true
            }
        );

    }
    else {

        initialize();

    }


    console.info(
        "✓ ToolXone Weight Converter v2.0.0 initialized."
    );


})();