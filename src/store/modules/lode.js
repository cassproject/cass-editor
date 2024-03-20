global.jsonld = require('jsonld');


const state = {
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
};
const actions = {
    schemata({state, commit}, schema) {
        commit('setSchemata', schema);
        if (EcArray.isArray(schema.obj)) {
            commit('setEmptySchemataLookup', schema);
            for (var i = 0; i < schema.obj.length; i++) {
                let scheme = schema.obj[i];
                commit('setSchemataLookup', {'index': i, 'schema': schema});
                if (scheme["http://schema.org/domainIncludes"] != null) {
                    for (var domainType of scheme["http://schema.org/domainIncludes"]) {
                        if (state.objectModel[domainType["@id"]] == null) {
                            commit('setObjectModel', {'type': domainType, 'val': {}});
                        }
                        let om = state.objectModel[domainType["@id"]];
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
    setIsSavingProperty(state, value) {
        state.isSavingProperty = value;
    },
    setIsSavingThing(state, value) {
        state.isSavingThing = value;
    },
    setIsAddingProperty(state, value) {
        state.isAddingProperty = value;
    },
    setAddingProperty(state, value) {
        state.addingProperty = value;
    },
    setAddingValues(state, values) {
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
        state.addingValues = newValues;
    },
    addToAddingValues(state, value) {
        let newValue = trimUrl(value);
        if (!state.addingValues) {
            state.addingValues = [];
        }
        if (newValue) {
            state.addingValues.push(newValue);
        }
    },
    setAddingRange(state, value) {
        state.addingRange = value;
    },
    setAddingChecked(state, value) {
        state.addingChecked = value;
    },
    removeAddingValueAtIndex(state, value) {
        state.removeAddingValueAtIndex = value;
    },
    setSchemata(state, schema) {
        state.schemata[schema.id] = schema.obj;
    },
    setSchemataLookup(state, payload) {
        let i = payload.index;
        let schema = payload.schema;
        state.schemataLookup[schema.id][schema.obj[i]["@id"]] = schema.obj[i];
    },
    setEmptySchemataLookup(state, schema) {
        state.schemataLookup[schema.id] = {};
    },
    setObjectModel(state, payload) {
        let domainType = payload.type;
        let val = payload.val;
        state.objectModel[domainType["@id"]] = val;
    },
    rawSchemata(state, schema) {
        state.rawSchemata[schema.id] = schema.obj;
    },
    competencySearchModalOpen(state, bool) {
        state.competencySearchModalOpen = bool;
    },
    copyOrLink(state, bool) {
        state.copyOrLink = bool;
    },
    incrementNumPropertyComponents(state, thingId) {
        if (!state.numPropertyComponentsVisible[thingId]) {
            state.numPropertyComponentsVisible[thingId] = 0;
        }
        state.numPropertyComponentsVisible[thingId]++;
    },
    decrementNumPropertyComponents(state, thingId) {
        state.numPropertyComponentsVisible[thingId]--;
        if (state.numPropertyComponentsVisible[thingId] === 0) {
            delete state.numPropertyComponentsVisible[thingId];
        }
    },
    searchType(state, type) {
        state.searchType = type;
    },
    includeRelations(state, bool) {
        state.includeRelations = bool;
    }
};
const getters = {
    isSavingProperty(state) {
        return state.isSavingProperty;
    },
    isSavingThing(state) {
        return state.isSavingThing;
    },
    isAddingProperty(state) {
        return state.isAddingProperty;
    },
    addingProperty(state) {
        return state.addingProperty;
    },
    addingValues(state) {
        return state.addingValues;
    },
    addingRange(state) {
        return state.addingRange;
    },
    addingChecked(state) {
        return state.addingChecked;
    },
    removeAddingValueAtIndex(state) {
        return state.removeAddingValueAtIndex;
    },
    includeRelations(state) {
        return state.includeRelations;
    }
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
        var context;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                context = JSON.parse(this.responseText);
                state.rawSchemata[originalUrl] = context;
            }
        };
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
        xmlhttp.open("GET", url, false);
        xmlhttp.setRequestHeader("Accept", "application/json");
        xmlhttp.send();
        return {
            contextUrl: null, // this is for a context via a link header
            document: context, // this is the actual document that was loaded
            documentUrl: originalUrl // this is the actual context URL after redirects
        };
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};