/*!
 * ==========================================================
 * ToolXone Tool Identity Resolver
 * Unified Tool Identity System
 * Version: 2.0.0
 * ==========================================================
 *
 * RESPONSIBILITY:
 *
 * - Resolve tool identity
 * - Resolve aliases
 * - Resolve slugs
 * - Resolve URLs
 * - Return canonical tool IDs
 * - Return canonical tool records
 *
 * IMPORTANT:
 *
 * This module DOES NOT maintain its own tool database.
 *
 * The single source of truth is:
 *
 *     ToolXoneToolsRegistry
 *
 * This resolver consumes the canonical registry and provides
 * a stable identity API for the rest of ToolXone.
 *
 * ==========================================================
 */

(function (window) {

    "use strict";


    /* ========================================================
       Constants
       ======================================================== */

    const NAME =
        "ToolXone Tool Identity Resolver";

    const VERSION =
        "2.0.0";


    /* ========================================================
       Registry Access
       ======================================================== */

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


    /* ========================================================
       Normalize Input
       ======================================================== */

    function normalize(value) {

        if (
            value === null ||
            value === undefined
        ) {

            return "";

        }

        return String(value)
            .trim()
            .toLowerCase();

    }


    /* ========================================================
       Get Tool By Canonical ID
       ======================================================== */

    function getById(id) {

        const registry =
            getRegistry();

        const normalized =
            normalize(id);

        if (!normalized) {

            return null;

        }

        return registry.find(function (tool) {

            return (
                tool &&
                normalize(tool.id) === normalized
            );

        }) || null;

    }


    /* ========================================================
       Get Tool By Slug
       ======================================================== */

    function getBySlug(slug) {

        const registry =
            getRegistry();

        const normalized =
            normalize(slug);

        if (!normalized) {

            return null;

        }

        return registry.find(function (tool) {

            return (
                tool &&
                tool.slug &&
                normalize(tool.slug) === normalized
            );

        }) || null;

    }


    /* ========================================================
       Get Tool By URL
       ======================================================== */

    function getByUrl(url) {

        const registry =
            getRegistry();

        const normalized =
            normalize(url);

        if (!normalized) {

            return null;

        }

        return registry.find(function (tool) {

            return (
                tool &&
                tool.url &&
                normalize(tool.url) === normalized
            );

        }) || null;

    }


    /* ========================================================
       Get Tool By Alias
       ======================================================== */

    function getByAlias(alias) {

        const registry =
            getRegistry();

        const normalized =
            normalize(alias);

        if (!normalized) {

            return null;

        }

        return registry.find(function (tool) {

            if (!tool) {

                return false;

            }


            /* -----------------------------------------------
               Canonical ID
               ----------------------------------------------- */

            if (
                tool.id &&
                normalize(tool.id) === normalized
            ) {

                return true;

            }


            /* -----------------------------------------------
               Slug
               ----------------------------------------------- */

            if (
                tool.slug &&
                normalize(tool.slug) === normalized
            ) {

                return true;

            }


            /* -----------------------------------------------
               URL
               ----------------------------------------------- */

            if (
                tool.url &&
                normalize(tool.url) === normalized
            ) {

                return true;

            }


            /* -----------------------------------------------
               Aliases
               ----------------------------------------------- */

            if (
                Array.isArray(tool.aliases)
            ) {

                return tool.aliases.some(
                    function (item) {

                        return (
                            normalize(item) ===
                            normalized
                        );

                    }
                );

            }

            return false;

        }) || null;

    }


    /* ========================================================
       Resolve
       ======================================================== */

    function resolve(value) {

        const normalized =
            normalize(value);

        if (!normalized) {

            return null;

        }


        /*
         * Canonical ID
         */

        const byId =
            getById(normalized);

        if (byId) {

            return byId.id;

        }


        /*
         * Slug
         */

        const bySlug =
            getBySlug(normalized);

        if (bySlug) {

            return bySlug.id;

        }


        /*
         * URL
         */

        const byUrl =
            getByUrl(normalized);

        if (byUrl) {

            return byUrl.id;

        }


        /*
         * Alias
         */

        const byAlias =
            getByAlias(normalized);

        if (byAlias) {

            return byAlias.id;

        }


        return null;

    }


    /* ========================================================
       Get Tool
       ======================================================== */

    function get(value) {

        const id =
            resolve(value);

        if (!id) {

            return null;

        }

        return getById(id);

    }


    /* ========================================================
       Exists
       ======================================================== */

    function exists(value) {

        return resolve(value) !== null;

    }


    /* ========================================================
       Get Canonical ID
       ======================================================== */

    function getId(value) {

        return resolve(value);

    }


    /* ========================================================
       Get Canonical Name
       ======================================================== */

    function getName(value) {

        const tool =
            get(value);

        return tool
            ? tool.name
            : null;

    }


    /* ========================================================
       Get URL
       ======================================================== */

    function getUrl(value) {

        const tool =
            get(value);

        return tool
            ? tool.url
            : null;

    }


    /* ========================================================
       Get Slug
       ======================================================== */

    function getSlug(value) {

        const tool =
            get(value);

        return tool
            ? tool.slug
            : null;

    }


    /* ========================================================
       Get Icon
       ======================================================== */

    function getIcon(value) {

        const tool =
            get(value);

        return tool
            ? tool.icon
            : null;

    }


    /* ========================================================
       Get Category
       ======================================================== */

    function getCategory(value) {

        const tool =
            get(value);

        return tool
            ? tool.category
            : null;

    }


    /* ========================================================
       Get Category ID
       ======================================================== */

    function getCategoryId(value) {

        const tool =
            get(value);

        return tool
            ? tool.categoryId
            : null;

    }


    /* ========================================================
       Get Statistics Category
       ======================================================== */

    function getStatisticsCategory(value) {

        const tool =
            get(value);

        return tool
            ? tool.statisticsCategory
            : null;

    }


    /* ========================================================
       Get Aliases
       ======================================================== */

    function getAliases(value) {

        const tool =
            get(value);

        if (
            !tool ||
            !Array.isArray(tool.aliases)
        ) {

            return [];

        }

        return [
            ...tool.aliases
        ];

    }


    /* ========================================================
       Get Related Tool IDs
       ======================================================== */

    function getRelatedIds(value) {

        const tool =
            get(value);

        if (
            !tool ||
            !Array.isArray(tool.related)
        ) {

            return [];

        }

        return [
            ...tool.related
        ];

    }


    /* ========================================================
       Get Related Tool Objects
       ======================================================== */

    function getRelated(value) {

        const registry =
            getRegistry();

        const relatedIds =
            getRelatedIds(value);

        if (!relatedIds.length) {

            return [];

        }

        return relatedIds
            .map(function (id) {

                return registry.find(
                    function (tool) {

                        return (
                            tool &&
                            tool.id === id
                        );

                    }
                );

            })
            .filter(Boolean);

    }


    /* ========================================================
       Get Active Tools
       ======================================================== */

    function getActive() {

        return getRegistry()
            .filter(function (tool) {

                return (
                    tool &&
                    tool.active === true
                );

            });

    }


    /* ========================================================
       List Canonical IDs
       ======================================================== */

    function list() {

        return getRegistry()
            .map(function (tool) {

                return tool.id;

            });

    }


    /* ========================================================
       Count
       ======================================================== */

    function count() {

        return getRegistry().length;

    }


    /* ========================================================
       Registry Availability
       ======================================================== */

    function isRegistryAvailable() {

        return Array.isArray(
            window.ToolXoneToolsRegistry
        );

    }


    /* ========================================================
       Information
       ======================================================== */

    function info() {

        const registry =
            getRegistry();

        return {

            name: NAME,

            version: VERSION,

            registryAvailable:
                isRegistryAvailable(),

            totalTools:
                registry.length

        };

    }


    /* ========================================================
       Public API
       ======================================================== */

    window.ToolXoneToolIdentity = {

        name:
            NAME,

        version:
            VERSION,

        resolve:
            resolve,

        get:
            get,

        getById:
            getById,

        getBySlug:
            getBySlug,

        getByUrl:
            getByUrl,

        getByAlias:
            getByAlias,

        exists:
            exists,

        getId:
            getId,

        getName:
            getName,

        getUrl:
            getUrl,

        getSlug:
            getSlug,

        getIcon:
            getIcon,

        getCategory:
            getCategory,

        getCategoryId:
            getCategoryId,

        getStatisticsCategory:
            getStatisticsCategory,

        getAliases:
            getAliases,

        getRelatedIds:
            getRelatedIds,

        getRelated:
            getRelated,

        getActive:
            getActive,

        list:
            list,

        count:
            count,

        isRegistryAvailable:
            isRegistryAvailable,

        info:
            info

    };


    /* ========================================================
       Initialization
       ======================================================== */

    if (
        isRegistryAvailable()
    ) {

        console.info(
            NAME +
            " v" +
            VERSION +
            " initialized."
        );

        console.info(
            "Canonical registry detected:",
            getRegistry().length,
            "tools."
        );

    }

    else {

        console.warn(
            NAME +
            " v" +
            VERSION +
            " initialized, " +
            "but ToolXoneToolsRegistry was not found."
        );

    }


})(window);