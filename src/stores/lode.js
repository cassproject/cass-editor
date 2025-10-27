import jsonld from 'jsonld';
const state = ()=>({
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
});
const actions = {
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
    removeAddingValueAtIndex(value) {
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
    schemata(schema) {
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
    schemaFallback({state}, schema) {
        for (var i = 0; i < schema.length; i++) {
            let scheme = schema[i];
            state.schemaFallback[scheme["@id"]] = schema[i];
            if (scheme["http://schema.org/domainIncludes"] != null) {
                for (var domainType of scheme["http://schema.org/domainIncludes"]) {
                    if (state.objectModel[domainType["@id"]] == null) {
                        state.objectModel[domainType["@id"]] = {};
                    }
                    let om = state.objectModel[domainType["@id"]];
                    om[scheme["@id"]] = scheme;
                }
            }
        }
    }
};
const mutations = {
};
const getters = {
};

function trimUrl(url) {
    if (!url) {
        return undefined;
    }
    if (url === "" || (url["@value"] && url["@value"] === "")) {
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

jsonld.documentLoader = async function(url) {
    if (url in state.rawSchemata) {
        return {
            contextUrl: null, // this is for a context via a link header
            document: state.rawSchemata[url], // this is the actual document that was loaded
            documentUrl: url // this is the actual context URL after redirects
        };
    } else {
        let originalUrl = url;
        let index = url.indexOf('schema.cassproject.org');
        let ending = "";
        if (url.substring(url.lastIndexOf('/')).indexOf('2') === -1) {
            ending = "/index.json-ld";
        }
        if (index !== -1) {
            url = url.substring(index);
            url = window.location.origin + window.location.pathname + url + ending;
        }
        console.trace(url);
        await fetch(url, {method: 'GET', headers: {'Accept': 'application/json'}}).then(response => {
            return response.text();
        }).then(data => {
            context = JSON.parse(data);
            state.rawSchemata[originalUrl] = context;
        });
        return {
            contextUrl: null, // this is for a context via a link header
            document: context, // this is the actual document that was loaded
            documentUrl: originalUrl // this is the actual context URL after redirects
        };
    }
};

import { defineStore } from 'pinia';
export default defineStore('lode', { 
    state,
    mutations,
    actions,
    getters
});