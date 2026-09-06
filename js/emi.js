// ======================================
// TOOLXONE EMI CALCULATOR PRO
// Number Engine Integrated
// ======================================

/* ======================================
   SHARED VALIDATION CONFIG
   Stage 5C.4.3F
   ====================================== */

const emiValidationFields = [
    {
        id: "loanAmount",
        label: "Loan Amount",
        type: "number",
        required: true,
        min: 0.01,
        max: 1e15
    },
    {
        id: "interestRate",
        label: "Annual Interest Rate",
        type: "number",
        required: true,
        min: 0,
        max: 100
    },
    {
        id: "loanYears",
        label: "Loan Tenure",
        type: "number",
        required: true,
        min: 0.01,
        max: 100
    }
];

/* ======================================
   MATHEMATICAL INTEGRITY HELPERS
   Stage 5D.3
   ====================================== */

const EMI_EPSILON = 1e-10;

function normalizeEMINumber(value) {
    if (!Number.isFinite(value)) {
        return value;
    }

    return Math.abs(value) < EMI_EPSILON
        ? 0
        : value;
}

function approximatelyEqualEMI(
    a,
    b,
    tolerance = 1e-8
) {
    if (
        !Number.isFinite(a) ||
        !Number.isFinite(b)
    ) {
        return false;
    }

    const scale = Math.max(
        1,
        Math.abs(a),
        Math.abs(b)
    );

    return (
        Math.abs(a - b) <=
        tolerance * scale
    );
}

function calculateEMI() {
    
    /* ======================================
   SHARED VALIDATION GATE
   Stage 5C.4.3F — Inline Validation UX
   ====================================== */

if (
    window.ToolXoneValidation &&
    typeof ToolXoneValidation.validateForm === "function"
) {
    const validationResult =
        ToolXoneValidation.validateForm(
            emiValidationFields
        );

    if (!validationResult.valid) {

        if (
            window.ToolXoneValidationUI &&
            typeof ToolXoneValidationUI.showErrors === "function"
        ) {
            ToolXoneValidationUI.showErrors(
                validationResult.errors || {}
            );

            if (
                typeof ToolXoneValidationUI
                    .focusFirstInvalid === "function"
            ) {
                ToolXoneValidationUI.focusFirstInvalid(
                    validationResult.errors || {}
                );
            }
        } else {
            const firstError =
                Object.values(
                    validationResult.errors || {}
                )[0];

            alert(
                firstError ||
                "Please check the entered values."
            );
        }

        return;
    }

    if (
        window.ToolXoneValidationUI &&
        typeof ToolXoneValidationUI.clearAllErrors === "function"
    ) {
        ToolXoneValidationUI.clearAllErrors();
    }
}

    const loan =
        parseFloat(
            document.getElementById(
                "loanAmount"
            ).value
        );

    const annualRate =
        parseFloat(
            document.getElementById(
                "interestRate"
            ).value
        );

    const years =
        parseFloat(
            document.getElementById(
                "loanYears"
            ).value
        );

    const monthlyRate =
        annualRate /
        100 /
        12;

    /* ======================================
   LOAN TENURE → MONTHS
   Stage 5D.1 — Exact Month Integrity
   ====================================== */

const rawMonths =
    years * 12;

/*
 * EMI is a monthly repayment model.
 * The entered tenure must therefore resolve
 * to a whole number of monthly installments.
 */

if (
    !Number.isFinite(rawMonths) ||
    rawMonths <= 0 ||
    !Number.isInteger(rawMonths)
) {
    const message =
        "Loan Tenure must result in a whole number of months.";

    if (
        window.ToolXoneValidationUI &&
        typeof ToolXoneValidationUI.showErrors === "function"
    ) {
        const errors = {
            loanYears: message
        };

        ToolXoneValidationUI.showErrors(
            errors
        );

        if (
            typeof ToolXoneValidationUI.focusFirstInvalid === "function"
        ) {
            ToolXoneValidationUI.focusFirstInvalid(
                errors
            );
        }
    } else {
        alert(message);
    }

    return;
}


    const months =
    
    rawMonths;

    let emi;

if (
    monthlyRate === 0
) {
    emi =
        loan /
        months;
} else {

    /* ======================================
       NUMERICALLY STABLE EMI FORMULA
       Stage 5D.2 — Stability Upgrade
       ====================================== */

    const discountFactor =
        Math.pow(
            1 + monthlyRate,
            -months
        );

    const denominator =
        1 - discountFactor;

    if (
        !Number.isFinite(discountFactor) ||
        !Number.isFinite(denominator) ||
        discountFactor < 0 ||
        discountFactor >= 1 ||
        denominator <= 0
    ) {
        return;
    }

    emi =
        (
            loan *
            monthlyRate
        ) /
        denominator;
}

if (
    !Number.isFinite(emi) ||
    emi <= 0
) {
    return;
}

    /* ======================================
   RESULT INTEGRITY
   Stage 5D.3
   ====================================== */

let totalPayment =
    normalizeEMINumber(
        emi * months
    );

let totalInterest =
    normalizeEMINumber(
        totalPayment - loan
    );

/*
 * Floating-point protection:
 * mathematically zero interest must
 * never appear as a tiny negative value.
 */
if (
    totalInterest < 0 &&
    approximatelyEqualEMI(
        totalInterest,
        0
    )
) {
    totalInterest = 0;
}

if (
    !Number.isFinite(totalPayment) ||
    !Number.isFinite(totalInterest) ||
    totalPayment <= 0 ||
    totalInterest < 0
) {
    return;
}

/*
 * Core EMI mathematical invariants
 */
if (
    !approximatelyEqualEMI(
        totalPayment,
        emi * months
    )
) {
    return;
}

if (
    !approximatelyEqualEMI(
        totalInterest,
        totalPayment - loan
    )
) {
    return;
}

if (
    totalPayment < loan &&
    !approximatelyEqualEMI(
        totalPayment,
        loan
    )
) {
    return;
}    

    const result =
        document.getElementById(
            "emiResult"
        );

    result.classList.add(
        "active"
    );

    result.innerHTML = `
        ${createEMIMoneyResult(
            "Loan Amount",
            loan
        )}

        ${createEMIMoneyResult(
            "Monthly EMI",
            emi
        )}

        ${createEMIMoneyResult(
            "Total Interest",
            totalInterest
        )}

        ${createEMIMoneyResult(
            "Total Payment",
            totalPayment
        )}

        ${createEMICountResult(
            "Loan Tenure",
            months,
            months === 1
                ? "Month"
                : "Months"
        )}
    `;

    document.getElementById(
        "emiBars"
    ).style.display =
        "block";

    const principalPercent =
    normalizeEMINumber(
        (
            loan /
            totalPayment
        ) * 100
    );

const interestPercent =
    normalizeEMINumber(
        (
            totalInterest /
            totalPayment
        ) * 100
    );

const percentageTotal =
    principalPercent +
    interestPercent;

if (
    !Number.isFinite(principalPercent) ||
    !Number.isFinite(interestPercent) ||
    !approximatelyEqualEMI(
        percentageTotal,
        100
    )
) {
    return;
}

    document.getElementById(
        "principalBar"
    ).style.width =
        `${clampEMIPercent(
            principalPercent
        )}%`;

    document.getElementById(
    "interestBar"
).style.width =
    `${clampEMIPercent(
        interestPercent
    )}%`;

// Record successful calculation

// Record successful calculation
if (
    typeof ToolXoneStatisticsEvents !== "undefined" &&
    typeof ToolXoneStatisticsEvents.recordCalculation === "function"
) {
    ToolXoneStatisticsEvents.recordCalculation(
        "emi-calculator"
    );
}

}


/* ======================================
   RESULT BUILDERS
   ====================================== */

function createEMIMoneyResult(
    label,
    value
) {
    const formattedValue =
        formatEMINumber(
            value
        );

    const words =
        emiNumberToWords(
            value
        );

    return `
        <div class="result-line emi-result-item">
            <span>${label}</span>

            <strong>
                ${formattedValue}
            </strong>

            ${
                words
                    ? `
                        <small class="emi-number-words">
                            ${words}
                        </small>
                    `
                    : ""
            }
        </div>
    `;
}


function createEMICountResult(
    label,
    value,
    suffix = ""
) {
    const formattedValue =
        window.ToolXoneNumberEngine
            ? ToolXoneNumberEngine.format(
                value,
                {
                    maximumFractionDigits: 0
                }
            )
            : String(value);

    return `
        <div class="result-line emi-result-item">
            <span>${label}</span>

            <strong>
                ${formattedValue}
                ${suffix}
            </strong>
        </div>
    `;
}


/* ======================================
   NUMBER ENGINE HELPERS
   ====================================== */

function formatEMINumber(value) {
    if (
        window.ToolXoneNumberEngine
    ) {
        return ToolXoneNumberEngine.format(
            value,
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );
    }

    return Number(value).toFixed(2);
}


function emiNumberToWords(value) {
    if (
        !window.ToolXoneNumberEngine
    ) {
        return "";
    }

    const roundedValue =
        Number(
            Number(value).toFixed(2)
        );

    return ToolXoneNumberEngine.words(
        roundedValue,
        {
            decimalLimit: 2
        }
    );
}


/* ======================================
   BAR HELPERS
   ====================================== */

function clampEMIPercent(value) {
    return Math.max(
        0,
        Math.min(
            Number.isFinite(value)
                ? value
                : 0,
            100
        )
    );
}


/* ======================================
   RESET
   ====================================== */

function resetEMI() {

/* ======================================
   VALIDATION STATE CLEANUP
   ====================================== */

if (
    window.ToolXoneValidationUI &&
    typeof ToolXoneValidationUI.clearAllErrors === "function"
) {
    const calculatorForm =
        document.getElementById(
            "calculatorForm"
        );

    ToolXoneValidationUI.clearAllErrors(
        calculatorForm || document
    );
}    
    document.getElementById(
        "loanAmount"
    ).value = "";

    document.getElementById(
        "interestRate"
    ).value = "";

    document.getElementById(
        "loanYears"
    ).value = "";

    document.getElementById(
        "emiResult"
    ).classList.remove(
        "active"
    );

    document.getElementById(
        "emiResult"
    ).innerHTML =
        "<p>Your EMI summary will appear here.</p>";

    document.getElementById(
        "emiBars"
    ).style.display =
        "none";

    document.getElementById(
        "principalBar"
    ).style.width =
        "0%";

    document.getElementById(
        "interestBar"
    ).style.width =
        "0%";
}

if (
    window.ToolXoneValidationUI &&
    typeof ToolXoneValidationUI.clear === "function"
) {
    ToolXoneValidationUI.clear(
        emiValidationFields
    );
}

/* ======================================
   EMI UI EVENT WIRING
   Click + Reset + Enter Support
   ====================================== */

document.addEventListener("DOMContentLoaded", function () {

    const calculateButton =
        document.getElementById("calculateEMIBtn");

    const resetButton =
        document.getElementById("resetEMIBtn");

    const calculatorForm =
        document.getElementById("calculatorForm");


    /* ======================================
       CALCULATE BUTTON
       ====================================== */

    if (calculateButton) {
        calculateButton.addEventListener(
            "click",
            function () {
                calculateEMI();
            }
        );
    }


    /* ======================================
       RESET BUTTON
       ====================================== */

    if (resetButton) {
        resetButton.addEventListener(
            "click",
            function () {
                resetEMI();
            }
        );
    }


    /* ======================================
       ENTER KEY SUPPORT
       Event Delegation for Dynamic Fields
       ====================================== */

    if (calculatorForm) {
        calculatorForm.addEventListener(
            "keydown",
            function (event) {

                if (event.key !== "Enter") {
                    return;
                }

                const target = event.target;

                if (
                    !target ||
                    ![
                        "loanAmount",
                        "interestRate",
                        "loanYears"
                    ].includes(target.id)
                ) {
                    return;
                }

                event.preventDefault();

                calculateEMI();
            }
        );
    }

});