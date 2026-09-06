// ======================================
// TOOLXONE MORTGAGE CALCULATOR PRO
// Framework-Ready Version
// Number Engine Integrated
// ======================================


/* ======================================
   INPUTS
   ====================================== */

function getMortgageInputValues() {
    return {
        loan:
            Number(
                document.getElementById(
                    "loanAmount"
                ).value
            ),

        annualRate:
            Number(
                document.getElementById(
                    "interestRate"
                ).value
            ),

        years:
            Number(
                document.getElementById(
                    "loanYears"
                ).value
            )
    };
}


/* ======================================
   CALCULATION
   ====================================== */

function calculateMortgageValues(data) {
    const monthlyRate =
        data.annualRate /
        100 /
        12;

    const payments =
        data.years * 12;

    let monthlyPayment;

    if (
        monthlyRate === 0
    ) {
        monthlyPayment =
            data.loan /
            payments;
    } else {
        const growthFactor =
            Math.pow(
                1 + monthlyRate,
                payments
            );

        monthlyPayment =
            data.loan *
            (
                monthlyRate *
                growthFactor
            ) /
            (
                growthFactor - 1
            );
    }

    const totalPayment =
        monthlyPayment *
        payments;

    const totalInterest =
        totalPayment -
        data.loan;

    return {
        loan:
            data.loan,

        monthlyPayment,

        totalInterest,

        totalPayment,

        payments
    };
}


/* ======================================
   SUMMARY RENDERING
   ====================================== */

function renderMortgageSummary(
    resultData
) {
    const result =
        document.getElementById(
            "mortgageResult"
        );

    result.classList.add(
        "active"
    );

    result.innerHTML = `
        ${createMortgageMoneyResult(
            "Loan Amount",
            resultData.loan
        )}

        ${createMortgageMoneyResult(
            "Monthly Payment",
            resultData.monthlyPayment
        )}

        ${createMortgageMoneyResult(
            "Total Interest",
            resultData.totalInterest
        )}

        ${createMortgageMoneyResult(
            "Total Payment",
            resultData.totalPayment
        )}

        ${createMortgageCountResult(
            "Total Payments",
            resultData.payments
        )}
    `;
}


/* ======================================
   RESULT BUILDERS
   ====================================== */

function createMortgageMoneyResult(
    label,
    value
) {
    const formattedValue =
        formatMortgageNumber(
            value
        );

    const words =
        mortgageNumberToWords(
            value
        );

    return `
        <div class="result-line mortgage-result-item">
            <span>${label}</span>

            <strong>
                ${formattedValue}
            </strong>

            ${
                words
                    ? `
                        <small class="mortgage-number-words">
                            ${words}
                        </small>
                    `
                    : ""
            }
        </div>
    `;
}


function createMortgageCountResult(
    label,
    value
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
        <div class="result-line mortgage-result-item">
            <span>${label}</span>

            <strong>
                ${formattedValue}
            </strong>
        </div>
    `;
}


function formatMortgageNumber(value) {
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


function mortgageNumberToWords(value) {
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
   BARS
   ====================================== */

function updateMortgageBars(
    resultData
) {
    document.getElementById(
        "mortgageBars"
    ).style.display =
        "block";

    const principalPercent =
        (
            resultData.loan /
            resultData.totalPayment
        ) * 100;

    const interestPercent =
        (
            resultData.totalInterest /
            resultData.totalPayment
        ) * 100;

    document.getElementById(
        "principalBar"
    ).style.width =
        `${principalPercent}%`;

    document.getElementById(
        "interestBar"
    ).style.width =
        `${interestPercent}%`;
}

const MORTGAGE_MAX_LOAN = 1e15;
const MORTGAGE_MAX_RATE = 100;
const MORTGAGE_MAX_YEARS = 100;

/* ======================================
   MAIN WORKFLOW
   ====================================== */

function runMortgageCalculator() {
    const data = getMortgageInputValues();

if (
    !Number.isFinite(data.loan) ||
    !Number.isFinite(data.annualRate) ||
    !Number.isFinite(data.years) ||
    data.loan <= 0 ||
    data.loan > MORTGAGE_MAX_LOAN ||
    data.annualRate < 0 ||
    data.annualRate > MORTGAGE_MAX_RATE ||
    data.years <= 0 ||
    data.years > MORTGAGE_MAX_YEARS
) {
    showMortgageMessage(
        "Please enter valid values. Loan amount must be greater than 0 and no more than 1 quadrillion, interest rate must be between 0% and 100%, and loan term must be greater than 0 and no more than 100 years.",
        "error"
    );
    return;
}

    const payments = data.years * 12;

    if (!Number.isInteger(payments)) {
        showMortgageMessage(
            "Please enter a loan term that represents a whole number of months.",
            "error"
        );
        return;
    }

    const resultData = calculateMortgageValues(data);

    if (
        !Number.isFinite(resultData.monthlyPayment) ||
        !Number.isFinite(resultData.totalInterest) ||
        !Number.isFinite(resultData.totalPayment)
    ) {
        showMortgageMessage(
            "These values are too large to calculate reliably. Please use smaller values.",
            "error"
        );
        return;
    }

    clearMortgageMessage();
    renderMortgageSummary(resultData);
    updateMortgageBars(resultData);

    if (
    typeof ToolXoneStatisticsEvents !== "undefined" &&
    typeof ToolXoneStatisticsEvents.recordCalculation === "function"
) {
    ToolXoneStatisticsEvents.recordCalculation(
        "mortgage-calculator"
    );

    }
}


function calculateMortgage() {
    runMortgageCalculator();
}


/* ======================================
   RESET
   ====================================== */

function resetMortgage() {
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
        "mortgageResult"
    ).classList.remove(
        "active"
    );

    document.getElementById(
        "mortgageResult"
    ).innerHTML =
        "<p>Your mortgage summary will appear here.</p>";

    document.getElementById(
        "mortgageBars"
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

    clearMortgageMessage();
}


/* ======================================
   KEYBOARD SUPPORT
   ====================================== */

document.addEventListener(
    "keydown",
    function (event) {
        if (
            event.key === "Enter"
        ) {
            runMortgageCalculator();
        }
    }
);


/* ======================================
   MESSAGES
   ====================================== */

function showMortgageMessage(
    message,
    type
) {
    const box =
        document.getElementById(
            "mortgageMessage"
        );

    if (!box) {
        return;
    }

    box.className =
        `calculator-message ${type}`;

    box.textContent =
        message;
}


function clearMortgageMessage() {
    const box =
        document.getElementById(
            "mortgageMessage"
        );

    if (!box) {
        return;
    }

    box.className =
        "calculator-message";

    box.textContent =
        "";
}