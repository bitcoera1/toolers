/*
==========================================================
 ToolXone Content Registry
 Central Content Discovery System
 Version: 1.1.0 (Stable)
==========================================================
*/

(function(){

"use strict";

/*=========================================================
Constants
=========================================================*/

const REGISTRY_NAME = "ToolXone Content Registry";

const REGISTRY_VERSION = "1.1.0";

/*=========================================================
Registry Storage
=========================================================*/

const registry = {

    articles : {},

    faq : {},

    metadata : {},

    related : {},

    glossary : {},

    schema : {}

};

/*=========================================================
Statistics
=========================================================*/

const statistics = {

    totalItems : 0,

    registrations : 0,

    categories : Object.keys(registry).length,

    lastUpdated : Date.now()

};

/*=========================================================
Logger
=========================================================*/

function log(...message){

    console.info(

        "[Content Registry]",

        ...message

    );

}

/*=========================================================
Register Content
=========================================================*/

function register(type,name,data){

    if(

        typeof type !== "string" ||

        typeof name !== "string"

    ){

        console.warn(

            "[Content Registry] Invalid registration."

        );

        return false;

    }

    if(

        !registry[type]

    ){

        console.warn(

            "[Content Registry] Unknown type:",

            type

        );

        return false;

    }

    registry[type][name] = data;

    statistics.totalItems++;

    statistics.registrations++;

    statistics.lastUpdated = Date.now();

    return true;

}

/*=========================================================
Get Content
=========================================================*/

function get(type,name){

    if(

        !registry[type]

    ){

        return null;

    }

    return registry[type][name] || null;

}

/*=========================================================
Exists
=========================================================*/

function exists(type,name){

    return get(type,name) !== null;

}

/*=========================================================
List
=========================================================*/

function list(type){

    if(

        !registry[type]

    ){

        return [];

    }

    return Object.keys(

        registry[type]

    );

}

/*=========================================================
Counts
=========================================================*/

function counts(){

    return {

        articles : list("articles").length,

        faq : list("faq").length,

        metadata : list("metadata").length,

        related : list("related").length,

        glossary : list("glossary").length,

        schema : list("schema").length

    };

}

/*=========================================================
Clear Registry
=========================================================*/

function clear(type){

    if(type){

        if(!registry[type]){

            return false;

        }

        registry[type] = {};

    }

    else{

        Object.keys(registry).forEach(function(category){

            registry[category] = {};

        });

    }

    statistics.totalItems = 0;

    statistics.lastUpdated = Date.now();

    return true;

}

/*=========================================================
Validate Registry
=========================================================*/

function validate(){

    const result = {

        valid : true,

        counts : counts(),

        issues : []

    };

    Object.keys(registry).forEach(function(category){

        Object.keys(registry[category]).forEach(function(tool){

            const data = registry[category][tool];

            if(

                data === null ||

                data === undefined

            ){

                result.valid = false;

                result.issues.push({

                    category,

                    tool,

                    message : "Empty registration"

                });

            }

        });

    });

    return result;

}

/*=========================================================
Information
=========================================================*/

function info(){

    return {

        name : REGISTRY_NAME,

        version : REGISTRY_VERSION,

        statistics,

        counts : counts(),

        categories : Object.keys(registry)

    };

}

/*=========================================================
Console Report
=========================================================*/

function report(){

    console.group(

        REGISTRY_NAME

    );

    console.table(

        counts()

    );

    console.log(

        "Statistics:",

        statistics

    );

    console.groupEnd();

}

/*=========================================================
Public API
=========================================================*/

window.ToolXoneContentRegistry = {

    name : REGISTRY_NAME,

    version : REGISTRY_VERSION,

    register,

    get,

    exists,

    list,

    counts,

    clear,

    validate,

    info,

    report,

    registry,

    statistics

};

/*=========================================================
Initialization
=========================================================*/

log(

    REGISTRY_NAME +

    " v" +

    REGISTRY_VERSION +

    " initialized"

);

})();