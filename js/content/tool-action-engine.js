/*
==========================================================
 ToolXone Action Engine
 Shared Hero Actions
 Version: 1.0.0
==========================================================
*/

(function(){

"use strict";

/*=========================================================
Constants
=========================================================*/

const NAME = "ToolXone Action Engine";

const VERSION = "1.0.0";

/*=========================================================
Configuration
=========================================================*/

const configuration = {

    smooth : true,

    autoInitialize : true

};

/*=========================================================
State
=========================================================*/

const state = {

    initialized : false

};

/*=========================================================
Scroll Helper
=========================================================*/

function scrollTo(selector){

    const element = document.querySelector(selector);

    if(!element){

        return false;

    }

    element.scrollIntoView({

        behavior : configuration.smooth ? "smooth" : "auto",

        block : "start"

    });

    return true;

}

/*=========================================================
Primary Action
=========================================================*/

function startCalculating(){

    return scrollTo(

        ".scientific-card"

    );

}

/*=========================================================
Secondary Action
=========================================================*/

function learnMore(){

    return scrollTo(

        "#financeInfo"

    );

}

/*=========================================================
Initialize
=========================================================*/

function initialize(){

    if(state.initialized){

        return;

    }

    document.addEventListener(

        "click",

        function(event){

            const button = event.target.closest("button");

            if(!button){

                return;

            }

            if(

                button.classList.contains(

                    "tx-primary-button"

                )

            ){

                startCalculating();

            }

            if(

                button.classList.contains(

                    "tx-secondary-button"

                )

            ){

                learnMore();

            }

        }

    );

    state.initialized = true;

}

/*=========================================================
Public API
=========================================================*/

window.ToolXoneActionEngine = {

    initialize,

    startCalculating,

    learnMore,

    configuration,

    state,

    name : NAME,

    version : VERSION

};

/*=========================================================
Auto Initialize
=========================================================*/

if(configuration.autoInitialize){

    initialize();

}

console.info(

    NAME +

    " v" +

    VERSION +

    " initialized"

);

})();