export default {
    methods: {
        spitEvent: function(message, id, page) {
            var evt = {
                message: message,
                changed: id,
                selectedFramework: this.framework == null ? null : this.framework.shortId(),
                selectedCompetency: this.selectedCompetency == null ? null : this.selectedCompetency.shortId(),
                selectedFrameworkObject: this.framework == null ? null : JSON.parse(this.framework.toJson()),
                selectedCompetencyObject: this.selectedCompetency == null ? null : JSON.parse(this.selectedCompetency.toJson()),
                selectedFrameworkName: this.framework == null ? null : (this.framework.getName == null ? this.framework["dcterms:title"] : this.framework.getName()),
                selectedCompetencyName: this.selectedCompetency == null ? null : (this.selectedCompetency.getName == null ? this.selectedCompetency["skos:prefLabel"] : this.selectedCompetency.getName()),
                visiblePage: page
            };
            if (this.queryParams && this.queryParams.ceasnDataFields === "true") {
                if (this.framework != null) {
                    if (this.framework.getGuid != null) {
                        if (this.framework.getGuid().startsWith("ce-")) {
                            evt.selectedFrameworkCtid = this.framework == null ? null : this.framework.getGuid();
                        } else if (this.framework.getGuid().matches("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$")) {
                            evt.selectedFrameworkCtid = this.framework == null ? null : "ce-" + this.framework.getGuid();
                        } else {
                            evt.selectedFrameworkCtid = "ce-" + new UUID(3, "nil", this.framework.shortId()).format();
                        }
                    }
                }
                var selectedCompetency = this.$store.state.editor.selectedCompetency;
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
            }, function(error) {
                console.log(error);
            });
        }
    }
};