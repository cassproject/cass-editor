import dateFormat from 'dateformat';

export default {
    computed: {
        ctids: function() {
            let framework = this.framework;
            if (!framework) {
                framework = this.$store.getters['editor/framework'];
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
        },
        conceptCtids: function() {
            let framework = this.framework;
            if (!framework) {
                framework = this.$store.getters['editor/framework'];
            }
            var me = this;
            if (this.queryParams.ceasnDataFields !== "true") {
                return null;
            }
            var obj = {};
            obj[framework.shortId()] = [{"@value": this.getCTID(framework.shortId())}];
            var subCtids = function(ary) {
                for (var i = 0; i < ary.length; i++) {
                    obj[ary[i]] = [{"@value": me.getCTID(ary[i])}];
                    var concept = EcConcept.getBlocking(ary[i]);
                    if (concept["skos:narrower"]) {
                        subCtids(concept["skos:narrower"]);
                    }
                }
            };
            if (framework["skos:hasTopConcept"]) {
                subCtids(framework["skos:hasTopConcept"]);
            }
            return obj;
        },
        conceptRegistryURLs: function() {
            let framework = this.framework;
            if (!framework) {
                framework = this.$store.getters['editor/framework'];
            }
            var me = this;
            if (this.queryParams.ceasnDataFields !== "true") {
                return null;
            }
            var obj = {};
            var subURLs = function(ary) {
                for (var i = 0; i < ary.length; i++) {
                    obj[ary[i]] = [{"@value": me.ceasnRegistryUriTransform(ary[i])}];
                    var concept = EcConcept.getBlocking(ary[i]);
                    if (concept["skos:narrower"]) {
                        subURLs(concept["skos:narrower"]);
                    }
                }
            };
            if (framework["skos:hasTopConcept"]) {
                subURLs(framework["skos:hasTopConcept"]);
            }
            return obj;
        }
    },
    methods: {
        spitEvent: function(message, id, page) {
            var framework = this.framework ? this.framework : this.$store.state.editor.framework;
            var selectedCompetency = this.$store.state.editor.selectedCompetency;
            var evt = {
                message: message,
                changed: id,
                selectedFramework: framework == null ? null : framework.shortId(),
                selectedCompetency: selectedCompetency == null ? null : selectedCompetency.shortId(),
                selectedFrameworkObject: framework == null ? null : JSON.parse(framework.toJson()),
                selectedCompetencyObject: selectedCompetency == null ? null : JSON.parse(selectedCompetency.toJson()),
                selectedFrameworkName: framework == null ? null : (framework.getName == null ? framework["dcterms:title"] : framework.getName()),
                selectedCompetencyName: selectedCompetency == null ? null : (selectedCompetency.getName == null ? selectedCompetency["skos:prefLabel"] : selectedCompetency.getName()),
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
                defaultLanguage = this.framework["dcterms:language"];
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
                xhr.open("GET", url, EcRemote.async);
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
            }
            if (xhr != null) {
                if (EcRemote.async) {
                    (xhr)["timeout"] = EcRemote.timeout;
                }
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
                    name = Thing.getDisplayStringFrom(name);
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
                        EcFramework.search(me.repo, "\"" + id + "\"", function(results) {
                            if (results.length <= 0) {
                                appLog("No references found for " + id + "... deleting.");
                                me.repo.deleteRegistered(EcRepository.getBlocking(id), function(success) {
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
        selectButton: function(selectedArray) {
            var ary = [];
            var async = EcRemote.async;
            EcRemote.async = false;
            if (!selectedArray) {
                selectedArray = this.selectedArray;
            }
            for (var i = 0; i < selectedArray.length; i++) {
                if (this.queryParams.selectVerbose === "true" && this.$store.getters['editor/conceptMode'] !== true) {
                    if (this.queryParams.selectExport === "ctdlasn") {
                        var link;
                        if (EcRepository.shouldTryUrl(selectedArray[i]) === false) {
                            link = this.repo.selectedServer + "ceasn/" + EcCrypto.md5(selectedArray[i]);
                        } else {
                            link = selectedArray[i].replace("/data/", "/ceasn/");
                        }
                        this.get(link, null, null, function(success) {
                            ary.push(JSON.parse(success));
                        }, function(failure) {
                            appLog(failure);
                        });
                    } else {
                        ary.push(JSON.parse(EcCompetency.getBlocking(selectedArray[i]).toJson()));
                    }
                } else if (this.queryParams.selectVerbose === "true") {
                    ary.push(JSON.parse(EcConcept.getBlocking(selectedArray[i]).toJson()));
                } else {
                    ary.push(selectedArray[i]);
                }
            }
            if (this.queryParams.selectRelations === "true" && this.framework.relation) {
                for (var i = 0; i < this.framework.relation.length; i++) {
                    var relation = EcAlignment.getBlocking(this.framework.relation[i]);
                    if (EcArray.has(selectedArray, relation.target)) {
                        if (this.queryParams.selectVerbose === "true") {
                            ary.push(JSON.parse((rld).toJson()));
                        } else {
                            ary.push(relation.shortId());
                        }
                    }
                }
            }
            var currentFramework = this.framework;
            if (this.queryParams.selectExport === "ctdlasn" && this.$store.getters['editor/conceptMode'] !== true) {
                if (this.framework != null) {
                    var link;
                    if (EcRepository.shouldTryUrl(this.framework.id) === false) {
                        link = this.repo.selectedServer + "ceasn/" + EcCrypto.md5(this.framework.id);
                    } else {
                        link = this.framework.id.replace("/data/", "/ceasn/");
                    }
                    this.get(link, null, null, function(success) {
                        success = JSON.parse(success);
                        if (success["@graph"]) {
                            currentFramework = success["@graph"][0];
                        }
                    }, function(failure) {
                        appLog(failure);
                    });
                }
            }
            var message = {
                message: "selected",
                selected: ary,
                type: this.$store.getters['editor/conceptMode'] === true ? 'Concept' : 'Competency',
                selectedFramework: currentFramework
            };
            message = JSON.parse(JSON.stringify(message));
            appLog(message);
            parent.postMessage(message, this.queryParams.origin);
            EcRemote.async = async;
        },
        addLevel: function(selectedCompetency, optionalLevelUrl) {
            var c;
            var me = this;
            var framework = this.framework ? this.framework : this.$store.getters['editor/framework'];
            var initialLevels = framework.level ? framework.level.slice() : null;
            if (!optionalLevelUrl) {
                c = new EcLevel();
                if (this.queryParams.newObjectEndpoint != null) {
                    c.generateShortId(this.queryParams.newObjectEndpoint);
                } else {
                    c.generateId(this.repo.selectedServer);
                }
                c["schema:dateCreated"] = new Date().toISOString();
                c.name = "New Level";
                c.competency = selectedCompetency;
            } else {
                optionalLevelUrl = optionalLevelUrl[0];
                var c = EcRepository.getBlocking(optionalLevelUrl);
                if (!c.competency) {
                    c.competency = [];
                } else if (!EcArray.isArray(c.competency)) {
                    c.competency = [c.competency];
                }
                c.competency.push(selectedCompetency);
            }
            framework["schema:dateModified"] = new Date().toISOString();
            this.repo.saveTo(c, function() {
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
                        framework = EcEncryptedValue.toEncryptedValue(framework);
                    }
                }
                me.repo.saveTo(framework, function() {
                    me.$store.commit('lode/setIsAddingProperty', false);
                    me.$store.commit('editor/refreshLevels', true);
                }, appError);
            }, appError);
        },
        saveCheckedLevels: function(selectedCompetency, checkedOptions, allOptions) {
            var competencyId = EcRemoteLinkedData.trimVersionFromUrl(selectedCompetency["@id"]);
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
                    var level = EcLevel.getBlocking(allOptions[i].val);
                    var initialComp = JSON.parse(JSON.stringify(level.competency));
                    if (!EcArray.isArray(level.competency)) {
                        level.competency = level.competency == null ? [] : [level.competency];
                    }
                    if (level.competency.indexOf(competencyId) === -1) {
                        level.competency.push(competencyId);
                        edits.push({operation: "update", id: level.shortId(), fieldChanged: ["competency"], initialValue: [initialComp], changedValue: [level.competency]});
                        this.repo.saveTo(level, function() {
                            me.$store.commit('editor/refreshLevels', true);
                        }, appError);
                    }
                    if (this.framework.level.indexOf(level.shortId()) === -1) {
                        this.framework.addLevel(level.shortId());
                        frameworkChanged = true;
                    }
                } else {
                    // If not selected
                    var level = EcLevel.getBlocking(allOptions[i].val);
                    var initialComp = JSON.parse(JSON.stringify(level.competency));
                    if (level.competency && level.competency.indexOf(competencyId) !== -1) {
                        EcArray.setRemove(level.competency, competencyId);
                        edits.push({operation: "update", id: level.shortId(), fieldChanged: ["competency"], initialValue: [initialComp], changedValue: [level.competency]});
                        this.repo.saveTo(level, function() {
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
        saveFramework: function() {
            this.framework["schema:dateModified"] = new Date().toISOString();
            var framework = this.framework;
            this.$store.commit('editor/framework', framework);
            if (this.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[framework.id] !== true) {
                framework = EcEncryptedValue.toEncryptedValue(framework);
            }
            this.repo.saveTo(framework, function() {}, appError);
        },
        removeLevelFromFramework: function(levelId) {
            var initialLevels = this.framework.level ? this.framework.level.slice() : null;
            this.framework.removeLevel(levelId);
            var level = EcRepository.getBlocking(levelId);
            this.$store.commit('editor/addEditsToUndo', [
                {operation: "delete", obj: level},
                {operation: "update", id: this.framework.shortId(), fieldChanged: [this.framework.level], initialValue: [initialLevels], changedValue: [this.framework.level]}
            ]);
            this.conditionalDelete(levelId);
            this.saveFramework();
        },
        addRelationsToFramework: function(selectedCompetency, property, values) {
            if (values.length > 0) {
                selectedCompetency = EcRepository.getBlocking(selectedCompetency);
                this.addAlignments(values, selectedCompetency, property);
            }
        },
        addAlignments: function(targets, thing, relationType, allowSave) {
            if (this.$store.getters['editor/queryParams'].concepts === "true") {
                return this.addConceptAlignments(targets, thing, relationType);
            }
            if (relationType === "ceasn:skillEmbodied" || relationType === "ceasn:abilityEmbodied" || relationType === "ceasn:knowledgeEmbodied" || relationType === "ceasn:taskEmbodied") {
                // This property is attached to competency, not a relation attached to framework
                return this.addRelationAsCompetencyField(targets, thing, relationType, allowSave);
            }
            var framework = this.$store.state.editor.framework;
            var edits = [];
            var initialRelations = framework.relation ? framework.relation.slice() : null;
            for (var i = 0; i < targets.length; i++) {
                var r = new EcAlignment();
                if (this.$store.getters['editor/queryParams'].newObjectEndpoint != null) {
                    r.generateShortId(this.$store.getters['editor/queryParams'].newObjectEndpoint);
                } else {
                    r.generateId(this.repo.selectedServer);
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
                if (EcIdentityManager.ids.length > 0) {
                    r.addOwner(EcIdentityManager.ids[0].ppk.toPk());
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
                    r = EcEncryptedValue.toEncryptedValue(r);
                }
                this.repo.saveTo(r, function() {}, appError);
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
                framework = EcEncryptedValue.toEncryptedValue(framework);
            }
            this.repo.saveTo(framework, function() {}, appError);
        },
        addRelationAsCompetencyField: function(targets, thing, relationType, allowSave) {
            var me = this;
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
                    thing = EcEncryptedValue.toEncryptedValue(thing);
                }
            }
            me.repo.saveTo(thing, function() {}, appError);
        },
        removeRelationFromFramework: function(source, property, target) {
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
            }, function() {
                var framework = me.framework;
                edits.push({operation: "update", id: framework.shortId(), fieldChanged: ["relation"], initialValue: [initialRelations], changedValue: [framework.relation]});
                me.$store.commit('editor/framework', framework);
                me.$store.commit('editor/addEditsToUndo', edits);
                if (me.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[framework.id] !== true) {
                    framework = EcEncryptedValue.toEncryptedValue(framework);
                }
                me.repo.saveTo(framework, function() {}, appError);
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