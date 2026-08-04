/*
==========================================================
 ToolXone Performance Tests
 Version: 1.0.0
==========================================================
*/

(function () {

"use strict";

const ENGINE_NAME = "ToolXone Performance Tests";
const ENGINE_VERSION = "1.0.0";

const CONFIG = {

    autoRun: false,
    debug: false,

    runRegistryTests: true,
    runEngineTests: true,
    runVitalsTests: true,
    runLazyTests: true,
    runAssetTests: true,
    runImageTests: true,
    runValidatorTests: true

};

const tests = [];
const passed = [];
const failed = [];

function addTest(name, condition){

    tests.push(name);

    if(condition){

        passed.push(name);

        return true;
    }

    failed.push(name);

    return false;

}

function reset(){

    tests.length = 0;
    passed.length = 0;
    failed.length = 0;

}

function run(){

    reset();

    if(CONFIG.runRegistryTests){

        addTest(
            "Performance Registry",
            typeof window.ToolXonePerformanceRegistry !== "undefined"
        );

    }

    if(CONFIG.runEngineTests){

        addTest(
            "Performance Engine",
            typeof window.ToolXonePerformanceEngine !== "undefined"
        );

    }

    if(CONFIG.runVitalsTests){

        addTest(
            "Core Web Vitals",
            typeof window.ToolXoneCoreWebVitals !== "undefined"
        );

    }

    if(CONFIG.runLazyTests){

        addTest(
            "Lazy Loader",
            typeof window.ToolXoneLazyLoader !== "undefined"
        );

    }

    if(CONFIG.runAssetTests){

        addTest(
            "Asset Optimizer",
            typeof window.ToolXoneAssetOptimizer !== "undefined"
        );

    }

    if(CONFIG.runImageTests){

        addTest(
            "Image Optimizer",
            typeof window.ToolXoneImageOptimizer !== "undefined"
        );

    }

    if(CONFIG.runValidatorTests){

        addTest(
            "Performance Validator",
            typeof window.ToolXonePerformanceValidator !== "undefined"
        );

    }

    return {

        success: failed.length===0,

        timestamp: Date.now(),

        total:tests.length,

        passed:passed.length,

        failed:failed.length,

        passedTests:[...passed],

        failedTests:[...failed]

    };

}

function report(){

    const result = run();

    console.group("%cToolXone Performance Tests",
        "color:#8b5cf6;font-weight:bold;");

    console.log("Total Tests:",result.total);

    console.log("Passed:",result.passed);

    console.log("Failed:",result.failed);

    console.log("Success:",
        result.success ? "YES" : "NO");

    console.log("--------------------------------");

    if(result.failed===0){

        console.log(
            "%cSTATUS: ALL PERFORMANCE TESTS PASSED",
            "color:green;font-weight:bold;"
        );

    }else{

        console.warn("Failed Tests:");

        console.table(result.failedTests);

    }

    console.groupEnd();

    return result;

}

window.ToolXonePerformanceTests = {

    name:ENGINE_NAME,

    version:ENGINE_VERSION,

    configuration:CONFIG,

    run,

    report,

    getPassed:()=>passed,

    getFailed:()=>failed,

    info(){

        return{

            name:ENGINE_NAME,

            version:ENGINE_VERSION,

            configuration:CONFIG

        };

    }

};

console.info(

    "%c"+ENGINE_NAME+
    " v"+ENGINE_VERSION+
    " initialized",

    "color:#8b5cf6;font-weight:bold;"

);

})();