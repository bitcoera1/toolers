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
    const normalized = value.toLowerCase();

    if (
        normalized.startsWith("javascript:") ||
        normalized.startsWith("data:")
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


/*=========================================================
 * Resolve Related Tool
 *---------------------------------------------------------
 * Resolves related items through the centralized ToolXone
 * tool registry whenever possible.
 *=========================================================*/

function resolveRelatedItem(item) {

    if (!item) {
        return null;
    }

    let tool = null;

    /*
     * -----------------------------------------------------
     * 1. Resolve by Tool ID
     * -----------------------------------------------------
     */

    if (typeof item === "string") {

        if (typeof getToolById === "function") {

            tool = getToolById(item);

        }

    }

    /*
     * -----------------------------------------------------
     * 2. Resolve object by ID
     * -----------------------------------------------------
     */

    else if (
        typeof item === "object" &&
        item.id
    ) {

        if (typeof getToolById === "function") {

            tool = getToolById(item.id);

        }

    }

    /*
     * -----------------------------------------------------
     * 3. Resolve object by URL
     * -----------------------------------------------------
     */

    if (
        !tool &&
        typeof item === "object" &&
        item.url
    ) {

        const targetURL =
            String(item.url)
                .split("/")
                .pop();

        if (typeof getAllTools === "function") {

            tool = getAllTools().find(function(candidate) {

                return (
                    candidate.link === targetURL ||
                    candidate.url === targetURL
                );

            });

        }

    }

    /*
     * -----------------------------------------------------
     * 4. If centralized tool data exists, use it.
     * -----------------------------------------------------
     */

    if (tool) {

        return {

            id:
                tool.id,

            icon:
                tool.icon ||
                item.icon ||
                "🧮",

            title:
                tool.name ||
                item.title ||
                "",

            description:
                item.description ||
                tool.description ||
                `Quick access to ${
                    String(
                        tool.name || "this tool"
                    ).toLowerCase()
                }.`,

            category:
                tool.categoryName ||
                item.category ||
                "ToolXone Tools",

            url:
                tool.link ||
                tool.url ||
                item.url ||
                "#"

        };

    }

    /*
     * -----------------------------------------------------
     * 5. Fallback for legacy related objects
     * -----------------------------------------------------
     */

    if (
        typeof item === "object" &&
        item.title &&
        item.url
    ) {

        return {

            id:
                item.id || "",

            icon:
                item.icon || "🧮",

            title:
                item.title,

            description:
                item.description || "",

            category:
                item.category ||
                "ToolXone Tools",

            url:
                item.url

        };

    }

    return null;

}

/*=========================================================
 * Resolve Current Tool ID
 *---------------------------------------------------------
 * Converts page-level tool identifiers/slugs into the
 * canonical ToolXone tool ID used by the central registry.
 *=========================================================*/

function resolveCurrentToolId(value) {

    if (!value) {
        return "";
    }

    const raw = String(value).trim();

    if (!raw) {
        return "";
    }

    /*
     * 1. Direct canonical ToolXone ID
     */
    if (typeof getToolById === "function") {

        const direct = getToolById(raw);

        if (direct && direct.id) {
            return direct.id;
        }

    }

    /*
     * 2. Resolve through the complete ToolXone registry
     */
    if (typeof getAllTools === "function") {

        const normalized = raw
            .toLowerCase()
            .replace(/\.html$/i, "");

        const tools = getAllTools();

        const match = tools.find(function(tool) {

            if (!tool) {
                return false;
            }

            const toolId =
                String(tool.id || "").toLowerCase();

            const toolLink =
                String(tool.link || tool.url || "")
                    .split("/")
                    .pop()
                    .replace(/\.html$/i, "")
                    .toLowerCase();

            return (
                toolId === normalized ||
                toolLink === normalized
            );

        });

        if (match && match.id) {
            return match.id;
        }

    }

    /*
     * 3. Return original value if no canonical match exists
     */
    return raw;
}


/*=========================================================
 * Build Four Related Tools
 *---------------------------------------------------------
 * Ensures every ToolXone page displays exactly four
 * related tools.
 *=========================================================*/

function buildRelatedItems(items, currentToolId) {

    const resolved = [];

    /*
     * -----------------------------------------------------
     * Resolve page-specific related tools
     * -----------------------------------------------------
     */

    if (Array.isArray(items)) {

        items.forEach(function(item) {

            const tool =
                resolveRelatedItem(item);

            if (!tool) {
                return;
            }

            if (
                currentToolId &&
                tool.id === currentToolId
            ) {
                return;
            }

            if (
                resolved.some(
                    existing =>
                        existing.id &&
                        existing.id === tool.id
                )
            ) {
                return;
            }

            resolved.push(tool);

        });

    }

    /*
     * -----------------------------------------------------
     * Fill remaining slots from the central ToolXone
     * registry.
     * -----------------------------------------------------
     */

    if (resolved.length < 4) {

        if (typeof getAllTools === "function") {

            const allTools =
                getAllTools();

            for (const candidate of allTools) {

                if (resolved.length >= 4) {
                    break;
                }

                if (
                    !candidate ||
                    !candidate.id
                ) {
                    continue;
                }

                if (
                    currentToolId &&
                    candidate.id === currentToolId
                ) {
                    continue;
                }

                if (
                    resolved.some(
                        existing =>
                            existing.id === candidate.id
                    )
                ) {
                    continue;
                }

                const normalized =
                    resolveRelatedItem(
                        candidate.id
                    );

                if (normalized) {

                    resolved.push(
                        normalized
                    );

                }

            }

        }

    }

    return resolved.slice(0, 4);

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

            const resolved = resolveRelatedItem(item);

            if (!resolved) {

                state.failed++;

                return "";

            }

            return render(resolved);

        })

        .join("");

}


/*=========================================================
 * Render Into Container
 *---------------------------------------------------------
 * The renderer owns the complete Related Tools section:
 *
 *     Label
 *     Heading
 *     Subtitle
 *     Four related cards
 *=========================================================*/

function renderInto(container, related, currentToolId) {

    if (typeof container === "string") {

        container =
            document.querySelector(container);

    }

    if (!container) {

        state.failed++;

        return false;

    }

    let items = [];

    if (Array.isArray(related)) {

        items = related;

    }

    else if (
        related &&
        Array.isArray(related.items)
    ) {

        items = related.items;

    }

    else if (
        related &&
        Array.isArray(related.tools)
    ) {

        items = related.tools;

    }

    const rawCurrentToolId =
    currentToolId ||
    document.body.dataset.tool ||
    "";

    const resolvedCurrentToolId =
    resolveCurrentToolId(rawCurrentToolId);

    const finalItems =
    buildRelatedItems(
        items,
        resolvedCurrentToolId
    );

    if (!finalItems.length) {

        state.failed++;

        return false;

    }

    /*
     * -----------------------------------------------------
     * Shared Related Tools section
     * -----------------------------------------------------
     */

    container.innerHTML = `

        <div class="toolxone-related-header">

            <div class="toolxone-related-label">
                💡 RELATED TOOLS
            </div>

            <h2 class="toolxone-related-title">
                Related Tools
            </h2>

            <p class="toolxone-related-subtitle">
                Explore more useful ToolXone calculators, converters and productivity tools.
            </p>

        </div>

        <div class="toolxone-related-grid">

            ${renderAll(finalItems)}

        </div>

    `;

    if (configuration.animate) {

        container.classList.add(
            "toolxone-fade-in"
        );

    }

    log(
        "Rendered",
        finalItems.length,
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