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
 * Resolves related tools through the canonical ToolXone
 * identity system and the central ToolXone tools registry.
 *
 * Resolution priority:
 *
 * 1. Already-normalized related object
 * 2. ToolXoneToolIdentity
 * 3. ToolXoneToolsRegistry
 * 4. Legacy getToolById()
 * 5. Legacy getAllTools()
 * 6. Legacy object fallback
 *=========================================================*/

function resolveRelatedItem(item) {

    if (!item) {
        return null;
    }

    /* =====================================================
     * 1. Extract supplied identity / presentation data
     * ===================================================== */

    let requestedId = "";
    let suppliedUrl = "";
    let suppliedTitle = "";
    let suppliedDescription = "";
    let suppliedIcon = "";
    let suppliedCategory = "";

    if (typeof item === "string") {

        requestedId = item.trim();

    }
    else if (typeof item === "object") {

        requestedId =
            String(
                item.id ||
                item.slug ||
                item.name ||
                item.title ||
                ""
            ).trim();

        suppliedUrl =
            String(
                item.url ||
                item.link ||
                ""
            ).trim();

        suppliedTitle =
            item.title ||
            item.name ||
            "";

        suppliedDescription =
            item.description ||
            "";

        suppliedIcon =
            item.icon ||
            "";

        suppliedCategory =
            item.categoryName ||
            item.category ||
            "";

    }

    /*
     * If the supplied object already contains a complete
     * normalized tool record, preserve its useful values.
     */

    if (
        typeof item === "object" &&
        item.id &&
        (item.name || item.title) &&
        (item.link || item.url)
    ) {

        suppliedTitle =
            suppliedTitle ||
            item.name ||
            item.title ||
            "";

        suppliedDescription =
            suppliedDescription ||
            item.description ||
            "";

        suppliedIcon =
            suppliedIcon ||
            item.icon ||
            "";

        suppliedCategory =
            suppliedCategory ||
            item.categoryName ||
            item.category ||
            "";

    }


    /* =====================================================
     * 2. Canonical identity resolution
     * ===================================================== */

    let canonicalId = requestedId;

    if (
        window.ToolXoneToolIdentity &&
        typeof window.ToolXoneToolIdentity.getId === "function"
    ) {

        const resolvedId =
            window.ToolXoneToolIdentity.getId(
                canonicalId ||
                suppliedUrl ||
                suppliedTitle
            );

        if (resolvedId) {
            canonicalId = resolvedId;
        }

    }


    /* =====================================================
     * 3. IMPORTANT:
     *    Resolve through ToolXoneToolCards first.
     *
     *    tool-cards.js owns enrichTool(), which converts
     *    canonical registry records into the presentation
     *    shape required by cards.
     * ===================================================== */

    let tool = null;

    if (
        window.ToolXoneToolCards &&
        typeof window.ToolXoneToolCards.getToolById === "function" &&
        canonicalId
    ) {

        tool =
            window.ToolXoneToolCards.getToolById(
                canonicalId
            );

    }


    /* =====================================================
     * 4. Alias resolution through ToolXoneToolCards
     * ===================================================== */

    if (
        !tool &&
        window.ToolXoneToolCards &&
        typeof window.ToolXoneToolCards.getToolByAlias === "function" &&
        canonicalId
    ) {

        tool =
            window.ToolXoneToolCards.getToolByAlias(
                canonicalId
            );

    }


    /* =====================================================
     * 5. Global backward-compatible getToolById()
     * ===================================================== */

    if (
        !tool &&
        typeof getToolById === "function" &&
        canonicalId
    ) {

        tool =
            getToolById(
                canonicalId
            );

    }


    /* =====================================================
     * 6. Direct canonical registry fallback
     *
     *    This is deliberately AFTER ToolXoneToolCards so
     *    enriched presentation data gets priority.
     * ===================================================== */

    if (
        !tool &&
        Array.isArray(window.ToolXoneToolsRegistry)
    ) {

        const registry =
            window.ToolXoneToolsRegistry;

        tool =
            registry.find(function (candidate) {

                if (!candidate) {
                    return false;
                }

                const candidates = [

                    candidate.id,
                    candidate.slug,
                    candidate.name,
                    candidate.title,
                    candidate.url,
                    candidate.link,

                    ...(Array.isArray(candidate.aliases)
                        ? candidate.aliases
                        : [])

                ];

                return candidates.some(function (candidateValue) {

                    if (!candidateValue) {
                        return false;
                    }

                    return (
                        String(candidateValue)
                            .toLowerCase()
                            .replace(/\.html$/i, "")
                            .replace(/\/$/, "") ===
                        String(canonicalId || "")
                            .toLowerCase()
                            .replace(/\.html$/i, "")
                            .replace(/\/$/, "")
                    );

                });

            }) || null;

    }


    /* =====================================================
     * 7. Legacy getAllTools() fallback
     * ===================================================== */

    if (
        !tool &&
        typeof getAllTools === "function"
    ) {

        const tools =
            getAllTools();

        if (Array.isArray(tools)) {

            tool =
                tools.find(function (candidate) {

                    if (!candidate) {
                        return false;
                    }

                    const candidates = [

                        candidate.id,
                        candidate.slug,
                        candidate.name,
                        candidate.title,
                        candidate.url,
                        candidate.link,

                        ...(Array.isArray(candidate.aliases)
                            ? candidate.aliases
                            : [])

                    ];

                    return candidates.some(function (candidateValue) {

                        if (!candidateValue) {
                            return false;
                        }

                        return (
                            String(candidateValue)
                                .toLowerCase()
                                .replace(/\.html$/i, "")
                                .replace(/\/$/, "") ===
                            String(canonicalId || "")
                                .toLowerCase()
                                .replace(/\.html$/i, "")
                                .replace(/\/$/, "")
                        );

                    });

                }) || null;

        }

    }


    /* =====================================================
     * 8. If no canonical tool was found, stop.
     * ===================================================== */

    if (!tool) {
        return null;
    }


    /* =====================================================
     * 9. Canonical ID
     * ===================================================== */

    const finalId =
        tool.id ||
        canonicalId ||
        requestedId;

    if (!finalId) {
        return null;
    }


    /* =====================================================
     * 10. Category normalization
     * ===================================================== */

    const categoryId =
        String(
            tool.categoryId ||
            tool.category ||
            ""
        )
            .trim()
            .toLowerCase();

    const categoryMap = {

        calculators:
            "Calculators",

        calculator:
            "Calculators",

        finance:
            "Finance Tools",

        health:
            "Health Tools",

        converters:
            "Converters",

        converter:
            "Converters",

        utilities:
            "Utilities",

        utility:
            "Utilities",

        future:
            "Coming Soon"

    };

    const category =
        tool.categoryName ||
        categoryMap[categoryId] ||
        suppliedCategory ||
        "ToolXone Tools";


    /* =====================================================
     * 11. Final normalized related-tool object
     *
     *     IMPORTANT:
     *     Prefer enriched ToolXoneToolCards data.
     * ===================================================== */

    const finalTitle =
        tool.name ||
        tool.title ||
        suppliedTitle ||
        "";

    if (!finalTitle) {
        return null;
    }

    const finalUrl =
        tool.link ||
        tool.url ||
        suppliedUrl ||
        "#";

    const finalIcon =
        tool.icon ||
        suppliedIcon ||
        "🧮";

    const finalDescription =
        tool.description ||
        suppliedDescription ||
        `Quick access to ${finalTitle.toLowerCase()}.`;


    return {

        id:
            finalId,

        icon:
            finalIcon,

        title:
            finalTitle,

        description:
            finalDescription,

        category:
            category,

        url:
            finalUrl

    };

}


/*=========================================================
 * Resolve Current Tool ID
 *---------------------------------------------------------
 * Converts page-level tool identifiers, aliases and URLs
 * into the canonical ToolXone tool ID.
 *=========================================================*/

function resolveCurrentToolId(value) {

    if (!value) {
        return "";
    }

    /*
     * =====================================================
     * 0. Safely extract an identity from an object
     * =====================================================
     */

    if (typeof value === "object") {

        value =
            value.id ||
            value.slug ||
            value.url ||
            value.link ||
            value.name ||
            "";
    }

    const raw = String(value).trim();

    if (!raw) {
        return "";
    }

    /*
     * =====================================================
     * 1. CANONICAL TOOL IDENTITY RESOLVER
     * =====================================================
     */

    if (
        window.ToolXoneToolIdentity &&
        typeof window.ToolXoneToolIdentity.getId === "function"
    ) {

        const resolved =
            window.ToolXoneToolIdentity.getId(raw);

        if (resolved) {
            return resolved;
        }
    }

    /*
     * =====================================================
     * 2. CANONICAL TOOLS REGISTRY
     *
     * This is important because some pages may not load
     * tool-identity.js directly.
     * =====================================================
     */

    if (
        window.ToolXoneToolsRegistry
    ) {

        const registry =
            window.ToolXoneToolsRegistry;

        /*
         * Prefer registry alias resolver
         */

        if (
            typeof registry.getByAlias === "function"
        ) {

            const aliasMatch =
                registry.getByAlias(raw);

            if (
                aliasMatch &&
                aliasMatch.id
            ) {
                return aliasMatch.id;
            }
        }

        /*
         * Try canonical ID lookup
         */

        if (
            typeof registry.get === "function"
        ) {

            const directMatch =
                registry.get(raw);

            if (
                directMatch &&
                directMatch.id
            ) {
                return directMatch.id;
            }
        }

        /*
         * Final registry array fallback
         */

        const registryTools =
            Array.isArray(registry)
                ? registry
                : [];

        const normalized =
            raw
                .toLowerCase()
                .replace(/\.html$/i, "");

        const registryMatch =
            registryTools.find(function(tool) {

                if (!tool) {
                    return false;
                }

                const candidates = [

                    tool.id,

                    tool.slug,

                    tool.name,

                    tool.url,

                    tool.link,

                    ...(Array.isArray(tool.aliases)
                        ? tool.aliases
                        : [])

                ];

                return candidates.some(function(candidate) {

                    if (!candidate) {
                        return false;
                    }

                    return String(candidate)
                        .toLowerCase()
                        .replace(/\.html$/i, "") === normalized;

                });

            });

        if (
            registryMatch &&
            registryMatch.id
        ) {
            return registryMatch.id;
        }
    }

    /*
     * =====================================================
     * 3. TOOL CARDS FALLBACK
     * =====================================================
     */

    if (
        typeof getAllTools === "function"
    ) {

        const tools =
            getAllTools();

        if (Array.isArray(tools)) {

            const normalized =
                raw
                    .toLowerCase()
                    .replace(/\.html$/i, "");

            const match =
                tools.find(function(tool) {

                    if (!tool) {
                        return false;
                    }

                    const candidates = [

                        tool.id,

                        tool.slug,

                        tool.name,

                        tool.url,

                        tool.link,

                        ...(Array.isArray(tool.aliases)
                            ? tool.aliases
                            : [])

                    ];

                    return candidates.some(function(candidate) {

                        if (!candidate) {
                            return false;
                        }

                        return String(candidate)
                            .toLowerCase()
                            .replace(/\.html$/i, "") === normalized;

                    });

                });

            if (
                match &&
                match.id
            ) {
                return match.id;
            }
        }
    }

    /*
     * =====================================================
     * 4. Legacy direct lookup
     * =====================================================
     */

    if (
        typeof getToolById === "function"
    ) {

        const tool =
            getToolById(raw);

        if (
            tool &&
            tool.id
        ) {
            return tool.id;
        }
    }

    /*
     * =====================================================
     * 5. Last resort
     * =====================================================
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
 * ---------------------------------------------------------
 * Fill remaining slots from canonical ToolXone registry
 * ---------------------------------------------------------
 */

if (resolved.length < 4) {

    const registry =
        Array.isArray(window.ToolXoneToolsRegistry)
            ? window.ToolXoneToolsRegistry
            : [];

    for (const candidate of registry) {

        if (resolved.length >= 4) {
            break;
        }

        if (
            !candidate ||
            !candidate.id ||
            candidate.active === false
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
    window.location.pathname
        .split("/")
        .pop() ||
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