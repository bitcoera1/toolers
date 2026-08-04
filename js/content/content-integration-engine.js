/*!
 * ToolXone Content Integration Engine
 * -----------------------------------
 * Mission 7.1
 * Version: 1.0.0
 *
 * Connects all Content Platform modules together.
 */

(function (window, document) {
    'use strict';

    const ContentIntegrationEngine = {

        version: '1.0.0',

        configuration: {

            autoInitialize: true,

            autoDetectPage: true,

            autoRender: true,

            validateBeforeRender: true,

            animate: true,

            debug: false

        },

        state: {

            initialized: false,

            healthy: true,

            lastUpdated: Date.now(),

            currentTool: null,

            rendering: false

        },

        statistics: {

            initializedModules: 0,

            renderedSections: 0,

            failedModules: 0

        },

        modules: {

            registry: null,

            metadataLoader: null,

            schemaLoader: null,

            glossaryLoader: null,

            articleRenderer: null,

            faqRenderer: null,

            relatedRenderer: null,

            metadataRenderer: null,

            schemaRenderer: null

        },

        initialize() {

            if (this.state.initialized) {
                return;
            }

            this.connectModules();

            this.detectCurrentPage();

            this.state.initialized = true;

            this.state.lastUpdated = Date.now();

        },

                connectModules() {

            const moduleMap = {

                registry: "ToolXoneContentRegistry",

                metadataLoader: "ToolXoneMetadataLoader",

                schemaLoader: "ToolXoneSchemaLoader",

                glossaryLoader: "ToolXoneGlossaryLoader",

                articleRenderer: "ToolXoneArticleRenderer",

                faqRenderer: "ToolXoneFAQRenderer",

                relatedRenderer: "ToolXoneRelatedRenderer",

                metadataRenderer: "ToolXoneMetadataRenderer",

                schemaRenderer: "ToolXoneSchemaRenderer"

            };

            this.statistics.initializedModules = 0;

            this.statistics.failedModules = 0;

            Object.entries(moduleMap).forEach(([key, globalName]) => {

                if (window[globalName]) {

                    this.modules[key] = window[globalName];

                    this.statistics.initializedModules++;

                } else {

                    console.warn(
                        `[ToolXone] Missing module: ${globalName}`
                    );

                    this.statistics.failedModules++;

                }

            });

        },

        detectCurrentPage() {

            const fileName = window.location.pathname
                .split("/")
                .pop()
                .replace(".html", "");

            this.state.currentTool = fileName;

            return fileName;

        },

        getCurrentTool() {

            return this.state.currentTool;

        },

                renderCurrentPage() {

    if (!this.modules.registry) {

        console.warn("[ToolXone] Registry not available.");

        return false;

    }

    const tool = this.getCurrentTool();

    const article = this.modules.registry.get(
        "articles",
        tool
    );

    const faq = this.modules.registry.get(
        "faq",
        tool
    );

    
    const metadata = this.modules.registry.get(
        "metadata",
        tool
    );

    const related = this.modules.registry.get(
        "related",
        tool
    );

    const schema = this.modules.registry.get(
        "schema",
        tool
    );

this.state.rendering = true;

this.statistics.renderedSections = 0;

/*=========================================================
Article
=========================================================*/

if (

    article &&

    this.modules.articleRenderer

){

    this.modules.articleRenderer.renderArticle(

        "#financeInfo",

        article

    );

    this.statistics.renderedSections++;

}

/*=========================================================
FAQ
=========================================================*/

if (

    faq &&

    this.modules.faqRenderer

){

    this.modules.faqRenderer.renderInto(

        "#financeFAQ",

        faq

    );

    this.statistics.renderedSections++;

}

/*=========================================================
Metadata
=========================================================*/

if (

    metadata &&

    this.modules.metadataRenderer

){

    this.modules.metadataRenderer.render(

        metadata

    );

    this.statistics.renderedSections++;

}

/*=========================================================
Related
=========================================================*/

if (

    related &&

    this.modules.relatedRenderer

){

    this.modules.relatedRenderer.renderInto(

        "#relatedTools",

        related

    );

    this.statistics.renderedSections++;

}

/*=========================================================
Schema
=========================================================*/

if (

    schema &&

    this.modules.schemaRenderer

){

    this.modules.schemaRenderer.render(

        schema

    );

    this.statistics.renderedSections++;

        }

        this.state.rendering = false;

        return true;
          },
        start() {

            this.initialize();

            if (this.configuration.autoRender) {

                this.renderCurrentPage();

            }

        },

                info() {

            return {

                name: "ToolXone Content Integration Engine",

                version: this.version,

                configuration: this.configuration,

                state: this.state,

                statistics: this.statistics

            };

        },

        report() {

            console.group("🧠 ToolXone Content Integration Engine");

            console.groupEnd();

        }

    };

    window.ToolXoneContentIntegrationEngine = ContentIntegrationEngine;

    if (ContentIntegrationEngine.configuration.autoInitialize) {

        window.addEventListener("DOMContentLoaded", () => {

            ContentIntegrationEngine.start();

        });

    }

})(window, document);