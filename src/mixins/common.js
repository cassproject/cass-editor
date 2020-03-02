export default {
    computed: {
        levels: function() {
            var levels = {};
            if (!this.framework.level) {
                return null;
            }
            for (var i = 0; i < this.framework.level.length; i++) {
                var level = EcLevel.getBlocking(this.framework.level[i]);
                var comp = level.competency;
                if (!EcArray.isArray(comp)) {
                    comp = [comp];
                }
                for (var j = 0; j < comp.length; j++) {
                    if (!EcArray.isArray(levels[comp[j]])) {
                        levels[comp[j]] = [];
                    }
                    levels[comp[j]].push(level);
                }
            }
            return levels;
        },
        relations: function() {
            if (!this.framework.relation) {
                return null;
            }
            var relations = {};
            for (var i = 0; i < this.framework.relation.length; i++) {
                var a = EcAlignment.getBlocking(this.framework.relation[i]);
                if (a) {
                    var relationType = a.relationType;
                    var reciprocalRelation = null;
                    if (this.queryParams.ceasnDataFields === "true" && relationType === "narrows") {
                        if (this.framework.competency.indexOf(a.target) !== -1) {
                            relationType = "isChildOf";
                            reciprocalRelation = "hasChild";
                        }
                    }
                    if (relationType === "narrows") {
                        reciprocalRelation = "broadens";
                    }
                    if (!relations[relationType]) {
                        relations[relationType] = {};
                    }
                    if (!relations[relationType][a.source]) {
                        relations[relationType][a.source] = [];
                    }
                    relations[relationType][a.source].push(a.target);
                    if (reciprocalRelation) {
                        if (!relations[reciprocalRelation]) {
                            relations[reciprocalRelation] = {};
                        }
                        if (!relations[reciprocalRelation][a.target]) {
                            relations[reciprocalRelation][a.target] = [];
                        }
                        relations[reciprocalRelation][a.target].push(a.source);
                    }
                }
            }
            return relations;
        },
        ctids: function() {
            if (this.queryParams.ceasnDataFields !== "true") {
                return null;
            }
            var obj = {};
            obj[this.framework.shortId()] = [this.getCTID(this.framework.shortId())];
            if (this.framework.competency) {
                for (var i = 0; i < this.framework.competency.length; i++) {
                    obj[this.framework.competency[i]] = [this.getCTID(this.framework.competency[i])];
                }
            }
            return obj;
        },
        registryURLs: function() {
            if (this.queryParams.ceasnDataFields !== "true") {
                return null;
            }
            var obj = {};
            obj[this.framework.shortId()] = [this.ceasnRegistryUriTransform(this.framework.shortId())];
            if (this.framework.competency) {
                for (var i = 0; i < this.framework.competency.length; i++) {
                    obj[this.framework.competency[i]] = [this.ceasnRegistryUriTransform(this.framework.competency[i])];
                }
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
            console.log(evt);
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
            this.$store.commit('defaultLanguage', defaultLanguage);
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
                                failure(xhrx.responseText);
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
                console.log(error);
            });
        },
        conditionalDelete: function(id, depth) {
            var me = this;
            (function(id, depth) {
                Task.asyncImmediate(function(callback) {
                    if (depth === undefined || depth == null) depth = 0;
                    if (id == null || id === undefined) {
                        console.trace("ID is undefined.");
                    }
                    if (depth < 5) {
                        EcFramework.search(me.repo, "\"" + id + "\"", function(results) {
                            if (results.length <= 0) {
                                console.log("No references found for " + id + "... deleting.");
                                me.repo.deleteRegistered(EcRepository.getBlocking(id), function(success) {
                                    callback();
                                }, function(failure) {
                                    console.log(failure);
                                    callback();
                                });
                            } else {
                                console.log(results.length + " references found for " + id + "... Not deleting. Will see again in another second.");
                                callback();
                                setTimeout(function() {
                                    me.conditionalDelete(id, depth + 1);
                                }, 1000);
                            }
                        }, console.error, {});
                    } else {
                        callback();
                    }
                });
            })(id, depth);
        },
        selectButton: function() {
            var ary = [];
            var async = EcRemote.async;
            EcRemote.async = false;
            for (var i = 0; i < this.selectedArray.length; i++) {
                if (this.queryParams.selectVerbose === "true" && this.queryParams.concepts !== "true") {
                    if (this.queryParams.selectExport === "ctdlasn") {
                        var link;
                        if (EcRepository.shouldTryUrl(this.selectedArray[i]) === false) {
                            link = this.repo.selectedServer + "ceasn/" + EcCrypto.md5(this.selectedArray[i]);
                        } else {
                            link = this.selectedArray[i].replace("/data/", "/ceasn/");
                        }
                        this.get(link, null, null, function(success) {
                            ary.push(JSON.parse(success));
                        }, function(failure) {
                            console.log(failure);
                        });
                    } else {
                        ary.push(JSON.parse(EcCompetency.getBlocking(this.selectedArray[i]).toJson()));
                    }
                } else if (this.queryParams.selectVerbose === "true") {
                    ary.push(JSON.parse(EcConcept.getBlocking(this.selectedArray[i]).toJson()));
                } else {
                    ary.push(this.selectedArray[i]);
                }
            }
            if (this.queryParams.selectRelations === "true" && this.framework.relation) {
                for (var i = 0; i < this.framework.relation.length; i++) {
                    var relation = EcAlignment.getBlocking(this.framework.relation[i]);
                    if (EcArray.has(this.selectedArray, relation.target)) {
                        if (this.queryParams.selectVerbose === "true") {
                            ary.push(JSON.parse((rld).toJson()));
                        } else {
                            ary.push(relation.shortId());
                        }
                    }
                }
            }
            var currentFramework = this.framework;
            if (this.queryParams.selectExport === "ctdlasn" && this.queryParams.concepts !== "true") {
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
                        console.log(failure);
                    });
                }
            }
            var message = {
                message: "selected",
                selected: ary,
                type: this.queryParams.concepts === "true" ? 'Concept' : 'Competency',
                selectedFramework: currentFramework
            };
            message = JSON.parse(JSON.stringify(message));
            console.log(message);
            parent.postMessage(message, this.queryParams.origin);
            EcRemote.async = async;
        },
        addLevel: function(selectedCompetency) {
            var c = new EcLevel();
            var me = this;
            if (this.queryParams.newObjectEndpoint != null) {
                c.generateShortId(this.queryParams.newObjectEndpoint);
            } else {
                c.generateId(this.repo.selectedServer);
            }
            c["schema:dateCreated"] = new Date().toISOString();
            if (EcIdentityManager.ids.length > 0) {
                c.addOwner(EcIdentityManager.ids[0].ppk.toPk());
            }
            c.name = "New Level";
            c.competency = selectedCompetency;
            if (this.queryParams.private === "true") {
                c = EcEncryptedValue.toEncryptedValue(c);
                if (EcEncryptedValue.encryptOnSaveMap[this.framework.id] !== true) {
                    framework = EcEncryptedValue.toEncryptedValue(framework);
                }
            }
            this.repo.saveTo(c, function() {
                me.framework.addLevel(c.shortId());
            }, console.error);
        },
        saveFramework: function() {
            this.framework["schema:dateModified"] = new Date().toISOString();
            var framework = this.framework;
            this.$store.commit('framework', framework);
            if (this.queryParams.private === "true" && EcEncryptedValue.encryptOnSaveMap[framework.id] !== true) {
                framework = EcEncryptedValue.toEncryptedValue(framework);
            }
            this.repo.saveTo(framework, function() {}, console.error);
        },
        removeLevelFromFramework: function(levelId) {
            this.framework.removeLevel(levelId);
            this.conditionalDelete(levelId);
            this.saveFramework();
        },
        addRelationsToFramework: function(selectedCompetency, property, values) {
            if (values.length > 0) {
                this.$parent.addAlignments(values, selectedCompetency, property);
            }
        },
        removeRelationFromFramework: function(source, property, target) {
            var me = this;
            new EcAsyncHelper().each(this.framework.relation, function(relation, callback) {
                EcAlignment.get(relation, function(r) {
                    if (property === "broadens") {
                        if (r.target === source && r.source === target && r.relationType === "narrows") {
                            me.framework.removeRelation(r.shortId());
                            me.conditionalDelete(r.shortId());
                            callback();
                        } else {
                            callback();
                        }
                    } else if (r.source === source && r.target === target && r.relationType === property) {
                        me.framework.removeRelation(r.shortId());
                        me.conditionalDelete(r.shortId());
                        callback();
                    } else {
                        callback();
                    }
                }, callback);
            }, function() {
                var framework = me.framework;
                me.$store.commit('framework', framework);
                if (me.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[framework.id] !== true) {
                    framework = EcEncryptedValue.toEncryptedValue(framework);
                }
                me.repo.saveTo(framework, function() {}, console.error);
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
        }
    }
};