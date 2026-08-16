/*
==========================================================
TOOLXONE
Smart Tool Cards Generator
Version 3.0.0
==========================================================

RESPONSIBILITY
----------------------------------------------------------
- Render tool cards
- Render category cards
- Render category tool sections
- Render featured/new tool views
- Render homepage recommendations
- Animate statistics counters

ARCHITECTURE
----------------------------------------------------------
ToolXoneToolsRegistry
        ↓
ToolXoneToolIdentity
        ↓
Tool Cards

IMPORTANT
----------------------------------------------------------
This module does NOT own tool definitions.

Canonical tool data comes from:

    window.ToolXoneToolsRegistry

Legacy TOOLXONE configuration is used only for:
- presentation preferences
- featured IDs
- newest IDs
- category presentation

==========================================================
*/


(function (window, document) {

    "use strict";


    /* ======================================================
       MODULE INFORMATION
       ====================================================== */

    const VERSION = "3.0.0";


    /* ======================================================
       CANONICAL REGISTRY ACCESS
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
       IDENTITY ACCESS
       ====================================================== */

    function getIdentity() {

        if (
            window.ToolXoneToolIdentity
        ) {

            return window.ToolXoneToolIdentity;

        }

        return null;

    }


    /* ======================================================
       GET ALL ACTIVE TOOLS
       ====================================================== */

    function getAllTools() {

        const registry =
            getRegistry();


        return registry
            .filter(function (tool) {

                return (
                    tool &&
                    tool.active !== false
                );

            })
            .map(function (tool) {

                return enrichTool(tool);

            });

    }


    /* ======================================================
       CATEGORY PRESENTATION
       ------------------------------------------------------
       Category metadata belongs to the configuration layer.
       Tool records themselves remain canonical registry data.
       ====================================================== */

    function getCategoryMeta(categoryId) {

        if (
            window.TOOLXONE &&
            typeof window.TOOLXONE.getCategories === "function"
        ) {

            const categories =
                window.TOOLXONE.getCategories();


            const category =
                categories.find(function (item) {

                    return (
                        item.id === categoryId
                    );

                });


            if (category) {

                return category;

            }

        }


        return {

            id:
                categoryId || "",

            icon:
                "",

            name:
                categoryId || "Tools"

        };

    }


    /* ======================================================
   ENRICH CANONICAL TOOL
   ------------------------------------------------------
   Converts canonical registry records into the presentation
   shape expected by ToolXone Tool Cards.
   ====================================================== */

function enrichTool(tool) {

    if (!tool) {
        return null;
    }

    const category = getCategoryMeta(
        tool.categoryId,
        tool.category
    );

    return {
        ...tool,

        /*
        --------------------------------------------------
        Canonical identity
        --------------------------------------------------
        */

        id:
            tool.id || "",

        slug:
            tool.slug || tool.id || "",

        type:
            tool.type ||
            tool.category ||
            "tool",

        /*
        --------------------------------------------------
        Presentation identity
        --------------------------------------------------
        */

        icon:
            tool.icon || "🛠️",

        link:
            tool.link ||
            tool.url ||
            "#",

        /*
        --------------------------------------------------
        Category presentation
        --------------------------------------------------
        */

        categoryId:
            tool.categoryId ||
            category.id ||
            "",

        categoryIcon:
            category.icon ||
            "",

        categoryName:
            category.name ||
            tool.category ||
            "Tools"
    };
}


    /* ======================================================
       GET TOOL BY ID
       ====================================================== */

    function getToolById(id) {

        const identity =
            getIdentity();


        if (
            identity &&
            typeof identity.get === "function"
        ) {

            const tool =
                identity.get(id);


            if (tool) {

                return enrichTool(tool);

            }

        }


        const registry =
            getRegistry();


        const tool =
            registry.find(function (item) {

                return (
                    item &&
                    item.id === id
                );

            });


        return tool
            ? enrichTool(tool)
            : null;

    }


    /* ======================================================
       GET TOOL BY ALIAS
       ====================================================== */

    function getToolByAlias(alias) {

        const identity =
            getIdentity();


        if (
            identity &&
            typeof identity.get === "function"
        ) {

            const tool =
                identity.get(alias);


            if (tool) {

                return enrichTool(tool);

            }

        }


        return null;

    }


    /* ======================================================
       GET FEATURED TOOLS
       ====================================================== */

    function getFeaturedTools() {

        if (
            window.TOOLXONE &&
            typeof window.TOOLXONE.getFeaturedTools === "function"
        ) {

            return window.TOOLXONE
                .getFeaturedTools()
                .map(enrichTool);

        }


        return [];

    }


    /* ======================================================
       GET NEWEST TOOLS
       ====================================================== */

    function getNewestTools() {

        if (
            window.TOOLXONE &&
            typeof window.TOOLXONE.getNewestTools === "function"
        ) {

            return window.TOOLXONE
                .getNewestTools()
                .map(enrichTool);

        }


        return [];

    }


    /* ======================================================
       CREATE TOOL CARD
       ====================================================== */

    function createToolCard(
        tool,
        options = {}
    ) {

        if (!tool) {

            return "";

        }


        const badges =
            options.badges || "";


        const extraClass =
            options.extraClass || "";


        const description =
            options.description ||
            `Quick access to ${tool.name.toLowerCase()}.`;


        return `

            <div class="tool-card ${extraClass}">

                <div class="card-badges">

                    ${badges}

                </div>


                <div class="tool-icon">

                    ${tool.icon || ""}

                </div>


                <span class="tool-category">

                    ${tool.categoryIcon || ""}
                    ${tool.categoryName || ""}

                </span>


                <h3>

                    ${tool.name}

                </h3>


                <p>

                    ${description}

                </p>


                <a href="${tool.link || tool.url || "#"}">

                    Open Tool →

                </a>

            </div>

        `;

    }


    /* ======================================================
       INITIALIZE ALL TOOL CARDS
       ====================================================== */

    function initializeToolCards() {

        const container =
            document.getElementById(
                "toolCards"
            );


        if (!container) {

            return;

        }


        const tools =
            getAllTools();


        const featuredIds =
            window.TOOLXONE &&
            Array.isArray(
                window.TOOLXONE.featuredTools
            )
                ? window.TOOLXONE.featuredTools
                : [];


        const newestIds =
            window.TOOLXONE &&
            Array.isArray(
                window.TOOLXONE.newestTools
            )
                ? window.TOOLXONE.newestTools
                : [];


        container.innerHTML =
            tools.map(function (tool) {

                const isFeatured =
                    featuredIds.includes(
                        tool.id
                    );


                const isNew =
                    newestIds.includes(
                        tool.id
                    );


                const badges = `

                    ${
                        isFeatured
                            ? `
                                <span class="badge featured-badge">
                                    ⭐ Featured
                                </span>
                              `
                            : ""
                    }

                    ${
                        isNew
                            ? `
                                <span class="badge new-badge">
                                    🆕 New
                                </span>
                              `
                            : ""
                    }

                `;


                return createToolCard(
                    tool,
                    {

                        badges,

                        extraClass:
                            tool.id ===
                            "scientific-calculator"
                                ? "hero-featured-card"
                                : ""

                    }
                );

            }).join("");

    }


    /* ======================================================
       INITIALIZE NEW TOOLS
       ====================================================== */

    function initializeNewTools() {

        const container =
            document.getElementById(
                "newTools"
            );


        if (!container) {

            return;

        }


        const newTools =
            getNewestTools();


        container.innerHTML =
            newTools.map(function (tool) {

                return createToolCard(

                    tool,

                    {

                        badges: `

                            <span class="badge new-badge">

                                🆕 New

                            </span>

                        `,

                        description:
                            "Recently added to ToolXone."

                    }

                );

            }).join("");

    }


    /* ======================================================
       INITIALIZE RECOMMENDED TOOLS
       ====================================================== */

    function initializeRecommendedTools() {

        const container =
            document.getElementById(
                "recommendedTools"
            );


        if (!container) {

            return;

        }


        const newestIds =
            window.TOOLXONE &&
            Array.isArray(
                window.TOOLXONE.newestTools
            )
                ? window.TOOLXONE.newestTools
                : [];


        const featuredIds =
            window.TOOLXONE &&
            Array.isArray(
                window.TOOLXONE.featuredTools
            )
                ? window.TOOLXONE.featuredTools
                : [];


        const recommended =
            getAllTools()

                .filter(function (tool) {

                    return (

                        !newestIds.includes(
                            tool.id
                        )

                        &&

                        !featuredIds.includes(
                            tool.id
                        )

                    );

                })

                .slice(
                    0,
                    4
                );


        container.innerHTML =
            recommended.map(function (tool) {

                return createToolCard(

                    tool,

                    {

                        description:
                            "You may also find this useful."

                    }

                );

            }).join("");

    }


    /* ======================================================
       INITIALIZE CATEGORY CARDS
       ====================================================== */

    function initializeCategoryCards() {

        const container =
            document.getElementById(
                "categoryCards"
            );


        if (!container) {

            return;

        }


        const categories =
            window.TOOLXONE &&
            typeof window.TOOLXONE.getCategories === "function"

                ? window.TOOLXONE.getCategories()

                : [];


        container.innerHTML =
            categories.map(function (category) {

                return `

                    <div
                        class="category-card"
                        onclick="scrollToCategory('${category.id}')"
                    >

                        <div class="cat-icon">

                            ${category.icon}

                        </div>


                        <h3>

                            ${category.name}

                        </h3>


                        <p>

                            ${category.tools.length}
                            Tools

                        </p>

                    </div>

                `;

            }).join("");

    }


    /* ======================================================
       ANIMATED STATISTICS COUNTERS
       ====================================================== */

    function initializeCounters() {

        const counters =
            document.querySelectorAll(
                ".counter"
            );


        if (!counters.length) {

            return;

        }


        let started =
            false;


        function startCounters() {

            const statsSection =
                document.getElementById(
                    "stats-section"
                );


            if (
                !statsSection ||
                started
            ) {

                return;

            }


            const sectionTop =
                statsSection
                    .getBoundingClientRect()
                    .top;


            const screenPosition =
                window.innerHeight - 100;


            if (
                sectionTop <
                screenPosition
            ) {

                started =
                    true;


                counters.forEach(
                    function (counter) {

                        const target =
                            +counter.getAttribute(
                                "data-target"
                            );


                        let current =
                            0;


                        const speed =
                            40;


                        const increment =
                            Math.ceil(
                                target /
                                speed
                            );


                        const updateCounter =
                            function () {

                                current +=
                                    increment;


                                if (
                                    current >=
                                    target
                                ) {

                                    counter.textContent =
                                        target;

                                }

                                else {

                                    counter.textContent =
                                        current;


                                    requestAnimationFrame(
                                        updateCounter
                                    );

                                }

                            };


                        updateCounter();

                    }
                );

            }

        }


        window.addEventListener(
            "scroll",
            startCounters
        );


        setTimeout(
            startCounters,
            300
        );

    }


    /* ======================================================
       SCROLL TO CATEGORY
       ====================================================== */

    function scrollToCategory(
        categoryId
    ) {

        const target =
            document.getElementById(
                categoryId
            );


        if (target) {

            target.scrollIntoView({

                behavior:
                    "smooth",

                block:
                    "start"

            });

        }

    }


    /* ======================================================
       INITIALIZE CATEGORY TOOL SECTIONS
       ====================================================== */

    function initializeCategoryToolSections() {

        const container =
            document.getElementById(
                "category-tool-sections"
            );


        if (!container) {

            return;

        }


        const categories =
            window.TOOLXONE &&
            typeof window.TOOLXONE.getCategories === "function"

                ? window.TOOLXONE.getCategories()

                : [];


        container.innerHTML =
            categories.map(function (category) {

                const tools =
                    category.tools || [];


                return `

                    <section
                        id="${category.id}"
                        class="category-tool-section"
                    >

                        <section
                            class="featured-header"
                        >

                            <div
                                class="featured-badge-title"
                            >

                                ${category.icon}
                                ${category.name.toUpperCase()}

                            </div>


                            <h2>

                                ${category.name}

                            </h2>


                            <p>

                                Explore all
                                ${category.name.toLowerCase()}
                                available on ToolXone.

                            </p>

                        </section>


                        <div
                            class="category-tools-grid"
                        >

                            ${

                                tools.map(
                                    function (tool) {

                                        return createToolCard(
                                            enrichTool(
                                                tool
                                            )
                                        );

                                    }
                                ).join("")

                            }

                        </div>

                    </section>

                `;

            }).join("");

    }


    /* ======================================================
       PUBLIC API
       ====================================================== */

    const ToolXoneToolCards = {

        name:
            "ToolXone Smart Tool Cards",

        version:
            VERSION,

        getAllTools,

        getToolById,

        getToolByAlias,

        getFeaturedTools,

        getNewestTools,

        createToolCard,

        initializeToolCards,

        initializeNewTools,

        initializeRecommendedTools,

        initializeCategoryCards,

        initializeCounters,

        scrollToCategory,

        initializeCategoryToolSections

    };


    /* ======================================================
       GLOBAL API
       ====================================================== */

    window.ToolXoneToolCards =
        ToolXoneToolCards;


    /*
       Backward compatibility.

       Existing HTML / scripts may already call these
       functions directly.
    */

    window.getAllTools =
        getAllTools;

    window.getToolById =
        getToolById;

    window.createToolCard =
        createToolCard;

    window.initializeToolCards =
        initializeToolCards;

    window.initializeNewTools =
        initializeNewTools;

    window.initializeRecommendedTools =
        initializeRecommendedTools;

    window.initializeCategoryCards =
        initializeCategoryCards;

    window.initializeCounters =
        initializeCounters;

    window.scrollToCategory =
        scrollToCategory;

    window.initializeCategoryToolSections =
        initializeCategoryToolSections;


    /* ======================================================
       INITIALIZATION MESSAGE
       ====================================================== */

    console.info(
        "ToolXone Tool Cards v"
        + VERSION
        + " initialized."
    );


})(window, document);