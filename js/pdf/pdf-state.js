/*
==========================================================
TOOLXONE PDF STATE
==========================================================

RESPONSIBILITY
----------------------------------------------------------
- Central state for the shared PDF workspace
- Tracks active PDF tool
- Tracks selected files/pages
- Tracks PDF settings
- Tracks processing state
- Tracks generated result
- Tracks errors

IMPORTANT
----------------------------------------------------------
- PDF-only state system
- Does NOT interact with the original 20-tool state
- Does NOT modify global ToolXone state
==========================================================
*/


const ToolXonePDFState = {

    /* ======================================================
       WORKSPACE
       ====================================================== */

    activeTool: null,

    initialized: false,


    /* ======================================================
       FILES / PAGES
       ====================================================== */

    files: [],

    selectedFileIndex: null,


    /* ======================================================
       SETTINGS
       ====================================================== */

    settings: {

        pageSize: "A4",

        orientation: "auto",

        margin: "normal",

        imageFit: "fit-inside-page"

    },


    /* ======================================================
       PROCESSING
       ====================================================== */

    status: "idle",

    progress: 0,

    processing: false,


    /* ======================================================
       RESULT
       ====================================================== */

    result: null,

    downloadUrl: null,

    downloadName: null,


    /* ======================================================
       ERROR
       ====================================================== */

    error: null

};


/* ==========================================================
   STATE ACCESS
   ========================================================== */

function getPDFState() {

    return ToolXonePDFState;

}


/* ==========================================================
   ACTIVE TOOL
   ========================================================== */

function setPDFActiveTool(toolId) {

    ToolXonePDFState.activeTool = toolId;

}


function getPDFActiveTool() {

    return ToolXonePDFState.activeTool;

}


/* ==========================================================
   FILE STATE
   ========================================================== */

function setPDFFiles(files) {

    ToolXonePDFState.files = Array.isArray(files)
        ? files
        : [];

}


function getPDFFiles() {

    return ToolXonePDFState.files;

}


function clearPDFFiles() {

    ToolXonePDFState.files = [];

    ToolXonePDFState.selectedFileIndex = null;

}


function setPDFSelectedFile(index) {

    ToolXonePDFState.selectedFileIndex = index;

}


/* ==========================================================
   SETTINGS
   ========================================================== */

function setPDFSetting(key, value) {

    if (!(key in ToolXonePDFState.settings)) {
        return;
    }

    ToolXonePDFState.settings[key] = value;

}


function getPDFSettings() {

    return ToolXonePDFState.settings;

}


/* ==========================================================
   PROCESSING STATE
   ========================================================== */

function setPDFProcessing(processing) {

    ToolXonePDFState.processing = Boolean(processing);

}


function setPDFProgress(progress) {

    const value = Number(progress);

    ToolXonePDFState.progress = Math.max(
        0,
        Math.min(100, Number.isFinite(value) ? value : 0)
    );

}


function setPDFStatus(status) {

    ToolXonePDFState.status = status;

}


/* ==========================================================
   RESULT STATE
   ========================================================== */

function setPDFResult(result) {

    ToolXonePDFState.result = result;

}


function setPDFDownload(url, filename) {

    ToolXonePDFState.downloadUrl = url || null;

    ToolXonePDFState.downloadName = filename || null;

}


/* ==========================================================
   ERROR STATE
   ========================================================== */

function setPDFError(error) {

    ToolXonePDFState.error = error || null;

}


/* ==========================================================
   RESET
   ========================================================== */

function resetPDFState() {

    ToolXonePDFState.activeTool = null;

    ToolXonePDFState.initialized = false;

    ToolXonePDFState.files = [];

    ToolXonePDFState.selectedFileIndex = null;

    ToolXonePDFState.settings = {

        pageSize: "A4",

        orientation: "auto",

        margin: "normal",

        imageFit: "fit-inside-page"

    };

    ToolXonePDFState.status = "idle";

    ToolXonePDFState.progress = 0;

    ToolXonePDFState.processing = false;

    ToolXonePDFState.result = null;

    ToolXonePDFState.downloadUrl = null;

    ToolXonePDFState.downloadName = null;

    ToolXonePDFState.error = null;

}


/* ==========================================================
   GLOBAL ACCESS
   ========================================================== */

window.ToolXonePDFState = ToolXonePDFState;

window.getPDFState = getPDFState;

window.setPDFActiveTool = setPDFActiveTool;
window.getPDFActiveTool = getPDFActiveTool;

window.setPDFFiles = setPDFFiles;
window.getPDFFiles = getPDFFiles;
window.clearPDFFiles = clearPDFFiles;
window.setPDFSelectedFile = setPDFSelectedFile;

window.setPDFSetting = setPDFSetting;
window.getPDFSettings = getPDFSettings;

window.setPDFProcessing = setPDFProcessing;
window.setPDFProgress = setPDFProgress;
window.setPDFStatus = setPDFStatus;

window.setPDFResult = setPDFResult;
window.setPDFDownload = setPDFDownload;

window.setPDFError = setPDFError;

window.resetPDFState = resetPDFState;