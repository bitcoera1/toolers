/*
==========================================================
TOOLXONE PDF COMPONENTS
==========================================================

RESPONSIBILITY
----------------------------------------------------------
- Shared UI components for the ToolXone PDF workspace
- Creates reusable PDF interface elements
- Provides upload area
- Provides file list
- Provides settings controls
- Provides processing/progress UI
- Provides result/download UI
- Provides empty/loading/error states
- Provides shared PDF workspace rendering helpers

IMPORTANT
----------------------------------------------------------
- PDF-only UI system
- Does NOT perform PDF conversion
- Does NOT contain PDF processing logic
- Does NOT modify the original 20-tool architecture
- Does NOT modify ToolXoneToolsRegistry
- Does NOT own PDF state
- Does NOT own PDF engine logic
- Does NOT own tool-specific conversion logic

DEPENDENCIES
----------------------------------------------------------
- ToolXonePDFState
- ToolXonePDFEngine
- DOM APIs

==========================================================
*/


(function (window) {

    "use strict";


    /* ======================================================
       NAMESPACE
    ====================================================== */

    const ToolXonePDFComponents = {


        version: "1.0.0",


        /* ==================================================
           CONFIGURATION
        ================================================== */

        defaults: {

            workspaceId:
                "toolxonePDFWorkspace",

            uploadInputId:
                "toolxonePDFFileInput",

            fileListId:
                "toolxonePDFFileList",

            settingsId:
                "toolxonePDFSettings",

            resultId:
                "toolxonePDFResult",

            statusId:
                "toolxonePDFStatus"

        }

    };


    /* ======================================================
       DOM HELPERS
    ====================================================== */


    function createElement(
        tag,
        options = {}
    ) {

        const element =
            document.createElement(tag);


        if (options.id) {

            element.id =
                options.id;

        }


        if (options.className) {

            element.className =
                options.className;

        }


        if (options.text !== undefined) {

            element.textContent =
                options.text;

        }


        if (options.html !== undefined) {

            element.innerHTML =
                options.html;

        }


        if (options.attributes) {

            Object.entries(
                options.attributes
            ).forEach(
                ([key, value]) => {

                    element.setAttribute(
                        key,
                        value
                    );

                }
            );

        }


        return element;

    }


    function clearElement(
        element
    ) {

        if (!element) {

            return;

        }


        while (
            element.firstChild
        ) {

            element.removeChild(
                element.firstChild
            );

        }

    }


    function getElement(
        selector
    ) {

        if (!selector) {

            return null;

        }


        if (
            typeof selector ===
            "string"
        ) {

            return document.querySelector(
                selector
            );

        }


        if (
            selector instanceof
            Element
        ) {

            return selector;

        }


        return null;

    }


    function setHidden(
        element,
        hidden
    ) {

        if (!element) {

            return;

        }


        element.hidden =
            Boolean(hidden);

    }


    function setText(
        element,
        text
    ) {

        if (!element) {

            return;

        }


        element.textContent =
            text || "";

    }


    /* ======================================================
       ICONS
    ====================================================== */


    const icons = {

        upload: "📤",

        file: "📄",

        image: "🖼️",

        settings: "⚙️",

        clear: "✕",

        download: "⬇",

        success: "✅",

        error: "⚠️",

        processing: "⏳",

        lock: "🔒",

        arrow: "→"

    };


    /* ======================================================
       UPLOAD COMPONENT
    ====================================================== */


    function createUploadArea(
        options = {}
    ) {

        const {

            id =
                ToolXonePDFComponents
                    .defaults
                    .uploadInputId,

            accept =
                ".pdf",

            multiple = false,

            title =
                "Upload your PDF",

            description =
                "Drag & drop your PDF here or choose a file."

        } = options;


        const wrapper =
            createElement(
                "div",
                {
                    className:
                        "pdf-upload-component"
                }
            );


        const input =
            createElement(
                "input",
                {
                    id,
                    className:
                        "pdf-upload-input",
                    attributes: {

                        type:
                            "file",

                        accept,

                        ...(multiple
                            ? { multiple: "" }
                            : {})

                    }
                }
            );


        const label =
            createElement(
                "label",
                {
                    className:
                        "pdf-upload-area",
                    attributes: {

                        for: id

                    }
                }
            );


        const icon =
            createElement(
                "div",
                {
                    className:
                        "pdf-upload-icon",
                    text:
                        icons.upload
                }
            );


        const heading =
            createElement(
                "h3",
                {
                    className:
                        "pdf-upload-title",
                    text:
                        title
                }
            );


        const text =
            createElement(
                "p",
                {
                    className:
                        "pdf-upload-description",
                    text:
                        description
                }
            );


        const button =
            createElement(
                "span",
                {
                    className:
                        "pdf-upload-button",
                    text:
                        "Choose File"
                }
            );


        label.appendChild(icon);

        label.appendChild(heading);

        label.appendChild(text);

        label.appendChild(button);


        wrapper.appendChild(input);

        wrapper.appendChild(label);


        return {

            wrapper,

            input,

            label

        };

    }


    /* ======================================================
       DRAG & DROP STATE
    ====================================================== */


    function setUploadDragState(
        uploadArea,
        active
    ) {

        if (!uploadArea) {

            return;

        }


        uploadArea.classList.toggle(
            "is-dragging",
            Boolean(active)
        );

    }


    /* ======================================================
       FILE ITEM
    ====================================================== */


    function createFileItem(
        file,
        index,
        options = {}
    ) {

        const item =
            createElement(
                "div",
                {
                    className:
                        "pdf-file-item"
                }
            );


        item.dataset.index =
            String(index);


        const icon =
            createElement(
                "div",
                {
                    className:
                        "pdf-file-icon",
                    text:
                        options.icon ||
                        icons.file
                }
            );


        const information =
            createElement(
                "div",
                {
                    className:
                        "pdf-file-information"
                }
            );


        const name =
            createElement(
                "div",
                {
                    className:
                        "pdf-file-name",
                    text:
                        file &&
                        file.name
                            ? file.name
                            : "Unnamed file"
                }
            );


        const size =
            createElement(
                "div",
                {
                    className:
                        "pdf-file-size",
                    text:
                        formatFileSize(
                            file &&
                            file.size
                        )
                }
            );


        information.appendChild(name);

        information.appendChild(size);


        item.appendChild(icon);

        item.appendChild(information);


        if (
            options.removable !== false
        ) {

            const remove =
                createElement(
                    "button",
                    {
                        className:
                            "pdf-file-remove",
                        text:
                            icons.clear,
                        attributes: {

                            type:
                                "button",

                            "aria-label":
                                "Remove file"

                        }
                    }
                );


            remove.dataset.action =
                "remove-file";


            remove.dataset.index =
                String(index);


            item.appendChild(
                remove
            );

        }


        return item;

    }


    /* ======================================================
       FILE LIST
    ====================================================== */


    function renderFileList(
        container,
        files = [],
        options = {}
    ) {

        const element =
            getElement(container);


        if (!element) {

            return null;

        }


        clearElement(element);


        if (
            !Array.isArray(files) ||
            files.length === 0
        ) {

            element.classList.add(
                "is-empty"
            );


            const empty =
                createElement(
                    "div",
                    {
                        className:
                            "pdf-file-list-empty",
                        text:
                            options.emptyText ||
                            "No files selected."
                    }
                );


            element.appendChild(
                empty
            );


            return element;

        }


        element.classList.remove(
            "is-empty"
        );


        files.forEach(
            (file, index) => {

                element.appendChild(
                    createFileItem(
                        file,
                        index,
                        options
                    )
                );

            }
        );


        return element;

    }


    /* ======================================================
       FILE SIZE
    ====================================================== */


    function formatFileSize(
        bytes
    ) {

        const value =
            Number(bytes);


        if (
            !Number.isFinite(value) ||
            value <= 0
        ) {

            return "0 KB";

        }


        const units = [

            "B",

            "KB",

            "MB",

            "GB"

        ];


        let size =
            value;

        let unitIndex =
            0;


        while (
            size >= 1024 &&
            unitIndex <
                units.length - 1
        ) {

            size /=
                1024;

            unitIndex++;

        }


        const decimals =
            unitIndex === 0
                ? 0
                : size < 10
                    ? 2
                    : 1;


        return (
            size.toFixed(
                decimals
            ) +
            " " +
            units[unitIndex]
        );

    }


    /* ======================================================
       SETTINGS COMPONENT
    ====================================================== */


    function createSettingsPanel(
        options = {}
    ) {

        const panel =
            createElement(
                "div",
                {
                    className:
                        "pdf-settings-component"
                }
            );


        const heading =
            createElement(
                "h3",
                {
                    className:
                        "pdf-settings-title",
                    text:
                        icons.settings +
                        " PDF Settings"
                }
            );


        panel.appendChild(
            heading
        );


        /* ----------------------------------------------
           PAGE SIZE
        ---------------------------------------------- */

        const pageSize =
            createSelectControl(
                {

                    id:
                        "pdfPageSize",

                    label:
                        "Page Size",

                    value:
                        options.pageSize ||
                        "A4",

                    options: [

                        {
                            value:
                                "A4",
                            label:
                                "A4"
                        },

                        {
                            value:
                                "A3",
                            label:
                                "A3"
                        },

                        {
                            value:
                                "A5",
                            label:
                                "A5"
                        },

                        {
                            value:
                                "Letter",
                            label:
                                "Letter"
                        },

                        {
                            value:
                                "Legal",
                            label:
                                "Legal"
                        },

                        {
                            value:
                                "Tabloid",
                            label:
                                "Tabloid"
                        }

                    ]

                }
            );


        panel.appendChild(
            pageSize.wrapper
        );


        /* ----------------------------------------------
           ORIENTATION
        ---------------------------------------------- */

        const orientation =
            createSelectControl(
                {

                    id:
                        "pdfOrientation",

                    label:
                        "Orientation",

                    value:
                        options.orientation ||
                        "auto",

                    options: [

                        {
                            value:
                                "auto",
                            label:
                                "Auto"
                        },

                        {
                            value:
                                "portrait",
                            label:
                                "Portrait"
                        },

                        {
                            value:
                                "landscape",
                            label:
                                "Landscape"
                        }

                    ]

                }
            );


        panel.appendChild(
            orientation.wrapper
        );


        /* ----------------------------------------------
           MARGIN
        ---------------------------------------------- */

        const margin =
            createSelectControl(
                {

                    id:
                        "pdfMargin",

                    label:
                        "Margins",

                    value:
                        options.margin ||
                        "normal",

                    options: [

                        {
                            value:
                                "none",
                            label:
                                "None"
                        },

                        {
                            value:
                                "narrow",
                            label:
                                "Narrow"
                        },

                        {
                            value:
                                "normal",
                            label:
                                "Normal"
                        },

                        {
                            value:
                                "wide",
                            label:
                                "Wide"
                        }

                    ]

                }
            );


        panel.appendChild(
            margin.wrapper
        );


        /* ----------------------------------------------
           IMAGE FIT
        ---------------------------------------------- */

        const imageFit =
            createSelectControl(
                {

                    id:
                        "pdfImageFit",

                    label:
                        "Image Fit",

                    value:
                        options.imageFit ||
                        "fit-inside-page",

                    options: [

                        {
                            value:
                                "fit-inside-page",
                            label:
                                "Fit Inside Page"
                        },

                        {
                            value:
                                "fill-page",
                            label:
                                "Fill Page"
                        },

                        {
                            value:
                                "original",
                            label:
                                "Original Size"
                        }

                    ]

                }
            );


        panel.appendChild(
            imageFit.wrapper
        );


        return {

            panel,

            pageSize,

            orientation,

            margin,

            imageFit

        };

    }


    /* ======================================================
       SELECT CONTROL
    ====================================================== */


    function createSelectControl(
        options = {}
    ) {

        const wrapper =
            createElement(
                "div",
                {
                    className:
                        "pdf-setting-control"
                }
            );


        const label =
            createElement(
                "label",
                {
                    className:
                        "pdf-setting-label",
                    text:
                        options.label ||
                        ""
                }
            );


        const select =
            createElement(
                "select",
                {
                    id:
                        options.id ||
                        "",
                    className:
                        "pdf-setting-select"
                }
            );


        const values =
            Array.isArray(
                options.options
            )
                ? options.options
                : [];


        values.forEach(
            option => {

                const element =
                    createElement(
                        "option",
                        {
                            text:
                                option.label,
                            attributes: {

                                value:
                                    option.value

                            }
                        }
                    );


                if (
                    option.value ===
                    options.value
                ) {

                    element.selected =
                        true;

                }


                select.appendChild(
                    element
                );

            }
        );


        label.htmlFor =
            options.id || "";


        wrapper.appendChild(
            label
        );

        wrapper.appendChild(
            select
        );


        return {

            wrapper,

            label,

            select

        };

    }


    /* ======================================================
       ACTION BUTTON
    ====================================================== */


    function createActionButton(
        options = {}
    ) {

        const button =
            createElement(
                "button",
                {
                    className:
                        [
                            "pdf-action-button",

                            options.variant
                                ? `pdf-action-${options.variant}`
                                : ""
                        ]
                        .filter(Boolean)
                        .join(" "),
                    text:
                        (
                            options.icon ||
                            ""
                        ) +
                        (
                            options.text ||
                            ""
                        ),
                    attributes: {

                        type:
                            options.type ||
                            "button"

                    }
                }
            );


        if (options.id) {

            button.id =
                options.id;

        }


        if (
            options.disabled
        ) {

            button.disabled =
                true;

        }


        if (
            options.ariaLabel
        ) {

            button.setAttribute(
                "aria-label",
                options.ariaLabel
            );

        }


        return button;

    }


    /* ======================================================
       WORKSPACE HEADER
    ====================================================== */


    function createWorkspaceHeader(
        options = {}
    ) {

        const header =
            createElement(
                "div",
                {
                    className:
                        "pdf-workspace-header"
                }
            );


        const information =
            createElement(
                "div",
                {
                    className:
                        "pdf-workspace-header-info"
                }
            );


        const title =
            createElement(
                "h2",
                {
                    className:
                        "pdf-workspace-title",
                    text:
                        options.title ||
                        "PDF Workspace"
                }
            );


        const description =
            createElement(
                "p",
                {
                    className:
                        "pdf-workspace-description",
                    text:
                        options.description ||
                        "Manage your PDF files and settings."
                }
            );


        information.appendChild(
            title
        );

        information.appendChild(
            description
        );


        header.appendChild(
            information
        );


        if (
            options.clearAll !== false
        ) {

            const clear =
                createActionButton(
                    {

                        id:
                            options.clearId ||
                            "pdfClearAllBtn",

                        text:
                            " Clear All",

                        icon:
                            icons.clear,

                        variant:
                            "secondary",

                        ariaLabel:
                            "Clear all PDF files"

                    }
                );


            clear.dataset.action =
                "clear-all";


            header.appendChild(
                clear
            );

        }


        return header;

    }


    /* ======================================================
       PROCESSING COMPONENT
    ====================================================== */


    function createProcessingPanel(
        options = {}
    ) {

        const panel =
            createElement(
                "div",
                {
                    className:
                        "pdf-processing-component"
                }
            );


        const icon =
            createElement(
                "div",
                {
                    className:
                        "pdf-processing-icon",
                    text:
                        icons.processing
                }
            );


        const title =
            createElement(
                "h3",
                {
                    className:
                        "pdf-processing-title",
                    text:
                        options.title ||
                        "Processing PDF..."
                }
            );


        const message =
            createElement(
                "p",
                {
                    className:
                        "pdf-processing-message",
                    text:
                        options.message ||
                        "Please wait while your file is being processed."
                }
            );


        const progressWrapper =
            createElement(
                "div",
                {
                    className:
                        "pdf-progress-wrapper"
                }
            );


        const progress =
            createElement(
                "div",
                {
                    className:
                        "pdf-progress"
                }
            );


        const progressBar =
            createElement(
                "div",
                {
                    className:
                        "pdf-progress-bar"
                }
            );


        const progressText =
            createElement(
                "div",
                {
                    className:
                        "pdf-progress-text",
                    text:
                        "0%"
                }
            );


        progress.appendChild(
            progressBar
        );


        progressWrapper.appendChild(
            progress
        );

        progressWrapper.appendChild(
            progressText
        );


        panel.appendChild(icon);

        panel.appendChild(title);

        panel.appendChild(message);

        panel.appendChild(
            progressWrapper
        );


        return {

            panel,

            title,

            message,

            progressBar,

            progressText

        };

    }


    /* ======================================================
       UPDATE PROGRESS
    ====================================================== */


    function updateProgress(
        component,
        progress,
        message
    ) {

        if (!component) {

            return;

        }


        let value =
            Number(progress);


        if (
            !Number.isFinite(value)
        ) {

            value = 0;

        }


        value =
            Math.max(
                0,
                Math.min(
                    100,
                    value
                )
            );


        if (
            component.progressBar
        ) {

            component.progressBar.style.width =
                `${value}%`;

        }


        if (
            component.progressText
        ) {

            component.progressText.textContent =
                `${Math.round(value)}%`;

        }


        if (
            message !== undefined &&
            component.message
        ) {

            component.message.textContent =
                message;

        }

    }


    /* ======================================================
       RESULT COMPONENT
    ====================================================== */


    function createResultPanel(
        options = {}
    ) {

        const panel =
            createElement(
                "div",
                {
                    className:
                        "pdf-result-component"
                }
            );


        const icon =
            createElement(
                "div",
                {
                    className:
                        "pdf-result-icon",
                    text:
                        icons.success
                }
            );


        const title =
            createElement(
                "h2",
                {
                    className:
                        "pdf-result-title",
                    text:
                        options.title ||
                        "Your PDF is Ready"
                }
            );


        const message =
            createElement(
                "p",
                {
                    className:
                        "pdf-result-message",
                    text:
                        options.message ||
                        "Your PDF has been successfully created."
                }
            );


        const download =
            createActionButton(
                {

                    id:
                        options.downloadId ||
                        "pdfDownloadBtn",

                    text:
                        " Download PDF",

                    icon:
                        icons.download,

                    variant:
                        "primary"

                }
            );


        download.dataset.action =
            "download";


        panel.appendChild(icon);

        panel.appendChild(title);

        panel.appendChild(message);

        panel.appendChild(download);


        return {

            panel,

            title,

            message,

            download

        };

    }


    /* ======================================================
       ERROR COMPONENT
    ====================================================== */


    function createErrorPanel(
        options = {}
    ) {

        const panel =
            createElement(
                "div",
                {
                    className:
                        "pdf-error-component"
                }
            );


        const icon =
            createElement(
                "div",
                {
                    className:
                        "pdf-error-icon",
                    text:
                        icons.error
                }
            );


        const title =
            createElement(
                "h3",
                {
                    className:
                        "pdf-error-title",
                    text:
                        options.title ||
                        "Something went wrong"
                }
            );


        const message =
            createElement(
                "p",
                {
                    className:
                        "pdf-error-message",
                    text:
                        options.message ||
                        "The PDF could not be processed."
                }
            );


        const dismiss =
            createActionButton(
                {

                    text:
                        "Dismiss",

                    variant:
                        "secondary"

                }
            );


        dismiss.dataset.action =
            "dismiss-error";


        panel.appendChild(icon);

        panel.appendChild(title);

        panel.appendChild(message);

        panel.appendChild(dismiss);


        return {

            panel,

            title,

            message,

            dismiss

        };

    }


    /* ======================================================
       PRIVACY NOTE
    ====================================================== */


    function createPrivacyNote(
        options = {}
    ) {

        const section =
            createElement(
                "section",
                {
                    className:
                        "pdf-privacy-component"
                }
            );


        const icon =
            createElement(
                "div",
                {
                    className:
                        "pdf-privacy-icon",
                    text:
                        icons.lock
                }
            );


        const content =
            createElement(
                "div",
                {
                    className:
                        "pdf-privacy-content"
                }
            );


        const title =
            createElement(
                "h3",
                {
                    className:
                        "pdf-privacy-title",
                    text:
                        options.title ||
                        "Your Files Stay Private"
                }
            );


        const message =
            createElement(
                "p",
                {
                    className:
                        "pdf-privacy-message",
                    text:
                        options.message ||
                        "Your files are processed directly in your browser for supported PDF workflows."
                }
            );


        content.appendChild(
            title
        );

        content.appendChild(
            message
        );


        section.appendChild(
            icon
        );

        section.appendChild(
            content
        );


        return section;

    }


    /* ======================================================
       EMPTY STATE
    ====================================================== */


    function createEmptyState(
        options = {}
    ) {

        const state =
            createElement(
                "div",
                {
                    className:
                        "pdf-empty-state"
                }
            );


        const icon =
            createElement(
                "div",
                {
                    className:
                        "pdf-empty-icon",
                    text:
                        options.icon ||
                        icons.upload
                }
            );


        const title =
            createElement(
                "h2",
                {
                    className:
                        "pdf-empty-title",
                    text:
                        options.title ||
                        "Ready to work with your PDF?"
                }
            );


        const message =
            createElement(
                "p",
                {
                    className:
                        "pdf-empty-message",
                    text:
                        options.message ||
                        "Upload a file to get started."
                }
            );


        state.appendChild(icon);

        state.appendChild(title);

        state.appendChild(message);


        return state;

    }


    /* ======================================================
       STATUS COMPONENT
    ====================================================== */


    function createStatus(
        options = {}
    ) {

        const status =
            createElement(
                "div",
                {
                    className:
                        "pdf-status-component"
                }
            );


        const indicator =
            createElement(
                "span",
                {
                    className:
                        "pdf-status-indicator"
                }
            );


        const text =
            createElement(
                "span",
                {
                    className:
                        "pdf-status-text",
                    text:
                        options.text ||
                        "Ready"
                }
            );


        status.appendChild(
            indicator
        );

        status.appendChild(
            text
        );


        return {

            status,

            indicator,

            text

        };

    }


    /* ======================================================
       WORKSPACE SHELL
    ====================================================== */


    function createWorkspace(
        options = {}
    ) {

        const workspace =
            createElement(
                "section",
                {
                    id:
                        options.id ||
                        ToolXonePDFComponents
                            .defaults
                            .workspaceId,
                    className:
                        "pdf-workspace"
                }
            );


        const header =
            createWorkspaceHeader(
                options
            );


        const body =
            createElement(
                "div",
                {
                    className:
                        "pdf-workspace-body"
                }
            );


        const filesColumn =
            createElement(
                "div",
                {
                    className:
                        "pdf-workspace-files"
                }
            );


        const settingsColumn =
            createElement(
                "div",
                {
                    className:
                        "pdf-workspace-settings"
                }
            );


        const fileList =
            createElement(
                "div",
                {
                    id:
                        options.fileListId ||
                        ToolXonePDFComponents
                            .defaults
                            .fileListId,
                    className:
                        "pdf-file-list"
                }
            );


        const settings =
            createSettingsPanel(
                options.settings || {}
            );


        filesColumn.appendChild(
            fileList
        );


        settingsColumn.appendChild(
            settings.panel
        );


        body.appendChild(
            filesColumn
        );

        body.appendChild(
            settingsColumn
        );


        workspace.appendChild(
            header
        );

        workspace.appendChild(
            body
        );


        return {

            workspace,

            header,

            body,

            filesColumn,

            settingsColumn,

            fileList,

            settings

        };

    }


    /* ======================================================
       SHOW / HIDE WORKSPACE
    ====================================================== */


    function showWorkspace(
        workspace
    ) {

        const element =
            getElement(workspace);


        if (!element) {

            return;

        }


        setHidden(
            element,
            false
        );


        element.classList.add(
            "is-active"
        );

    }


    function hideWorkspace(
        workspace
    ) {

        const element =
            getElement(workspace);


        if (!element) {

            return;

        }


        setHidden(
            element,
            true
        );


        element.classList.remove(
            "is-active"
        );

    }


    /* ======================================================
       EMPTY / WORKSPACE TRANSITION
    ====================================================== */


    function showEmptyState(
        uploadArea,
        workspace
    ) {

        const upload =
            getElement(
                uploadArea
            );


        const work =
            getElement(
                workspace
            );


        if (upload) {

            setHidden(
                upload,
                false
            );

            upload.classList.add(
                "is-active"
            );

        }


        if (work) {

            hideWorkspace(
                work
            );

        }

    }


    function showUploadedState(
        uploadArea,
        workspace
    ) {

        const upload =
            getElement(
                uploadArea
            );


        const work =
            getElement(
                workspace
            );


        if (upload) {

            setHidden(
                upload,
                true
            );

            upload.classList.remove(
                "is-active"
            );

        }


        if (work) {

            showWorkspace(
                work
            );

        }

    }


    /* ======================================================
       STATE → UI
    ====================================================== */


    function renderFilesFromState(
        container
    ) {

        if (
            typeof window.getPDFFiles !==
            "function"
        ) {

            return null;

        }


        return renderFileList(
            container,
            window.getPDFFiles()
        );

    }


    function renderSettingsFromState(
        controls
    ) {

        if (
            !controls ||
            typeof window.getPDFSettings !==
            "function"
        ) {

            return;

        }


        const settings =
            window.getPDFSettings();


        if (
            controls.pageSize &&
            controls.pageSize.select
        ) {

            controls.pageSize.select.value =
                settings.pageSize;

        }


        if (
            controls.orientation &&
            controls.orientation.select
        ) {

            controls.orientation.select.value =
                settings.orientation;

        }


        if (
            controls.margin &&
            controls.margin.select
        ) {

            controls.margin.select.value =
                settings.margin;

        }


        if (
            controls.imageFit &&
            controls.imageFit.select
        ) {

            controls.imageFit.select.value =
                settings.imageFit;

        }

    }


    /* ======================================================
       PUBLIC API
    ====================================================== */


    ToolXonePDFComponents.createElement =
        createElement;

    ToolXonePDFComponents.clearElement =
        clearElement;

    ToolXonePDFComponents.getElement =
        getElement;

    ToolXonePDFComponents.setHidden =
        setHidden;

    ToolXonePDFComponents.setText =
        setText;


    ToolXonePDFComponents.createUploadArea =
        createUploadArea;

    ToolXonePDFComponents.setUploadDragState =
        setUploadDragState;


    ToolXonePDFComponents.createFileItem =
        createFileItem;

    ToolXonePDFComponents.renderFileList =
        renderFileList;

    ToolXonePDFComponents.formatFileSize =
        formatFileSize;


    ToolXonePDFComponents.createSettingsPanel =
        createSettingsPanel;

    ToolXonePDFComponents.createSelectControl =
        createSelectControl;


    ToolXonePDFComponents.createActionButton =
        createActionButton;

    ToolXonePDFComponents.createWorkspaceHeader =
        createWorkspaceHeader;


    ToolXonePDFComponents.createProcessingPanel =
        createProcessingPanel;

    ToolXonePDFComponents.updateProgress =
        updateProgress;


    ToolXonePDFComponents.createResultPanel =
        createResultPanel;

    ToolXonePDFComponents.createErrorPanel =
        createErrorPanel;


    ToolXonePDFComponents.createPrivacyNote =
        createPrivacyNote;

    ToolXonePDFComponents.createEmptyState =
        createEmptyState;

    ToolXonePDFComponents.createStatus =
        createStatus;


    ToolXonePDFComponents.createWorkspace =
        createWorkspace;


    ToolXonePDFComponents.showWorkspace =
        showWorkspace;

    ToolXonePDFComponents.hideWorkspace =
        hideWorkspace;

    ToolXonePDFComponents.showEmptyState =
        showEmptyState;

    ToolXonePDFComponents.showUploadedState =
        showUploadedState;


    ToolXonePDFComponents.renderFilesFromState =
        renderFilesFromState;

    ToolXonePDFComponents.renderSettingsFromState =
        renderSettingsFromState;


    /* ======================================================
       GLOBAL ACCESS
    ====================================================== */

    window.ToolXonePDFComponents =
        ToolXonePDFComponents;


})(window);