/*
==========================================================
 ToolXone Content Registry
 Central Content Discovery System
 Version: 1.0.0
==========================================================
*/

(function(){

"use strict";

const REGISTRY_NAME = "ToolXone Content Registry";

const REGISTRY_VERSION = "1.0.0";

const registry = {

    articles : {},

    faq : {},

    metadata : {},

    related : {},

    glossary : {},

    schema : {}

};

const statistics = {

    totalItems : 0,

    categories : 6,

    lastUpdated : Date.now()

};

function register(type,name,data){

    if(!registry[type]){

        console.warn(

            "[Content Registry] Unknown type:",

            type

        );

        return false;

    }

    registry[type][name] = data;

    statistics.totalItems++;

    statistics.lastUpdated = Date.now();

    return true;

}

function get(type,name){

    if(!registry[type]){

        return null;

    }

    return registry[type][name] || null;

}

function exists(type,name){

    return !!get(type,name);

}

function list(type){

    if(!registry[type]){

        return [];

    }

    return Object.keys(

        registry[type]

    );

}

function counts(){

    return {

        articles :

            list("articles").length,

        faq :

            list("faq").length,

        metadata :

            list("metadata").length,

        related :

            list("related").length,

        glossary :

            list("glossary").length,

        schema :

            list("schema").length

    };

}

window.ToolXoneContentRegistry = {

    name : REGISTRY_NAME,

    version : REGISTRY_VERSION,

    register,

    get,

    exists,

    list,

    counts,

    registry,

    statistics

};

console.info(

    REGISTRY_NAME +

    " v" +

    REGISTRY_VERSION +

    " initialized"

);

})();