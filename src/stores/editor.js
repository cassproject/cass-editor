const state = () => ({
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
    recomputePrecedence: false,
    recomputePrecedenceAfterReorder: false,
    selectedCompetenciesAsProperties: null,
    refreshLevels: false,
    refreshAlignments: false,
    refreshProperties: false,
    conceptMode: false,
    collectionMode: false,
    progressionMode: false,
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
    people: [],
    firstSearchProcessing: true,
    searchingAssertions: false
});
const actions = {
    setFramework(f) {
        this.framework = f;
    },
    setOrganization(f) {
        this.organization = f;
    },
    setSelectedCompetency(comp) {
        this.selectedCompetency = comp;
    },
    setQueryParams(params) {
        this.queryParams = params;
    },
    setDefaultLanguage(lang) {
        this.defaultLanguage = lang;
    },
    webSocketBackoffIncrease(state) {
        this.webSocketBackoff *= 2;
    },
    setPrivate(bool) {
        this.private = bool;
    },
    setSelectCompetencyRelation(r) {
        this.selectCompetencyRelation = r;
    },
    setSelectingCompetencies(bool) {
        this.selectingCompetencies = bool;
    },
    setNewCompetency(id) {
        this.newCompetency = id;
    },
    setNewFramework(id) {
        this.newFramework = id;
    },
    setT3Profile(bool) {
        this.t3Profile = bool;
    },
    setChangedObject(id) {
        this.changedObject = id;
    },
    setConfiguration(config) {
        this.configuration = config;
    },
    setCommonPathIframe(val) {
        this.commonPathIframe = val;
    },
    setIframeCompetencyPathInterframework(val) {
        this.iframeCompetencyPathInterframework = val;
    },
    setIframeConceptPath(val) {
        this.iframeConceptPath = val;
    },
    setAddCommentAboutId(val) {
        this.addCommentAboutId = val;
    },
    setAddCommentType(val) {
        this.addCommentType = val;
    },
    setCommentToEdit(val) {
        this.commentToEdit = val;
    },
    setCommentToReply(val) {
        this.commentToReply = val;
    },
    setCommentsToDelete(val) {
        this.commentsToDelete = val;
    },
    clearFrameworkCommentData(state) {
        this.frameworkCommentDataLoaded = false;
        this.frameworkCommentList = [];
        this.frameworkCommentPersonMap = {};
    },
    setFrameworkCommentDataLoaded(val) {
        this.frameworkCommentDataLoaded = val;
    },
    setFrameworkCommentList(val) {
        this.frameworkCommentList = val;
    },
    setFrameworkCommentPersonMap(val) {
        this.frameworkCommentPersonMap = val;
    },
    setCommentScrollTo(val) {
        this.commentScrollTo = val;
    },
    addEditsToUndo(edits) {
        this.editsToUndo.push(edits);
    },
    setLastEditToUndo(edit) {
        this.lastEditToUndo = edit;
    },
    setRecomputeHierarchy(boolean) {
        this.recomputeHierarchy = boolean;
    },
    setRecomputePrecedence(boolean) {
        this.recomputePrecedence = boolean;
    },
    setRecomputePrecedenceAfterReorder(boolean) {
        this.recomputePrecedenceAfterReorder = boolean;
    },
    setSelectedCompetenciesAsProperties(comps) {
        this.selectedCompetenciesAsProperties = comps;
    },
    setRefreshLevels(boolean) {
        this.refreshLevels = boolean;
    },
    setRefreshAlignments(boolean) {
        this.refreshAlignments = boolean;
    },
    setRefreshProperties(boolean) {
        this.refreshProperties = boolean;
    },
    setConceptMode(boolean) {
        if (boolean) {
            this.conceptMode = true;
            this.progressionMode = false;
        } else {
            this.conceptMode = false;
        }
    },
    setCollectionMode(boolean) {
        this.collectionMode = boolean;
    },
    setProgressionMode(boolean) {
        if (boolean) {
            this.progressionMode = true;
            this.conceptMode = false;
        } else {
            this.progressionMode = false;
        }
    },
    setCutId(id) {
        this.cutId = id;
    },
    setCopyId(id) {
        this.copyId = id;
    },
    setPaste(id) {
        this.paste = id;
    },
    setCutOrCopyContainerId(id) {
        this.cutOrCopyContainerId = id;
    },
    setNodeInFocus(id) {
        this.nodeInFocus = id;
    },
    setRelations(obj) {
        this.relations = obj;
    },
    setSetPropertyLevel(level) {
        this.setPropertyLevel = level;
    },
    setAddAnother(bool) {
        this.addAnother = bool;
    },
    setItemToDelete(val) {
        this.itemToDelete = val;
    },
    setItemToRemove(val) {
        this.itemToRemove = val;
    },
    setItemToExport(val) {
        this.itemToExport = val;
    },
    setManageAssertions(val) {
        this.manageAssertions = val;
    },
    setAssertions(val) {
        this.assertions = val;
    },
    removeAssertion(val) {
        EcArray.setRemove(this.assertions, val);
    },
    removeAssertionAtIndex(val) {
        this.assertions.splice(val, 1);
    },
    addAssertion(val) {
        EcArray.setAdd(this.assertions, val);
    },
    setBadgePk(val) {
        this.badgePk = val;
    },
    setMe(val) {
        this.me = val;
    },
    setSubject(val) {
        this.subject = val;
    },
    setPeople(val) {
        this.people = val;
    },
    setFirstSearchProcessing(val) {
        this.firstSearchProcessing = val;
    },
    setSearchingAssertions(val) {
        this.searchingAssertions = val;
    },
    getDirectoryChildren: function (instance, directory) {
        let children = [];
        if (directory.frameworks) {
            children.push(...directory.frameworks);
        }
        if (directory.resources) {
            children.push(...directory.resources);
        }
        if (directory.directories) {
            children.push(...directory.directories);
        }
        return children;
    },
    lastEditToUndo: function (context) {
        context.commit('setLastEditToUndo', context.state.editsToUndo.pop());
        return context.state.lastEditToUndo;
    },
    getThing: (instance, payload) => {
        return new Promise((resolve, reject) => {
            var url = EcRemote.urlAppend(payload.server, payload.service);
            url = EcRemote.upgradeHttpToHttps(url);
            fetch(url, {
                headers: payload.headers
            }).then((resp) => {
                if (payload.success) {
                    payload.success(resp.data);
                }
                resolve(resp.data);
            }).catch((err) => {
                if (payload.failure) {
                    payload.failure(err);
                }
                reject(err);
            });
        });
    },
    searchForAssertions: (instance) => {
        return new Promise((resolve, reject) => {
            instance.state.searchingAssertions = true;
            var assertions = [];
            let doSearch = async function (start, count) {
                return new Promise((resolve, reject) => {
                    EcAssertion.search(window.repo, "\"" + instance.state.me + "\"", async (results) => {
                        assertions.push(...results);
                        start += count;
                        if (results.length > 0) {
                            await doSearch(start, count);
                        }
                        resolve();
                    }, reject, { size: count, start: start });
                });
            };

            doSearch(0, 5000).then(() => {
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
                        instance.state.assertions = assertions;
                        instance.state.searchingAssertions = false;
                        resolve();
                    });
            }).catch(console.error);
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
                        explanations.push({ text: evidenceString, original: eoriginal });
                    }
                    callback();
                } else if (e.startsWith != null && e.startsWith("http")) {
                    let failureFunc = function () {
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
                    explanations.push({ text: "\"" + e + "\"", original: eoriginal });
                    callback();
                }
            }, (evidences) => {
                resolve(explanations);
            });
        });
    }
};
const getters = {
    sortedAssertions: function (state) {
        return state.assertions.sort((a, b) => {
            return b.assertionDateDecrypted - a.assertionDateDecrypted;
        });
    },
    getMe: function (state) {
        return state.me;
    },
    getSubject: function (state) {
        return state.subject;
    }
};

import { defineStore } from 'pinia';
export default defineStore('editor',{ 
    state,
    actions,
    getters
});