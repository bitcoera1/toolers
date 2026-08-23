/*
==========================================================
TOOLXONE PDF TOOLS HUB
Version 1.1.0
==========================================================

RESPONSIBILITY
----------------------------------------------------------
- PDF ecosystem hub orchestration
- PDF category navigation
- Featured PDF tool rendering
- PDF category rendering
- PDF tool lookup
- PDF tool navigation
- Search/filter support
- Empty-section protection

IMPORTANT
----------------------------------------------------------
This module does NOT own PDF tool definitions.

Canonical sources:

    ToolXonePDFCategory
        ↓
    PDF ecosystem structure

    ToolXoneToolsRegistry
        ↓
    Canonical tool definitions

    ToolXoneToolCards
        ↓
    Canonical ToolXone card presentation

This module only connects those systems to
pdf-tools.html.

==========================================================
*/

(function (window, document) {

    "use strict";


    /* ======================================================
       CONSTANTS
    ====================================================== */

    const VERSION = "1.1.0";

    const PDF_CATEGORY_ID = "pdf";


    /* ======================================================
       CONFIGURATION ACCESS
    ====================================================== */

    function getConfig() {

        return (
            window.ToolXonePDFCategory ||
            null
        );

    }


    /* ======================================================
       REGISTRY ACCESS
    ====================================================== */

    function getRegistry() {

        if (
            Array.isArray(
                window.ToolXoneToolsRegistry
            )
        ) {

            return window.ToolXoneToolsRegistry;

        }

        return [];

    }


    /* ======================================================
       TOOL CARD SYSTEM
    ====================================================== */

    function getToolCards() {

        if (
            window.ToolXoneToolCards &&
            typeof
            window.ToolXoneToolCards.createToolCard ===
            "function"
        ) {

            return window.ToolXoneToolCards;

        }

        return null;

    }


    /* ======================================================
       CANONICAL TOOL LOOKUP
    ====================================================== */

    function getTool(id) {

        if (!id) {
            return null;
        }


        /*
         * Prefer the canonical ToolXone card resolver.
         *
         * This gives us the enriched presentation object
         * used throughout the rest of ToolXone.
         */

        const cards =
            getToolCards();

        if (
            cards &&
            typeof cards.getToolById ===
            "function"
        ) {

            const tool =
                cards.getToolById(id);

            if (tool) {
                return tool;
            }

        }


        /*
         * Registry fallback.
         */

        return (
            getRegistry().find(
                function (tool) {

                    return (
                        tool &&
                        tool.id === id
                    );

                }
            ) || null
        );

    }


    /* ======================================================
       PDF TOOL TEST
    ====================================================== */

    function isPDFTool(tool) {

        if (!tool) {
            return false;
        }

        return (
            tool.categoryId === PDF_CATEGORY_ID ||
            tool.category === PDF_CATEGORY_ID
        );

    }


    /* ======================================================
       GET ALL PDF TOOLS
    ====================================================== */

    function getPDFTools() {

        return getRegistry().filter(
            function (tool) {

                return (
                    isPDFTool(tool) &&
                    tool.active === true
                );

            }
        );

    }


    /* ======================================================
       GET PDF CATEGORIES
    ====================================================== */

    function getCategories() {

        const config =
            getConfig();

        if (
            !config ||
            !Array.isArray(
                config.subcategories
            )
        ) {

            return [];

        }


        return [
            ...config.subcategories
        ].sort(
            function (a, b) {

                return (
                    Number(a.order || 0) -
                    Number(b.order || 0)
                );

            }
        );

    }


    /* ======================================================
       GET CATEGORY
    ====================================================== */

    function getCategory(id) {

        if (!id) {
            return null;
        }


        return (
            getCategories().find(
                function (category) {

                    return (
                        category &&
                        category.id === id
                    );

                }
            ) || null
        );

    }


    /* ======================================================
       GET TOOLS BY CATEGORY
    ====================================================== */

    function getToolsByCategory(
        categoryId
    ) {

        const category =
            getCategory(categoryId);

        if (!category) {
            return [];
        }


        const toolIds =
            Array.isArray(category.tools)
                ? category.tools
                : [];


        return toolIds
            .map(
                function (id) {

                    return getTool(id);

                }
            )
            .filter(
                function (tool) {

                    return (
                        tool &&
                        tool.active !== false
                    );

                }
            );

    }


    /* ======================================================
       GET FEATURED PDF TOOLS
    ====================================================== */

    function getPopularTools() {

        const config =
            getConfig();

        if (
            !config ||
            !Array.isArray(
                config.featuredTools
            )
        ) {

            return [];

        }


        return config.featuredTools
            .map(
                function (id) {

                    return getTool(id);

                }
            )
            .filter(
                function (tool) {

                    return (
                        tool &&
                        tool.active !== false
                    );

                }
            );

    }


    /* ======================================================
       CREATE CANONICAL TOOL CARD
    ====================================================== */

    function createToolCard(tool) {

        if (!tool) {
            return "";
        }


        const cards =
            getToolCards();


        if (
            cards &&
            typeof cards.createToolCard ===
            "function"
        ) {

            return cards.createToolCard(
                tool
            );

        }


        /*
         * Very small defensive fallback.
         *
         * This is NOT a second card architecture.
         * It only prevents a total rendering failure
         * if tool-cards.js is unavailable.
         */

        const title =
            tool.name ||
            "PDF Tool";

        const description =
            tool.description ||
            `Quick access to ${title}.`;

        const url =
            tool.url ||
            "#";

        const icon =
            tool.icon ||
            "📄";


        return `
            <div class="tool-card">
                <div class="tool-icon">
                    ${icon}
                </div>

                <h3>
                    ${title}
                </h3>

                <p>
                    ${description}
                </p>

                <a href="${url}">
                    Open Tool →
                </a>
            </div>
        `;

    }


    /* ======================================================
       RENDER TOOLS
    ====================================================== */

    function renderTools(
        container,
        tools
    ) {

        if (!container) {
            return 0;
        }


        container.innerHTML = "";


        if (
            !Array.isArray(tools) ||
            tools.length === 0
        ) {

            return 0;

        }


        const html =
            tools
                .map(
                    function (tool) {

                        return createToolCard(
                            tool
                        );

                    }
                )
                .filter(Boolean)
                .join("");


        container.innerHTML =
            html;


        return container.children.length;

    }


    /* ======================================================
       SET SECTION VISIBILITY
    ====================================================== */

    function setSectionVisibility(
        section,
        visible
    ) {

        if (!section) {
            return;
        }


        section.hidden =
            !visible;


        section.setAttribute(
            "aria-hidden",
            String(!visible)
        );

    }


    /* ======================================================
       RENDER CATEGORY HEADING
    ====================================================== */

    function renderCategoryHeading(
        category
    ) {

        if (!category) {
            return "";
        }


        return `
            <span class="pdf-section-label">
                ${category.icon || "📄"}
                ${category.name || "PDF Tools"}
            </span>

            <h2>
                ${category.name || "PDF Tools"}
            </h2>

            <p>
                ${
                    category.description ||
                    "Explore practical PDF tools from ToolXone."
                }
            </p>
        `;

    }


    /* ======================================================
       RENDER CATEGORY
    ====================================================== */

    function renderCategory(
        container,
        categoryId
    ) {

        if (!container) {
            return 0;
        }


        const tools =
            getToolsByCategory(
                categoryId
            );


        return renderTools(
            container,
            tools
        );

    }


    /* ======================================================
       INITIALIZE CATEGORY SECTIONS
    ====================================================== */

    function initializeCategorySections() {

        const categories =
            getCategories();


        categories.forEach(
            function (category) {

                const section =
                    document.getElementById(
                        `pdf-${category.id}`
                    );


                if (!section) {
                    return;
                }


                const heading =
                    document.getElementById(
                        `pdf-${category.id}-heading`
                    );


                const container =
                    document.getElementById(
                        `pdf-${category.id}-tools`
                    );


                if (heading) {

                    heading.innerHTML =
                        renderCategoryHeading(
                            category
                        );

                }


                const count =
                    renderCategory(
                        container,
                        category.id
                    );


                /*
                 * Critical quality rule:
                 *
                 * A section with zero valid tools
                 * must not remain visible as an empty
                 * rectangle.
                 */

                setSectionVisibility(
                    section,
                    count > 0
                );

            }
        );

    }


    /* ======================================================
       INITIALIZE FEATURED TOOLS
    ====================================================== */

    function initializeFeaturedTools() {

        const section =
            document.getElementById(
                "pdf-featured"
            );


        const container =
            document.getElementById(
                "pdfFeaturedTools"
            );


        if (!section || !container) {
            return;
        }


        const tools =
            getPopularTools();


        const count =
            renderTools(
                container,
                tools
            );


        setSectionVisibility(
            section,
            count > 0
        );

    }


    /* ======================================================
       CREATE CATEGORY NAVIGATION ITEM
    ====================================================== */

    function createCategoryNavigationItem(
        category
    ) {

        if (!category) {
            return "";
        }


        const targetId =
            `pdf-${category.id}`;


        return `
            <a
                href="#${targetId}"
                class="pdf-category-nav-item"
                data-pdf-category="${category.id}"
            >

                <span
                    class="pdf-category-nav-icon"
                    aria-hidden="true"
                >
                    ${category.icon || "📄"}
                </span>

                <span
                    class="pdf-category-nav-content"
                >

                    <strong>
                        ${category.name || "PDF Tools"}
                    </strong>

                    <small>
                        ${
                            category.description ||
                            "Explore PDF tools."
                        }
                    </small>

                </span>

            </a>
        `;

    }


    /* ======================================================
       INITIALIZE CATEGORY NAVIGATION
    ====================================================== */

    function initializeCategoryNavigation() {

        const container =
            document.getElementById(
                "pdfCategoryNav"
            );


        if (!container) {
            return;
        }


        const categories =
            getCategories();


        if (
            !Array.isArray(categories) ||
            categories.length === 0
        ) {

            container.innerHTML = "";

            return;

        }


        container.innerHTML =
            categories
                .map(
                    createCategoryNavigationItem
                )
                .filter(Boolean)
                .join("");


        /*
         * Smooth navigation without taking control
         * away from normal anchor behavior.
         */

        container
            .querySelectorAll(
                "[data-pdf-category]"
            )
            .forEach(
                function (link) {

                    link.addEventListener(
                        "click",
                        function () {

                            const id =
                                link.getAttribute(
                                    "data-pdf-category"
                                );


                            const section =
                                document.getElementById(
                                    `pdf-${id}`
                                );


                            if (section) {

                                section.scrollIntoView({
                                    behavior:
                                        "smooth",
                                    block:
                                        "start"
                                });

                            }

                        }
                    );

                }
            );

    }


    /* ======================================================
       SEARCH PDF TOOLS
    ====================================================== */

    function searchTools(query) {

        const tools =
            getPDFTools();


        const normalized =
            String(query || "")
                .trim()
                .toLowerCase();


        if (!normalized) {
            return tools;
        }


        return tools.filter(
            function (tool) {

                const name =
                    String(
                        tool.name || ""
                    ).toLowerCase();


                const description =
                    String(
                        tool.description || ""
                    ).toLowerCase();


                const keywords =
                    Array.isArray(
                        tool.keywords
                    )
                        ? tool.keywords
                            .join(" ")
                            .toLowerCase()
                        : "";


                return (
                    name.includes(normalized) ||
                    description.includes(normalized) ||
                    keywords.includes(normalized)
                );

            }
        );

    }


    /* ======================================================
       OPEN TOOL
    ====================================================== */

    function openTool(id) {

        const tool =
            getTool(id);


        if (
            tool &&
            tool.url
        ) {

            window.location.href =
                tool.url;

        }

    }


    /* ======================================================
       INITIALIZE PDF HUB
    ====================================================== */

    function init() {

        /*
         * Prevent accidental duplicate initialization.
         */

        if (
            document.documentElement.dataset
                .toolxonePdfInitialized === "true"
        ) {

            return;

        }


        document.documentElement.dataset
            .toolxonePdfInitialized = "true";


        initializeCategoryNavigation();

        initializeFeaturedTools();

        initializeCategorySections();


        console.info(
            "ToolXone PDF Tools Hub initialized.",
            {
                version:
                    VERSION,

                categories:
                    getCategories().length,

                featuredTools:
                    getPopularTools().length,

                pdfTools:
                    getPDFTools().length
            }
        );

    }


    /* ======================================================
       PUBLIC API
    ====================================================== */

    const PDFTools = {

        name:
            "ToolXone PDF Tools Hub",

        version:
            VERSION,

        init,

        getTool,

        getPDFTools,

        getCategories,

        getCategory,

        getToolsByCategory,

        getPopularTools,

        createToolCard,

        renderTools,

        renderCategory,

        searchTools,

        openTool

    };


    /* ======================================================
       GLOBAL EXPOSURE
    ====================================================== */

    window.ToolXonePDFTools =
        PDFTools;


    /* ======================================================
       DIAGNOSTICS
    ====================================================== */

    console.info(
        `ToolXone PDF Tools Hub v${VERSION} initialized.`
    );


})(window, document);