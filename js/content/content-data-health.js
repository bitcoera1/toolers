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
 BODY FAT CALCULATOR CONTENT
=========================================================*/

const BODY_FAT_CALCULATOR_CONTENT = {

    /*=====================================================
     HERO
    =====================================================*/

    hero: {

        title:
            "Body Fat Calculator",

        subtitle:
            "Free Body Fat Percentage Calculator",

        description:
            "Estimate your body fat percentage using age, sex, height, neck, waist and hip measurements with the U.S. Navy body fat estimation method.",

        badge:
            "Health Tool",

        category:
            "Health & Fitness",

        icon:
            "💪",

        highlights: [

            "Metric & Imperial Units",

            "U.S. Navy Method",

            "Body Fat Percentage Estimate",

            "Mobile Friendly"

        ],

        statistics: {

            functions:
                "2",

            accuracy:
                "Estimate",

            availability:
                "24/7",

            price:
                "Free"

        },

        preview: `
        <div class="tx-tool-preview-card">

            <img
                class="tx-tool-preview-image"
                src="images/body-fat-calculator-hero.png"
                alt="Body Fat Calculator preview showing estimated body fat percentage"
                loading="lazy"
            >

        </div>
        `,

        cta: {

            primary:
                "Calculate Body Fat",

            secondary:
                "Learn More"

        }

    },


    /*=====================================================
     ARTICLE
    =====================================================*/

    article: {

        title:
            "What Is Body Fat Percentage and How Is It Calculated?",

        introduction:
            "Body fat percentage is the proportion of a person's total body weight that consists of body fat. Unlike BMI, which uses only height and weight, a body fat estimate uses additional body measurements. ToolXone's Body Fat Calculator uses the U.S. Navy body fat estimation method to provide an estimated body fat percentage from measurements such as height, neck and waist circumference, with hip circumference also used for women.",


        sections: [

            {
                heading:
                    "What Is Body Fat Percentage?",

                content:
                    "Body fat percentage describes how much of total body weight is estimated to be body fat. The remaining body weight includes lean tissues such as muscle, bone, organs and body water. Body fat is a normal part of human body composition and is necessary for functions including energy storage, insulation and hormone-related processes."
            },


            {
                heading:
                    "How Does a Body Fat Calculator Work?",

                content:
                    "A body fat calculator estimates body fat percentage from physical measurements and a mathematical equation. ToolXone's calculator uses the U.S. Navy method, which estimates body fat from measurements including height, waist and neck circumference. The female calculation also uses hip circumference."
            },


            {
                heading:
                    "What Is the U.S. Navy Body Fat Method?",

                content:
                    "The U.S. Navy body fat method is a circumference-based estimation technique that uses body measurements together with height and sex to estimate body fat percentage. It is an estimation method rather than a direct measurement of body composition."
            },


            {
                heading:
                    "Measurements Needed for Men",

                content:
                    "For the male calculation, the calculator uses height, neck circumference and waist circumference. These measurements are entered in either Metric or Imperial mode and are converted as needed for the calculation."
            },


            {
                heading:
                    "Measurements Needed for Women",

                content:
                    "For the female calculation, the calculator uses height, neck circumference, waist circumference and hip circumference. Hip circumference is included because the female version of the circumference-based equation uses this additional measurement."
            },


            {
                heading:
                    "Metric and Imperial Body Fat Calculations",

                content:
                    "ToolXone's Body Fat Calculator supports both Metric and Imperial measurements. Metric mode uses centimeters, while Imperial mode uses feet, inches and inches-based circumference measurements. The calculator handles the required unit conversions before producing the estimated body fat percentage."
            },


            {
                heading:
                    "How to Measure Your Waist and Neck",

                content:
                    "For a more consistent estimate, measurements should be taken carefully with a flexible measuring tape. Keep the tape level and avoid pulling it excessively tight. Taking measurements under similar conditions each time can also make repeated estimates easier to compare."
            },


            {
                heading:
                    "Why Sex Is Used in the Calculation",

                content:
                    "The U.S. Navy estimation equations use different calculations for men and women. This is why the calculator asks for sex and why women are asked to provide an additional hip measurement."
            },


            {
                heading:
                    "Body Fat Percentage vs BMI",

                content:
                    "BMI and body fat percentage are related but different measurements. BMI is calculated from height and weight, while body fat percentage attempts to estimate the proportion of body weight that is fat. A person can have the same BMI as another person while having a different body composition."
            },


            {
                heading:
                    "Body Fat Percentage vs Body Weight",

                content:
                    "Body weight tells you how much a person weighs, while body fat percentage estimates how much of that weight is body fat. Two people with the same body weight can have different body fat percentages because their amounts of muscle, fat and other tissues can differ."
            },


            {
                heading:
                    "Is a Body Fat Calculator Accurate?",

                content:
                    "A body fat calculator provides an estimate rather than a direct measurement. Circumference-based equations can differ from results obtained through laboratory or specialized body-composition methods. Measurement technique, body shape and individual differences can also affect the estimate."
            },


            {
                heading:
                    "What Does a Body Fat Percentage Result Mean?",

                content:
                    "The result represents an estimated percentage of total body weight that is body fat. It should be interpreted as an informational estimate rather than a diagnosis or a definitive assessment of health. Body composition can be evaluated using multiple measurements and methods."
            },


            {
                heading:
                    "How to Use the Body Fat Calculator",

                content:
                    "Select your sex and choose Metric or Imperial units. Enter your age, height, neck circumference and waist circumference. If using the female calculation, also enter hip circumference. Select Calculate Body Fat to receive the estimated body fat percentage."
            },


            {
                heading:
                    "Body Fat and Fitness Tracking",

                content:
                    "Estimated body fat percentage can be used as one measurement when tracking changes in body composition over time. For meaningful comparisons, use consistent measurement techniques and similar conditions rather than focusing on a single result."
            },


            {
                heading:
                    "Body Fat Is an Estimate, Not a Medical Diagnosis",

                content:
                    "The result from a circumference-based calculator is an estimate of body composition. It does not diagnose a medical condition and should not be used by itself to determine whether a person is healthy, unhealthy or in need of a particular treatment."
            },


            {
                heading:
                    "Who Can Use This Body Fat Calculator?",

                content:
                    "This calculator is designed as an adult body fat estimation tool. Its result is intended for general informational and fitness-tracking purposes and should not replace professional assessment when a more precise body-composition measurement is required."
            }

        ]

    },


    /*=====================================================
     FAQ
    =====================================================*/

    faq: [

        {
            question:
                "What is body fat percentage?",

            answer:
                "Body fat percentage is the estimated proportion of total body weight that consists of body fat."
        },


        {
            question:
                "How is body fat percentage calculated?",

            answer:
                "ToolXone's Body Fat Calculator uses the U.S. Navy body fat estimation method, which uses body measurements together with height and sex to estimate body fat percentage."
        },


        {
            question:
                "What measurements are needed for the Body Fat Calculator?",

            answer:
                "The calculator uses age, sex, height, neck circumference and waist circumference. The female calculation also requires hip circumference."
        },


        {
            question:
                "Why does the calculator ask for my sex?",

            answer:
                "The U.S. Navy estimation method uses different equations for men and women, so the selected sex determines which calculation is used."
        },


        {
            question:
                "Why do women need to enter hip measurement?",

            answer:
                "The female version of the circumference-based body fat equation includes hip circumference as an additional measurement."
        },


        {
            question:
                "What is the U.S. Navy body fat method?",

            answer:
                "It is a circumference-based method that estimates body fat percentage using measurements such as height, waist and neck circumference, with hip circumference also used for women."
        },


        {
            question:
                "Can I use Metric measurements?",

            answer:
                "Yes. ToolXone's Body Fat Calculator supports Metric measurements in centimeters."
        },


        {
            question:
                "Can I use feet and inches?",

            answer:
                "Yes. Imperial mode supports height in feet and inches and circumference measurements in inches."
        },


        {
            question:
                "Is a body fat calculator accurate?",

            answer:
                "A body fat calculator provides an estimate rather than a direct measurement. Results can vary because of measurement technique, body shape and individual differences."
        },


        {
            question:
                "Is body fat percentage better than BMI?",

            answer:
                "BMI and body fat percentage measure different things. BMI uses height and weight, while body fat percentage estimates the proportion of body weight that is fat. Both have different uses and limitations."
        },


        {
            question:
                "Can two people with the same BMI have different body fat percentages?",

            answer:
                "Yes. BMI does not directly measure body composition, so people with the same BMI can have different amounts of body fat and lean tissue."
        },


        {
            question:
                "Can two people with the same weight have different body fat percentages?",

            answer:
                "Yes. People with the same body weight can have different proportions of body fat, muscle and other tissues."
        },


        {
            question:
                "How should I measure my waist for the calculator?",

            answer:
                "Use a flexible measuring tape and keep it level around the waist. Avoid pulling the tape excessively tight and try to use a consistent measurement technique each time."
        },


        {
            question:
                "How should I measure my neck?",

            answer:
                "Use a flexible measuring tape around the neck and keep the measurement consistent. Avoid pulling the tape excessively tight."
        },


        {
            question:
                "How often should I measure body fat?",

            answer:
                "If you are tracking changes over time, consistent measurement conditions are more useful than frequent measurements. Using the same technique and similar conditions makes comparisons easier."
        },


        {
            question:
                "Does body fat percentage directly measure body fat?",

            answer:
                "No. A circumference-based calculator estimates body fat percentage using measurements and an equation. It does not directly measure body fat tissue."
        },


        {
            question:
                "Is body fat percentage a medical diagnosis?",

            answer:
                "No. A calculator-based body fat percentage is an estimate and should not be treated as a medical diagnosis."
        },


        {
            question:
                "Can I use this calculator for fitness tracking?",

            answer:
                "Yes. Estimated body fat percentage can be one of several measurements used to track changes in body composition over time."
        },


        {
            question:
                "Who is this Body Fat Calculator intended for?",

            answer:
                "It is designed as an adult body fat estimation tool for general informational and fitness-tracking purposes."
        }

    ]

};    

/*=========================================================
 RELATED TOOLS — BMR CALCULATOR
=========================================================*/

window.ToolXoneContentRegistry.register(
    "related",
    "bmr-calculator",
    [

        {
            icon: "❤️",
            title: "BMI Calculator",
            description:
                "Calculate Body Mass Index from height and weight.",
            url: "bmi-calculator.html"
        },

        {
            icon: "💪",
            title: "Body Fat Calculator",
            description:
                "Estimate body fat percentage from body measurements.",
            url: "body-fat-calculator.html"
        },

        {
            icon: "⚖️",
            title: "Weight Converter",
            description:
                "Convert weight between common measurement units.",
            url: "weight-converter.html"
        },

        {
            icon: "🎂",
            title: "Age Calculator",
            description:
                "Calculate your exact age from your date of birth.",
            url: "age-calculator.html"
        }

    ]
);

console.info(
    "✓ BMR Calculator hero, content, FAQ and related tools registered."
);


/*=========================================================
 RELATED TOOLS — BODY FAT CALCULATOR
=========================================================*/

window.ToolXoneContentRegistry.register(
    "related",
    "body-fat-calculator",
    [

        {
            icon: "❤️",
            title: "BMI Calculator",
            description:
                "Calculate Body Mass Index from height and weight.",
            url: "bmi-calculator.html"
        },

        {
            icon: "🔥",
            title: "BMR Calculator",
            description:
                "Estimate your Basal Metabolic Rate from age, sex, height and weight.",
            url: "bmr-calculator.html"
        },

        {
            icon: "⚖️",
            title: "Weight Converter",
            description:
                "Convert weight between common measurement units.",
            url: "weight-converter.html"
        },

        {
            icon: "🎂",
            title: "Age Calculator",
            description:
                "Calculate your exact age from your date of birth.",
            url: "age-calculator.html"
        }

    ]
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


/*=========================================================
 REGISTER BODY FAT HERO
=========================================================*/

window.ToolXoneContentRegistry.register(
    "hero",
    "body-fat-calculator",
    BODY_FAT_CALCULATOR_CONTENT.hero
);


/*=========================================================
 REGISTER BODY FAT ARTICLE
=========================================================*/

window.ToolXoneContentRegistry.register(
    "articles",
    "body-fat-calculator",
    BODY_FAT_CALCULATOR_CONTENT.article
);


/*=========================================================
 REGISTER BODY FAT FAQ
=========================================================*/

window.ToolXoneContentRegistry.register(
    "faq",
    "body-fat-calculator",
    BODY_FAT_CALCULATOR_CONTENT.faq
);


console.info(
    "✓ Body Fat Calculator hero, content, FAQ and related tools registered."
);
    

})(window);