/*
==========================================================
 ToolXone Metadata Loader
 Dynamic Metadata Loading Platform
 Version: 2.0.0
==========================================================
*/

(function(){

"use strict";

/*=========================================================
 Constants
=========================================================*/

const LOADER_NAME = "ToolXone Metadata Loader";

const LOADER_VERSION = "2.0.0";

/*=========================================================
 Configuration
=========================================================*/

const configuration = {

    autoInitialize : true,

    cacheMetadata : true,

    validateMetadata : true,

    autoApply : false,

    debug : false

};

/*=========================================================
 State
=========================================================*/

const state = {

    initialized : false,

    loading : false,

    loaded : 0,

    failed : 0,

    cached : 0,

    applied : 0,

    lastUpdated : null

};

/*=========================================================
 Cache
=========================================================*/

const cache = new Map();

/*=========================================================
 Statistics
=========================================================*/

const statistics = {

    totalMetadata : 0,

    successfulLoads : 0,

    failedLoads : 0,

    cacheHits : 0,

    cacheMisses : 0,

    appliedMetadata : 0

};

/*=========================================================
 Logger
=========================================================*/

function log(...message){

    if(configuration.debug){

        console.log(

            "[Metadata Loader]",

            ...message

        );

    }

}

/*=========================================================
 Discovery
=========================================================*/

function discover(){

    return ToolXoneContentRegistry.list(

        "metadata"

    );

}

/*=========================================================
 Fetch Metadata
=========================================================*/

async function fetchMetadata(path){

    log(

        "Loading:",

        path

    );

    const response = await fetch(

        path

    );

    if(!response.ok){

        throw new Error(

            "Unable to load metadata: " +

            path

        );

    }

    return await response.json();

}

/*=========================================================
 Validation
=========================================================*/

function validate(metadata){

    if(

        typeof metadata !== "object" ||

        metadata === null

    ){

        return false;

    }

    return (

        "title" in metadata &&

        "description" in metadata

    );

}

/*=========================================================
 Cache Manager
=========================================================*/

function saveCache(id,metadata){

    cache.set(

        id,

        metadata

    );

    state.cached++;

}

function getCache(id){

    return cache.get(id) || null;

}

function clearCache(){

    cache.clear();

    state.cached = 0;

}

/*=========================================================
 Load Metadata
=========================================================*/

async function load(id){

    if(configuration.cacheMetadata){

        const cached = getCache(id);

        if(cached){

            statistics.cacheHits++;

            return cached;

        }

    }

    statistics.cacheMisses++;

    const metadata =

        ToolXoneContentRegistry.get(

            "metadata",

            id

        );

    if(!metadata){

        return null;

    }

    const data =

        await fetchMetadata(

            metadata.path

        );

    if(

        configuration.validateMetadata &&

        !validate(data)

    ){

        throw new Error(

            "Invalid metadata: " +

            id

        );

    }

    saveCache(

        id,

        data

    );

    state.loaded++;

    statistics.successfulLoads++;

    statistics.totalMetadata =

        cache.size;

    return data;

}

/*=========================================================
 Load All Metadata
=========================================================*/

async function loadAll(){

    const ids = discover();

    if(ids.length === 0){

        return;

    }

    for(const id of ids){

        try{

            await load(id);

        }

        catch(error){

            state.failed++;

            statistics.failedLoads++;

            console.error(error);

        }

    }

}

/*=========================================================
 Apply Metadata
=========================================================*/

function apply(id){

    const metadata = getCache(id);

    if(!metadata){

        return false;

    }

    if(metadata.title){

        document.title = metadata.title;

    }

    applyMeta(

        "description",

        metadata.description

    );

    applyMeta(

        "keywords",

        metadata.keywords

    );

    applyMeta(

        "author",

        metadata.author

    );

    applyMeta(

        "robots",

        metadata.robots

    );

    applyMeta(

        "theme-color",

        metadata.themeColor

    );

    applyCanonical(

        metadata.canonical

    );

    applyOpenGraph(

        metadata

    );

    applyTwitter(

        metadata

    );

    state.applied++;

    statistics.appliedMetadata++;

    return true;

}

/*=========================================================
 Meta Helpers
=========================================================*/

function applyMeta(name,content){

    if(!content){

        return;

    }

    let tag = document.querySelector(

        'meta[name="' + name + '"]'

    );

    if(!tag){

        tag = document.createElement(

            "meta"

        );

        tag.setAttribute(

            "name",

            name

        );

        document.head.appendChild(

            tag

        );

    }

    if(Array.isArray(content)){

        content = content.join(", ");

    }

    tag.setAttribute(

        "content",

        content

    );

}

function applyCanonical(url){

    if(!url){

        return;

    }

    let link = document.querySelector(

        'link[rel="canonical"]'

    );

    if(!link){

        link = document.createElement(

            "link"

        );

        link.rel = "canonical";

        document.head.appendChild(

            link

        );

    }

    link.href = url;

}

/*=========================================================
 Open Graph
=========================================================*/

function applyOpenGraph(metadata){

    const fields = {

        "og:title" : metadata.ogTitle,

        "og:description" : metadata.ogDescription,

        "og:image" : metadata.ogImage,

        "og:url" : metadata.ogUrl,

        "og:type" : metadata.ogType

    };

    for(const property in fields){

        if(!fields[property]){

            continue;

        }

        let tag = document.querySelector(

            'meta[property="' +

            property +

            '"]'

        );

        if(!tag){

            tag = document.createElement(

                "meta"

            );

            tag.setAttribute(

                "property",

                property

            );

            document.head.appendChild(

                tag

            );

        }

        tag.content = fields[property];

    }

}

/*=========================================================
 Twitter Cards
=========================================================*/

function applyTwitter(metadata){

    const fields = {

        "twitter:card" : metadata.twitterCard,

        "twitter:title" : metadata.twitterTitle,

        "twitter:description" : metadata.twitterDescription,

        "twitter:image" : metadata.twitterImage

    };

    for(const name in fields){

        if(!fields[name]){

            continue;

        }

        let tag = document.querySelector(

            'meta[name="' +

            name +

            '"]'

        );

        if(!tag){

            tag = document.createElement(

                "meta"

            );

            tag.setAttribute(

                "name",

                name

            );

            document.head.appendChild(

                tag

            );

        }

        tag.content = fields[name];

    }

}

/*=========================================================
 Refresh
=========================================================*/

async function refresh(){

    state.loaded = 0;

    state.failed = 0;

    state.cached = 0;

    state.applied = 0;

    clearCache();

    statistics.totalMetadata = 0;

    statistics.successfulLoads = 0;

    statistics.failedLoads = 0;

    statistics.cacheHits = 0;

    statistics.cacheMisses = 0;

    statistics.appliedMetadata = 0;

    await loadAll();

}

/*=========================================================
 Initialize
=========================================================*/

async function initialize(){

    if(state.initialized){

        return;

    }

    state.loading = true;

    await loadAll();

    state.loading = false;

    state.initialized = true;

    state.lastUpdated = Date.now();

}

/*=========================================================
 Information
=========================================================*/

function info(){

    return {

        name : LOADER_NAME,

        version : LOADER_VERSION,

        configuration,

        state,

        statistics

    };

}

/*=========================================================
 Report
=========================================================*/

function report(){

    console.group(

        LOADER_NAME

    );

    console.log(

        "Version:",

        LOADER_VERSION

    );

    console.log(

        "Initialized:",

        state.initialized

    );

    console.log(

        "Loaded:",

        state.loaded

    );

    console.log(

        "Failed:",

        state.failed

    );

    console.log(

        "Cached:",

        cache.size

    );

    console.log(

        "Applied:",

        state.applied

    );

    console.log(

        "Cache Hits:",

        statistics.cacheHits

    );

    console.log(

        "Cache Misses:",

        statistics.cacheMisses

    );

    console.groupEnd();

}

/*=========================================================
 Public API
=========================================================*/

window.ToolXoneMetadataLoader = {

    name : LOADER_NAME,

    version : LOADER_VERSION,

    configuration,

    state,

    statistics,

    initialize,

    refresh,

    discover,

    load,

    loadAll,

    apply,

    validate,

    report,

    info,

    getCache,

    clearCache

};

/*=========================================================
 Auto Initialize
=========================================================*/

if(configuration.autoInitialize){

    initialize();

}

console.info(

    LOADER_NAME +

    " v" +

    LOADER_VERSION +

    " initialized"

);

})();