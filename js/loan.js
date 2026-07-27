// ======================================
// TOOLXONE LOAN / EMI CALCULATOR PRO
// Number Engine Integrated
// Stage 1 Hardened Calculation Engine
// ======================================

function calculateLoan() {
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

    if (
        !Number.isFinite(amount) ||
        !Number.isFinite(annualRate) ||
        !Number.isFinite(enteredDuration) ||
        amount <= 0 ||
        annualRate < 0 ||
        enteredDuration <= 0
    ) {
        alert(
            "Please enter valid values. Loan amount and duration must be greater than zero, and the interest rate cannot be negative."
        );

        return;
    }

    if (
        tenureType !== "years" &&
        tenureType !== "months"
    ) {
        alert(
            "Please select a valid loan duration type."
        );

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
        alert(
            "Loan duration must result in a whole number of months."
        );

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

    if (
        amount > MAX_LOAN_AMOUNT ||
        annualRate > MAX_ANNUAL_RATE ||
        durationMonths > MAX_DURATION_MONTHS
    ) {
        alert(
            "These values are too large to calculate reliably. Please use smaller values."
        );

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
            alert(
                "These values cannot be calculated reliably. Please check the interest rate and loan duration."
            );

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
        alert(
            "The calculation produced an invalid result. Please use smaller or more realistic values."
        );

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
        window.ToolXoneStatisticsEvents &&
        typeof ToolXoneStatisticsEvents
            .recordCalculation === "function"
    ) {
        ToolXoneStatisticsEvents
            .recordCalculation(
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
}


/* ======================================
   ENTER KEY SUPPORT
   ====================================== */

document
    .querySelectorAll(
        "#loanAmount, " +
        "#interestRate, " +
        "#loanTenure"
    )
    .forEach(input => {
        input.addEventListener(
            "keydown",
            function (event) {
                if (
                    event.key === "Enter"
                ) {
                    calculateLoan();
                }
            }
        );
    });


/* ======================================
   PUBLIC RUNNER
   ====================================== */

function runLoanCalculator() {
    calculateLoan();
}