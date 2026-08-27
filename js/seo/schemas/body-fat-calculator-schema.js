/*!
==========================================================
 ToolXone Body Fat Calculator Schema

 ---------------------------------------------------------
 Page SEO configuration for the Body Fat Calculator.

 Version : 1.0.0
 Author  : ToolXone
==========================================================
*/

(function () {

"use strict";


const BodyFatCalculatorSchema =
Object.freeze({


version:
    "1.0.0",


/*=========================================================
 META
=========================================================*/

meta: {

    basic: {

        title:
            "Body Fat Calculator – Free Body Fat Percentage Calculator | ToolXone",

        description:
            "Use ToolXone's free Body Fat Calculator to estimate body fat percentage from sex, age, height, waist, neck and hip measurements.",

        keywords: [

            "body fat calculator",

            "body fat percentage calculator",

            "body fat calculator for men",

            "body fat calculator for women",

            "free body fat calculator",

            "online body fat calculator",

            "body fat percentage",

            "body fat calculator metric",

            "body fat calculator imperial",

            "body fat calculator waist neck",

            "body composition calculator",

            "body fat estimate",

            "healthy body fat percentage",

            "ToolXone"

        ]

    },


    canonical: {

        href:
            "https://www.toolxone.com/body-fat-calculator.html"

    },


    robots: {

        content:
            "index,follow"

    },


    application: {

        name:
            "ToolXone Body Fat Calculator"

    },


    mobile: {

        appleTitle:
            "Body Fat Calculator",

        themeColor:
            "#0f172a"

    },


    openGraph: {

        title:
            "Body Fat Calculator – Free Body Fat Percentage Calculator | ToolXone",

        description:
            "Estimate your body fat percentage using sex, age, height and body measurements with ToolXone's free online Body Fat Calculator.",

        type:
            "website",

        url:
            "https://www.toolxone.com/body-fat-calculator.html",

        image:
            "https://www.toolxone.com/images/toolxone-logo.jpg",

        imageWidth:
            797,

        imageHeight:
            335,

        imageAlt:
            "ToolXone Body Fat Calculator - Free Body Fat Percentage Calculator",

        siteName:
            "ToolXone",

        locale:
            "en_US"

    },


    twitter: {

        card:
            "summary_large_image",

        site:
            "@ToolXone",

        title:
            "Body Fat Calculator – Free Body Fat Percentage Calculator | ToolXone",

        description:
            "Calculate your estimated body fat percentage using body measurements with ToolXone's free Body Fat Calculator.",

        image:
            "https://www.toolxone.com/images/toolxone-logo.jpg",

        imageAlt:
            "ToolXone Body Fat Calculator - Free Body Fat Percentage Calculator"

    }

},


/*=========================================================
 SCHEMA
=========================================================*/

schema: {

    organization: {

        name:
            "ToolXone",

        url:
            "https://www.toolxone.com"

    },


    website: {

        name:
            "ToolXone",

        url:
            "https://www.toolxone.com"

    },


    webpage: {

        name:
            "Body Fat Calculator",

        url:
            "https://www.toolxone.com/body-fat-calculator.html",

        description:
            "Free online Body Fat Calculator for estimating body fat percentage from sex, age, height and body measurements."

    },


    application: {

        name:
            "Body Fat Calculator",

        applicationCategory:
            "HealthApplication",

        operatingSystem:
            "Any",

        url:
            "https://www.toolxone.com/body-fat-calculator.html",

        description:
            "Free online Body Fat Calculator that estimates body fat percentage using sex, age, height and body measurements and supports metric and imperial measurements.",

        offers: {

            price:
                "0",

            priceCurrency:
                "USD"

        },

        publisher: {

            name:
                "ToolXone",

            url:
                "https://www.toolxone.com"

        }

    },


    breadcrumbs: [

        {

            name:
                "Home",

            url:
                "https://www.toolxone.com/"

        },

        {

            name:
                "Body Fat Calculator",

            url:
                "https://www.toolxone.com/body-fat-calculator.html"

        }

    ],


    faq: [

        {

            question:
                "What does a Body Fat Calculator measure?",

            answer:
                "A Body Fat Calculator estimates the percentage of your total body weight that is body fat. It provides an estimate of body composition rather than a direct measurement."

        },


        {

            question:
                "How is body fat percentage estimated?",

            answer:
                "Body fat percentage can be estimated from measurements such as sex, height, waist and neck circumference, with hip circumference also used for women in the applicable calculation method. The resulting value is an estimate and may differ from measurements obtained with professional body-composition methods."

        },


        {

            question:
                "What measurements do I need for the Body Fat Calculator?",

            answer:
                "The calculator requires sex, age, height, waist circumference and neck circumference. Hip circumference is also required when applicable for female calculations."

        },


        {

            question:
                "Can I calculate body fat using metric units?",

            answer:
                "Yes. ToolXone's Body Fat Calculator supports metric measurements for height and body circumferences."

        },


        {

            question:
                "Can I calculate body fat using imperial units?",

            answer:
                "Yes. ToolXone's Body Fat Calculator supports imperial measurements such as feet, inches and inches-based body circumferences."

        },


        {

            question:
                "What is a healthy body fat percentage?",

            answer:
                "Healthy body fat ranges vary by sex, age and individual circumstances. A body fat percentage estimate should be interpreted in context rather than as a diagnosis or a complete measure of health."

        },


        {

            question:
                "Is body fat percentage the same as BMI?",

            answer:
                "No. BMI compares body weight with height, while body fat percentage estimates how much of your body weight is fat. BMI and body fat percentage measure different aspects of body composition."

        },


        {

            question:
                "Is a Body Fat Calculator accurate?",

            answer:
                "A Body Fat Calculator provides an estimate rather than a direct measurement. Accuracy depends on the measurement technique, the formula used and individual body composition. Professional methods may provide different results."

        },


        {

            question:
                "Why should I know my body fat percentage?",

            answer:
                "Body fat percentage can provide additional information about body composition that body weight or BMI alone may not show. Tracking estimates over time may help provide a broader picture of changes in body composition."

        },


        {

            question:
                "Can I use the Body Fat Calculator to track changes over time?",

            answer:
                "Yes. You can use the calculator periodically and compare results over time, provided you take your measurements consistently under similar conditions."

        }

    ]

}

});


/*=========================================================
 REGISTER PAGE
=========================================================*/

ToolXoneSchemaRegistry.register(

    "BodyFatCalculator",

    BodyFatCalculatorSchema

);


console.info(
    "✓ Body Fat Calculator schema registered."
);


})();