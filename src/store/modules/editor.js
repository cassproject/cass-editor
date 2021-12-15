import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

// Rate Limit axios requests
const MAX_REQUESTS_COUNT = 10;
const INTERVAL_MS = 10;
let PENDING_REQUESTS = 0;

const limitApi = axios.create({});

limitApi.interceptors.request.use(function(config) {
    return new Promise((resolve, reject) => {
        let interval = setInterval(() => {
            if (PENDING_REQUESTS < MAX_REQUESTS_COUNT) {
                PENDING_REQUESTS++;
                clearInterval(interval);
                resolve(config);
            }
        }, INTERVAL_MS);
    });
});

limitApi.interceptors.response.use(function(response) {
    PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1);
    return Promise.resolve(response);
}, function(error) {
    PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1);
    return Promise.reject(error);
});

const state = {
    framework: null,
    organization: null,
    selectedCompetency: null,
    queryParams: {},
    defaultLanguage: null,
    webSocketBackoff: 100,
    selectCompetencyRelation: null,
    selectingCompetencies: false,
    private: false,
    newCompetency: null,
    newFramework: null,
    t3Profile: false,
    changedObject: null,
    configuration: null,
    commonPathIframe: '',
    iframeCompetencyPathInterframework: '',
    iframeConceptPath: '',
    addCommentAboutId: '',
    addCommentType: '',
    commentToEdit: {},
    commentToReply: {},
    frameworkCommentDataLoaded: false,
    frameworkCommentList: [],
    frameworkCommentPersonMap: {},
    commentsToDelete: [],
    commentScrollTo: {},
    editsToUndo: [],
    lastEditToUndo: null,
    recomputeHierarchy: false,
    selectedCompetenciesAsProperties: null,
    refreshLevels: false,
    refreshAlignments: false,
    conceptMode: false,
    cutId: null,
    copyId: null,
    paste: false,
    cutOrCopyContainerId: null,
    nodeInFocus: null,
    relations: {},
    setPropertyLevel: null,
    addAnother: false,
    itemToDelete: {},
    itemToRemove: {},
    itemToExport: {},
    manageAssertions: false,
    assertions: [],
    badgePk: null,
    me: null,
    subject: null,
    people: []
};
const mutations = {
    framework(state, f) {
        state.framework = f;
    },
    organization(state, f) {
        state.organization = f;
    },
    selectedCompetency(state, comp) {
        state.selectedCompetency = comp;
    },
    queryParams(state, params) {
        state.queryParams = params;
    },
    defaultLanguage(state, lang) {
        state.defaultLanguage = lang;
    },
    webSocketBackoffIncrease(state) {
        state.webSocketBackoff *= 2;
    },
    private(state, bool) {
        state.private = bool;
    },
    selectCompetencyRelation(state, r) {
        state.selectCompetencyRelation = r;
    },
    selectingCompetencies(state, bool) {
        state.selectingCompetencies = bool;
    },
    newCompetency(state, id) {
        state.newCompetency = id;
    },
    newFramework(state, id) {
        state.newFramework = id;
    },
    t3Profile(state, bool) {
        state.t3Profile = bool;
    },
    changedObject(state, id) {
        state.changedObject = id;
    },
    configuration(state, config) {
        state.configuration = config;
    },
    commonPathIframe(state, val) {
        state.commonPathIframe = val;
    },
    iframeCompetencyPathInterframework(state, val) {
        state.iframeCompetencyPathInterframework = val;
    },
    iframeConceptPath(state, val) {
        state.iframeConceptPath = val;
    },
    setAddCommentAboutId(state, val) {
        state.addCommentAboutId = val;
    },
    setAddCommentType(state, val) {
        state.addCommentType = val;
    },
    setCommentToEdit(state, val) {
        state.commentToEdit = val;
    },
    setCommentToReply(state, val) {
        state.commentToReply = val;
    },
    setCommentsToDelete(state, val) {
        state.commentsToDelete = val;
    },
    clearFrameworkCommentData(state) {
        state.frameworkCommentDataLoaded = false;
        state.frameworkCommentList = [];
        state.frameworkCommentPersonMap = {};
    },
    setFrameworkCommentDataLoaded(state, val) {
        state.frameworkCommentDataLoaded = val;
    },
    setFrameworkCommentList(state, val) {
        state.frameworkCommentList = val;
    },
    setFrameworkCommentPersonMap(state, val) {
        state.frameworkCommentPersonMap = val;
    },
    setCommentScrollTo(state, val) {
        state.commentScrollTo = val;
    },
    addEditsToUndo(state, edits) {
        state.editsToUndo.push(edits);
    },
    setLastEditToUndo(state, edit) {
        state.lastEditToUndo = edit;
    },
    recomputeHierarchy(state, boolean) {
        state.recomputeHierarchy = boolean;
    },
    selectedCompetenciesAsProperties(state, comps) {
        state.selectedCompetenciesAsProperties = comps;
    },
    refreshLevels(state, boolean) {
        state.refreshLevels = boolean;
    },
    refreshAlignments(state, boolean) {
        state.refreshAlignments = boolean;
    },
    conceptMode(state, boolean) {
        state.conceptMode = boolean;
    },
    cutId(state, id) {
        state.cutId = id;
    },
    copyId(state, id) {
        state.copyId = id;
    },
    paste(state, id) {
        state.paste = id;
    },
    cutOrCopyContainerId(state, id) {
        state.cutOrCopyContainerId = id;
    },
    nodeInFocus(state, id) {
        state.nodeInFocus = id;
    },
    relations(state, obj) {
        state.relations = obj;
    },
    setPropertyLevel(state, level) {
        state.setPropertyLevel = level;
    },
    addAnother(state, bool) {
        state.addAnother = bool;
    },
    setItemToDelete(state, val) {
        state.itemToDelete = val;
    },
    setItemToRemove(state, val) {
        state.itemToRemove = val;
    },
    setItemToExport(state, val) {
        state.itemToExport = val;
    },
    setManageAssertions(state, val) {
        state.manageAssertions = val;
    },
    setAssertions(state, val) {
        state.assertions = val;
    },
    removeAssertion(state, val) {
        EcArray.setRemove(state.assertions, val);
    },
    removeAssertionAtIndex(state, val) {
        state.assertions.splice(val, 1);
    },
    addAssertion(state, val) {
        EcArray.setAdd(state.assertions, val);
    },
    setBadgePk(state, val) {
        state.badgePk = val;
    },
    setMe(state, val) {
        state.me = val;
    },
    setSubject(state, val) {
        state.subject = val;
    },
    setPeople(state, val) {
        state.people = val;
    }
};
const actions = {
    lastEditToUndo: function(context) {
        context.commit('setLastEditToUndo', context.state.editsToUndo.pop());
        return context.state.lastEditToUndo;
    },
    getThing: (instance, payload) => {
        var url = EcRemote.urlAppend(payload.server, payload.service);
        url = EcRemote.upgradeHttpToHttps(url);
        limitApi.get(url, {
            headers: payload.headers
        }).then((resp) => {
            payload.success(resp.data);
        }).catch((err) => {
            payload.failure(err);
        });
    },
    searchForAssertions: (instance, count) => {
        return new Promise((resolve, reject) => {
            EcAssertion.search(window.repo, "\"" + instance.state.me + "\"", (assertions) => {
                var eah = new EcAsyncHelper();
                eah.each(assertions, (assertion, callback) => {
                    if (assertion.assertionDateDecrypted != null) {
                        callback();
                    } else {
                        assertion.getAssertionDateAsync((date) => {
                            assertion.assertionDateDecrypted = date;
                            callback();
                        }, callback);
                    }
                },
                (assertions) => {
                    assertions = assertions.sort((a, b) => {
                        return b.assertionDateDecrypted - a.assertionDateDecrypted;
                    });
                    instance.state.assertions = assertions;
                    resolve();
                });
            }, reject, {
                sort: '[ { "@version": {"order" : "desc" , "missing" : "_last"}} ]',
                size: count
            });
        });
    },
    computeBecause: (instance, evidences) => {
        return new Promise((resolve, reject) => {
            var explanations = [];
            new EcAsyncHelper().each(evidences, (e, callback) => {
                var evidenceString = "";
                var eoriginal = e;
                if (e.startsWith != null && e.startsWith("{")) {
                    e = JSON.parse(e);
                }
                if (EcObject.isObject(e)) {
                    if (e.verb != null) {
                        if (e.verb.display != null) {
                            if (e.verb.display.en != null) {
                                evidenceString += e.verb.display.en + " ";
                            }
                        }
                    }
                    if (e.object != null) {
                        if (e.object.definition != null) {
                            if (e.object.definition.type === "http://adlnet.gov/expapi/activities/assessment") {
                                evidenceString += "\"" + e.object.definition.name.en + "\" quiz with a ";
                                if (e.result != null) {
                                    if (e.result.success != null) {
                                        evidenceString += e.result.success ? " passing " : " not passing ";
                                        evidenceString += Math.round(e.result.score.scaled * 100.0) + "%";
                                    }
                                }
                            }
                        }
                    }
                    if (e.object != null) {
                        if (e.object.definition != null) {
                            if (e.object.definition.interactionType != null) {
                                evidenceString += "\"" + e.object.definition.name.en + "\" ";
                                if (e.result != null) {
                                    if (e.result.success != null) {
                                        evidenceString += e.result.success ? " correctly" : " incorrectly";
                                    }
                                }
                            }
                        }
                    }
                    if (evidenceString !== "") {
                        explanations.push({text: evidenceString, original: eoriginal});
                    }
                    callback();
                } else if (e.startsWith != null && e.startsWith("http")) {
                    let failureFunc = function() {
                        explanations.push({
                            text: "did this",
                            url: e,
                            original: eoriginal
                        });
                    };
                    EcRepository.get(e, (success) => {
                        try {
                            if (success.isAny(new ChooseAction().getTypes())) {
                                EcRepository.get(success.object, (creativeWork) => {
                                    explanations.push({
                                        text: "viewed " + creativeWork.name,
                                        url: creativeWork.url,
                                        original: eoriginal
                                    });
                                    callback();
                                }, callback);
                            } else {
                                failureFunc();
                                callback();
                            }
                        } catch (e) {
                            failureFunc();
                            callback();
                        }
                    }, (failure) => {
                        failureFunc();
                        callback();
                    });
                } else {
                    explanations.push({text: "\"" + e + "\"", original: eoriginal});
                    callback();
                }
            }, (evidences) => {
                resolve(explanations);
            });
        });
    }
};
const getters = {
    framework: function(state) {
        return state.framework;
    },
    organization: function(state) {
        return state.organization;
    },
    selectedCompetency: function(state) {
        return state.selectedCompetency;
    },
    queryParams: function(state) {
        return state.queryParams;
    },
    defaultLanguage: function(state) {
        return state.defaultLanguage;
    },
    webSocketBackoff: function(state) {
        return state.webSocketBackoff;
    },
    selectCompetencyRelation: function(state) {
        return state.selectCompetencyRelation;
    },
    selectingCompetencies: function(state) {
        return state.selectingCompetencies;
    },
    private: function(state) {
        return state.private;
    },
    newCompetency: function(state) {
        return state.newCompetency;
    },
    newFramework: function(state) {
        return state.newFramework;
    },
    t3Profile: function(state) {
        return state.t3Profile;
    },
    changedObject: function(state) {
        return state.changedObject;
    },
    configuration: function(state) {
        return state.configuration;
    },
    addCommentAboutId: function(state) {
        return state.addCommentAboutId;
    },
    addCommentType: function(state) {
        return state.addCommentType;
    },
    commentToEdit: function(state) {
        return state.commentToEdit;
    },
    commentToReply: function(state) {
        return state.commentToReply;
    },
    commentsToDelete: function(state) {
        return state.commentsToDelete;
    },
    frameworkCommentDataLoaded: function(state) {
        return state.frameworkCommentDataLoaded;
    },
    frameworkCommentList: function(state) {
        return state.frameworkCommentList;
    },
    frameworkCommentPersonMap: function(state) {
        return state.frameworkCommentPersonMap;
    },
    commentScrollTo: function(state) {
        return state.commentScrollTo;
    },
    recomputeHierarchy: function(state) {
        return state.recomputeHierarchy;
    },
    selectedCompetenciesAsProperties: function(state) {
        return state.selectedCompetenciesAsProperties;
    },
    refreshLevels: function(state) {
        return state.refreshLevels;
    },
    refreshAlignments: function(state) {
        return state.refreshAlignments;
    },
    conceptMode: function(state) {
        return state.conceptMode;
    },
    cutId: function(state) {
        return state.cutId;
    },
    copyId: function(state) {
        return state.copyId;
    },
    paste: function(state) {
        return state.paste;
    },
    cutOrCopyContainerId: function(state) {
        return state.cutOrCopyContainerId;
    },
    nodeInFocus: function(state) {
        return state.nodeInFocus;
    },
    relations: function(state) {
        return state.relations;
    },
    setPropertyLevel: function(state) {
        return state.setPropertyLevel;
    },
    addAnother: function(state) {
        return state.addAnother;
    },
    itemToDelete: function(state) {
        return state.itemToDelete;
    },
    itemToRemove: function(state) {
        return state.itemToRemove;
    },
    itemToExport: function(state) {
        return state.itemToExport;
    },
    manageAssertions: function(state) {
        return state.manageAssertions;
    },
    assertions: function(state) {
        return state.assertions;
    },
    badgePk: function(state) {
        return state.badgePk;
    },
    getMe: function(state) {
        return state.me;
    },
    getSubject: function(state) {
        return state.subject;
    },
    people: function(state) {
        return state.people;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};