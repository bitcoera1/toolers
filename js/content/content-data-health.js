/*
==========================================================
 ToolXone Health Calculator Content
 Version: 1.0.0
==========================================================

 RESPONSIBILITY
 ---------------------------------------------------------
 - Health calculator content
 - BMR Calculator hero content
 - BMR educational article
 - BMR FAQs
 - Future health-tool content expansion

 IMPORTANT
 ---------------------------------------------------------
 This file contains CONTENT ONLY.

 Tool definitions remain in:
     ToolXoneToolsRegistry

 Rendering remains in:
     ToolXone Content Platform.
==========================================================
*/

(function (window) {

    "use strict";


    /*=========================================================
     Registry Check
    =========================================================*/

    if (!window.ToolXoneContentRegistry) {

        console.error(
            "[Health Content] Content Registry not found."
        );

        return;
    }


    /*=========================================================
     BMR CALCULATOR CONTENT
    =========================================================*/

    const BMR_CALCULATOR_CONTENT = {

        /*=====================================================
         HERO
        =====================================================*/

        hero: {

            title:
                "BMR Calculator",

            subtitle:
                "Free Basal Metabolic Rate Calculator",

            description:
                "Estimate your Basal Metabolic Rate (BMR) from age, sex, height and weight using the Mifflin-St Jeor equation.",

            badge:
                "Health Tool",

            category:
                "Health & Fitness",

            icon:
                "🔥",

            highlights: [
                "Metric & Imperial Units",
                "Mifflin-St Jeor Equation",
                "Instant BMR Estimate",
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
                    src="images/bmr-calculator-hero.png"
                    alt="BMR Calculator preview showing estimated basal metabolic rate"
                    loading="lazy"
                >

            </div>
            `,

            cta: {

                primary:
                    "Calculate BMR",

                secondary:
                    "Learn More"
            }
        },

        

        /*=====================================================
         ARTICLE
        =====================================================*/

        article: {

            title:
                "What Is BMR and How Is Basal Metabolic Rate Calculated?",

            introduction:
                "Basal Metabolic Rate (BMR) is an estimate of the energy your body needs to support essential physiological functions while at complete rest. These functions include processes such as breathing, circulation and maintaining basic cellular activity. A BMR estimate can provide a starting point for understanding daily energy needs, but it is not a direct measurement of metabolism and should not be treated as a medical diagnosis.",


            sections: [

                {
                    heading:
                        "What Is Basal Metabolic Rate (BMR)?",

                    content:
                        "Basal Metabolic Rate, commonly abbreviated as BMR, estimates how much energy the body requires to support essential functions while at rest. BMR is expressed in calories per day. It represents only a baseline estimate and does not include the additional energy used for physical activity, digestion or other daily activities."
                },


                {
                    heading:
                        "How the Mifflin-St Jeor Equation Calculates BMR",

                    content:
                        "ToolXone's BMR Calculator uses the Mifflin-St Jeor equation. For men, the equation is: BMR = (10 × weight in kg) + (6.25 × height in cm) − (5 × age) + 5. For women, the equation is: BMR = (10 × weight in kg) + (6.25 × height in cm) − (5 × age) − 161. The calculator uses the appropriate equation based on the sex selected."
                },


                {
                    heading:
                        "Example of a BMR Calculation",

                    content:
                        "For example, consider a 30-year-old man who weighs 70 kg and is 175 cm tall. Using the Mifflin-St Jeor equation: BMR = (10 × 70) + (6.25 × 175) − (5 × 30) + 5. This produces an estimated BMR of approximately 1,649 calories per day. The result represents an estimate of resting energy expenditure rather than the person's total daily calorie requirement."
                },


                {
                    heading:
                        "BMR vs. Total Daily Energy Expenditure",

                    content:
                        "BMR is not the same as the number of calories a person needs throughout an entire day. Total daily energy expenditure can include resting energy expenditure, physical activity and the energy used to process food. Because of this, a person's daily calorie needs are generally higher than their estimated BMR."
                },


                {
                    heading:
                        "Why Age, Height, Weight and Sex Matter",

                    content:
                        "The Mifflin-St Jeor equation uses age, height, weight and sex because these characteristics are associated with differences in estimated resting energy expenditure. Weight and height affect the mathematical calculation, while age and the sex-specific equation affect the resulting estimate."
                },


                {
                    heading:
                        "Metric and Imperial BMR Calculations",

                    content:
                        "The Mifflin-St Jeor equation uses kilograms for weight and centimeters for height. ToolXone's Metric mode accepts kilograms and centimeters directly. Feet / Pounds mode accepts height in feet and inches and weight in pounds, then converts those measurements to the units required by the equation before calculating BMR."
                },


                {
                    heading:
                        "How to Use the BMR Calculator",

                    content:
                        "Select your sex and enter your age. Choose Metric to enter height in centimeters and weight in kilograms, or choose Feet / Pounds to enter height in feet and inches and weight in pounds. Select Calculate BMR to receive your estimated calories-per-day BMR result."
                },


                {
                    heading:
                        "What Does a BMR Result Mean?",

                    content:
                        "A BMR result is an estimated number of calories per day associated with maintaining basic physiological functions at rest. It should be viewed as a baseline estimate rather than a precise measurement of an individual's metabolism. Two people with similar characteristics can still have different actual energy requirements."
                },


                {
                    heading:
                        "BMR Is an Estimate, Not a Diagnosis",

                    content:
                        "Predictive equations such as Mifflin-St Jeor provide estimates rather than direct laboratory measurements. Actual resting energy expenditure can differ from the calculated value because individual physiology and other factors vary. The result should therefore be used as general informational guidance rather than a diagnosis or personalized medical recommendation."
                },


                {
                    heading:
                        "BMR and Weight Management",

                    content:
                        "BMR can be useful as one component of a broader understanding of energy needs. However, BMR alone does not determine whether a person will gain, maintain or lose weight. Physical activity, food intake, body composition and other factors also influence overall energy balance."
                },


                {
                    heading:
                        "Who Can Use This BMR Calculator?",

                    content:
                        "This calculator is designed as an adult BMR estimation tool. The Mifflin-St Jeor equation used here was developed from adult participants, so this calculator should not be presented as a pediatric energy-needs calculator. Children and adolescents require age-appropriate assessment methods."
                }

            ]
        },


        /*=====================================================
         FAQ
        =====================================================*/

        faq: [

            {
                question:
                    "What does BMR stand for?",

                answer:
                    "BMR stands for Basal Metabolic Rate. It is an estimate of the energy the body needs to support essential physiological functions while at rest."
            },


            {
                question:
                    "How is BMR calculated?",

                answer:
                    "ToolXone's BMR Calculator uses the Mifflin-St Jeor equation, which uses age, sex, height and weight to estimate resting energy expenditure."
            },


            {
                question:
                    "What is the Mifflin-St Jeor equation?",

                answer:
                    "The Mifflin-St Jeor equation is a commonly used predictive equation for estimating resting energy expenditure. It uses weight, height and age, with a sex-specific adjustment."
            },


            {
                question:
                    "What is the BMR formula for men?",

                answer:
                    "For men, the Mifflin-St Jeor equation is: BMR = (10 × weight in kg) + (6.25 × height in cm) − (5 × age) + 5."
            },


            {
                question:
                    "What is the BMR formula for women?",

                answer:
                    "For women, the Mifflin-St Jeor equation is: BMR = (10 × weight in kg) + (6.25 × height in cm) − (5 × age) − 161."
            },


            {
                question:
                    "Is BMR the same as daily calorie needs?",

                answer:
                    "No. BMR estimates energy requirements at rest. Total daily energy expenditure also includes energy used for physical activity, digestion and other daily functions."
            },


            {
                question:
                    "Can I calculate BMR using feet and pounds?",

                answer:
                    "Yes. ToolXone's BMR Calculator supports Metric mode using centimeters and kilograms and Feet / Pounds mode using feet, inches and pounds."
            },


            {
                question:
                    "Is BMR the same for everyone?",

                answer:
                    "No. BMR varies between individuals. Age, height, weight and sex are included in the Mifflin-St Jeor equation, while actual energy requirements can also vary because of individual differences."
            },


            {
                question:
                    "How accurate is a BMR calculator?",

                answer:
                    "A BMR calculator provides an estimate rather than a direct measurement. Predictive equations can differ from an individual's actual resting energy expenditure."
            },


            {
                question:
                    "Can BMR be used for weight loss planning?",

                answer:
                    "BMR can provide a baseline estimate when considering overall energy needs, but BMR alone does not determine appropriate calorie intake or guarantee weight loss. Individual goals and circumstances should be considered separately."
            },


            {
                question:
                    "Is this BMR Calculator suitable for children?",

                answer:
                    "No. This calculator is intended for adult BMR estimation. Children and adolescents require age-appropriate methods for estimating energy requirements."
            },


            {
                question:
                    "Does BMR measure metabolism directly?",

                answer:
                    "No. This calculator estimates resting energy expenditure using a predictive equation. It does not directly measure an individual's metabolism."
            }

        ]

    };

    /*=========================================================
 RELATED TOOLS
=========================================================*/

window.ToolXoneContentRegistry.register(
    "related",
    "bmr-calculator",
    [
        {
            icon: "❤️",
            title: "BMI Calculator",
            description: "Calculate Body Mass Index from height and weight.",
            url: "bmi-calculator.html"
        },
        {
            icon: "⚖️",
            title: "Weight Converter",
            description: "Convert weight between common measurement units.",
            url: "weight-converter.html"
        },
        {
            icon: "🎂",
            title: "Age Calculator",
            description: "Calculate your exact age from your date of birth.",
            url: "age-calculator.html"
        },
        {
            icon: "📊",
            title: "Percentage Calculator",
            description: "Calculate percentages quickly and accurately.",
            url: "percentage-calculator.html"
        }
    ]
);

console.info(
    "✓ BMR Calculator hero, content, FAQ and related tools registered."
);


    /*=========================================================
     REGISTER HERO
    =========================================================*/

    window.ToolXoneContentRegistry.register(
        "hero",
        "bmr-calculator",
        BMR_CALCULATOR_CONTENT.hero
    );


    /*=========================================================
     REGISTER ARTICLE
    =========================================================*/

    window.ToolXoneContentRegistry.register(
        "articles",
        "bmr-calculator",
        BMR_CALCULATOR_CONTENT.article
    );

    

    /*=========================================================
     REGISTER FAQ
    =========================================================*/

    window.ToolXoneContentRegistry.register(
        "faq",
        "bmr-calculator",
        BMR_CALCULATOR_CONTENT.faq
    );


    /*=========================================================
     SUCCESS MESSAGE
    =========================================================*/

    console.info(
        "✓ BMR Calculator hero, content and FAQ registered."
    );


})(window);