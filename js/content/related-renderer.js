/*
 * ToolXone Related Renderer
 * Global related-tools card renderer
 */

(function () {

    "use strict";

    /*=========================================================*
     * Constants
     *=========================================================*/

    const RENDERER_NAME = "ToolXone Related Renderer";
    const RENDERER_VERSION = "1.1.0";


    /*=========================================================*
     * Configuration
     *=========================================================*/

    const configuration = {

        autoInitialize: true,

        animate: true,

        sanitize: true,

        debug: false

    };


    /*=========================================================*
     * State
     *=========================================================*/

    const state = {

        initialized: false,

        rendered: 0,

        failed: 0,

        lastUpdated: null

    };


    /*=========================================================*
     * Statistics
     *=========================================================*/

    const statistics = {

        renderedCards: 0,

        renderOperations: 0

    };


    /*=========================================================*
     * Logger
     *=========================================================*/

    function log(...message) {

        if (configuration.debug) {

            console.log(

                `[${RENDERER_NAME}]`,

                ...message

            );

        }

    }


    /*=========================================================*
     * HTML Sanitizer
     *=========================================================*/

    function sanitize(text) {

        if (!configuration.sanitize) {

            return String(text ?? "");

        }

        return String(text ?? "")

            .replace(/&/g, "&amp;")

            .replace(/</g, "&lt;")

            .replace(/>/g, "&gt;")

            .replace(/"/g, "&quot;")

            .replace(/'/g, "&#039;");

    }


    /*=========================================================*
     * URL Sanitizer
     *=========================================================*/

    function sanitizeURL(url) {

        const value = String(url || "#").trim();

        if (

            value.startsWith("javascript:")

            ||

            value.startsWith("data:")

        ) {

            return "#";

        }

        return value;

    }


    /*=========================================================*
     * Create Related Card
     *=========================================================*/

    function createCard(item) {

        if (!item || typeof item !== "object") {

            return "";

        }

        const icon = sanitize(

            item.icon || "🧮"

        );

        const title = sanitize(

            item.title || ""

        );

        const description = sanitize(

            item.description || ""

        );

        const category = sanitize(

            item.category || "ToolXone Tools"

        );

        const url = sanitizeURL(

            item.url || "#"

        );


        return `

            <article class="toolxone-related-card">

                <div class="toolxone-related-category">

                    ${category}

                </div>

                <div class="toolxone-related-icon">

                    ${icon}

                </div>

                <h3 class="toolxone-related-card-title">

                    ${title}

                </h3>

                <p class="toolxone-related-card-description">

                    ${description}

                </p>

                <a

                    href="${url}"

                    class="toolxone-related-link"

                >

                    Open Tool →

                </a>

            </article>

        `;

    }


    /*=========================================================*
     * Render One Card
     *=========================================================*/

    function render(item) {

        try {

            const html = createCard(item);

            if (!html) {

                state.failed++;

                return "";

            }

            state.rendered++;

            statistics.renderedCards++;

            statistics.renderOperations++;

            return html;

        }

        catch (error) {

            state.failed++;

            console.error(

                `[${RENDERER_NAME}] Card render failed:`,

                error

            );

            return "";

        }

    }


    /*=========================================================*
     * Render Multiple Cards
     *=========================================================*/

    function renderAll(items) {

        if (!Array.isArray(items)) {

            return "";

        }

        return items

            .map(function (item) {

                return render(item);

            })

            .join("");

    }


    /*=========================================================*
 * Render Into Container
 *=========================================================*/

function renderInto(container, related) {

    if (typeof container === "string") {

        container = document.querySelector(container);

    }

    if (!container) {

        state.failed++;

        return false;

    }


    const items = Array.isArray(related)

        ? related

        : related?.items;


    if (!Array.isArray(items)) {

        state.failed++;

        return false;

    }


    /*
     * The parent page owns the Related Tools heading.
     *
     * This renderer is responsible ONLY for
     * rendering the dynamic related-tool cards.
     */

    container.innerHTML = `

        <div class="toolxone-related-grid">

            ${renderAll(items)}

        </div>

    `;


    if (configuration.animate) {

        container.classList.add(

            "toolxone-fade-in"

        );

    }


    log(

        "Rendered",

        items.length,

        "related cards"

    );


    return true;

}


    /*=========================================================*
     * Refresh
     *=========================================================*/

    function refresh() {

        state.rendered = 0;

        state.failed = 0;

        statistics.renderedCards = 0;

        statistics.renderOperations = 0;

        state.lastUpdated = Date.now();

    }


    /*=========================================================*
     * Initialize
     *=========================================================*/

    async function initialize() {

        if (state.initialized) {

            return;

        }

        state.initialized = true;

        state.lastUpdated = Date.now();

        log("Initialized");

    }


    /*=========================================================*
     * Information
     *=========================================================*/

    function info() {

        return {

            name: RENDERER_NAME,

            version: RENDERER_VERSION,

            configuration,

            state,

            statistics

        };

    }


    /*=========================================================*
     * Report
     *=========================================================*/

    function report() {

        console.group(

            RENDERER_NAME

        );

        console.log(

            "Version:",

            RENDERER_VERSION

        );

        console.log(

            "Rendered Cards:",

            statistics.renderedCards

        );

        console.log(

            "Render Operations:",

            statistics.renderOperations

        );

        console.log(

            "Failed:",

            state.failed

        );

        console.groupEnd();

    }


    /*=========================================================*
     * Public API
     *=========================================================*/

    window.ToolXoneRelatedRenderer = {

        name: RENDERER_NAME,

        version: RENDERER_VERSION,

        configuration,

        state,

        statistics,

        initialize,

        render,

        renderAll,

        renderInto,

        refresh,

        report,

        info

    };


    /*=========================================================*
     * Auto Initialize
     *=========================================================*/

    if (configuration.autoInitialize) {

        initialize();

    }


    console.info(

        RENDERER_NAME +

        " v" +

        RENDERER_VERSION +

        " initialized"

    );

})();