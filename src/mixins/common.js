import dateFormat from 'dateformat';

export default {
    data() {
        return {
            conceptCtids: null,
            conceptRegistryUrls: null
        };
    },
    computed: {
        ctids: function() {
            let framework = this.framework;
            if (!framework) {
                framework = this.$store.getters['editor/framework'];
            }
            if (!framework || !framework.id) {
                return null;
            }
            if (this.queryParams.ceasnDataFields !== "true") {
                return null;
            }
            var obj = {};
            obj[framework.shortId()] = [{"@value": this.getCTID(framework.shortId())}];
            if (framework.competency) {
                for (var i = 0; i < framework.competency.length; i++) {
                    obj[framework.competency[i]] = [{"@value": this.getCTID(framework.competency[i])}];
                }
            }
            return obj;
        },
        registryURLs: function() {
            let framework = this.framework;
            if (!framework) {
                framework = this.$store.getters['editor/framework'];
            }
            if (!framework || !framework.id) {
                return null;
            }
            if (this.queryParams.ceasnDataFields !== "true") {
                return null;
            }
            var obj = {};
            obj[framework.shortId()] = [{"@id": this.ceasnRegistryUriTransform(framework.shortId())}];
            if (framework.competency) {
                for (var i = 0; i < framework.competency.length; i++) {
                    obj[framework.competency[i]] = [{"@id": this.ceasnRegistryUriTransform(framework.competency[i])}];
                }
            }
            return obj;
        }
    },
    methods: {
        getConceptCtids: async function() {
            this.conceptCtids = null;
            let framework = this.framework;
            if (!framework) {
                framework = this.$store.getters['editor/framework'];
            }
            if (!framework || !framework.id) {
                return;
            }
            var me = this;
            if (this.queryParams.ceasnDataFields !== "true") {
                return;
            }
            var obj = {};
            obj[framework.shortId()] = [{"@value": this.getCTID(framework.shortId())}];
            var subCtids = async function(ary) {
                for (var i = 0; i < ary.length; i++) {
                    obj[ary[i]] = [{"@value": me.getCTID(ary[i])}];
                    var concept = await EcConcept.get(ary[i]);
                    if (concept["skos:narrower"]) {
                        await subCtids(concept["skos:narrower"]);
                    }
                }
            };
            if (framework["skos:hasTopConcept"]) {
                await subCtids(framework["skos:hasTopConcept"]);
            }
            this.conceptCtids = obj;
        },
        getConceptRegistryUrls: async function() {
            this.conceptRegistryUrls = null;
            let framework = this.framework;
            if (!framework) {
                framework = this.$store.getters['editor/framework'];
            }
            if (!framework || !framework.id) {
                return;
            }
            var me = this;
            if (this.queryParams.ceasnDataFields !== "true") {
                return;
            }
            var obj = {};
            obj[framework.shortId()] = [{"@id": this.ceasnRegistryUriTransform(framework.shortId())}];
            var subURLs = async function(ary) {
                for (var i = 0; i < ary.length; i++) {
                    obj[ary[i]] = [{"@value": me.ceasnRegistryUriTransform(ary[i])}];
                    var concept = await EcConcept.get(ary[i]);
                    if (concept["skos:narrower"]) {
                        await subURLs(concept["skos:narrower"]);
                    }
                }
            };
            if (framework["skos:hasTopConcept"]) {
                await subURLs(framework["skos:hasTopConcept"]);
            }
            this.conceptRegistryUrls = obj;
        },
        spitEvent: function(message, id, page) {
            var framework = this.framework ? this.framework : this.$store.state.editor.framework;
            var selectedCompetency = this.$store.state.editor.selectedCompetency;
            let frameworkName = null;
            if (framework) {
                if (framework["dcterms:title"]) {
                    frameworkName = schema.Thing.getDisplayStringFrom(framework["dcterms:title"]);
                } else {
                    frameworkName = framework.getName();
                }
            }
            let compName = null;
            if (selectedCompetency) {
                if (selectedCompetency["skos:prefLabel"]) {
                    compName = schema.Thing.getDisplayStringFrom(selectedCompetency["skos:prefLabel"]);
                } else {
                    compName = selectedCompetency.getName();
                }
            }
            var evt = {
                message: message,
                changed: id,
                selectedFramework: framework == null ? null : framework.shortId(),
                selectedCompetency: selectedCompetency == null ? null : selectedCompetency.shortId(),
                selectedFrameworkObject: framework == null ? null : JSON.parse(framework.toJson()),
                selectedCompetencyObject: selectedCompetency == null ? null : JSON.parse(selectedCompetency.toJson()),
                selectedFrameworkName: frameworkName,
                selectedCompetencyName: compName,
                visiblePage: page
            };
            if (this.queryParams && this.queryParams.ceasnDataFields === "true") {
                if (framework != null) {
                    if (framework.getGuid != null) {
                        if (framework.getGuid().startsWith("ce-")) {
                            evt.selectedFrameworkCtid = framework == null ? null : framework.getGuid();
                        } else if (framework.getGuid().matches("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$")) {
                            evt.selectedFrameworkCtid = framework == null ? null : "ce-" + framework.getGuid();
                        } else {
                            evt.selectedFrameworkCtid = "ce-" + new UUID(3, "nil", framework.shortId()).format();
                        }
                    }
                }
                if (selectedCompetency != null) {
                    if (selectedCompetency.getGuid != null) {
                        if (selectedCompetency.getGuid().startsWith("ce-")) {
                            evt.selectedCompetencyCtid = selectedCompetency == null ? null : selectedCompetency.getGuid();
                        } else if (selectedCompetency.getGuid().matches("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$")) {
                            evt.selectedCompetencyCtid = selectedCompetency == null ? null : "ce-" + selectedCompetency.getGuid();
                        } else {
                            evt.selectedCompetencyCtid = "ce-" + new UUID(3, "nil", this.framework.shortId() + selectedCompetency.shortId()).format();
                        }
                    }
                }
            }
            appLog(evt);
            if (parent != null) {
                if (this.queryParams && this.queryParams.origin != null && this.queryParams.origin !== '') {
                    parent.postMessage(evt, this.queryParams.origin);
                }
            }
        },
        setDefaultLanguage: function() {
            var defaultLanguage;
            if (this.framework && this.framework["ceasn:inLanguage"]) {
                defaultLanguage = EcArray.isArray(this.framework["ceasn:inLanguage"]) ? this.framework["ceasn:inLanguage"][0] : this.framework["ceasn:inLanguage"];
            } else if (this.framework && this.framework["schema:inLanguage"]) {
                defaultLanguage = EcArray.isArray(this.framework["schema:inLanguage"]) ? this.framework["schema:inLanguage"][0] : this.framework["schema:inLanguage"];
            } else if (this.framework && this.framework["dcterms:language"]) {
                defaultLanguage = EcArray.isArray(this.framework["dcterms:language"]) ? this.framework["dcterms:language"][0] : this.framework["dcterms:language"];
            } else if (navigator.language || navigator.userLanguage) {
                defaultLanguage = navigator.language || navigator.userLanguage;
            } else {
                defaultLanguage = "en";
            }
            this.$store.commit('editor/defaultLanguage', defaultLanguage);
        },
        get: function(server, service, headers, success, failure) {
            var url = EcRemote.urlAppend(server, service);
            url = EcRemote.upgradeHttpToHttps(url);
            var xhr = null;
            if ((typeof httpStatus) === "undefined") {
                xhr = new XMLHttpRequest();
                xhr.open("GET", url, true);
                if (headers != null) {
                    var keys = EcObject.keys(headers);
                    for (var i = 0; i < keys.length; i++) {
                        xhr.setRequestHeader(keys[i], headers[keys[i]]);
                    }
                }
                var xhrx = xhr;
                xhr.onreadystatechange = function() {
                    if (xhrx.readyState === 4 && xhrx.status === 200) {
                        if (success != null) {
                            success(xhrx.responseText);
                        } else if (xhrx.readyState === 4) {
                            if (failure != null) {
                                failure(xhrx.status + " " + xhrx.responseText);
                            }
                        }
                    }
                };
                xhr.onload = function() {
                    if (xhr.status !== 200) {
                        failure(xhr.status);
                    }
                };
                xhr.onerror = function() {
                    failure("Failed while sending request.");
                };
            }
            if (xhr != null) {
                (xhr)["timeout"] = EcRemote.timeout;
            }
            if ((typeof httpStatus) !== "undefined") {
                if (success != null) {
                    success(JSON.stringify(httpGet(url)));
                }
            } else {
                xhr.send();
            }
        },
        resolveNameFromUrl: function(url) {
            this.get(url, null, null, function(data) {
                var name = null;
                if (data) {
                    if (data[0] === "<") {
                        return;
                    }
                    data = JSON.parse(data);
                    if (data['ceterms:name']) {
                        name = data['ceterms:name'];
                    } else if (data['ceasn:competencyText']) {
                        name = data['ceasn:competencyText'];
                    } else if (data['name']) {
                        name = data['name'];
                    } else if (data['schema:name']) {
                        name = data['schema:name'];
                    } else if (data['title']) {
                        name = data['title'];
                    } else if (data['skos:prefLabel']) {
                        name = data['skos:prefLabel'];
                    } else if (data['title']) {
                        name = data['title'];
                    } else if (data['@graph'] && data['@graph'][0]) {
                        if (data['@graph'][0]['ceterms:name']) {
                            name = data['@graph'][0]['ceterms:name'];
                        } else if (data['@graph'][0]['name']) {
                            name = data['@graph'][0]['name'];
                        } else if (data['@graph'][0]['schema:name']) {
                            name = data['@graph'][0]['schema:name'];
                        } else if (data['@graph'][0]['title']) {
                            name = data['@graph'][0]['title'];
                        } else if (data['@graph'][0]['skos:prefLabel']) {
                            name = data['@graph'][0]['skos:prefLabel'];
                        }
                    }
                    // If it's a langstring
                    name = schema.Thing.getDisplayStringFrom(name);
                    // If still object, display value
                    if (EcObject.isObject(name)) {
                        var langs = Object.keys(name);
                        name = name[langs[0]];
                    }
                }
                return name;
            }, function(error) {
                appLog(error);
            });
        },
        conditionalDelete: function(id, depth) {
            var me = this;
            (function(id, depth) {
                Task.asyncImmediate(function(callback) {
                    if (depth === undefined || depth == null) depth = 0;
                    if (id == null || id === undefined) {
                        appLog("ID is undefined.");
                    }
                    if (depth < 5) {
                        EcFramework.search(window.repo, "\"" + id + "\"", async function(results) {
                            if (results.length <= 0) {
                                appLog("No references found for " + id + "... deleting.");
                                let obj = await EcRepository.get(id);
                                window.repo.deleteRegistered(obj, function(success) {
                                    if (obj.type === "Level") {
                                        me.$store.commit('editor/refreshLevels', true);
                                    }
                                    callback();
                                }, function(failure) {
                                    appLog(failure);
                                    callback();
                                });
                            } else {
                                appLog(results.length + " references found for " + id + "... Not deleting. Will see again in another second.");
                                callback();
                                setTimeout(function() {
                                    me.conditionalDelete(id, depth + 1);
                                }, 1000);
                            }
                        }, appError, {});
                    } else {
                        callback();
                    }
                });
            })(id, depth);
        },
        selectButton: async function(selectedArray) {
            var ary = [];
            if (!selectedArray) {
                selectedArray = this.selectedArray;
            }
            for (var i = 0; i < selectedArray.length; i++) {
                if (this.queryParams.selectVerbose === "true" && this.$store.getters['editor/conceptMode'] !== true && this.$store.getters['editor/progressionMode'] !== true) {
                    if (this.queryParams.selectExport === "ctdlasn") {
                        var link;
                        if (EcRepository.shouldTryUrl(selectedArray[i]) === false && selectedArray[i].indexOf(window.repo.selectedServer) === -1) {
                            link = window.repo.selectedServer + "ceasn/" + EcCrypto.md5(selectedArray[i]);
                        } else {
                            link = selectedArray[i].replace("/data/", "/ceasn/");
                        }
                        let success = await EcRemote.getExpectingObject(link);
                        if (success) {
                            ary.push(success);
                        }
                    } else {
                        ary.push(JSON.parse((await EcCompetency.get(selectedArray[i])).toJson()));
                    }
                } else if (this.queryParams.selectVerbose === "true") {
                    ary.push(JSON.parse((await EcConcept.get(selectedArray[i])).toJson()));
                } else {
                    ary.push(selectedArray[i]);
                }
            }
            if (this.queryParams.selectRelations === "true" && this.framework.relation) {
                for (var i = 0; i < this.framework.relation.length; i++) {
                    var relation = await EcAlignment.get(this.framework.relation[i]);
                    if (EcArray.has(selectedArray, relation.target)) {
                        if (this.queryParams.selectVerbose === "true") {
                            ary.push(JSON.parse((relation).toJson()));
                        } else {
                            ary.push(relation.shortId());
                        }
                    }
                }
            }
            var currentFramework = this.framework;
            if (this.queryParams.selectExport === "ctdlasn" && this.$store.getters['editor/conceptMode'] !== true && this.$store.getters['editor/progressionMode'] !== true) {
                if (this.framework != null) {
                    var link;
                    if (EcRepository.shouldTryUrl(this.framework.id) === false && this.framework.id.indexOf(window.repo.selectedServer) === -1) {
                        link = window.repo.selectedServer + "ceasn/" + EcCrypto.md5(this.framework.shortId());
                    } else {
                        link = this.framework.id.replace("/data/", "/ceasn/");
                    }
                    let success = await EcRemote.getExpectingObject(link);
                    if (success) {
                        // success = JSON.parse(success);
                        if (success["@graph"]) {
                            currentFramework = success["@graph"][0];
                        }
                    }
                }
            }
            var message = {
                message: "selected",
                selected: ary,
                type: this.$store.getters['editor/conceptMode'] === true ? 'Concept' : (this.$store.getters['editor/progressionMode'] === true ? 'Progression Level' : 'Competency'),
                selectedFramework: currentFramework
            };
            message = JSON.parse(JSON.stringify(message));
            appLog(message);
            parent.postMessage(message, this.queryParams.origin);
        },
        addLevel: async function(selectedCompetency, optionalLevelUrl) {
            var c;
            var me = this;
            var framework = this.framework ? this.framework : this.$store.getters['editor/framework'];
            var initialLevels = framework.level ? framework.level.slice() : null;
            if (!optionalLevelUrl) {
                c = new EcLevel();
                if (this.queryParams.newObjectEndpoint != null) {
                    c.generateShortId(this.queryParams.newObjectEndpoint);
                } else {
                    c.generateId(window.repo.selectedServer);
                }
                c["schema:dateCreated"] = new Date().toISOString();
                c.name = "New Level";
                c.competency = selectedCompetency;
            } else {
                optionalLevelUrl = optionalLevelUrl[0];
                var c = await EcRepository.get(optionalLevelUrl);
                if (!c.competency) {
                    c.competency = [];
                } else if (!EcArray.isArray(c.competency)) {
                    c.competency = [c.competency];
                }
                c.competency.push(selectedCompetency);
            }
            framework["schema:dateModified"] = new Date().toISOString();
            window.repo.saveTo(c, async function() {
                framework.addLevel(c.shortId());
                var edits = [];
                if (!optionalLevelUrl) {
                    edits.push({operation: "addNew", id: c.shortId()});
                }
                edits.push({operation: "update", id: framework.shortId(), fieldChanged: ["level"], initialValue: [initialLevels], changedValue: [framework.level]});
                me.$store.commit('editor/addEditsToUndo', edits);
                me.$store.commit('editor/framework', framework);
                if (me.$store.state.editor.private === true) {
                    if (EcEncryptedValue.encryptOnSaveMap[framework.id] !== true) {
                        framework = await EcEncryptedValue.toEncryptedValue(framework);
                    }
                }
                window.repo.saveTo(framework, function() {
                    me.$store.commit('lode/setIsAddingProperty', false);
                    me.$store.commit('editor/refreshLevels', true);
                }, appError);
            }, appError);
        },
        saveCheckedLevels: async function(selectedCompetency, checkedOptions, allOptions) {
            let competencyId = [];
            if (EcArray.isArray(selectedCompetency)) {
                competencyId = selectedCompetency;
            } else {
                competencyId.push(EcRemoteLinkedData.trimVersionFromUrl(selectedCompetency["@id"]));
            }
            var initialLevels = this.framework.level ? this.framework.level.slice() : null;
            var frameworkChanged = false;
            var edits = [];
            var me = this;
            for (var i = 0; i < allOptions.length; i++) {
                if (!this.framework.level) {
                    this.framework.level = [];
                }
                // If selected
                if (checkedOptions.indexOf(allOptions[i].val) !== -1) {
                    var level = await EcLevel.get(allOptions[i].val);
                    var initialComp = JSON.parse(JSON.stringify(level.competency));
                    if (!EcArray.isArray(level.competency)) {
                        level.competency = level.competency == null ? [] : [level.competency];
                    }
                    let levelChanged = false;
                    for (let each in competencyId) {
                        if (level.competency.indexOf(competencyId[each]) === -1) {
                            level.competency.push(competencyId[each]);
                            levelChanged = true;
                        }
                    }
                    if (levelChanged) {
                        edits.push({operation: "update", id: level.shortId(), fieldChanged: ["competency"], initialValue: [initialComp], changedValue: [level.competency]});
                        window.repo.saveTo(level, function() {
                            me.$store.commit('editor/refreshLevels', true);
                        }, appError);
                    }
                    if (this.framework.level.indexOf(level.shortId()) === -1) {
                        this.framework.addLevel(level.shortId());
                        frameworkChanged = true;
                    }
                } else {
                    // If not selected
                    var level = await EcLevel.get(allOptions[i].val);
                    var initialComp = JSON.parse(JSON.stringify(level.competency));
                    let levelChanged = false;
                    for (let each in competencyId) {
                        if (level.competency && level.competency.indexOf(competencyId[each]) !== -1) {
                            EcArray.setRemove(level.competency, competencyId[each]);
                            levelChanged = true;
                        }
                    }
                    if (levelChanged) {
                        edits.push({operation: "update", id: level.shortId(), fieldChanged: ["competency"], initialValue: [initialComp], changedValue: [level.competency]});
                        window.repo.saveTo(level, function() {
                            me.$store.commit('editor/refreshLevels', true);
                        }, appError);
                    }
                    // If level doesn't have any competencies attached, remove it from the framework.
                    if ((!level.competency || (level.competency && level.competency.length === 0)) && this.framework.level.indexOf(level.shortId()) !== -1) {
                        EcArray.setRemove(this.framework.level, level.shortId());
                        frameworkChanged = true;
                    }
                }
            }
            if (frameworkChanged) {
                edits.push({operation: "update", id: this.framework.shortId(), fieldChanged: ["level"], initialValue: [initialLevels], changedValue: [this.framework.level]});
                this.saveFramework();
            }
            this.$store.commit('editor/addEditsToUndo', edits);
            this.$store.commit('lode/setAddingChecked', []);
            this.$store.commit('lode/setIsAddingProperty', false);
        },
        saveFramework: async function() {
            this.framework["schema:dateModified"] = new Date().toISOString();
            var framework = this.framework;
            this.$store.commit('editor/framework', framework);
            if (this.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[framework.id] !== true) {
                framework = await EcEncryptedValue.toEncryptedValue(framework);
            }
            window.repo.saveTo(framework, function() {}, appError);
        },
        removeLevelFromFramework: async function(levelId) {
            var initialLevels = this.framework.level ? this.framework.level.slice() : null;
            this.framework.removeLevel(levelId);
            var level = await EcRepository.get(levelId);
            this.$store.commit('editor/addEditsToUndo', [
                {operation: "delete", obj: level},
                {operation: "update", id: this.framework.shortId(), fieldChanged: [this.framework.level], initialValue: [initialLevels], changedValue: [this.framework.level]}
            ]);
            this.conditionalDelete(levelId);
            this.saveFramework();
            this.$store.commit('editor/refreshLevels', true);
        },
        addRelationsToFramework: async function(selectedCompetency, property, values) {
            if (values.length > 0) {
                selectedCompetency = await EcRepository.get(selectedCompetency);
                await this.addAlignments(values, selectedCompetency, property);
            }
        },
        addAlignments: async function(targets, thing, relationType, allowSave) {
            if (this.$store.getters['editor/queryParams'].concepts === "true" || this.$store.getters['editor/conceptMode'] === true || this.$store.getters['editor/progressionMode'] === true) {
                return this.addConceptAlignments(targets, thing, relationType);
            }
            if (relationType === "ceasn:skillEmbodied" || relationType === "ceasn:abilityEmbodied" || relationType === "ceasn:knowledgeEmbodied" || relationType === "ceasn:taskEmbodied") {
                // This property is attached to competency, not a relation attached to framework
                return this.addRelationAsCompetencyField(targets, thing, relationType, allowSave);
            }
            return new Promise(async(resolve, reject) => {
                var framework = this.$store.state.editor.framework;
                var edits = [];
                var initialRelations = framework.relation ? framework.relation.slice() : null;
                for (var i = 0; i < targets.length; i++) {
                    var r = new EcAlignment();
                    if (this.$store.getters['editor/queryParams'].newObjectEndpoint != null) {
                        r.generateShortId(this.$store.getters['editor/queryParams'].newObjectEndpoint);
                    } else {
                        r.generateId(window.repo.selectedServer);
                    }
                    edits.push({operation: "addNew", id: r.shortId()});
                    r["schema:dateCreated"] = new Date().toISOString();
                    r.target = EcRemoteLinkedData.trimVersionFromUrl(targets[i]);
                    if (thing.id) {
                        r.source = thing.shortId();
                    } else {
                        r.source = EcRemoteLinkedData.trimVersionFromUrl(thing["@id"]);
                    }
                    if (r.target === r.source) {
                        return;
                    }
                    r.relationType = relationType;
                    if (r.relationType === "broadens") {
                        var dosedo = r.target;
                        r.target = r.source;
                        r.source = dosedo;
                        r.relationType = "narrows";
                    }
                    if (EcIdentityManager.default.ids.length > 0) {
                        r.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
                    }
                    if (framework.owner && framework.owner.length > 0) {
                        for (var j = 0; j < framework.owner.length; j++) {
                            var owner = framework.owner[j];
                            r.addOwner(EcPk.fromPem(owner));
                        }
                    }
                    if (framework.reader && framework.reader.length > 0) {
                        for (var j = 0; j < framework.reader.length; j++) {
                            var reader = framework.reader[j];
                            r.addReader(EcPk.fromPem(reader));
                        }
                    }
                    if (this.$store.state.editor.private === true) {
                        r = await EcEncryptedValue.toEncryptedValue(r);
                    }
                    await new Promise((res, rej) => {
                        window.repo.saveTo(r, res, rej);
                    });
                    if (thing.type === 'Concept') {
                        if (framework.relation == null) {
                            framework.relation = [];
                        }
                        let isNew = true;
                        let idx = 0;
                        while (isNew && idx < framework.relation.length) {
                            if (EcRemoteLinkedData.trimVersionFromUrl(framework.relation[idx]).equals(r.id)) {
                                isNew = false;
                            }
                            idx++;
                        }
                        if (isNew) {
                            framework.relation.push(r.id);
                        }
                    } else {
                        framework.addRelation(r.id);
                    }
                }
                edits.push({operation: "update", id: framework.shortId(), fieldChanged: ["relation"], initialValue: [initialRelations], changedValue: [framework.relation]});
                this.$store.commit('editor/addEditsToUndo', edits);
                this.$store.commit('editor/framework', framework);
                if (this.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[framework.id] !== true) {
                    framework = await EcEncryptedValue.toEncryptedValue(framework);
                }
                window.repo.saveTo(framework, resolve, reject);
            });
        },
        addRelationAsCompetencyField: async function(targets, thing, relationType, allowSave) {
            return new Promise(async(resolve, reject) => {
                var initialValue = thing[relationType] ? thing[relationType].slice() : null;
                for (var i = 0; i < targets.length; i++) {
                    if (thing[relationType] == null) {
                        thing[relationType] = [];
                    }
                    thing[relationType].push(targets[i]);
                }
                this.$store.commit('editor/addEditsToUndo', [{operation: "update", id: thing.shortId(), fieldChanged: [relationType], initialValue: [initialValue], changedValue: [thing[relationType]]}]);
                thing["schema:dateModified"] = new Date().toISOString();
                if (this.$store.state.editor.private === true) {
                    if (EcEncryptedValue.encryptOnSaveMap[thing.id] !== true) {
                        thing = await EcEncryptedValue.toEncryptedValue(thing);
                    }
                }
                window.repo.saveTo(thing, resolve, reject);
            });
        },
        removeRelationFromFramework: async function(source, property, target) {
            return new Promise((resolve, reject) => {
                var me = this;
                var initialRelations = this.framework.relation ? this.framework.relation.slice() : null;
                var edits = [];
                new EcAsyncHelper().each(this.framework.relation, function(relation, callback) {
                    EcAlignment.get(relation, function(r) {
                        if (property === "broadens") {
                            if (r.target === source && r.source === target && r.relationType === "narrows") {
                                me.framework.removeRelation(r.shortId());
                                edits.push({operation: "delete", obj: r});
                                me.conditionalDelete(r.shortId());
                                callback();
                            } else {
                                callback();
                            }
                        } else if (r.source === source && r.target === target && r.relationType === property) {
                            me.framework.removeRelation(r.shortId());
                            edits.push({operation: "delete", obj: r});
                            me.conditionalDelete(r.shortId());
                            callback();
                        } else {
                            callback();
                        }
                    }, callback);
                }, async function() {
                    var framework = me.framework;
                    edits.push({operation: "update", id: framework.shortId(), fieldChanged: ["relation"], initialValue: [initialRelations], changedValue: [framework.relation]});
                    me.$store.commit('editor/framework', framework);
                    me.$store.commit('editor/addEditsToUndo', edits);
                    if (me.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[framework.id] !== true) {
                        framework = await EcEncryptedValue.toEncryptedValue(framework);
                    }
                    window.repo.saveTo(framework, resolve, reject);
                });
            });
        },
        ceasnRegistryUriTransform: function(uri) {
            var endpoint = this.queryParams.newObjectEndpoint;
            if (endpoint == null) {
                return uri;
            }
            if (uri.startsWith(endpoint)) {
                return uri;
            }
            var ctid = this.getCTID(uri);
            if (endpoint.indexOf("ce-") !== -1) {
                ctid = ctid.substring(3);
            }
            return endpoint + ctid;
        },
        getCTID: function(uri) {
            var uuid = null;
            var parts = EcRemoteLinkedData.trimVersionFromUrl(uri).split("/");
            uuid = parts[parts.length - 1];
            uri = EcRemoteLinkedData.trimVersionFromUrl(uri);
            if (!uuid.matches("^(ce-)?[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$")) {
                uuid = new UUID(3, "nil", uri).format();
            }
            if (uuid.indexOf("ce-") === -1) {
                uuid = "ce-" + uuid;
            }
            return uuid;
        },
        canViewCommentsCurrentFramework: function() {
            // TODO expand on this
            let lop = this.$store.state.user.loggedOnPerson;
            if (lop && lop.id && lop.id !== '') return true;
            else return false;
        },
        canAddCommentsCurrentFramework: function() {
            // TODO expand on this
            let lop = this.$store.state.user.loggedOnPerson;
            if (lop && lop.id && lop.id !== '') return true;
            else return false;
        },
        toPrettyDateString: function(dateInMilliseconds) {
            try {
                let d = new Date(dateInMilliseconds);
                return dateFormat(d, "mm/dd/yy, h:MM:ss TT");
            } catch (err) {
                return 'unknown';
            }
        }
    }
};