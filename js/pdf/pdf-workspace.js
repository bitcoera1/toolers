/*
==========================================================
TOOLXONE PDF WORKSPACE
==========================================================

RESPONSIBILITY
----------------------------------------------------------
- Orchestrates the shared PDF workspace
- Connects PDF state with PDF components
- Handles upload and drag/drop interaction
- Handles PDF settings interaction
- Handles Clear All
- Handles workspace visibility
- Handles processing / progress / result / error UI
- Provides a shared interface for PDF tools

IMPORTANT
----------------------------------------------------------
- PDF-only workspace system
- Does NOT perform PDF conversion
- Does NOT modify ToolXoneToolsRegistry
- Does NOT modify the original 20-tool architecture
- Does NOT own PDF state
- Does NOT contain tool-specific conversion logic

DEPENDENCIES
----------------------------------------------------------
- pdf-state.js
- pdf-components.js
- pdf-registry.js
- Individual PDF engines

==========================================================
*/


(function (window) {

    "use strict";


    /* ======================================================
       NAMESPACE
    ====================================================== */

    const ToolXonePDFWorkspace = {

        version: "1.0.0",

        initialized: false,

        root: null,

        upload: null,

        workspace: null,

        processing: null,

        result: null,

        error: null,

        status: null,

        currentState: "idle"

    };


    /* ======================================================
       INITIALIZATION
    ====================================================== */

    function init(options = {}) {

        if (
            ToolXonePDFWorkspace.initialized
        ) {

            return ToolXonePDFWorkspace;

        }


        const components =
            window.ToolXonePDFComponents;


        if (!components) {

            console.error(
                "ToolXonePDFWorkspace: " +
                "PDF components are not available."
            );

            return null;

        }


        const root =
            resolveRoot(
                options.root ||
                "#pdfWorkspaceRoot"
            );


        if (!root) {

            console.error(
                "ToolXonePDFWorkspace: " +
                "Workspace root was not found."
            );

            return null;

        }


        ToolXonePDFWorkspace.root =
            root;


        /*
        ------------------------------------------------------
        BUILD WORKSPACE
        ------------------------------------------------------
        */

        buildWorkspace(
            root,
            options
        );


        /*
        ------------------------------------------------------
        BIND EVENTS
        ------------------------------------------------------
        */

        bindEvents();


        /*
        ------------------------------------------------------
        INITIAL STATE
        ------------------------------------------------------
        */

        showEmptyState();


        ToolXonePDFWorkspace.initialized =
            true;


        if (
            typeof window.getPDFState ===
            "function"
        ) {

            window.getPDFState()
                .initialized = true;

        }


        return ToolXonePDFWorkspace;

    }


    /* ======================================================
       ROOT RESOLUTION
    ====================================================== */

    function resolveRoot(
        root
    ) {

        if (!root) {

            return null;

        }


        if (
            typeof root === "string"
        ) {

            return document.querySelector(
                root
            );

        }


        if (
            root instanceof Element
        ) {

            return root;

        }


        return null;

    }


    /* ======================================================
       BUILD WORKSPACE
    ====================================================== */

    function buildWorkspace(
        root,
        options
    ) {

        const components =
            window.ToolXonePDFComponents;


        /*
        ------------------------------------------------------
        EMPTY / UPLOAD AREA
        ------------------------------------------------------
        */

        const upload =
            components.createUploadArea(
                {

                    id:
                        options.uploadInputId ||
                        "toolxonePDFFileInput",

                    accept:
                        options.accept ||
                        ".pdf",

                    multiple:
                        options.multiple === true,

                    title:
                        options.uploadTitle ||
                        "Upload your PDF",

                    description:
                        options.uploadDescription ||
                        "Drag & drop your PDF here or choose a file."

                }
            );


        /*
        ------------------------------------------------------
        WORKSPACE
        ------------------------------------------------------
        */

        const workspace =
            components.createWorkspace(
                {

                    id:
                        options.workspaceId ||
                        "toolxonePDFWorkspace",

                    title:
                        options.workspaceTitle ||
                        "PDF Workspace",

                    description:
                        options.workspaceDescription ||
                        "Manage your PDF files and settings."

                }
            );


        /*
        ------------------------------------------------------
        STATUS
        ------------------------------------------------------
        */

        const status =
            components.createStatus(
                {

                    text:
                        "Ready"

                }
            );


        /*
        ------------------------------------------------------
        PROCESSING
        ------------------------------------------------------
        */

        const processing =
            components.createProcessingPanel(
                {

                    title:
                        "Processing PDF...",

                    message:
                        "Please wait while your file is being processed."

                }
            );


        /*
        ------------------------------------------------------
        RESULT
        ------------------------------------------------------
        */

        const result =
            components.createResultPanel(
                {

                    title:
                        "Your PDF is Ready",

                    message:
                        "Your PDF has been successfully created."

                }
            );


        /*
        ------------------------------------------------------
        ERROR
        ------------------------------------------------------
        */

        const error =
            components.createErrorPanel(
                {

                    title:
                        "Something went wrong",

                    message:
                        "The PDF could not be processed."

                }
            );


        /*
        ------------------------------------------------------
        PRIVACY
        ------------------------------------------------------
        */

        const privacy =
            components.createPrivacyNote();


        /*
        ------------------------------------------------------
        APPEND
        ------------------------------------------------------
        */

        clearRoot(
            root
        );


        root.appendChild(
            upload.wrapper
        );


        root.appendChild(
            workspace.workspace
        );


        root.appendChild(
            status.status
        );


        root.appendChild(
            processing.panel
        );


        root.appendChild(
            result.panel
        );


        root.appendChild(
            error.panel
        );


        root.appendChild(
            privacy
        );


        /*
        ------------------------------------------------------
        STORE REFERENCES
        ------------------------------------------------------
        */

        ToolXonePDFWorkspace.upload =
            upload;


        ToolXonePDFWorkspace.workspace =
            workspace;


        ToolXonePDFWorkspace.status =
            status;


        ToolXonePDFWorkspace.processing =
            processing;


        ToolXonePDFWorkspace.result =
            result;


        ToolXonePDFWorkspace.error =
            error;

    }


    /* ======================================================
       CLEAR ROOT
    ====================================================== */

    function clearRoot(
        root
    ) {

        while (
            root.firstChild
        ) {

            root.removeChild(
                root.firstChild
            );

        }

    }


    /* ======================================================
       WORKSPACE STATE
    ====================================================== */

    function setWorkspaceState(
        state
    ) {

        const root =
            ToolXonePDFWorkspace.root;


        if (!root) {

            return;

        }


        const allowedStates = [
            "idle",
            "ready",
            "processing",
            "complete",
            "error"
        ];


        const nextState =
            allowedStates.includes(state)
                ? state
                : "idle";


        ToolXonePDFWorkspace.currentState =
            nextState;


        root.dataset.pdfState =
            nextState;

    }


    function getWorkspaceState() {

        return (
            ToolXonePDFWorkspace.currentState ||
            "idle"
        );

    }


    /* ======================================================
       EVENT BINDING
    ====================================================== */

    function bindEvents() {

        const upload =
            ToolXonePDFWorkspace.upload;


        const workspace =
            ToolXonePDFWorkspace.workspace;


        if (!upload) {

            return;

        }


        /*
        ------------------------------------------------------
        FILE INPUT
        ------------------------------------------------------
        */

        upload.input.addEventListener(
            "change",
            event => {

                handleFiles(
                    event.target.files
                );

            }
        );


        /*
        ------------------------------------------------------
        DRAG & DROP
        ------------------------------------------------------
        */

        if (
            upload.dropzone
        ) {

            upload.dropzone.addEventListener(
                "dragover",
                event => {

                    event.preventDefault();

                    upload.dropzone.classList.add(
                        "is-dragover"
                    );

                }
            );


            upload.dropzone.addEventListener(
                "dragleave",
                event => {

                    event.preventDefault();

                    upload.dropzone.classList.remove(
                        "is-dragover"
                    );

                }
            );


            upload.dropzone.addEventListener(
                "drop",
                event => {

                    event.preventDefault();

                    upload.dropzone.classList.remove(
                        "is-dragover"
                    );


                    handleFiles(
                        event.dataTransfer.files
                    );

                }
            );

        }


        /*
        ------------------------------------------------------
        UPLOAD BUTTON
        ------------------------------------------------------
        */

        if (
            upload.button
        ) {

            upload.button.addEventListener(
                "click",
                () => {

                    upload.input.click();

                }
            );

        }


        /*
        ------------------------------------------------------
        WORKSPACE ACTIONS
        ------------------------------------------------------
        */

        if (
            workspace &&
            workspace.workspace
        ) {

            workspace.workspace.addEventListener(
                "click",
                handleWorkspaceClick
            );

        }


        /*
        ------------------------------------------------------
        RESULT ACTIONS
        ------------------------------------------------------
        */

        if (
            ToolXonePDFWorkspace.result &&
            ToolXonePDFWorkspace.result.panel
        ) {

            ToolXonePDFWorkspace.result.panel.addEventListener(
                "click",
                handleResultClick
            );

        }


        /*
        ------------------------------------------------------
        ERROR ACTIONS
        ------------------------------------------------------
        */

        if (
            ToolXonePDFWorkspace.error &&
            ToolXonePDFWorkspace.error.panel
        ) {

            ToolXonePDFWorkspace.error.panel.addEventListener(
                "click",
                handleErrorClick
            );

        }

    }


    /* ======================================================
       FILE HANDLING
    ====================================================== */

    function handleFiles(
        fileList
    ) {

        if (!fileList) {

            return;

        }


        const files =
            Array.from(fileList);


        if (!files.length) {

            return;

        }


        /*
        ------------------------------------------------------
        ACCEPT FILES
        ------------------------------------------------------
        */

        const validFiles =
            files.filter(
                file => {

                    if (!file) {

                        return false;

                    }


                    return (
                        file.type ===
                        "application/pdf" ||
                        /\.pdf$/i.test(
                            file.name || ""
                        )
                    );

                }
            );


        if (!validFiles.length) {

            showError(
                "Please select a valid PDF file."
            );

            return;

        }


        /*
        ------------------------------------------------------
        UPDATE STATE
        ------------------------------------------------------
        */

        if (
            typeof window.getPDFFiles ===
            "function"
        ) {

            const currentFiles =
                window.getPDFFiles();


            if (
                Array.isArray(currentFiles)
            ) {

                setPDFFiles(
                    [
                        ...currentFiles,
                        ...validFiles
                    ]
                );

            } else {

                setPDFFiles(
                    validFiles
                );

            }

        } else {

            setPDFFiles(
                validFiles
            );

        }


        /*
        ------------------------------------------------------
        UI
        ------------------------------------------------------
        */

        hideError();

        hideProcessing();

        hideResult();


        showUploadedState();


        renderFiles();


        /*
        ------------------------------------------------------
        EVENT
        ------------------------------------------------------
        */

        emitEvent(
            "pdf:files-added",
            {

                files:
                    validFiles

            }
        );

    }


    /* ======================================================
       SET FILES
    ====================================================== */

    function setPDFFiles(
        files
    ) {

        if (
            typeof window.setPDFFiles ===
            "function"
        ) {

            window.setPDFFiles(
                files
            );

        }

    }


    /* ======================================================
       RENDER FILES
    ====================================================== */

    function renderFiles() {

        const workspace =
            ToolXonePDFWorkspace.workspace;


        if (
            !workspace ||
            !workspace.pages
        ) {

            return;

        }


        let files = [];


        if (
            typeof window.getPDFFiles ===
            "function"
        ) {

            files =
                window.getPDFFiles() || [];

        }


        workspace.pages.innerHTML =
            "";


        if (!files.length) {

            const empty =
                document.createElement(
                    "div"
                );


            empty.className =
                "pdf-workspace-empty";


            empty.textContent =
                "Add one or more PDF files to begin.";


            workspace.pages.appendChild(
                empty
            );


            return;

        }


        files.forEach(
            (
                file,
                index
            ) => {

                const page =
                    document.createElement(
                        "div"
                    );


                page.className =
                    "pdf-workspace-file";


                page.dataset.index =
                    String(index);


                page.innerHTML = `
                    <div class="pdf-workspace-file-info">
                        <strong>${escapeHTML(file.name || "PDF file")}</strong>
                        <span>${formatFileSize(file.size)}</span>
                    </div>

                    <button
                        type="button"
                        class="pdf-workspace-file-remove"
                        data-action="remove-file"
                        data-index="${index}"
                        aria-label="Remove file"
                    >
                        ×
                    </button>
                `;


                workspace.pages.appendChild(
                    page
                );

            }
        );

    }


    /* ======================================================
       REMOVE FILE
    ====================================================== */

    function removeFile(
        index
    ) {

        const files =
            typeof window.getPDFFiles ===
            "function"
                ? window.getPDFFiles() || []
                : [];


        if (
            index < 0 ||
            index >= files.length
        ) {

            return;

        }


        files.splice(
            index,
            1
        );


        setPDFFiles(
            files
        );


        if (!files.length) {

            showEmptyState();

        } else {

            showUploadedState();

            renderFiles();

        }


        emitEvent(
            "pdf:file-removed",
            {

                index

            }
        );

    }


    /* ======================================================
       CLEAR ALL
    ====================================================== */

    function clearAll() {

        if (
            typeof window.clearPDFFiles ===
            "function"
        ) {

            window.clearPDFFiles();

        }


        if (
            ToolXonePDFWorkspace.upload &&
            ToolXonePDFWorkspace.upload.input
        ) {

            ToolXonePDFWorkspace.upload.input.value =
                "";

        }


        hideProcessing();

        hideResult();

        hideError();


        showEmptyState();


        if (
            typeof window.setPDFProgress ===
            "function"
        ) {

            window.setPDFProgress(
                0
            );

        }


        if (
            typeof window.setPDFProcessing ===
            "function"
        ) {

            window.setPDFProcessing(
                false
            );

        }


        if (
            typeof window.setPDFStatus ===
            "function"
        ) {

            window.setPDFStatus(
                "idle"
            );

        }


        if (
            typeof window.setPDFResult ===
            "function"
        ) {

            window.setPDFResult(
                null
            );

        }


        if (
            typeof window.setPDFDownload ===
            "function"
        ) {

            window.setPDFDownload(
                null,
                null
            );

        }


        if (
            typeof window.setPDFError ===
            "function"
        ) {

            window.setPDFError(
                null
            );

        }


        emitEvent(
            "pdf:cleared"
        );

    }


    /* ======================================================
       EMPTY STATE
    ====================================================== */

    function showEmptyState() {

        setWorkspaceState(
            "idle"
        );


        const upload =
            ToolXonePDFWorkspace.upload;


        const workspace =
            ToolXonePDFWorkspace.workspace;


        if (upload) {

            upload.wrapper.hidden =
                false;

        }


        if (workspace) {

            workspace.workspace.hidden =
                true;

        }


        hideProcessing();

        hideResult();

        hideError();


        setStatus(
            "Ready"
        );

    }


    /* ======================================================
       UPLOADED STATE
    ====================================================== */

    function showUploadedState() {

        setWorkspaceState(
            "ready"
        );


        const upload =
            ToolXonePDFWorkspace.upload;


        const workspace =
            ToolXonePDFWorkspace.workspace;


        if (upload) {

            upload.wrapper.hidden =
                true;

        }


        if (workspace) {

            workspace.workspace.hidden =
                false;

        }


        hideProcessing();

        hideResult();

        hideError();


        setStatus(
            "Ready"
        );

    }


    /* ======================================================
       WORKSPACE CLICK
    ====================================================== */

    function handleWorkspaceClick(
        event
    ) {

        const actionElement =
            event.target.closest(
                "[data-action]"
            );


        if (!actionElement) {

            return;

        }


        const action =
            actionElement.dataset.action;


        if (
            action ===
            "remove-file"
        ) {

            const index =
                Number(
                    actionElement.dataset.index
                );


            removeFile(
                index
            );

        }


        if (
            action ===
            "clear-all"
        ) {

            clearAll();

        }

    }


    /* ======================================================
       PROCESSING
    ====================================================== */

    function showProcessing(
        options = {}
    ) {

        setWorkspaceState(
            "processing"
        );


        const processing =
            ToolXonePDFWorkspace.processing;


        if (!processing) {

            return;

        }


        hideResult();

        hideError();


        processing.panel.hidden =
            false;


        processing.panel.classList.add(
            "is-active"
        );


        if (
            options.title
        ) {

            processing.title.textContent =
                options.title;

        }


        if (
            options.message
        ) {

            processing.message.textContent =
                options.message;

        }


        updateProgress(
            options.progress ||
            0
        );


        if (
            typeof window.setPDFProcessing ===
            "function"
        ) {

            window.setPDFProcessing(
                true
            );

        }


        if (
            typeof window.setPDFStatus ===
            "function"
        ) {

            window.setPDFStatus(
                "processing"
            );

        }


        setStatus(
            "Processing"
        );


        emitEvent(
            "pdf:processing",
            {

                options

            }
        );

    }


    /* ======================================================
       PROGRESS
    ====================================================== */

    function updateProgress(
        progress
    ) {

        const processing =
            ToolXonePDFWorkspace.processing;


        const value =
            Math.max(
                0,
                Math.min(
                    100,
                    Number(progress) || 0
                )
            );


        if (
            processing &&
            processing.progress
        ) {

            processing.progress.value =
                value;

        }


        if (
            processing &&
            processing.progressText
        ) {

            processing.progressText.textContent =
                `${Math.round(value)}%`;

        }


        if (
            typeof window.setPDFProgress ===
            "function"
        ) {

            window.setPDFProgress(
                value
            );

        }


        emitEvent(
            "pdf:progress",
            {

                progress:
                    value

            }
        );

    }


    /* ======================================================
       HIDE PROCESSING
    ====================================================== */

    function hideProcessing() {

        const processing =
            ToolXonePDFWorkspace.processing;


        if (!processing) {

            return;

        }


        processing.panel.hidden =
            true;


        processing.panel.classList.remove(
            "is-active"
        );

    }


    /* ======================================================
       RESULT
    ====================================================== */

    function showResult(
        result,
        options = {}
    ) {

        setWorkspaceState(
            "complete"
        );


        const resultComponent =
            ToolXonePDFWorkspace.result;


        if (!resultComponent) {

            return;

        }


        hideProcessing();

        hideError();


        resultComponent.panel.hidden =
            false;


        resultComponent.panel.classList.add(
            "is-active"
        );


        if (
            options.title
        ) {

            resultComponent.title.textContent =
                options.title;

        }


        if (
            options.message
        ) {

            resultComponent.message.textContent =
                options.message;

        }


        if (
            typeof window.setPDFResult ===
            "function"
        ) {

            window.setPDFResult(
                result
            );

        }


        if (
            options.downloadUrl ||
            options.downloadName
        ) {

            if (
                typeof window.setPDFDownload ===
                "function"
            ) {

                window.setPDFDownload(
                    options.downloadUrl ||
                    null,

                    options.downloadName ||
                    null
                );

            }

        }


        if (
            options.downloadUrl
        ) {

            resultComponent.download.dataset.url =
                options.downloadUrl;

        }


        if (
            options.downloadName
        ) {

            resultComponent.download.dataset.filename =
                options.downloadName;

        }


        if (
            typeof window.setPDFProcessing ===
            "function"
        ) {

            window.setPDFProcessing(
                false
            );

        }


        if (
            typeof window.setPDFStatus ===
            "function"
        ) {

            window.setPDFStatus(
                "complete"
            );

        }


        setStatus(
            "Complete"
        );


        emitEvent(
            "pdf:completed",
            {

                result

            }
        );

    }


    /* ======================================================
       HIDE RESULT
    ====================================================== */

    function hideResult() {

        const result =
            ToolXonePDFWorkspace.result;


        if (!result) {

            return;

        }


        result.panel.hidden =
            true;


        result.panel.classList.remove(
            "is-active"
        );

    }


    /* ======================================================
       RESULT CLICK
    ====================================================== */

    function handleResultClick(
        event
    ) {

        const actionElement =
            event.target.closest(
                "[data-action]"
            );


        if (!actionElement) {

            return;

        }


        if (
            actionElement.dataset.action ===
            "download"
        ) {

            downloadResult();

        }

    }


    /* ======================================================
       DOWNLOAD RESULT
    ====================================================== */

    function downloadResult() {

        let url = null;

        let filename =
            "toolxone-result.pdf";


        if (
            typeof window.getPDFState ===
            "function"
        ) {

            const state =
                window.getPDFState();


            url =
                state.downloadUrl ||
                null;


            filename =
                state.downloadName ||
                filename;

        }


        if (!url) {

            url =
                ToolXonePDFWorkspace
                    .result
                    ?.download
                    ?.dataset
                    ?.url ||
                null;

        }


        if (
            !url
        ) {

            console.warn(
                "ToolXonePDFWorkspace: " +
                "No download URL is available."
            );

            return;

        }


        const link =
            document.createElement(
                "a"
            );


        link.href =
            url;


        link.download =
            filename;


        document.body.appendChild(
            link
        );


        link.click();


        link.remove();


        emitEvent(
            "pdf:downloaded",
            {

                url,

                filename

            }
        );

    }


    /* ======================================================
       ERROR
    ====================================================== */

    function showError(
        message
    ) {

        setWorkspaceState(
            "error"
        );


        const error =
            ToolXonePDFWorkspace.error;


        if (!error) {

            return;

        }


        hideProcessing();

        hideResult();


        error.panel.hidden =
            false;


        error.panel.classList.add(
            "is-active"
        );


        error.message.textContent =
            message ||
            "The PDF could not be processed.";


        if (
            typeof window.setPDFError ===
            "function"
        ) {

            window.setPDFError(
                message
            );

        }


        if (
            typeof window.setPDFProcessing ===
            "function"
        ) {

            window.setPDFProcessing(
                false
            );

        }


        if (
            typeof window.setPDFStatus ===
            "function"
        ) {

            window.setPDFStatus(
                "error"
            );

        }


        setStatus(
            "Error"
        );


        emitEvent(
            "pdf:error",
            {

                message

            }
        );

    }


    /* ======================================================
       HIDE ERROR
    ====================================================== */

    function hideError() {

        const error =
            ToolXonePDFWorkspace.error;


        if (!error) {

            return;

        }


        error.panel.hidden =
            true;


        error.panel.classList.remove(
            "is-active"
        );

    }


    /* ======================================================
       ERROR CLICK
    ====================================================== */

    function handleErrorClick(
        event
    ) {

        const actionElement =
            event.target.closest(
                "[data-action]"
            );


        if (!actionElement) {

            return;

        }


        if (
            actionElement.dataset.action ===
            "dismiss-error"
        ) {

            hideError();

            setStatus(
                "Ready"
            );

        }

    }


    /* ======================================================
       STATUS
    ====================================================== */

    function setStatus(
        text
    ) {

        const status =
            ToolXonePDFWorkspace.status;


        if (!status) {

            return;

        }


        status.text.textContent =
            text ||
            "Ready";


        status.status.dataset.status =
            String(
                text || "ready"
            )
            .toLowerCase()
            .replace(
                /\s+/g,
                "-"
            );

    }


    /* ======================================================
       EVENT BRIDGE
    ====================================================== */

    function emitEvent(
        name,
        detail = {}
    ) {

        document.dispatchEvent(
            new CustomEvent(
                name,
                {

                    detail

                }
            )
        );

    }


    /* ======================================================
       TOOL CONNECTION
    ====================================================== */

    function setActiveTool(
        toolId
    ) {

        if (
            typeof window.setPDFActiveTool ===
            "function"
        ) {

            window.setPDFActiveTool(
                toolId
            );

        }


        emitEvent(
            "pdf:tool-changed",
            {

                toolId

            }
        );

    }


    function getActiveTool() {

        if (
            typeof window.getPDFActiveTool ===
            "function"
        ) {

            return window.getPDFActiveTool();

        }


        return null;

    }


    /* ======================================================
       HELPERS
    ====================================================== */

    function formatFileSize(
        bytes
    ) {

        const value =
            Number(bytes) || 0;


        if (
            value < 1024
        ) {

            return `${value} B`;

        }


        if (
            value < 1024 * 1024
        ) {

            return `${(value / 1024).toFixed(1)} KB`;

        }


        return `${(
            value /
            (1024 * 1024)
        ).toFixed(1)} MB`;

    }


    function escapeHTML(
        value
    ) {

        return String(
            value || ""
        )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

    }


    /* ======================================================
       PUBLIC API
    ====================================================== */

    ToolXonePDFWorkspace.setWorkspaceState =
        setWorkspaceState;


    ToolXonePDFWorkspace.getWorkspaceState =
        getWorkspaceState;


    ToolXonePDFWorkspace.init =
        init;


    ToolXonePDFWorkspace.handleFiles =
        handleFiles;


    ToolXonePDFWorkspace.renderFiles =
        renderFiles;


    ToolXonePDFWorkspace.removeFile =
        removeFile;


    ToolXonePDFWorkspace.clearAll =
        clearAll;


    ToolXonePDFWorkspace.showEmptyState =
        showEmptyState;


    ToolXonePDFWorkspace.showUploadedState =
        showUploadedState;


    ToolXonePDFWorkspace.showProcessing =
        showProcessing;


    ToolXonePDFWorkspace.updateProgress =
        updateProgress;


    ToolXonePDFWorkspace.hideProcessing =
        hideProcessing;


    ToolXonePDFWorkspace.showResult =
        showResult;


    ToolXonePDFWorkspace.hideResult =
        hideResult;


    ToolXonePDFWorkspace.downloadResult =
        downloadResult;


    ToolXonePDFWorkspace.showError =
        showError;


    ToolXonePDFWorkspace.hideError =
        hideError;


    ToolXonePDFWorkspace.setStatus =
        setStatus;


    ToolXonePDFWorkspace.setActiveTool =
        setActiveTool;


    ToolXonePDFWorkspace.getActiveTool =
        getActiveTool;


    /* ======================================================
       GLOBAL ACCESS
    ====================================================== */

    window.ToolXonePDFWorkspace =
        ToolXonePDFWorkspace;


    window.initPDFWorkspace =
        init;


})(window);