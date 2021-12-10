global.jsonld = require('jsonld');


const state = {
    schemata: {},
    isSavingProperty: false,
    isSavingThing: false,
    isAddingProperty: false,
    addingProperty: '',
    addingValue: '',
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
    searchType: null
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
    setAddingValue(state, value) {
        state.addingValue = value;
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
    addingValue(state) {
        return state.addingValue;
    },
    addingRange(state) {
        return state.addingRange;
    },
    addingChecked(state) {
        return state.addingChecked;
    },
    removeAddingValueAtIndex(state) {
        return state.removeAddingValueAtIndex;
    }
};

jsonld.documentLoader = function(url, callback) {
    if (url in state.rawSchemata) {
        return callback(
            null, {
                contextUrl: null, // this is for a context via a link header
                document: state.rawSchemata[url], // this is the actual document that was loaded
                documentUrl: url // this is the actual context URL after redirects
            });
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
        if (index !== -1) {
            url = url.substring(index);
            url = window.location.origin + "/" + url + "/index.json-ld";
        }
        xmlhttp.open("GET", url, false);
        xmlhttp.setRequestHeader("Accept", "application/json");
        xmlhttp.send();
        return callback(
            null, {
                contextUrl: null, // this is for a context via a link header
                document: context, // this is the actual document that was loaded
                documentUrl: originalUrl // this is the actual context URL after redirects
            });
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};