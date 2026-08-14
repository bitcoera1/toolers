/*!
 * ToolXone Age Calculator Content
 *
 * Version: 1.0.0
 */

(function () {

    "use strict";


    /*=========================================================
      Registry Check
    =========================================================*/

    if (!window.ToolXoneContentRegistry) {

        console.error(
            "[Age Content] Content Registry not found."
        );

        return;

    }


    /*=========================================================
      AGE CALCULATOR CONTENT
    =========================================================*/

    const AGE_CALCULATOR_CONTENT = {

        hero: {

            title:
                "Age Calculator",

            subtitle:
                "Free Online Age Calculator",

            description:
                "Calculate your exact age in years, months, days, hours, minutes and seconds from your date of birth and find out how many days remain until your next birthday.",

            badge:
                "Utility Tool",

            category:
                "Utilities",

            icon:
                "🎂",


            highlights: [

                "Exact Age Calculation",

                "Years, Months & Days",

                "Next Birthday Countdown",

                "Mobile Friendly"

            ],


            statistics: {

                functions:
                    "2",

                accuracy:
                    "High",

                availability:
                    "24/7",

                price:
                    "Free"

            },


            preview: `
                <div class="tx-tool-preview-card">

                    <img
                        class="tx-tool-preview-image"
                        src="images/age-calculator-preview.webp"
                        alt="Age Calculator preview showing exact age and birthday information"
                        loading="lazy"
                    >

                </div>
            `,


            cta: {

                primary:
                    "Calculate Age",

                secondary:
                    "Learn More"

            }

        },


        /*=====================================================
          ARTICLE
        =====================================================*/

        article: {

            title:
                "How to Calculate Your Exact Age",

            introduction:
                "An age calculator determines the amount of time between your date of birth and the current date. Instead of simply subtracting birth years, an exact age calculation accounts for months and days so you can see your age more precisely.",


            sections: [

                {

                    heading:
                        "How Age Is Calculated",

                    content:
                        "Age is calculated by comparing a person's date of birth with the current date. The calculation considers the year, month and day so that the result reflects the completed years, months and days since the date of birth."

                },


                {

                    heading:
                        "Exact Age in Years, Months and Days",

                    content:
                        "ToolXone's Age Calculator shows your age in years, months and days. This provides a more precise result than simply subtracting the birth year from the current year, particularly when your birthday has not yet occurred in the current year."

                },


                {

                    heading:
                        "Why Your Birthday Matters",

                    content:
                        "Your exact age depends on whether your birthday has already occurred in the current year. If the current date is before your birthday, the completed-year portion of your age has not increased yet. The calculator accounts for this when determining your result."

                },


                {

                    heading:
                        "Age in Days, Hours, Minutes and Seconds",

                    content:
                        "Depending on the calculation, age can also be expressed using smaller units such as days, hours, minutes and seconds. These values provide another way to understand the amount of time that has passed since a person's date of birth."

                },


                {

                    heading:
                        "How to Use the Age Calculator",

                    content:
                        "Select your date of birth by choosing the day, month and year. Then select Calculate Age. The calculator processes the selected date and displays your calculated age and relevant birthday information."

                },


                {

                    heading:
                        "How Many Days Until Your Next Birthday?",

                    content:
                        "The calculator can also determine how many days remain until your next birthday. If your birthday has already occurred this year, the calculation uses your birthday in the following year."

                },


                {

                    heading:
                        "Can You Calculate Age From Any Date of Birth?",

                    content:
                        "Yes. You can select any valid past date of birth supported by the calculator. The selected date is compared with the current date to determine the calculated age."

                },


                {

                    heading:
                        "Future Dates Are Not Valid Birth Dates",

                    content:
                        "A future date cannot represent a person's date of birth for an age calculation. ToolXone's Age Calculator does not accept future dates as valid dates of birth."

                },


                {

                    heading:
                        "Why Use an Online Age Calculator?",

                    content:
                        "An online age calculator makes it quick to determine an exact age without manually calculating the differences between years, months and days. It can also make birthday-related calculations easier and faster."

                }

            ]

        },


        /*=====================================================
          FAQ
        =====================================================*/

        faq: [

            {

                question:
                    "What does this age calculator show?",

                answer:
                    "It shows your exact age in years, months and days, along with additional time information and the number of days remaining until your next birthday."

            },


            {

                question:
                    "How is age calculated?",

                answer:
                    "Age is calculated by comparing your date of birth with the current date and determining the elapsed years, months and days."

            },


            {

                question:
                    "Can I calculate age from any date of birth?",

                answer:
                    "Yes. You can select any valid past date of birth supported by the calculator."

            },


            {

                question:
                    "Does the Age Calculator accept future dates?",

                answer:
                    "No. Future dates are not accepted as valid dates of birth."

            },


            {

                question:
                    "Can I see my age in days, hours, minutes and seconds?",

                answer:
                    "The calculator is designed to provide detailed age information using multiple time units, including years, months, days, hours, minutes and seconds."

            },


            {

                question:
                    "Can the calculator tell me how many days are left until my birthday?",

                answer:
                    "Yes. It calculates the number of days remaining until your next birthday."

            },


            {

                question:
                    "What happens if my birthday has already passed this year?",

                answer:
                    "The next birthday calculation uses your birthday in the following year when your birthday has already occurred in the current year."

            }

        ]

    };


    /*=========================================================
      Register Content
    =========================================================*/

    window.ToolXoneContentRegistry.register(
        "hero",
        "age-calculator",
        AGE_CALCULATOR_CONTENT.hero
    );


    window.ToolXoneContentRegistry.register(
        "articles",
        "age-calculator",
        AGE_CALCULATOR_CONTENT.article
    );


    window.ToolXoneContentRegistry.register(
        "faq",
        "age-calculator",
        AGE_CALCULATOR_CONTENT.faq
    );


    console.info(
        "✓ Age Calculator hero, content and FAQ registered."
    );


})();