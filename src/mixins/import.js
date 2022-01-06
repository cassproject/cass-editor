export default {
    data() {
        return {
            repo: window.repo
        };
    },
    methods: {
        showRightAside: function() {
            this.$store.commit('app/showRightAside', {});
        },
        selectedArrayEvent: function(ary) {
            this.selectedArray = ary;
        },
        clearFiles: function() {
            this.$store.commit('app/clearImportFiles');
        },
        cancelImport: function() {
            this.$emit("delete-object", this.importFramework);
            this.resetImport();
        },
        resetImport: function() {
            this.$store.commit('app/resetImport');
        },
        onEditMultiple: function() {
            this.showEditMultiple = true;
            var payload = {
                profile: this.hierarchyProfile,
                selectedCompetencies: this.selectedArray,
                component: 'MultiEdit'
            };
            this.$store.commit('app/showModal', payload);
        },
        handleSearch: function(e) {
            this.$store.commit('app/showModal', e);
        },
        onEditNode: function() {
            this.editingNode = true;
        },
        onDoneEditingNode: async function() {
            this.changedObj = await EcRepository.get(this.importFramework.shortId());
            this.editingNode = false;
        },
        handleDoneLoading: function() {
            appLog("done loading");
            this.hierarchyIsdoneLoading = true;
        },
        showModal(val, data) {
            let params = {};
            if (val === 'duplicate') {
                params = {
                    type: val,
                    title: "Duplicate framework",
                    text: "A framework has already been imported under the name " + data.name + ". Do you want to overwrite it?",
                    options: ["Overwrite framework", "Save import as a new framework"],
                    currentName: data.name,
                    onConfirm: (newName) => {
                        return this.savePdfImport(data, newName);
                    },
                    onCancel: () => {
                        return this.clearImport();
                    }
                };
            } else if (val === 'duplicateOverwriteOnly') {
                if (data[1] && (!EcIdentityManager.default.ids || EcIdentityManager.default.ids.length === 0)) {
                    // An owner is attached from the server-side import so it can be overwritten, just not edited
                    let type = data[1].subType === "Collection" ? "collection" : "framework";
                    params = {
                        type: val,
                        title: "Duplicate " + type,
                        text: (data[0].name ? ("The " + type + " " + data[0].name) : "This " + type) + " has already been imported. You can overwrite it but will not be able to edit it since you're not logged in. Do you want to overwrite it?",
                        onConfirm: () => {
                            if (this.importType === "url") {
                                return this.importJsonLd(data[0]);
                            }
                            if (this.serverType === "cass") {
                                return this.continueCassImport(data[0]);
                            }
                            return this.continueCaseImport(data[0]);
                        },
                        onCancel: () => {
                            if (data[0][1]) {
                                // more imports in the queue
                                if (this.serverType === "cass") {
                                    return this.importCassFrameworks(data[0]);
                                }
                                return this.importCase(data[0]);
                            }
                            return this.clearImport();
                        }
                    };
                } else {
                    let type = data[1] && data[1].subType === "Collection" ? "collection" : "framework";
                    params = {
                        type: val,
                        title: "Duplicate " + type,
                        text: (data[0].name ? ("The " + type + " " + data[0].name) : "This " + type) + " has already been imported. If you're a " + type + " admin you can overwrite it. Do you want to overwrite it?",
                        onConfirm: () => {
                            if (this.importType === "url") {
                                return this.importJsonLd(data[0]);
                            } else if (this.serverType === "cass") {
                                return this.continueCassImport(data[0]);
                            }
                            return this.continueCaseImport(data[0]);
                        },
                        onCancel: () => {
                            if (this.importType === "url") {
                                return this.clearImport();
                            }
                            if (this.serverType === "cass") {
                                return this.importCassFrameworks(data[0]);
                            }
                            return this.importCase(data[0]);
                        }
                    };
                }
            } else if (val === 'error') {
                params = {
                    type: val,
                    title: "Error",
                    text: data.message,
                    details: data.details
                };
                this.$store.commit('app/importModalParams', params);
                this.$store.commit('app/showModal', {component: 'ImportError'});
                return;
            }
            // reveal modal
            this.$store.commit('app/importModalParams', params);
            this.$store.commit('app/showModal', {component: 'DuplicateImport'});
        },
        unsupportedFile: function(val) {
            this.$store.commit('app/importFileType', val);
            let error = "File type " + fileType + " is unsupported in this workflow";
            this.$store.commit('app/addImportError', error);
            me.$store.commit('app/importTransition', 'process');
        },
        /* When an import is "successful" */
        importSuccess: function() {
            if (!this.conceptMode) {
                let feedback = "Competency detected";
                this.$store.commit('app/importStatus', feedback);
                if (this.isT3Import) {
                    this.$store.commit('app/importTransition', 'detail');
                } else {
                    this.$store.commit('app/importTransition', 'preview');
                }
            } else {
                let name = "Taxonomy";
                if (this.queryParams.ceasnDataFields === 'true') {
                    name = "Concept Scheme";
                }
                this.$store.commit('app/importStatus', name + " Imported.");
                this.$store.commit('app/importTransition', 'preview');
            }
        },
        importDetailsAccept: function() {
            this.$store.commit('app/importStatus', 'Edit and approve');
            this.$store.commit('app/importTransition', 'preview');
        },
        importPreviewAccept: function() {
            this.$store.commit('app/importStatus', 'Import Complete!');
            this.$store.commit('app/importTransition', 'light');
        },
        clearImport: function() {
            this.$store.commit('app/importFramework', null);
            this.$store.commit('app/clearImportFiles');
            this.$store.commit('app/clearImportErrors');
            this.$store.commit('app/importTransition', 'upload');
            this.$store.commit('app/importStatus', '');
            this.$store.commit('app/importFeedback', '');
            this.$store.commit('app/importFileType', '');
            if (this.caseDocs) {
                this.caseDocs = [];
            }
        },
        uploadFiles: function() {
            this.fileChange(this.importFile);
        },
        fileChange: function(e) {
            appLog('file change', e);
            this.$store.commit('app/clearImportErrors');
            this.$store.commit('app/importTransition', 'process');
            this.$store.commit('app/firstImport', true);
            this.analyzeImportFile();
        },
        analyzeImportFile: function() {
            var me = this;
            var file = this.importFile[0];
            appLog("file is", file);
            var feedback;
            if (file.name.endsWith(".csv")) {
                if (this.conceptMode) {
                    CTDLASNCSVConceptImport.analyzeFile(file, function(frameworkCount, competencyCount) {
                        me.$store.commit('app/importFileType', 'conceptcsv');
                        let name = "taxonomies";
                        if (me.queryParams.ceasnDataFields === 'true') {
                            name = "concept schemes";
                        }
                        feedback = "Import " + frameworkCount + " " + name + " and " + competencyCount + " concepts.";
                        me.$store.commit('app/importStatus', feedback);
                        me.$store.commit('app/importTransition', 'info');
                    }, function(errorMsg) {
                        me.$store.commit('app/addImportError', errorMsg);
                        me.$store.commit('app/importTransition', 'process');
                    });
                } else {
                    CTDLASNCSVImport.analyzeFile(file, function(frameworkCount, competencyCount, collectionCount) {
                        if (frameworkCount) {
                            me.$store.commit('app/importFileType', 'ctdlasncsv');
                            feedback = "Import " + frameworkCount + " frameworks and " + competencyCount + " competencies.";
                        } else if (collectionCount) {
                            me.$store.commit('app/importFileType', 'collectioncsv');
                            feedback = "Import " + collectionCount + " collections and " + competencyCount + " competencies.";
                        }
                        me.$store.commit('app/importStatus', feedback);
                        me.$store.commit('app/importTransition', 'info');
                    }, function(errorMsg) {
                        CSVImport.analyzeFile(file, function(data) {
                            me.$store.commit('app/importFileType', 'csv');
                            me.importFrameworkName = file.name.replace(".csv", "");
                            for (let i = 0; i < data.length; i++) {
                                if (data[i][0] === "") {
                                    data.splice(i, 1);
                                }
                            }
                            for (var i = 0; i < data[0].length; i++) {
                                let column = {};
                                column.name = data[0][i];
                                column.index = i;
                                me.csvColumns.push(column);
                                if (column.name.toLowerCase().indexOf("name") !== -1) {
                                    me.importCsvColumnName = column;
                                }
                                if (column.name.toLowerCase().indexOf("description") !== -1) {
                                    me.importCsvColumnDescription = column;
                                }
                                if (column.name.toLowerCase().indexOf("scope") !== -1) {
                                    me.importCsvColumnScope = column;
                                }
                                if (column.name.toLowerCase().indexOf("id") !== -1) {
                                    me.importCsvColumnId = column;
                                }
                            }
                            me.$store.commit('app/importStatus', (me.competencyCount = (data.length - 1)) + " Competencies Detected.");
                            me.$store.commit('app/importTransition', 'info');
                        }, function(error) {
                            me.$store.commit('app/addImportError', error);
                            me.$store.commit('app/importTransition', 'process');
                        });
                    });
                }
            } else if (file.name.endsWith(".json") || file.name.endsWith(".jsonld")) {
                // Try JSON-LD first, checks for @graph
                this.analyzeJsonLdFramework(file, function(data, ctdlasn) {
                    var invalid = false;
                    var error;
                    var feedback;
                    if (ctdlasn === "ctdlasnConcept") {
                        if (me.conceptMode) {
                            if (me.queryParams.ceasnDataFields === 'true') {
                                me.$store.commit('app/importStatus', "1 Concept Scheme Detected.");
                            } else {
                                me.$store.commit('app/importStatus', "1 Taxonomy Detected.");
                            }
                            me.$store.commit('app/importFileType', 'ctdlasnjsonld');
                            me.$store.commit('app/importTransition', 'info');
                        } else {
                            if (me.queryParams.ceasnDataFields === 'true') {
                                var message = "Concept Schemes must be imported in the concept scheme editor.";
                            } else {
                                var message = "Taxonomies must be imported in the taxonomy editor.";
                            }
                            invalid = true;
                            me.$store.commit('app/addImportError', message);
                            me.$store.commit('app/importTransition', 'process');
                        }
                    } else {
                        if (!me.conceptMode) {
                            if (ctdlasn === 'ctdlasnCollection') {
                                me.$store.commit('app/importFileType', 'ctdlasnjsonldcollection');
                                feedback = "1 Collection and " + (EcObject.keys(data).length - 1) + " Competencies Detected.";
                            } else {
                                me.$store.commit('app/importFileType', 'ctdlasnjsonld');
                                feedback = "1 Framework and " + (EcObject.keys(data).length - 1) + " Competencies Detected.";
                            }
                            me.$store.commit('app/importStatus', feedback);
                            me.$store.commit('app/importTransition', 'info');
                        } else {
                            error = "Frameworks must be imported in the competency editor.";
                            invalid = true;
                            me.$store.commit('app/addImportError', error);
                            me.$store.commit('app/importTransition', 'process');
                        }
                    }
                    me.competencyCount = EcObject.keys(data).length;
                    if (!invalid && (ctdlasn === "ctdlasn" || ctdlasn === "ctdlasnConcept" || ctdlasn === "ctdlasnCollection")) {
                        // Do nothing
                    } else if (!invalid) {
                        let error = "Context is not CTDL-ASN";
                        me.$store.commit('app/addImportError', error);
                        me.$store.commit('app/importTransition', 'process');
                    }
                }, function(failure) {
                    if (file.name.endsWith(".json") && !me.conceptMode) {
                        // If JSON-LD doesn't work, try JSON
                        ASNImport.analyzeFile(file, function(data) {
                            me.$store.commit('app/importFileType', 'asn');
                            me.$store.commit('app/importStatus', "1 Framework and " + EcObject.keys(data).length + " Competencies Detected.");
                            me.$store.commit('app/importTransition', 'info');
                            me.competencyCount = EcObject.keys(data).length;
                        }, function(error) {
                            me.$store.commit('app/addImportError', error);
                            me.$store.commit('app/importTransition', 'process');
                        });
                    } else {
                        me.$store.commit('app/addImportError', failure);
                        me.$store.commit('app/importTransition', 'process');
                    }
                });
            } else if (file.name.endsWith(".xml")) {
                if (this.conceptMode) {
                    me.$store.commit('app/importTransition', 'process');
                    if (me.queryParams.ceasnDataFields === 'true') {
                        me.$store.commit('app/addImportError', "This is not a valid file format for concept schemes");
                    } else {
                        me.$store.commit('app/addImportError', "This is not a valid file format for taxonomies");
                    }
                } else {
                    MedbiqImport.analyzeFile(file, function(data) {
                        me.$store.commit('app/importFileType', 'medbiq');
                        me.importFrameworkName = file.name.replace(".xml", "");
                        me.$store.commit('app/importStatus', "1 Framework and " + EcObject.keys(data).length + " Competencies Detected.");
                        me.competencyCount = EcObject.keys(data).length;
                        me.$store.commit('app/importTransition', 'info');
                    }, function(error) {
                        me.$store.commit('app/importTransition', 'process');
                        me.$store.commit('app/addImportError', error);
                    });
                }
            } else if (file.name.endsWith(".pdf")) {
                if (this.conceptMode) {
                    me.$store.commit('app/importTransition', 'process');
                    if (me.queryParams.ceasnDataFields === 'true') {
                        me.$store.commit('app/addImportError', "This is not a valid file format for concept schemes");
                    } else {
                        me.$store.commit('app/addImportError', "This is not a valid file format for taxonomies");
                    }
                } else {
                    me.$store.commit('app/importFileType', 'pdf');
                    me.firstImport = false;
                    me.detailsDetected.fileType = "pdf";
                    me.$store.commit('app/importStatus', "File selected.");
                    me.$store.commit('app/importTransition', 'info');
                }
            } else if (file.name.endsWith(".docx")) {
                if (this.conceptMode) {
                    me.$store.commit('app/importTransition', 'process');
                    if (me.queryParams.ceasnDataFields === 'true') {
                        me.$store.commit('app/addImportError', "This is not a valid file format for concept schemes");
                    } else {
                        me.$store.commit('app/addImportError', "This is not a valid file format for taxonomies");
                    }
                } else {
                    me.$store.commit('app/importFileType', "pdf");
                    me.firstImport = false;
                    me.$store.commit('app/importStatus', "File selected.");
                    me.$store.commit('app/importTransition', 'info');
                }
            } else if (file.name.endsWith(".html")) {
                if (this.conceptMode) {
                    me.$store.commit('app/importTransition', 'process');
                    if (me.queryParams.ceasnDataFields === 'true') {
                        me.$store.commit('app/addImportError', "This is not a valid file format for concept schemes");
                    } else {
                        me.$store.commit('app/addImportError', "This is not a valid file format for taxonomies");
                    }
                } else {
                    me.$store.commit('app/importFileType', "pdf");
                    me.detailsDetected.fileType = "html";
                    me.firstImport = false;
                    me.$store.commit('app/importStatus', "File selected.");
                    me.$store.commit('app/importTransition', 'info');
                }
            } else {
                me.$store.commit('app/importFileType', '');
                let error = ("CaSS cannot read the file " + file.name + ". Please check that the file has the correct file extension.");
                me.$store.commit('app/addImportError', error);
                me.$store.commit('app/importTransition', 'process');
                return;
            }
            if (!me.firstImport) {
                me.importFromFile();
            }
        },
        analyzeCsvRelation: function(e) {
            appLog(e);
            var files = e.target.files || e.dataTransfer.files;
            var relationFile;
            if (!files.length) {
                relationFile = null;
            } else {
                relationFile = files[0];
            }
            this.$store.commit('app/csvRelationFile', relationFile);
            let me = this;
            CSVImport.analyzeFile(relationFile, function(data) {
                for (var i = 0; i < data[0].length; i++) {
                    let column = {};
                    column.name = data[0][i];
                    column.index = i;
                    me.csvRelationColumns.push(column);
                    if (column.name.toLowerCase().indexOf("source") !== -1) {
                        me.importSourceColumn = column;
                    }
                    if (column.name.toLowerCase().indexOf("origin") !== -1) {
                        me.importSourceColumn = column;
                    }
                    if (column.name.toLowerCase().indexOf("type") !== -1) {
                        me.importRelationColumn = column;
                    }
                    if (column.name.toLowerCase().indexOf("target") !== -1) {
                        me.importTargetColumn = column;
                    }
                    if (column.name.toLowerCase().indexOf("destination") !== -1) {
                        me.importTargetColumn = column;
                    }
                }
                me.relationCount = (data.length - 1);
            }, function(error) {
                me.$store.commit('app/importStatus', error);
                me.$store.commit('app/importTransition', 'process');
                me.$store.commit('app/addImportError', error);
            });
        },
        analyzeJsonLdFramework: function(file, success, failure) {
            if (file == null) {
                failure("No file to analyze");
                return;
            }
            if ((file)["name"] == null) {
                failure("Invalid file");
                return;
            }
            var reader = new FileReader();
            reader.onload = function(e) {
                var result = ((e)["target"])["result"];
                var jsonObj = JSON.parse(result);
                if (jsonObj["@graph"]) {
                    if (jsonObj["@context"] === "http://credreg.net/ctdlasn/schema/context/json" || jsonObj["@context"] === "http://credreg.net/ctdl/schema/context/json" ||
                        jsonObj["@context"] === "https://credreg.net/ctdlasn/schema/context/json" || jsonObj["@context"] === "https://credreg.net/ctdl/schema/context/json") {
                        if (jsonObj["@graph"][0]["@type"].indexOf("Concept") !== -1) {
                            success(jsonObj["@graph"], "ctdlasnConcept");
                        } else if (jsonObj["@graph"][0]["@type"].indexOf("Collection") !== -1) {
                            success(jsonObj["@graph"], "ctdlasnCollection");
                        } else {
                            success(jsonObj["@graph"], "ctdlasn");
                        }
                    } else {
                        success(jsonObj["@graph"], null);
                    }
                } else {
                    failure("Invalid file");
                }
            };
            reader.readAsText(file, "UTF-8");
        },
        importMedbiq: function() {
            var identity = EcIdentityManager.default.ids[0];
            var f = new EcFramework();
            if (identity != null) { f.addOwner(identity.ppk.toPk()); }
            if (this.queryParams.newObjectEndpoint != null && this.queryParams.newObjectEndpoint !== undefined) {
                f.generateShortId(this.queryParams.newObjectEndpoint == null ? this.repo.selectedServer : this.queryParams.newObjectEndpoint);
            } else {
                f.generateId(this.queryParams.newObjectEndpoint == null ? this.repo.selectedServer : this.queryParams.newObjectEndpoint);
            }
            f["schema:dateCreated"] = new Date().toISOString();
            appLog(this.importFrameworkName);
            f.setName(this.importFrameworkName);
            f.setDescription(this.importFrameworkDescription);
            let me = this;
            MedbiqImport.importCompetencies(this.queryParams.newObjectEndpoint == null ? this.repo.selectedServer : this.queryParams.newObjectEndpoint, identity, function(competencies) {
                for (var i = 0; i < competencies.length; i++) {
                    f.addCompetency(competencies[i].shortId());
                }
                me.repo.saveTo(f, function(success) {
                    me.importFile.splice(0, 1);
                    if (me.importFile.length > 0) {
                        me.firstImport = false;
                        me.analyzeImportFile();
                    } else {
                        me.$store.commit('app/importFramework', f);
                        me.$store.commit('editor/framework', f);
                        me.importSuccess();
                        me.spitEvent("importFinished", f.shortId(), "importPage");
                    }
                }, function(failure) {
                    me.$store.commit('app/importStatus', failure);
                    me.$store.commit('app/importTransition', 'process');
                    me.$store.commit('app/addImportError', failure);
                });
            },
            function(failure) {
                me.$store.commit('app/importStatus', failure);
                me.$store.commit('app/importTransition', 'process');
                me.$store.commit('app/addImportError', failure);
            },
            function(increment) {
                me.$store.commit('app/importStatus', increment.competencies + "/" + me.competencyCount + " competencies imported.");
            }, me.repo);
        },
        importAsn: function() {
            var identity = EcIdentityManager.default.ids[0];
            let me = this;
            me.$store.commit('app/importTransition', 'process');
            ASNImport.importCompetencies(this.repo.selectedServer, identity, true, function(competencies, f) {
                me.importFile.splice(0, 1);
                if (me.importFile.length > 0) {
                    me.firstImport = false;
                    me.analyzeImportFile();
                } else {
                    me.$store.commit('app/importFramework', f);
                    me.$store.commit('editor/framework', f);
                    me.importSuccess();
                    me.spitEvent("importFinished", f.shortId(), "importPage");
                }
            },
            function(failure) {
                me.$store.commit('app/importTransition', 'process');
                me.$store.commit('app/addImportError', failure);
            },
            function(increment) {
                me.$store.commit('app/importStatus', increment.competencies + "/" + me.competencyCount + " competencies imported.");
            }, me.repo);
        },
        importCtdlAsnCsv: function() {
            let ceo = null;
            if (EcIdentityManager.default.ids.length > 0) { ceo = EcIdentityManager.default.ids[0]; }
            let me = this;
            CTDLASNCSVImport.importFrameworksAndCompetencies(me.repo, me.importFile[0], function(frameworks, competencies, relations) {
                for (var i = 0; i < frameworks.length; i++) {
                    if (me.queryParams.ceasnDataFields === true) {
                        if (frameworks[i]["schema:inLanguage"] == null || frameworks[i]["schema:inLanguage"] === undefined) {
                            me.setDefaultLanguage();
                            frameworks[i]["schema:inLanguage"] = me.$store.state.editor.defaultLanguage;
                        }
                    }
                    if (frameworks[i]["schema:dateModified"] == null || frameworks[i]["schema:dateModified"] === undefined) {
                        frameworks[i]["schema:dateModified"] = new Date().toISOString();
                    }
                    if (frameworks[i]["schema:dateCreated"] == null || frameworks[i]["schema:dateCreated"] === undefined) {
                        frameworks[i]["schema:dateCreated"] = new Date().toISOString();
                    }
                }
                var all = frameworks.concat(competencies).concat(relations);
                me.$store.commit('app/importStatus', "Saving " + all.length + " objects.");
                me.repo.multiput(all, function() {
                    for (var i = 0; i < frameworks.length; i++) {
                        me.$store.commit('app/importFramework', frameworks[i]);
                        me.$store.commit('editor/framework', frameworks[i]);
                        me.spitEvent("importFinished", frameworks[i].shortId(), "importPage");
                    }
                    me.importFile.splice(0, 1);
                    if (me.importFile.length > 0) {
                        me.firstImport = false;
                        me.analyzeImportFile();
                    } else {
                        if (frameworks.length === 1) {
                            me.importSuccess();
                        } else {
                            // If multiple frameworks uploaded, go to list instead of the last framework in the spreadsheet
                            me.$store.commit('app/sortResults', {
                                id: 'dateCreated',
                                label: 'created date'
                            });
                            if (me.importFileType === 'ctdlasncsv') {
                                me.$router.push({name: "frameworks"});
                            } else {
                                me.$router.push({name: "collections"});
                            }
                        }
                    }
                }, function(failure) {
                    me.$store.commit('app/importStatus', failure);
                    me.$store.commit('app/importTransition', 'process');
                    me.$store.commit('app/addImportError', failure);
                });
            }, function(failure) {
                me.$store.commit('app/importStatus', failure);
                me.$store.commit('app/importTransition', 'process');
                me.$store.commit('app/addImportError', failure);
            }, ceo, (this.queryParams.newObjectEndpoint ? this.queryParams.newObjectEndpoint : null), EcIdentityManager.default, me.importFileType === 'collectioncsv');
        },
        importPdf: function() {
            var me = this;
            me.$store.commit('app/importStatus', 'importing framework...');
            var formData = new FormData();
            formData.append(me.importFile[0].name, me.importFile[0]);
            me.$store.commit('app/importStatus', 'importing file...');
            EcRemote.postExpectingString(
                "https://t3.cassproject.org/service/parse/",
                "docx",
                formData,
                function(s) {
                    var d = s;
                    if (d == null) {
                        me.$store.commit('app/importStatus', s);
                        me.$store.commit('app/importTransition', 'process');
                        me.$store.commit('app/addImportError', s);
                        return;
                    }
                    var uuid = new UUID(3, "nil", d.name).format();
                    var f = new EcFramework();
                    me.$store.commit('app/importStatus', 'looking for existing framework...');
                    if (me.queryParams && me.queryParams.newObjectEndpoint) {
                        f.id = me.queryParams.newObjectEndpoint + uuid;
                    } else {
                        f.assignId(me.repo.selectedServer, uuid);
                    }
                    me.repo.search("(@id:\"" + f.shortId() + "\") AND (@type:Framework)", function() {}, function(frameworks) {
                        appLog(frameworks);
                        me.$store.commit('app/importStatus', 'looking for existing framwork...');
                        if (frameworks.length > 0) {
                            me.$store.commit('app/importStatus', 'framework found...');
                            me.showModal('duplicate', d);
                        } else {
                            me.$store.commit('app/importStatus', 'no match, saving new framework...');
                            me.savePdfImport(d);
                        } /* TO DO - ERROR HANDLING HERE */
                    }, function(error) {
                        me.$store.commit('app/importStatus', error);
                        me.$store.commit('app/importTransition', 'process');
                        me.$store.commit('app/addImportError', error);
                    });
                },
                /* TO DO - ERROR HANDLING HERE */
                function(error) {
                    appLog("error here");
                    if (error === "") {
                        error = "Server unresponsive.";
                    }
                    me.$store.commit('app/importStatus', error);
                    me.$store.commit('app/importTransition', 'process');
                    me.$store.commit('app/addImportError', error);
                }
            );
            me.$store.commit('app/importTransition', 'process');
            me.$store.commit('app/importStatus', 'processing file...');
        },
        savePdfImport: function(d, newName) {
            var me = this;
            me.$store.commit('app/importStatus', 'saving file...');
            var toSave = [];
            var f = new EcFramework();
            var name = newName || d.name;
            if (name) {
                f.setName(name);
            } else {
                f.setName("Unknown Name");
            }
            if (d.description && d.description !== "") {
                f.setDescription(d.description);
            }
            var uuid = new UUID(3, "nil", name).format();
            if (me.queryParams && me.queryParams.newObjectEndpoint) {
                f.id = me.queryParams.newObjectEndpoint + uuid;
            } else {
                f.assignId(me.repo.selectedServer, uuid);
            }
            f.competency = [];
            f.relation = [];
            f.level = [];
            f["schema:dateCreated"] = new Date().toISOString();
            toSave.push(f);
            appLog("d", d);
            appLog("message: ", JSON.parse(f.toJson()));
            var cs = {};
            if (!d.competencies) {
                me.$store.commit('app/importStatus', "Error importing competencies.");
                me.$store.commit('app/importTransition', 'process');
                me.$store.commit('app/addImportError', "Error importing competencies, no competencies found in file.");
                return;
            }
            me.detailsDetected.competencies = d.competencies.length;
            for (var i = 0; i < d.competencies.length; i++) {
                var c = new EcCompetency();
                if (me.queryParams && me.queryParams.newObjectEndpoint) {
                    c.id = me.queryParams.newObjectEndpoint + d.competencies[i].id;
                } else {
                    c.assignId(me.repo.selectedServer, d.competencies[i].id);
                }
                cs[d.competencies[i].id] = c.shortId();
                if (d.competencies[i].name != null) {
                    c.setName(d.competencies[i].name.trim());
                } else {
                    c.setName("Unknown name");
                }
                if (d.competencies[i].name !== d.competencies[i].description && d.competencies[i].description) { c.setDescription(d.competencies[i].description.trim()); }
                if (d.competencies[i]["ceasn:codedNotation"] != null) {
                    c["ceasn:codedNotation"] = d.competencies[i]["ceasn:codedNotation"];
                }
                f.addCompetency(c.shortId());
                toSave.push(c);
            }
            for (var i = 0; i < d.relation.length; i++) {
                var c = new EcAlignment();
                if (me.queryParams && me.queryParams.newObjectEndpoint) {
                    c.generateShortId(this.queryParams.newObjectEndpoint);
                } else {
                    c.assignId(me.repo.selectedServer, d.relation[i].source + "_" + d.relation[i].relationType + "_" + d.relation[i].target);
                }
                c.source = cs[d.relation[i].source];
                c.target = cs[d.relation[i].target];
                c.relationType = d.relation[i].relationType;
                if (c.source !== undefined && c.target !== undefined) {
                    f.addRelation(c.shortId());
                    toSave.push(c);
                } else {
                    appLog(JSON.parse(c.toJson()));
                }
            }
            me.repo.multiput(toSave, function() {
                me.$store.commit('app/importFramework', f);
                me.$store.commit('editor/framework', f);
                me.$store.commit('editor/t3Profile', true);
                me.$store.commit('app/importStatus', "");
                me.importSuccess();
            }, function(error) {
                me.$store.commit('app/importStatus', error);
                me.$store.commit('app/importTransition', 'process');
                me.$store.commit('app/addImportError', error);
            });
            me.$store.commit('app/importTransition', 'process');
            me.$store.commit('app/importStatus', 'saving import...');
        },
        importCsv: function() {
            var file = this.importFile[0];
            var relations = this.csvRelationFile;
            var identity = EcIdentityManager.default.ids[0];
            var endpoint = this.queryParams.newObjectEndpoint == null ? this.repo.selectedServer : this.queryParams.newObjectEndpoint;

            var f = new EcFramework();
            if (identity != null) { f.addOwner(identity.ppk.toPk()); }
            if (this.queryParams.newObjectEndpoint !== null && this.queryParams.newObjectEndpoint !== undefined) {
                f.generateShortId(endpoint);
            } else {
                f.generateId(endpoint);
            }
            f["schema:dateCreated"] = new Date().toISOString();
            f.setName(this.importFrameworkName);
            f.setDescription(this.importFrameworkDescription);
            let me = this;
            CSVImport.importCompetencies(
                file,
                endpoint,
                identity,
                (this.importCsvColumnName ? this.importCsvColumnName.index : -1),
                (this.importCsvColumnDescription ? this.importCsvColumnDescription.index : -1),
                (this.importCsvColumnScope ? this.importCsvColumnScope.index : -1),
                (this.importCsvColumnId ? this.importCsvColumnId.index : -1),
                relations,
                (this.importCsvColumnSource ? this.importCsvColumnSource.index : -1),
                (this.importCsvColumnRelationType ? this.importCsvColumnRelationType.index : -1),
                (this.importCsvColumnTarget ? this.importCsvColumnTarget.index : -1),
                function(competencies, alignments) {
                    f.competency = [];
                    f.relation = [];
                    for (var i = 0; i < competencies.length; i++) {
                        f.competency.push(competencies[i].shortId());
                    }
                    for (var i = 0; i < alignments.length; i++) {
                        f.relation.push(alignments[i].shortId());
                    }
                    me.repo.saveTo(f, function(success) {
                        me.importFile.splice(0, 1);
                        if (me.importFile.length > 0) {
                            me.firstImport = false;
                            me.analyzeImportFile();
                        } else {
                            me.$store.commit('app/importFramework', f);
                            me.$store.commit('editor/framework', f);
                            me.importSuccess();
                            me.spitEvent("importFinished", f.shortId(), "importPage");
                        }
                    }, function(failure) {
                        me.$store.commit('app/importTransition', 'process');
                        me.$store.commit('app/addImportError', failure);
                    });
                },
                function(failure) {
                    me.$store.commit('app/importStatus', failure);
                    me.$store.commit('app/importTransition', 'process');
                    me.$store.commit('app/addImportError', failure);
                },
                function(increment) {
                    if (increment.relations != null && increment.relations !== undefined) {
                        me.$store.commit('app/importStatus', (increment.relations + "/" + me.relationCount + " relations imported."));
                    } else if (increment.competencies != null && increment.competencies !== undefined) {
                        me.$store.commit('app/importStatus', (increment.competencies + "/" + me.competencyCount + " competencies imported."));
                    } else {
                        me.$store.commit('app/importStatus', "Importing...");
                    }
                }, false, me.repo);
        },
        importJsonLd: function(data) {
            return new Promise((resolve, reject) => {
                this.$store.commit('app/importTransition', 'process');
                var formData = new FormData();
                if (data != null && data !== undefined) {
                    formData.append('data', JSON.stringify(data));
                } else {
                    var file = this.importFile[0];
                    formData.append('file', file);
                }
                var identity = EcIdentityManager.default.ids[0];
                if (identity != null) { formData.append('owner', identity.ppk.toPk().toPem()); }
                let me = this;
                me.$store.commit('app/importFramework', null);
                EcRemote.postInner(this.repo.selectedServer, "ctdlasn", formData, null, async function(data) {
                    var framework;
                    if (EcRepository.cache) {
                        delete EcRepository.cache[data];
                    }
                    if (me.conceptMode) {
                        framework = await EcConceptScheme.get(data);
                    } else {
                        framework = await EcFramework.get(data);
                        me.$store.commit('app/importFramework', framework);
                    }
                    me.$store.commit('editor/framework', framework);
                    me.$store.commit('app/importFramework', framework);
                    me.spitEvent("importFinished", framework.shortId(), "importPage");
                    if (me.importFile != null) {
                        me.importFile.splice(0, 1);
                    }
                    if (me.importFile && me.importFile.length > 0) {
                        me.firstImport = false;
                        me.analyzeImportFile();
                    } else {
                        me.importSuccess();
                        resolve();
                    }
                }, function(failure) {
                    me.$store.commit('app/importTransition', 'process');
                    me.$store.commit('app/importStatus', "Import failed. Check your import file for any errors.");
                    appLog(failure.statusText);
                    me.$store.commit('app/addImportError', failure);
                    reject(failure.statusText);
                });
                if (me.conceptMode) {
                    if (me.queryParams.ceasnDataFields === 'true') {
                        me.$store.commit('app/importStatus', "Importing Concept Scheme");
                    } else {
                        me.$store.commit('app/importStatus', "Importing Taxonomy");
                    }
                } else {
                    if (me.importFileType === 'ctdlasnjsonldcollection') {
                        me.$store.commit('app/importStatus', 'Importing Collection');
                    } else {
                        me.$store.commit('app/importStatus', 'Importing Framework');
                    }
                }
            });
        },
        importCtdlAsnConceptCsv: function() {
            var me = this;
            var ceo = null;
            if (EcIdentityManager.default.ids.length > 0) {
                ceo = EcIdentityManager.default.ids[0];
            }
            me.$store.commit('app/importStatus', 'process');
            CTDLASNCSVConceptImport.importFrameworksAndCompetencies(me.repo, me.importFile[0], function(frameworks, competencies) {
                if (me.queryParams.ceasnDataFields === 'true') {
                    for (var i = 0; i < frameworks.length; i++) {
                        if (frameworks[i]["dcterms:language"] == null || frameworks[i]["dcterms:language"] === undefined) {
                            me.setDefaultLanguage();
                            frameworks[i]["dcterms:language"] = me.$store.state.editor.defaultLanguage;
                        }
                    }
                }
                var all = frameworks.concat(competencies);
                me.$store.commit('app/importStatus', "Saving " + all.length + " objects.");
                me.repo.multiput(all, function() {
                    for (var i = 0; i < frameworks.length; i++) {
                        me.spitEvent("importFinished", frameworks[i].shortId(), "importPage");
                    }
                    me.$store.commit('editor/framework', frameworks[0]);
                    me.$store.commit('app/importFramework', frameworks[0]);
                    me.importSuccess();
                }, function(failure) {
                    me.$store.commit('app/importTransition', 'process');
                    me.$store.commit('app/addImportError', "Failed to save: " + failure);
                    appError(failure);
                });
            }, function(failure) {
                me.$store.commit('app/importTransition', 'process');
                me.$store.commit('app/addImportError', failure);
                appError(failure);
            }, ceo, (this.queryParams.newObjectEndpoint ? this.queryParams.newObjectEndpoint : null));
        },
        importFromFile: function() {
            let me = this;
            appLog("this.importFileType", me.importFileType);
            me.$store.commit('app/importTransition', 'process');
            if (me.importFileType === "csv") {
                me.importCsv();
            } else if (me.importFileType === "ctdlasncsv" || me.importFileType === "collectioncsv") {
                me.importCtdlAsnCsv();
            } else if (me.importFileType === "conceptcsv") {
                me.importCtdlAsnConceptCsv();
            } else if (me.importFileType === "ctdlasnjsonld" || me.importFileType === "ctdlasnjsonldcollection") {
                me.importJsonLd();
            } else if (me.importFileType === "asn") {
                me.importAsn();
            } else if (me.importFileType === "pdf") {
                me.importPdf();
            } else if (me.importFileType === "medbiq") {
                me.importMedbiq();
            } else {
                let error = "Unsupported file type" + me.importFileType;
                me.$store.commit('app/addImportError', error);
                me.$store.commit('app/importTransition', 'process');
            }
        },
        parseText: function() {
            var me = this;
            if (EcIdentityManager.default.ids != null && EcIdentityManager.default.ids.length > 0) {
                this.importFramework.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
            }
            if (this.queryParams.newObjectEndpoint !== null && this.queryParams.newObjectEndpoint !== undefined) {
                this.importFramework.generateShortId(this.queryParams.newObjectEndpoint);
            } else {
                this.importFramework.generateId(this.repo.selectedServer);
            }
            this.importFramework.name = this.$store.getters['app/importFrameworkName'];
            this.importFramework["schema:dateCreated"] = new Date().toISOString();
            this.importFramework["schema:dateModified"] = new Date().toISOString();
            var toSave = [this.importFramework];
            for (var i = 0; i < this.importFramework.competency.length; i++) {
                var comp = EcRepository.cache[this.importFramework.competency[i]];
                if (EcIdentityManager.default.ids != null && EcIdentityManager.default.ids.length > 0) {
                    comp.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
                }
                toSave.push(comp);
            }
            if (this.importFramework.relation) {
                for (var i = 0; i < this.importFramework.relation.length; i++) {
                    var relation = EcRepository.cache[this.importFramework.relation[i]];
                    if (EcIdentityManager.default.ids != null && EcIdentityManager.default.ids.length > 0) {
                        relation.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
                    }
                    toSave.push(relation);
                }
            }
            this.repo.multiput(toSave, function() {
                me.spitEvent("importFinished", me.importFramework.shortId(), "importPage");
                me.$store.commit('editor/framework', me.importFramework);
                me.$router.push({name: "framework", params: {frameworkId: me.importFramework.shortId()}});
            }, function(failure) {
                appLog("failure", failure);
                me.$store.commit('app/addImportError', failure);
                me.$store.commit('app/importTransition', 'process');
            });
        },
        showImportModal: function(type) {
            let modalObject = {
                component: 'SupportedImportDetails',
                documentContent: type
            };
            this.$store.commit('app/showModal', modalObject);
        },
        importFromUrl: function() {
            return new Promise((resolve, reject) => {
                let me = this;
                let error = {
                    message: "Unable to import from the URL source provided.",
                    details: ""
                };
                if (!this.isValidUrl(this.importUrl)) {
                    error.details = "The URL provided is not valid.";
                    me.$store.commit('app/addImportError', error.details);
                    me.$store.commit('app/importTransition', 'upload');
                    me.showModal('error', error);
                    reject(error.details);
                    return;
                }
                EcRemote.getExpectingString(this.importUrl, null, function(result) {
                    var graph = result["@graph"];
                    if (graph != null) {
                        var id = graph[0]["@id"];
                        if (id) {
                            me.repo.search("(@id:\"" + id + "\") AND (@type:Framework)", function() {}, function(frameworks) {
                                appLog(frameworks);
                                if (frameworks.length > 0) {
                                    me.$store.commit('app/importStatus', 'framework found...');
                                    if (me.importType === 'url') {
                                        me.showModal('duplicateOverwriteOnly', [result, frameworks[0]]);
                                        resolve();
                                    }
                                } else {
                                    me.$store.commit('app/importStatus', 'no match, saving new framework...');
                                    me.importJsonLd(result).then(resolve).catch(reject);
                                } /* TO DO - ERROR HANDLING HERE */
                            }, function(failure) {
                                error.details = failure;
                                me.$store.commit('app/importStatus', failure);
                                me.$store.commit('app/importTransition', 'process');
                                me.$store.commit('app/addImportError', failure);
                                me.showModal('error', error);
                                reject(error.details);
                            });
                        } else {
                            me.importJsonLd(result).then(resolve).catch(reject);
                        }
                    } else {
                        error.details = "URL must have an '@graph' field at the top level.";
                        me.$store.commit('app/addImportError', error.details);
                        me.$store.commit('app/importTransition', 'process');
                        me.showModal('error', error);
                        reject(error.details);
                        return;
                    }
                    if (graph[0]["@type"].indexOf("Concept") !== -1) {
                        if (me.ceasnDataFields === 'true') {
                            error.details = "Competency Editor cannot be used to import concept schemes.";
                        } else {
                            error.details = "Competency Editor cannot be used to import taxonomies.";
                        }
                        me.$store.commit('app/addImportError', error.details);
                        me.$store.commit('app/importTransition', 'process');
                        me.showModal('error', error);
                        reject(error.details);
                    }
                }, function(failure) {
                    if (!failure) {
                        me.$store.commit('app/addImportError', error.message);
                        me.$store.commit('app/importTransition', 'upload');
                        me.showModal('error', error);
                    } else {
                        error.details = failure;
                        me.$store.commit('app/addImportError', failure);
                        me.$store.commit('app/importTransition', 'upload');
                        me.showModal('error', error);
                    }
                    reject(error.message || error.failure);
                });
            });
        },
        isValidUrl(s) {
            try {
                let u = new URL(s);
            } catch (e) {
                return false;
            }
            return true;
        },
        scrollFunction(e) {
            let documentObject = document.getElementsByClassName('parent-object');
            let scrollValue = e.target.scrollTop;
            if (scrollValue !== 0) {
                this.parentObjectClass = 'parent-object scrolled';
            } else {
                this.parentObjectClass = 'parent-object';
            }
        }
    },
    watch: {
        importType: function(val) {
            this.caseDocs = [];
            this.clearImport();
        },
        importTransition: function(val) {
            if (val === 'processFiles') {
                return this.uploadFiles(this.importFile);
            } else if (val === 'uploadCsv' || val === 'uploadMedbiq' || val === 'uploadOtherNonPdf') {
                this.importFromFile();
            } else if (val === 'connectToServer') {
                this.connectToServer();
            }
        },
        importText: function(newText, oldText) {
            var me = this;
            TabStructuredImport.importCompetencies(
                newText,
                this.queryParams.newObjectEndpoint ? this.queryParams.newObjectEndpoint : this.repo.selectedServer,
                EcIdentityManager.default.ids[0],
                function(competencies, relations) {
                    me.$store.commit('app/importTransition', 'light');
                    let feedback = competencies.length + " competencies and " + relations.length + " relations.";
                    me.$store.commit('app/importStatus', feedback);
                    var f = new EcFramework();
                    me.$store.commit('app/importFramework', null);
                    for (var i = 0; i < competencies.length; i++) {
                        EcRepository.cache[competencies[i].shortId()] = competencies[i];
                        f.addCompetency(competencies[i].shortId());
                    }
                    for (var i = 0; i < relations.length; i++) {
                        EcRepository.cache[relations[i].shortId()] = relations[i];
                        f.addRelation(relations[i].shortId());
                    }
                    if (me.importFrameworkName) {
                        f.name = me.importFrameworkName;
                    }
                    me.$nextTick(function() {
                        me.$store.commit('app/importFramework', f);
                        me.$store.commit('editor/framework', f);
                    });
                }, function(status) {
                    me.$store.commit('app/importStatus', status);
                },
                appError,
                this.repo,
                false);
        },
        importFrameworkName: function() {
            if (this.importType === "text" && this.importFramework) {
                let framework = this.importFramework;
                framework.name = this.importFrameworkName;
                this.$store.commit('editor/changedObject', "update");
                this.$store.commit('app/importFramework', framework);
            }
        },
        importFramework: function() {
            if (this.importFramework && !this.conceptMode && (!this.importFramework.competency || this.importFramework.competency === 0)) {
                this.hierarchyIsdoneLoading = true;
            }
        }
    }
};