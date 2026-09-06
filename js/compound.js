// ======================================
// TOOLXONE COMPOUND INTEREST CALCULATOR
// ======================================

const COMPOUND_MAX_PRINCIPAL = 1e15;
const COMPOUND_MAX_MONTHLY = 1e12;
const COMPOUND_MAX_RATE = 1000;
const COMPOUND_MAX_YEARS = 100;

const COMPOUND_ALLOWED_FREQUENCIES = [1, 4, 12, 365];


function calculateCompound() {

    const principalInput =
        document.getElementById("principal");

    const monthlyInput =
        document.getElementById("monthly");

    const rateInput =
        document.getElementById("rate");

    const yearsInput =
        document.getElementById("years");

    const frequencyInput =
        document.getElementById("frequency");


    const principal =
        parseFloat(principalInput.value);

    const monthly =
        monthlyInput.value.trim() === ""
            ? 0
            : parseFloat(monthlyInput.value);

    const annualRate =
        parseFloat(rateInput.value);

    const years =
        parseFloat(yearsInput.value);

    const frequency =
        parseInt(
            frequencyInput.value,
            10
        );


    /* ======================================
       VALIDATION
       ====================================== */

    if (!Number.isFinite(principal)) {
        alert(
            "Please enter a valid initial investment."
        );

        principalInput.focus();
        return;
    }


    if (
        principal <= 0 ||
        principal > COMPOUND_MAX_PRINCIPAL
    ) {
        alert(
            "Initial investment must be greater than 0 and no more than 1 quadrillion."
        );

        principalInput.focus();
        return;
    }


    if (!Number.isFinite(monthly)) {
        alert(
            "Please enter a valid monthly contribution."
        );

        monthlyInput.focus();
        return;
    }


    if (
        monthly < 0 ||
        monthly > COMPOUND_MAX_MONTHLY
    ) {
        alert(
            "Monthly contribution must be 0 or greater and no more than 1 trillion."
        );

        monthlyInput.focus();
        return;
    }


    if (!Number.isFinite(annualRate)) {
        alert(
            "Please enter a valid annual interest rate."
        );

        rateInput.focus();
        return;
    }


    if (
        annualRate < 0 ||
        annualRate > COMPOUND_MAX_RATE
    ) {
        alert(
            "Annual interest rate must be between 0% and 1000%."
        );

        rateInput.focus();
        return;
    }


    if (!Number.isFinite(years)) {
        alert(
            "Please enter a valid investment period."
        );

        yearsInput.focus();
        return;
    }


    if (
        years <= 0 ||
        years > COMPOUND_MAX_YEARS
    ) {
        alert(
            "Investment period must be greater than 0 and no more than 100 years."
        );

        yearsInput.focus();
        return;
    }


    if (
        !COMPOUND_ALLOWED_FREQUENCIES.includes(
            frequency
        )
    ) {
        alert(
            "Please select a valid compounding frequency."
        );

        frequencyInput.focus();
        return;
    }


    /* ======================================
       CONVERT PERIOD TO WHOLE MONTHS
       ====================================== */

    const totalMonths =
        years * 12;


    if (
        !Number.isInteger(totalMonths)
    ) {
        alert(
            "Investment period must represent a whole number of months. For example, 1.5 years equals 18 months."
        );

        yearsInput.focus();
        return;
    }


    if (
        totalMonths <= 0 ||
        totalMonths > COMPOUND_MAX_YEARS * 12
    ) {
        alert(
            "Investment period is outside the supported range."
        );

        yearsInput.focus();
        return;
    }


    /* ======================================
       COMPOUNDING SETUP
       ====================================== */

    const annualDecimalRate =
        annualRate / 100;

    let balance =
        principal;


    /*
       Monthly contributions are treated as
       beginning-of-month contributions.

       Frequency meaning:

       1   = yearly compounding
       4   = quarterly compounding
       12  = monthly compounding
       365 = daily compounding

       For yearly/quarterly/monthly compounding,
       interest is applied only when the actual
       compounding period is completed.

       Daily compounding uses 365 days per year.
    */


    const monthsPerPeriod =
        frequency === 1
            ? 12
            : frequency === 4
                ? 3
                : frequency === 12
                    ? 1
                    : null;


    const periodicRate =
        frequency === 365
            ? null
            : annualDecimalRate / frequency;


    /* ======================================
       GROWTH SIMULATION
       ====================================== */

    for (
        let month = 1;
        month <= totalMonths;
        month++
    ) {

        /*
           Contribution is added at the
           beginning of each month.
        */
        balance += monthly;


        if (frequency === 365) {

            /*
               Daily compounding.

               Because this calculator does not
               collect a start date, use the standard
               365-day year convention.

               Each month represents 365 / 12 days.
            */

            const daysThisMonth =
                365 / 12;

            balance *= Math.pow(
                1 + annualDecimalRate / 365,
                daysThisMonth
            );

        } else if (
            month % monthsPerPeriod === 0
        ) {

            /*
               Apply interest only when the
               selected compounding period ends.
            */

            balance *= Math.pow(
                1 + periodicRate,
                1
            );
        }


        if (!Number.isFinite(balance)) {

            alert(
                "The calculation produced an invalid result. Please use smaller values."
            );

            return;
        }
    }


    /* ======================================
       FINAL RESULTS
       ====================================== */

    const totalContribution =
        principal +
        monthly * totalMonths;


    const interestEarned =
        balance -
        totalContribution;


    const growthPercent =
        totalContribution > 0
            ? (
                interestEarned /
                totalContribution
            ) * 100
            : 0;


    /*
       Final result safety checks.
    */

    if (
        !Number.isFinite(balance) ||
        !Number.isFinite(totalContribution) ||
        !Number.isFinite(interestEarned) ||
        !Number.isFinite(growthPercent)
    ) {
        alert(
            "The calculation produced an invalid result. Please use smaller values."
        );

        return;
    }


    const result =
        document.getElementById(
            "compoundResult"
        );


    result.classList.add(
        "active"
    );


    result.innerHTML = `
        ${createCompoundMoneyResult(
            "Future Value",
            balance
        )}

        ${createCompoundMoneyResult(
            "Total Contributions",
            totalContribution
        )}

        ${createCompoundMoneyResult(
            "Interest Earned",
            interestEarned
        )}

        ${createCompoundPercentResult(
            "Growth",
            growthPercent
        )}
    `;


    /* ======================================
       GROWTH BARS
       ====================================== */

    const growthBars =
        document.getElementById(
            "growthBars"
        );

    const investmentBar =
        document.getElementById(
            "investmentBar"
        );

    const interestBar =
        document.getElementById(
            "interestBar"
        );


    if (
        Number.isFinite(balance) &&
        balance > 0
    ) {

        let investmentPercent =
            (
                totalContribution /
                balance
            ) * 100;


        let interestPercent =
            (
                interestEarned /
                balance
            ) * 100;


        /*
           Prevent invalid CSS widths.
        */

        investmentPercent =
            Math.min(
                100,
                Math.max(
                    0,
                    investmentPercent
                )
            );


        interestPercent =
            Math.min(
                100,
                Math.max(
                    0,
                    interestPercent
                )
            );


        investmentBar.style.width =
            `${investmentPercent}%`;


        interestBar.style.width =
            `${interestPercent}%`;


        growthBars.style.display =
            "block";
    }


    /* ======================================
       RECORD SUCCESSFUL CALCULATION
       ====================================== */

    if (
        typeof ToolXoneStatisticsEvents !== "undefined" &&
        typeof ToolXoneStatisticsEvents.recordCalculation === "function"
    ) {
        ToolXoneStatisticsEvents.recordCalculation(
            "compound-interest-calculator"
        );
    }
}


/* ======================================
   RESULT BUILDING
   ====================================== */

function createCompoundMoneyResult(
    label,
    value
) {

    const formattedValue =
        formatCompoundNumber(
            value
        );


    const words =
        compoundNumberToWords(
            value
        );


    return `
        <div class="result-line compound-result-item">
            <span>${label}</span>

            <strong>
                ${formattedValue}
            </strong>

            ${
                words
                    ? `
                        <small class="compound-number-words">
                            ${words}
                        </small>
                    `
                    : ""
            }
        </div>
    `;
}


function createCompoundPercentResult(
    label,
    value
) {

    const formattedPercent =
        Number(value).toFixed(2);


    return `
        <div class="result-line compound-result-item">
            <span>${label}</span>

            <strong>
                ${formattedPercent}%
            </strong>
        </div>
    `;
}


function formatCompoundNumber(value) {

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


function compoundNumberToWords(value) {

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
   RESET
   ====================================== */

function resetCompound() {

    document.getElementById(
        "principal"
    ).value = "";


    document.getElementById(
        "monthly"
    ).value = "";


    document.getElementById(
        "rate"
    ).value = "";


    document.getElementById(
        "years"
    ).value = "";


    document.getElementById(
        "frequency"
    ).value = "12";


    document.getElementById(
        "compoundResult"
    ).classList.remove(
        "active"
    );


    document.getElementById(
        "compoundResult"
    ).innerHTML =
        "<p>Your investment summary will appear here.</p>";


    document.getElementById(
        "growthBars"
    ).style.display =
        "none";


    document.getElementById(
        "investmentBar"
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

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key !== "Enter" ||
            !event.target.matches(
                "#principal, #monthly, #rate, #years"
            )
        ) {
            return;
        }

        event.preventDefault();

        calculateCompound();
    }
);

/* ======================================
   CALCULATOR ENTRY POINT
   ====================================== */

function runCompoundCalculator() {
    calculateCompound();
}