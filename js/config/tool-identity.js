/*
==========================================================
 ToolXone Tool Identity Resolver
 Unified Tool Identity System
 Version: 1.0.0
==========================================================
*/

(function () {

    "use strict";


    /*=========================================================
      Constants
    =========================================================*/

    const NAME =
        "ToolXone Tool Identity Resolver";

    const VERSION =
        "1.0.0";


    /*=========================================================
      Canonical Tool Map
    =========================================================*/

    const identities = {

        "basic-calculator": {

            id: "basic-calculator",

            name: "Basic Calculator",

            aliases: [

                "basic",

                "calculator",

                "basic-calculator",

                "Basic Calculator"

            ]

        },


        "scientific-calculator": {

            id: "scientific-calculator",

            name: "Scientific Calculator",

            aliases: [

                "scientific",

                "scientific-calculator",

                "Scientific Calculator"

            ]

        },


        "percentage-calculator": {

            id: "percentage-calculator",

            name: "Percentage Calculator",

            aliases: [

                "percentage",

                "percentage-calculator",

                "Percentage Calculator"

            ]

        },


        "age-calculator": {

            id: "age-calculator",

            name: "Age Calculator",

            aliases: [

                "age",

                "age-calculator",

                "Age Calculator"

            ]

        },


        "bmi-calculator": {

            id: "bmi-calculator",

            name: "BMI Calculator",

            aliases: [

                "bmi",

                "bmi-calculator",

                "BMI Calculator"

            ]

        },


        "weight-converter": {

            id: "weight-converter",

            name: "Weight Converter",

            aliases: [

                "weight",

                "weight-converter",

                "Weight Converter"

            ]

        },


        "currency-converter": {

            id: "currency-converter",

            name: "Currency Converter",

            aliases: [

                "currency",

                "currency-converter",

                "Currency Converter"

            ]

        },


        "loan-calculator": {

            id: "loan-calculator",

            name: "Loan Calculator",

            aliases: [

                "loan",

                "loan-calculator",

                "Loan Calculator"

            ]

        },


        "emi-calculator": {

            id: "emi-calculator",

            name: "EMI Calculator",

            aliases: [

                "emi",

                "emi-calculator",

                "EMI Calculator"

            ]

        },


        "mortgage-calculator": {

            id: "mortgage-calculator",

            name: "Mortgage Calculator",

            aliases: [

                "mortgage",

                "mortgage-calculator",

                "Mortgage Calculator"

            ]

        },


        "compound-interest-calculator": {

            id: "compound-interest-calculator",

            name: "Compound Interest Calculator",

            aliases: [

                "compound",

                "compound-interest-calculator",

                "Compound Interest Calculator"

            ]

        },


        "roi-calculator": {

            id: "roi-calculator",

            name: "ROI Calculator",

            aliases: [

                "roi",

                "roi-calculator",

                "ROI Calculator"

            ]

        },


        "profit-margin-calculator": {

            id: "profit-margin-calculator",

            name: "Profit Margin Calculator",

            aliases: [

                "profit-margin",

                "profit-margin-calculator",

                "Profit Margin Calculator"

            ]

        },


        "discount-calculator": {

            id: "discount-calculator",

            name: "Discount Calculator",

            aliases: [

                "discount",

                "discount-calculator",

                "Discount Calculator"

            ]

        },


        "gst-vat-calculator": {

            id: "gst-vat-calculator",

            name: "GST / VAT Calculator",

            aliases: [

                "gst-vat",

                "gst-vat-calculator",

                "GST / VAT Calculator"

            ]

        },


        "inflation-calculator": {

            id: "inflation-calculator",

            name: "Inflation Calculator",

            aliases: [

                "inflation",

                "inflation-calculator",

                "Inflation Calculator"

            ]

        },


        "currency-profit-calculator": {

            id: "currency-profit-calculator",

            name: "Currency Profit Calculator",

            aliases: [

                "currency-profit",

                "currency-profit-calculator",

                "Currency Profit Calculator"

            ]

        },


        "savings-goal-calculator": {

            id: "savings-goal-calculator",

            name: "Savings Goal Calculator",

            aliases: [

                "savings-goal",

                "savings-goal-calculator",

                "Savings Goal Calculator"

            ]

        },


        "retirement-calculator": {

            id: "retirement-calculator",

            name: "Retirement Calculator",

            aliases: [

                "retirement",

                "retirement-calculator",

                "Retirement Calculator"

            ]

        },


        "qr-code-generator": {

            id: "qr-code-generator",

            name: "QR Code Generator",

            aliases: [

                "qr",

                "qr-code-generator",

                "QR Code Generator"

            ]

        }

    };


    /*=========================================================
      Build Alias Index
    =========================================================*/

    const aliasIndex = Object.create(null);


    Object.keys(identities).forEach(function (id) {

        const tool =
            identities[id];

        tool.aliases.forEach(function (alias) {

            aliasIndex[
                String(alias)
                    .trim()
                    .toLowerCase()
            ] = id;

        });

    });


    /*=========================================================
      Normalize Input
    =========================================================*/

    function normalize(value) {

        if (
            value === null ||
            value === undefined
        ) {

            return "";

        }

        return String(value)
            .trim()
            .toLowerCase();

    }


    /*=========================================================
      Resolve
    =========================================================*/

    function resolve(value) {

        const normalized =
            normalize(value);

        if (!normalized) {

            return null;

        }

        return aliasIndex[
            normalized
        ] || null;

    }


    /*=========================================================
      Get Tool
    =========================================================*/

    function get(value) {

        const id =
            resolve(value);

        if (!id) {

            return null;

        }

        return identities[id];

    }


    /*=========================================================
      Exists
    =========================================================*/

    function exists(value) {

        return resolve(value) !== null;

    }


    /*=========================================================
      Get Canonical Name
    =========================================================*/

    function getName(value) {

        const tool =
            get(value);

        return tool
            ? tool.name
            : null;

    }


    /*=========================================================
      Get Canonical ID
    =========================================================*/

    function getId(value) {

        return resolve(value);

    }


    /*=========================================================
      List
    =========================================================*/

    function list() {

        return Object.keys(
            identities
        );

    }


    /*=========================================================
      Information
    =========================================================*/

    function info() {

        return {

            name: NAME,

            version: VERSION,

            totalTools:
                list().length

        };

    }


    /*=========================================================
      Public API
    =========================================================*/

    window.ToolXoneToolIdentity = {

        name: NAME,

        version: VERSION,

        resolve,

        get,

        exists,

        getName,

        getId,

        list,

        info

    };


    /*=========================================================
      Initialization
    =========================================================*/

    console.info(

        NAME +
        " v" +
        VERSION +
        " initialized"

    );

})();