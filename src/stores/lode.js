import {defineStore} from 'pinia';
import jsonld from 'jsonld';

globalThis.jsonld = jsonld;

// Module-level state reference for documentLoader (set after store creation)
let _storeInstance = null;

function trimUrl(url) {
    if (!url) {
        return undefined;
    }
    if (url === "" || url["@value"] && url["@value"] === "") {
        return undefined;
    }
    let trimmed = url;
    if (trimmed["@value"] && typeof trimmed["@value"] === "string" && trimmed["@value"].endsWith("/")) {
        trimmed["@value"] = trimmed["@value"].slice(0, trimmed["@value"].length - 1);
    }
    if (trimmed["@value"] && typeof trimmed["@value"] === "string" && trimmed["@value"].startsWith("/")) {
        trimmed["@value"] = trimmed["@value"].slice(1);
    }
    if (trimmed && typeof trimmed === "string" && trimmed.endsWith("/")) {
        trimmed = trimmed.slice(0, trimmed.length - 1);
    }
    if (trimmed && typeof trimmed === "string" && trimmed.startsWith("/")) {
        trimmed = trimmed.slice(1);
    }
    return trimmed;
}

export const useLodeStore = defineStore('lode', {
    state: () => ({
        schemata: {},
        isSavingProperty: false,
        isSavingThing: false,
        isAddingProperty: false,
        addingProperty: '',
        addingValues: [],
        addingRange: [],
        addingChecked: [],
        removeAddingValueAtIndex: null,
        schemataLookup: {},
        rawSchemata: {},
        schemaFallback: {},
        objectModel: {},
        competencySearchModalOpen: false,
        copyOrLink: false,
        numPropertyComponentsVisible: {},
        searchType: null,
        includeRelations: true
    }),
    getters: {
    },
    actions: {
        // Initialize the document loader - call this after store is created
        initDocumentLoader() {
            _storeInstance = this;
            // In-flight request deduplication map
            const _inflight = {};
            // Negative cache: URLs whose schema/context could not be fetched
            // (e.g. schema.cassproject.org/0.4/reference, which does not exist).
            // Some frameworks reference these on every object; without this we
            // would re-fetch and 404 once per object. We try the network once,
            // then suppress by resolving to an empty context thereafter.
            const _failed = {};
            const EMPTY_DOCUMENT = {"@context": {}};
            jsonld.documentLoader = async function(url) {
                if (url in _storeInstance.rawSchemata) {
                    return {
                        contextUrl: null,
                        document: _storeInstance.rawSchemata[url],
                        documentUrl: url
                    };
                }
                // Already known to be unfetchable: return an empty context and
                // do not hit the network again.
                if (_failed[url]) {
                    return {
                        contextUrl: null,
                        document: EMPTY_DOCUMENT,
                        documentUrl: url
                    };
                }
                // Deduplicate concurrent requests for the same URL
                let originalUrl = url;
                if (_inflight[originalUrl]) {
                    let context = await _inflight[originalUrl];
                    return {
                        contextUrl: null,
                        document: context,
                        documentUrl: originalUrl
                    };
                }
                let fetchUrl = url;
                let index = fetchUrl.indexOf('schema.cassproject.org');
                let ending = "";
                if (fetchUrl.substring(fetchUrl.lastIndexOf('/')).indexOf('2') === -1) {
                    ending = "/index.json-ld";
                }
                if (index !== -1) {
                    fetchUrl = fetchUrl.substring(index);
                    fetchUrl = window.location.origin + window.location.pathname + fetchUrl + ending;
                }
                _inflight[originalUrl] = fetch(fetchUrl, {
                    headers: {"Accept": "application/json"}
                }).then(async(resp) => {
                    if (!resp.ok) throw new Error("Failed to fetch " + fetchUrl);
                    let context = await resp.json();
                    _storeInstance.rawSchemata[originalUrl] = context;
                    delete _inflight[originalUrl];
                    return context;
                }).catch((err) => {
                    delete _inflight[originalUrl];
                    throw err;
                });
                try {
                    let context = await _inflight[originalUrl];
                    return {
                        contextUrl: null,
                        document: context,
                        documentUrl: originalUrl
                    };
                } catch (err) {
                    // Record the miss so subsequent loads are suppressed, and
                    // degrade gracefully to an empty context so expand/compact
                    // can still complete instead of failing on this object.
                    // Logged once per URL (the negative cache prevents repeats).
                    _failed[originalUrl] = true;
                    console.warn("jsonld documentLoader: unable to load " + originalUrl + ", suppressing further attempts.", err);
                    return {
                        contextUrl: null,
                        document: EMPTY_DOCUMENT,
                        documentUrl: originalUrl
                    };
                }
            };
        },
        // --- Mutations converted to actions ---
        setIsSavingProperty(value) {
            this.isSavingProperty = value;
        },
        setIsSavingThing(value) {
            this.isSavingThing = value;
        },
        setIsAddingProperty(value) {
            this.isAddingProperty = value;
        },
        setAddingProperty(value) {
            this.addingProperty = value;
        },
        setAddingValues(values) {
            let newValues = [];
            if (Array.isArray(values)) {
                values.forEach((value) => {
                    if (value) {
                        let newValue = trimUrl(value);
                        if (newValue) newValues.push(newValue);
                    }
                });
            } else {
                if (values) {
                    let newValue = trimUrl(values);
                    if (newValue) newValues.push(newValue);
                }
            }
            this.addingValues = newValues;
        },
        addToAddingValues(value) {
            let newValue = trimUrl(value);
            if (!this.addingValues) {
                this.addingValues = [];
            }
            if (newValue) {
                this.addingValues.push(newValue);
            }
        },
        setAddingRange(value) {
            this.addingRange = value;
        },
        setAddingChecked(value) {
            this.addingChecked = value;
        },
        setRemoveAddingValueAtIndex(value) {
            this.removeAddingValueAtIndex = value;
        },
        setSchemata(schema) {
            this.schemata[schema.id] = schema.obj;
        },
        setSchemataLookup(payload) {
            let i = payload.index;
            let schema = payload.schema;
            this.schemataLookup[schema.id][schema.obj[i]["@id"]] = schema.obj[i];
        },
        setEmptySchemataLookup(schema) {
            this.schemataLookup[schema.id] = {};
        },
        setObjectModel(payload) {
            let domainType = payload.type;
            let val = payload.val;
            this.objectModel[domainType["@id"]] = val;
        },
        setRawSchemata(schema) {
            this.rawSchemata[schema.id] = schema.obj;
        },
        setCompetencySearchModalOpen(bool) {
            this.competencySearchModalOpen = bool;
        },
        setCopyOrLink(bool) {
            this.copyOrLink = bool;
        },
        incrementNumPropertyComponents(thingId) {
            if (!this.numPropertyComponentsVisible[thingId]) {
                this.numPropertyComponentsVisible[thingId] = 0;
            }
            this.numPropertyComponentsVisible[thingId]++;
        },
        decrementNumPropertyComponents(thingId) {
            this.numPropertyComponentsVisible[thingId]--;
            if (this.numPropertyComponentsVisible[thingId] === 0) {
                delete this.numPropertyComponentsVisible[thingId];
            }
        },
        setSearchType(type) {
            this.searchType = type;
        },
        setIncludeRelations(bool) {
            this.includeRelations = bool;
        },
        // --- Original Vuex actions ---
        processSchemata(schema) {
            this.setSchemata(schema);
            if (EcArray.isArray(schema.obj)) {
                this.setEmptySchemataLookup(schema);
                for (var i = 0; i < schema.obj.length; i++) {
                    let scheme = schema.obj[i];
                    this.setSchemataLookup({'index': i, 'schema': schema});
                    if (scheme["http://schema.org/domainIncludes"] != null) {
                        for (var domainType of scheme["http://schema.org/domainIncludes"]) {
                            if (this.objectModel[domainType["@id"]] == null) {
                                this.setObjectModel({'type': domainType, 'val': {}});
                            }
                            let om = this.objectModel[domainType["@id"]];
                            om[scheme["@id"]] = scheme;
                        }
                    }
                }
            }
        },
        processSchemaFallback(schema) {
            for (var i = 0; i < schema.length; i++) {
                let scheme = schema[i];
                this.schemaFallback[scheme["@id"]] = schema[i];
                if (scheme["http://schema.org/domainIncludes"] != null) {
                    for (var domainType of scheme["http://schema.org/domainIncludes"]) {
                        if (this.objectModel[domainType["@id"]] == null) {
                            this.objectModel[domainType["@id"]] = {};
                        }
                        let om = this.objectModel[domainType["@id"]];
                        om[scheme["@id"]] = scheme;
                    }
                }
            }
        }
    }
});
