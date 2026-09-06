// ======================================
// TOOLXONE LOAN / EMI CALCULATOR PRO
// Number Engine Integrated
// Stage 1 Hardened Calculation Engine
// ======================================

/* ======================================
   SHARED VALIDATION CONFIG
   Stage 5C.2
   ====================================== */

const loanValidationFields = [
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
        max: 1000
    },
    {
        id: "loanTenure",
        label: "Loan Term",
        type: "number",
        required: true,
        min: 0.01
    },
    {
        id: "tenureType",
        label: "Loan Term Type",
        type: "select",
        required: true
    }
];

function calculateLoan() {

        /* ======================================
   SHARED VALIDATION GATE
   Stage 5C.3 — Inline Validation UX
   ====================================== */

if (
    window.ToolXoneValidation &&
    typeof ToolXoneValidation.validateForm === "function"
) {
    const validationResult =
        ToolXoneValidation.validateForm(
            loanValidationFields
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
        } 
        
        else {
            /*
             * Compatibility fallback if the
             * validation UI layer is unavailable.
             */
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

    /*
     * Validation passed.
     * Remove any errors left from a previous attempt.
     */
    if (
        window.ToolXoneValidationUI &&
        typeof ToolXoneValidationUI.clearAllErrors === "function"
    ) {
        ToolXoneValidationUI.clearAllErrors();
    }
}
    
    const amount = parseFloat(
        document.getElementById("loanAmount").value
    );

    const annualRate = parseFloat(
        document.getElementById("interestRate").value
    );

    const enteredDuration = parseFloat(
        document.getElementById("loanTenure").value
    );

    const tenureType = document.getElementById(
        "tenureType"
    ).value;


    /* ======================================
       INPUT VALIDATION
       ====================================== */

    const defensiveErrors = {};

if (
    !Number.isFinite(amount) ||
    amount <= 0
) {
    defensiveErrors.loanAmount =
        "Loan Amount must be greater than zero.";
}

if (
    !Number.isFinite(annualRate) ||
    annualRate < 0
) {
    defensiveErrors.interestRate =
        "Annual Interest Rate cannot be negative.";
}

if (
    !Number.isFinite(enteredDuration) ||
    enteredDuration <= 0
) {
    defensiveErrors.loanTenure =
        "Loan Term must be greater than zero.";
}

if (Object.keys(defensiveErrors).length > 0) {

    if (
        window.ToolXoneValidationUI &&
        typeof ToolXoneValidationUI.showErrors === "function"
    ) {
        ToolXoneValidationUI.showErrors(
            defensiveErrors
        );

        if (
            typeof ToolXoneValidationUI.focusFirstInvalid === "function"
        ) {
            ToolXoneValidationUI.focusFirstInvalid(
                defensiveErrors
            );
        }
    } else {
        const firstError =
            Object.values(defensiveErrors)[0];

        alert(
            firstError ||
            "Please enter valid loan values."
        );
    }

    return;
}

    if (
    tenureType !== "years" &&
    tenureType !== "months"
) {
    const message =
        "Please select a valid loan duration type.";

    if (
        window.ToolXoneValidationUI &&
        typeof ToolXoneValidationUI.showErrors === "function"
    ) {
        ToolXoneValidationUI.showErrors({
            tenureType: message
        });

        if (
            typeof ToolXoneValidationUI.focusFirstInvalid === "function"
        ) {
            ToolXoneValidationUI.focusFirstInvalid({
                tenureType: message
            });
        }
    } else {
        alert(message);
    }

    return;
}


    /* ======================================
       CONVERT DURATION TO MONTHS
       ====================================== */

    let durationMonths;

    if (tenureType === "years") {
        durationMonths =
            enteredDuration * 12;
    } else {
        durationMonths =
            enteredDuration;
    }


    /*
     * EMI represents monthly installments,
     * so the repayment period must resolve
     * to a whole number of months.
     */

    if (
    !Number.isFinite(durationMonths) ||
    durationMonths <= 0 ||
    !Number.isInteger(durationMonths)
) {
    const message =
        "Loan Term must result in a whole number of months.";

    if (
        window.ToolXoneValidationUI &&
        typeof ToolXoneValidationUI.showErrors === "function"
    ) {
        const errors = {
    loanTenure: message
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


    /* ======================================
       EXTREME INPUT PROTECTION
       ====================================== */

    /*
     * Prevent values that are technically
     * valid JavaScript numbers but are not
     * suitable for reliable calculator output.
     */

    const MAX_LOAN_AMOUNT = 1e15;
    const MAX_ANNUAL_RATE = 1000;
    const MAX_DURATION_MONTHS = 12000;
    const extremeErrors = {};

if (amount > MAX_LOAN_AMOUNT) {
    extremeErrors.loanAmount =
        "Loan Amount must not exceed 1,000,000,000,000,000.";
}

if (annualRate > MAX_ANNUAL_RATE) {
    extremeErrors.interestRate =
        "Annual Interest Rate must not exceed 1000.";
}

if (durationMonths > MAX_DURATION_MONTHS) {
    extremeErrors.loanTenure =
        "Loan Term must not exceed 12,000 months.";
}

if (Object.keys(extremeErrors).length > 0) {

    if (
        window.ToolXoneValidationUI &&
        typeof ToolXoneValidationUI.showErrors === "function"
    ) {
        ToolXoneValidationUI.showErrors(
    extremeErrors
);

if (
    typeof ToolXoneValidationUI.focusFirstInvalid === "function"
) {
    ToolXoneValidationUI.focusFirstInvalid(
        extremeErrors
    );
}
    }
    
    else {
        const firstError =
            Object.values(extremeErrors)[0];

        alert(
            firstError ||
            "These values are too large to calculate reliably."
        );
    }

    return;
}


    /* ======================================
       EMI CALCULATION
       ====================================== */

    const monthlyRate =
        annualRate / 12 / 100;

    let emi;

    /*
     * Zero-interest loans require a separate
     * formula because the standard EMI formula
     * would divide by zero.
     */

    if (monthlyRate === 0) {
        emi =
            amount / durationMonths;
    } else {

        /*
         * Algebraically equivalent to:
         *
         * P × r × (1+r)^n
         * ----------------
         *    (1+r)^n - 1
         *
         * This form avoids calculating an
         * unnecessarily huge growth factor.
         */

        const discountFactor =
            Math.pow(
                1 + monthlyRate,
                -durationMonths
            );

        const denominator =
            1 - discountFactor;

        if (
    !Number.isFinite(discountFactor) ||
    !Number.isFinite(denominator) ||
    denominator <= 0
) {
    const message =
        "This interest rate and loan term combination cannot be calculated reliably. Please use more moderate values.";

    if (
        window.ToolXoneValidationUI &&
        typeof ToolXoneValidationUI.showErrors === "function"
    ) {
        const errors = {
    interestRate: message,
    loanTenure: message
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
    }
    
    else {
        alert(message);
    }

    return;
}

        emi =
            (
                amount *
                monthlyRate
            ) /
            denominator;
    }


    /* ======================================
       TOTALS
       ====================================== */

    const totalPayment =
        emi * durationMonths;

    let totalInterest =
        totalPayment - amount;


    /*
     * Remove tiny floating-point artifacts.
     * Example:
     * -0.00000000005 → 0
     */

    if (
        Math.abs(totalInterest) < 1e-9
    ) {
        totalInterest = 0;
    }


    /* ======================================
       RESULT VALIDATION
       ====================================== */

if (
    !Number.isFinite(emi) ||
    !Number.isFinite(totalPayment) ||
    !Number.isFinite(totalInterest) ||
    emi < 0 ||
    totalPayment < 0 ||
    totalInterest < 0
) {
    const message =
        "The loan calculation produced an invalid result. Please use different loan values.";

    const errors = {
        loanAmount: message
    };

    if (
        window.ToolXoneValidationUI &&
        typeof ToolXoneValidationUI.showErrors === "function"
    ) {
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


    /* ======================================
       DISPLAY RESULTS
       ====================================== */

    const result =
        document.getElementById(
            "loanResult"
        );

    result.classList.add(
        "active"
    );

    result.innerHTML = `
        ${createLoanResultLine(
            "Monthly EMI",
            emi
        )}

        ${createLoanResultLine(
            "Total Interest",
            totalInterest
        )}

        ${createLoanResultLine(
            "Total Payment",
            totalPayment
        )}

        ${createLoanInsight(
            amount,
            totalInterest,
            totalPayment,
            annualRate
        )}
    `;


    /* ======================================
       PRINCIPAL / INTEREST BARS
       ====================================== */

    document.getElementById(
        "loanBars"
    ).style.display =
        "block";

    const principalPercent =
        totalPayment > 0
            ? (
                amount /
                totalPayment
            ) * 100
            : 0;

    const interestPercent =
        totalPayment > 0
            ? (
                totalInterest /
                totalPayment
            ) * 100
            : 0;

    document.getElementById(
        "principalBar"
    ).style.width =
        `${clampLoanPercent(
            principalPercent
        )}%`;

    document.getElementById(
        "interestBar"
    ).style.width =
        `${clampLoanPercent(
            interestPercent
        )}%`;


    /* ======================================
       STATISTICS
       ====================================== */

if (
    typeof ToolXoneStatisticsEvents !== "undefined" &&
    typeof ToolXoneStatisticsEvents.recordCalculation === "function"
) {
    ToolXoneStatisticsEvents.recordCalculation(
        "loan-calculator"
    );
}

}


/* ======================================
   RESULT BUILDING
   ====================================== */

function createLoanResultLine(
    label,
    value
) {
    const formattedValue =
        formatLoanNumber(
            value
        );

    const words =
        loanNumberToWords(
            value
        );

    return `
        <div class="result-line loan-result-item">
            <span>${label}</span>

            <strong>
                ${formattedValue}
            </strong>

            ${
                words
                    ? `
                        <small class="loan-number-words">
                            ${words}
                        </small>
                    `
                    : ""
            }
        </div>
    `;
}


/* ======================================
   LOAN INSIGHT
   ====================================== */

function createLoanInsight(
    amount,
    totalInterest,
    totalPayment,
    annualRate
) {
    let insightText;
    let insightClass;

    if (annualRate === 0) {
        insightText =
            "⚖️ Zero-Interest Loan";

        insightClass =
            "loan-neutral-insight";
    } else {
        const interestShare =
            totalPayment > 0
                ? (
                    totalInterest /
                    totalPayment
                ) * 100
                : 0;

        if (interestShare < 20) {
            insightText =
                "📊 Interest Is a Smaller Share of Total Repayment";

            insightClass =
                "loan-positive-insight";
        } else if (
            interestShare < 40
        ) {
            insightText =
                "📈 Interest Makes Up a Significant Share of Repayment";

            insightClass =
                "loan-neutral-insight";
        } else {
            insightText =
                "⚠️ Interest Makes Up a Large Share of Total Repayment";

            insightClass =
                "loan-warning-insight";
        }
    }

    return `
        <div class="result-line loan-insight-item ${insightClass}">
            <span>ToolXone Insight</span>

            <strong>
                ${insightText}
            </strong>
        </div>
    `;
}


/* ======================================
   NUMBER ENGINE HELPERS
   ====================================== */

function formatLoanNumber(
    value
) {
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


function loanNumberToWords(
    value
) {
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

function clampLoanPercent(
    value
) {
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

function resetLoan() {

    /* ======================================
       VALIDATION STATE CLEANUP
       Stage 5C.3.7
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
        "loanTenure"
    ).value = "";

    document.getElementById(
        "tenureType"
    ).value = "years";

    document.getElementById(
        "loanResult"
    ).classList.remove(
        "active"
    );

    document.getElementById(
        "loanResult"
    ).innerHTML =
        "<p>Your loan summary will appear here.</p>";

    document.getElementById(
        "loanBars"
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

/* ======================================
RESET FOCUS STATE
Stage 5C.3.9
====================================== */

const firstLoanField =
document.getElementById(
"loanAmount"
);

if (
firstLoanField &&
typeof firstLoanField.focus === "function"
) {
firstLoanField.focus({
preventScroll: true
});

}

    }


/* ======================================
   ENTER KEY SUPPORT
   Stage 5C.3.9B — Dynamic Field Support
   ====================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key !== "Enter") {
            return;
        }

        const target = event.target;

        if (!target) {
            return;
        }

        const isLoanInput =
            target.id === "loanAmount" ||
            target.id === "interestRate" ||
            target.id === "loanTenure";

        if (!isLoanInput) {
            return;
        }

        /*
         * Prevent any native/default Enter
         * behaviour before running ToolXone.
         */
        event.preventDefault();

        calculateLoan();
    }
);


/* ======================================
   PUBLIC RUNNER
   ====================================== */

function runLoanCalculator() {
    calculateLoan();
}