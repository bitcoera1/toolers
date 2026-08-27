/*!
==========================================================
 ToolXone BMR Calculator Schema

 ---------------------------------------------------------
 Page SEO configuration for the BMR Calculator.

 Version : 1.0.0
 Author  : ToolXone
==========================================================
*/

(function () {

"use strict";


const BMRCalculatorSchema =
Object.freeze({


version:
    "1.0.0",


/*=========================================================
 META
=========================================================*/

meta: {

    basic: {

        title:
            "BMR Calculator – Free Basal Metabolic Rate Calculator | ToolXone",

        description:
            "Use ToolXone's free BMR Calculator to estimate Basal Metabolic Rate from age, sex, height and weight using the Mifflin-St Jeor equation.",

        keywords: [

            "BMR calculator",

            "basal metabolic rate calculator",

            "BMR calculator for adults",

            "free BMR calculator",

            "online BMR calculator",

            "BMR calculator metric",

            "BMR calculator imperial",

            "BMR calculator feet and pounds",

            "Mifflin-St Jeor calculator",

            "basal metabolic rate",

            "calorie needs calculator",

            "adult BMR calculator",

            "ToolXone"

        ]

    },


    canonical: {

        href:
            "https://www.toolxone.com/bmr-calculator.html"

    },


    robots: {

        content:
            "index,follow"

    },


    application: {

        name:
            "ToolXone BMR Calculator"

    },


    mobile: {

        appleTitle:
            "BMR Calculator",

        themeColor:
            "#0f172a"

    },


    openGraph: {

        title:
            "BMR Calculator – Free Basal Metabolic Rate Calculator | ToolXone",

        description:
            "Estimate your Basal Metabolic Rate from age, sex, height and weight using the Mifflin-St Jeor equation with ToolXone.",

        type:
            "website",

        url:
            "https://www.toolxone.com/bmr-calculator.html",

        image:
            "https://www.toolxone.com/images/toolxone-logo.jpg",

        imageWidth:
            797,

        imageHeight:
            335,

        imageAlt:
            "ToolXone BMR Calculator - Free Basal Metabolic Rate Calculator",

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
            "BMR Calculator – Free Basal Metabolic Rate Calculator | ToolXone",

        description:
            "Calculate your estimated Basal Metabolic Rate from age, sex, height and weight using the Mifflin-St Jeor equation.",

        image:
            "https://www.toolxone.com/images/toolxone-logo.jpg",

        imageAlt:
            "ToolXone BMR Calculator - Free Basal Metabolic Rate Calculator"

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
            "BMR Calculator",

        url:
            "https://www.toolxone.com/bmr-calculator.html",

        description:
            "Free online Basal Metabolic Rate calculator for adults using age, sex, height and weight with the Mifflin-St Jeor equation."

    },


    application: {

        name:
            "BMR Calculator",

        applicationCategory:
            "HealthApplication",

        operatingSystem:
            "Any",

        url:
            "https://www.toolxone.com/bmr-calculator.html",

        description:
            "Free online BMR Calculator for adults that estimates Basal Metabolic Rate from age, sex, height and weight using the Mifflin-St Jeor equation and supports metric and imperial measurements.",

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
                "BMR Calculator",

            url:
                "https://www.toolxone.com/bmr-calculator.html"

        }

    ],


    faq: [

        {

            question:
                "What does BMR stand for?",

            answer:
                "BMR stands for Basal Metabolic Rate. It is an estimate of the energy your body needs to support essential physiological functions while at complete rest."

        },


        {

            question:
                "How is BMR calculated?",

            answer:
                "ToolXone's BMR Calculator uses the Mifflin-St Jeor equation. The calculation uses age, sex, height and weight to estimate Basal Metabolic Rate in calories per day."

        },


        {

            question:
                "What is the Mifflin-St Jeor equation?",

            answer:
                "The Mifflin-St Jeor equation is a formula used to estimate Basal Metabolic Rate from body weight, height, age and sex. ToolXone's BMR Calculator uses this equation for its BMR estimate."

        },


        {

            question:
                "Can I calculate BMR using metric units?",

            answer:
                "Yes. ToolXone's BMR Calculator supports metric measurements using height in centimeters and weight in kilograms."

        },


        {

            question:
                "Can I calculate BMR using feet and pounds?",

            answer:
                "Yes. ToolXone's BMR Calculator supports imperial measurements using height in feet and inches and weight in pounds."

        },


        {

            question:
                "What does a BMR estimate represent?",

            answer:
                "A BMR estimate represents the approximate number of calories your body may need each day to support basic physiological functions while at rest. It is a baseline estimate and does not include additional energy used for physical activity, digestion or other daily activities."

        },


        {

            question:
                "Does BMR include calories burned through physical activity?",

            answer:
                "No. BMR represents energy required for essential functions while at rest. It does not include the additional energy used for physical activity, digestion or other daily activities."

        },


        {

            question:
                "Is the BMR Calculator intended for children and adolescents?",

            answer:
                "No. This calculator is designed as an adult BMR estimation tool. The Mifflin-St Jeor equation used here was developed from adult participants, while children and adolescents require age-appropriate assessment methods."

        }

    ]

}

});


/*=========================================================
 REGISTER PAGE
=========================================================*/

ToolXoneSchemaRegistry.register(

    "BMRCalculator",

    BMRCalculatorSchema

);


console.info(
    "✓ BMR Calculator schema registered."
);


})();