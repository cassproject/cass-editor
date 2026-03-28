import store from '@/stores/index.js';
/**
 * Checks if any competency CTIDs collide with the CTID of an existing framework or concept scheme.
 * A CTID should be globally unique across object types, so a competency sharing a CTID with a
 * framework or concept scheme is always an error. Searches in batches of 50.
 *
 * @param {EcRepository} repo - Repository to search against
 * @param {string[]} competencyIds - Array of competency shortIds (used as keys into competencyCtids)
 * @param {EcFramework[]} frameworkArray - Unused, accepted for consistent check function signature
 * @param {Object} competencyCtids - Map of competency shortId to original CSV CTID
 * @returns {Promise<string[]>} Array of error messages for any CTID collisions found
 */
async function checkCtidCollisionsWithFrameworksAndConceptSchemes(repo, competencyIds, frameworkArray, competencyCtids) {
    const errors = [];
    // Collect unique CTIDs to check
    const ctidSet = new Set();
    for (const compId of competencyIds) {
        const ctid = competencyCtids[compId];
        if (ctid) ctidSet.add(ctid);
    }
    const ctids = Array.from(ctidSet);
    const BATCH_SIZE = 50;
    for (let batch = 0; batch < ctids.length; batch += BATCH_SIZE) {
        const chunk = ctids.slice(batch, batch + BATCH_SIZE);
        const chunkSet = new Set(chunk);
        const queryParts = chunk.map(ctid => 'ceterms\\:ctid:"' + ctid + '"');
        const query = '(' + queryParts.join(' OR ') + ')';
        // Search for frameworks with matching CTIDs
        try {
            const existingFrameworks = await new Promise((resolve, reject) => {
                EcFramework.search(repo, query, resolve, reject, {size: 10000});
            });
            if (existingFrameworks) {
                for (const existingFw of existingFrameworks) {
                    const fwCtid = existingFw["ceterms:ctid"];
                    if (fwCtid && chunkSet.has(fwCtid)) {
                        errors.push(
                            `Competency with CTID ${fwCtid} has the same CTID as existing framework "${existingFw.name || existingFw.shortId()}"`
                        );
                    }
                }
            }
        } catch (e) {
            console.error('Error checking for CTID collisions with frameworks', e);
        }
        // Search for concept schemes with matching CTIDs
        try {
            const existingSchemes = await new Promise((resolve, reject) => {
                EcConceptScheme.search(repo, query, resolve, reject, {size: 10000});
            });
            if (existingSchemes) {
                for (const existingCs of existingSchemes) {
                    const csCtid = existingCs["ceterms:ctid"];
                    if (csCtid && chunkSet.has(csCtid)) {
                        errors.push(
                            `Competency with CTID ${csCtid} has the same CTID as existing concept scheme "${existingCs.name || existingCs.shortId()}"`
                        );
                    }
                }
            }
        } catch (e) {
            console.error('Error checking for CTID collisions with concept schemes', e);
        }
    }
    return errors;
}

/**
 * Checks if any competency IDs already exist in a framework other than the ones being imported.
 * Searches in batches of 50 to avoid overly long queries.
 *
 * @param {EcRepository} repo - Repository to search against
 * @param {string[]} competencyIds - Array of competency shortIds to check
 * @param {EcFramework[]} frameworkArray - Frameworks being imported (excluded from conflict detection)
 * @param {Object} competencyCtids - Map of competency shortId to original CSV CTID for error messages
 * @returns {Promise<string[]>} Array of error messages for any duplicate CTIDs found
 */
async function checkDuplicateCtidsInFrameworks(repo, competencyIds, frameworkArray, competencyCtids) {
    const errors = [];
    const BATCH_SIZE = 50;
    for (let batch = 0; batch < competencyIds.length; batch += BATCH_SIZE) {
        const chunk = competencyIds.slice(batch, batch + BATCH_SIZE);
        // Build an OR query matching any framework whose competency array contains one of the IDs in this batch
        const queryParts = [];
        for (const compId of chunk) {
            queryParts.push('competency:"' + compId + '"');
            const noVersion = EcRemoteLinkedData.trimVersionFromUrl(compId);
            if (noVersion !== compId) {
                queryParts.push('competency:"' + noVersion + '"');
            }
        }
        try {
            const existingFrameworks = await new Promise((resolve, reject) => {
                EcFramework.search(repo, '(' + queryParts.join(' OR ') + ')', resolve, reject, {size: 10000});
            });
            if (existingFrameworks) {
                for (const existingFw of existingFrameworks) {
                    // Skip frameworks that are part of the current import (e.g. re-importing the same framework)
                    const isBeingImported = frameworkArray.some(
                        fw => fw.shortId() === existingFw.shortId()
                    );
                    if (!isBeingImported && existingFw.competency) {
                        // Build a Set of normalized competency IDs for O(1) lookups
                        const fwCompSet = new Set(existingFw.competency.map(c =>
                            EcRemoteLinkedData.trimVersionFromUrl(c)
                        ));
                        for (const compId of chunk) {
                            const noVersion = EcRemoteLinkedData.trimVersionFromUrl(compId);
                            if (fwCompSet.has(compId) || fwCompSet.has(noVersion)) {
                                errors.push(
                                    `Competency with CTID ${competencyCtids[compId] || compId} already exists in framework "${existingFw.name || existingFw.shortId()}"`
                                );
                            }
                        }
                    }
                }
            }
        } catch (e) {
            console.error('Error checking for existing competencies in frameworks', e);
        }
    }
    return errors;
}

/**
 * Checks if any competency IDs already exist in a ConceptScheme other than the ones being imported.
 * Searches the skos:hasTopConcept property in batches of 50.
 *
 * @param {EcRepository} repo - Repository to search against
 * @param {string[]} competencyIds - Array of competency shortIds to check
 * @param {EcFramework[]} frameworkArray - Frameworks/schemes being imported (excluded from conflict detection)
 * @param {Object} competencyCtids - Map of competency shortId to original CSV CTID for error messages
 * @returns {Promise<string[]>} Array of error messages for any duplicate CTIDs found
 */
async function checkDuplicateCtidsInConceptSchemes(repo, competencyIds, frameworkArray, competencyCtids) {
    const errors = [];
    const BATCH_SIZE = 50;
    for (let batch = 0; batch < competencyIds.length; batch += BATCH_SIZE) {
        const chunk = competencyIds.slice(batch, batch + BATCH_SIZE);
        // Build an OR query matching any concept scheme whose hasTopConcept array contains one of the IDs
        const queryParts = [];
        for (const compId of chunk) {
            queryParts.push('skos\\:hasTopConcept:"' + compId + '"');
            const noVersion = EcRemoteLinkedData.trimVersionFromUrl(compId);
            if (noVersion !== compId) {
                queryParts.push('skos\\:hasTopConcept:"' + noVersion + '"');
            }
        }
        try {
            const existingSchemes = await new Promise((resolve, reject) => {
                EcConceptScheme.search(repo, '(' + queryParts.join(' OR ') + ')', resolve, reject, {size: 10000});
            });
            if (existingSchemes) {
                for (const existingCs of existingSchemes) {
                    // Skip concept schemes that are part of the current import
                    const isBeingImported = frameworkArray.some(
                        fw => fw.shortId() === existingCs.shortId()
                    );
                    if (!isBeingImported && existingCs["skos:hasTopConcept"]) {
                        // Build a Set of normalized concept IDs for O(1) lookups
                        const csCompSet = new Set(existingCs["skos:hasTopConcept"].map(c =>
                            EcRemoteLinkedData.trimVersionFromUrl(c)
                        ));
                        for (const compId of chunk) {
                            const noVersion = EcRemoteLinkedData.trimVersionFromUrl(compId);
                            if (csCompSet.has(compId) || csCompSet.has(noVersion)) {
                                errors.push(
                                    `Competency with CTID ${competencyCtids[compId] || compId} already exists in concept scheme "${existingCs.name || existingCs.shortId()}"`
                                );
                            }
                        }
                    }
                }
            }
        } catch (e) {
            console.error('Error checking for existing competencies in concept schemes', e);
        }
    }
    return errors;
}

/**
 * Checks if any framework/scheme being imported has a CTID that already belongs to
 * an existing framework or concept scheme of a different type on the server.
 * Extracts CTIDs directly from the frameworkArray objects via ceterms:ctid.
 *
 * @param {EcRepository} repo - Repository to search against
 * @param {string[]} competencyIds - Unused, accepted for consistent check function signature
 * @param {EcFramework[]} frameworkArray - Frameworks/schemes being imported
 * @param {Object} competencyCtids - Unused, accepted for consistent check function signature
 * @returns {Promise<string[]>} Array of error messages for any CTID collisions found
 */
async function checkFrameworkCtidCollisions(repo, competencyIds, frameworkArray, competencyCtids) {
    const errors = [];
    // Collect CTIDs from the frameworks/schemes being imported
    const ctidsToCheck = [];
    for (const fw of frameworkArray) {
        const ctid = fw["ceterms:ctid"];
        if (ctid) {
            ctidsToCheck.push({ctid, fw});
        }
    }
    if (ctidsToCheck.length === 0) return errors;
    const BATCH_SIZE = 50;
    for (let batch = 0; batch < ctidsToCheck.length; batch += BATCH_SIZE) {
        const chunk = ctidsToCheck.slice(batch, batch + BATCH_SIZE);
        const chunkCtids = new Set(chunk.map(c => c.ctid));
        const queryParts = chunk.map(c => 'ceterms\\:ctid:"' + c.ctid + '"');
        const query = '(' + queryParts.join(' OR ') + ')';
        // Search for existing frameworks with matching CTIDs
        try {
            const existingFrameworks = await new Promise((resolve, reject) => {
                EcFramework.search(repo, query, resolve, reject, {size: 10000});
            });
            if (existingFrameworks) {
                for (const existingFw of existingFrameworks) {
                    // Skip if this is the same object being re-imported
                    const isBeingImported = frameworkArray.some(
                        fw => fw.shortId() === existingFw.shortId()
                    );
                    if (!isBeingImported) {
                        const fwCtid = existingFw["ceterms:ctid"];
                        if (fwCtid && chunkCtids.has(fwCtid)) {
                            errors.push(
                                `Framework/scheme with CTID ${fwCtid} has the same CTID as existing framework "${existingFw.name || existingFw.shortId()}"`
                            );
                        }
                    }
                }
            }
        } catch (e) {
            console.error('Error checking for framework CTID collisions with frameworks', e);
        }
        // Search for existing concept schemes with matching CTIDs
        try {
            const existingSchemes = await new Promise((resolve, reject) => {
                EcConceptScheme.search(repo, query, resolve, reject, {size: 10000});
            });
            if (existingSchemes) {
                for (const existingCs of existingSchemes) {
                    const isBeingImported = frameworkArray.some(
                        fw => fw.shortId() === existingCs.shortId()
                    );
                    if (!isBeingImported) {
                        const csCtid = existingCs["ceterms:ctid"];
                        if (csCtid && chunkCtids.has(csCtid)) {
                            errors.push(
                                `Framework/scheme with CTID ${csCtid} has the same CTID as existing concept scheme "${existingCs.name || existingCs.shortId()}"`
                            );
                        }
                    }
                }
            }
        } catch (e) {
            console.error('Error checking for framework CTID collisions with concept schemes', e);
        }
    }
    return errors;
}

export default {
    data() {
        return {
            repo: window.repo
        };
    },
    methods: {
        showRightAside: function () {
            store.app().setShowRightAside({});
        },
        selectedArrayEvent: function (ary) {
            this.selectedArray = ary;
        },
        clearFiles: function () {
            store.app().clearImportFiles();
        },
        cancelImport: function () {
            this.$emit("delete-object", this.importFramework);
            this.resetImport();
        },
        resetImport: function () {
            store.app().setResetImport();
        },
        onEditMultiple: function () {
            this.showEditMultiple = true;
            var payload = {
                profile: this.hierarchyProfile,
                selectedCompetencies: this.selectedArray,
                component: 'MultiEdit'
            };
            store.app().setShowModal(payload);
        },
        handleSearch: function (e) {
            store.app().setShowModal(e);
        },
        onEditNode: function () {
            this.editingNode = true;
        },
        onDoneEditingNode: async function () {
            this.changedObj = await EcRepository.get(this.importFramework.shortId());
            this.editingNode = false;
        },
        handleDoneLoading: function () {
            console.log("done loading");
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
                    let type = data[1].subType === "Collection" ? "collection" : data[1] && data[1].type === "ConceptScheme" ? "taxonomy" : "framework";
                    params = {
                        type: val,
                        title: "Duplicate " + type,
                        text: (data[0].name ? ("The " + type + " " + data[0].name) : "This " + type) + " has already been imported. You can overwrite it but will not be able to edit it since you're not logged in. Do you want to overwrite it?",
                        onConfirm: () => {
                            if (this.importType === "url") {
                                return this.importJsonLd(data[0]);
                            }
                            if (this.serverType === "cass") {
                                if (!this.conceptMode) {
                                    return this.continueCassFrameworkImport(data[0]);
                                } else {
                                    return this.continueCassTaxonomyImport(data[0]);
                                }
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
                    let type = data[1].subType === "Collection" ? "collection" : data[1] && data[1].type === "ConceptScheme" ? "taxonomy" : "framework";
                    params = {
                        type: val,
                        title: "Duplicate " + type,
                        text: (data[0].name ? ("The " + type + " " + data[0].name) : "This " + type) + " has already been imported. If you're a " + type + " admin you can overwrite it. Do you want to overwrite it?",
                        onConfirm: () => {
                            if (this.importType === "url") {
                                return this.importJsonLd(data[0]);
                            } else if (this.serverType === "cass") {
                                if (!this.conceptMode) {
                                    return this.continueCassFrameworkImport(data[0]);
                                } else {
                                    return this.continueCassTaxonomyImport(data[0]);
                                }
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
                store.app().setImportModalParams(params);
                store.app().setShowModal({ component: 'ImportError' });
                return;
            }
            // reveal modal
            store.app().setImportModalParams(params);
            store.app().setShowModal({ component: 'DuplicateImport' });
        },
        unsupportedFile: function (val) {
            store.app().setImportFileType(val);
            let error = "File type " + fileType + " is unsupported in this workflow";
            store.app().addImportError(error);
            store.app().setImportTransition('process');
        },
        // Helper method to handle both single errors and arrays of errors
        handleImportErrors: function(errors) {
            if (Array.isArray(errors)) {
                for (let error of errors) {
                    store.app().addImportError(error);
                }
                // Set status to show error count
                store.app().setImportStatus(`${errors.length} error(s) found in import file`);
            } else {
                store.app().addImportError(errors);
                store.app().setImportStatus(errors);
            }
            store.app().setImportTransition('process');
        },
        /* When an import is "successful" */
        importSuccess: function () {
            if (!this.conceptMode && !this.progressionMode) {
                let feedback = "Competency detected";
                store.app().setImportStatus(feedback);
                if (this.isT3Import) {
                    store.app().setImportTransition('detail');
                } else {
                    store.app().setImportTransition('preview');
                }
            } else if (this.progressionMode) {
                let name = "Progression Model";
                store.app().setImportStatus(name + " Imported.");
                store.app().setImportTransition('preview');
            } else {
                let name = "Taxonomy";
                if (this.queryParams.ceasnDataFields === 'true') {
                    name = "Concept Scheme";
                }
                store.app().setImportStatus(name + " Imported.");
                store.app().setImportTransition('preview');
            }
        },
        importDetailsAccept: function () {
            store.app().setImportStatus('Edit and approve');
            store.app().setImportTransition('preview');
        },
        importPreviewAccept: function () {
            store.app().setImportStatus('Import Complete!');
            store.app().setImportTransition('light');
        },
        clearImport: function () {
            store.app().setImportFramework(null);
            store.app().clearImportFiles();
            store.app().clearImportErrors();
            store.app().setImportTransition('upload');
            store.app().setImportStatus('');
            store.app().setImportFeedback('');
            store.app().setImportFileType('');
            store.app().setImportDuplicates([]);
            store.app().setImportSkip([]);
            if (this.caseDocs) {
                this.caseDocs = [];
            }
        },
        uploadFiles: function () {
            this.fileChange(this.importFile);
        },
        fileChange: function (e) {
            console.log('file change', e);
            store.app().clearImportErrors();
            store.app().setImportTransition('process');
            store.app().setFirstImport(true);
            this.analyzeImportFile();
        },
        analyzeImportFile: function () {
            var me = this;
            var file = this.importFile[0];
            console.log("file is", file);
            var feedback;
            if (file.name.endsWith(".csv")) {
                if (this.conceptMode || this.progressionMode) {
                    CTDLASNCSVConceptImport.analyzeFile(file, function (frameworkCount, competencyCount, progressionCount) {
                        if (progressionCount) {
                            store.app().setImportFileType('progressioncsv');
                            let name = "progression models";
                            feedback = "Import " + progressionCount + " " + name + " and " + competencyCount + " levels.";
                        } else {
                            store.app().setImportFileType('conceptcsv');
                            let name = "taxonomies";
                            if (me.queryParams.ceasnDataFields === 'true') {
                                name = "concept schemes";
                            }
                            feedback = "Import " + frameworkCount + " " + name + " and " + competencyCount + " concepts.";
                        }
                        store.app().setImportStatus(feedback);
                        store.app().setImportTransition('info');
                    }, function (errorMsg) {
                        store.app().addImportError(errorMsg);
                        store.app().setImportTransition('process');
                    });
                } else {
                    CTDLASNCSVImport.analyzeFile(file, function (frameworkCount, competencyCount, collectionCount, duplicates) {
                        if (frameworkCount) {
                            store.app().setImportFileType('ctdlasncsv');
                            feedback = "Import " + frameworkCount + " frameworks and " + competencyCount + " competencies.";
                        } else if (collectionCount) {
                            store.app().setImportFileType('collectioncsv');
                            feedback = "Import " + collectionCount + " collections and " + competencyCount + " competencies.";
                        }
                        if (duplicates && duplicates.length) {
                            store.app().setImportDuplicates(duplicates);
                        } else {
                            store.app().setImportDuplicates([]);
                        }
                        store.app().setImportStatus(feedback);
                        store.app().setImportTransition('info');
                    }, function (errorMsg) {
                        if (errorMsg.indexOf('CTDLASN Parse Error') !== -1) {
                            store.app().addImportError(errorMsg);
                            store.app().setImportTransition('process');
                        } else {
                            CSVImport.analyzeFile(file, function (data) {
                                store.app().setImportFileType('csv');
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
                                store.app().setImportStatus((me.competencyCount = (data.length - 1)) + " Competencies Detected.");
                                store.app().setImportTransition('info');
                            }, function (error) {
                                store.app().addImportError(error);
                                store.app().setImportTransition('process');
                            });
                        }
                    });
                }
            } else if (file.name.endsWith(".json") || file.name.endsWith(".jsonld")) {
                // Try JSON-LD first, checks for @graph
                this.analyzeJsonLdFramework(file, function (data, ctdlasn) {
                    var invalid = false;
                    var error;
                    var feedback;
                    if (ctdlasn === "ctdlasnConcept") {
                        if (me.conceptMode) {
                            if (me.queryParams.ceasnDataFields === 'true') {
                                store.app().setImportStatus("1 Concept Scheme Detected.");
                            } else {
                                store.app().setImportStatus("1 Taxonomy Detected.");
                            }
                            store.app().setImportFileType('ctdlasnjsonld');
                            store.app().setImportTransition('info');
                        } else {
                            if (me.queryParams.ceasnDataFields === 'true') {
                                var message = "Concept Schemes must be imported in the concept scheme editor.";
                            } else {
                                var message = "Taxonomies must be imported in the taxonomy editor.";
                            }
                            invalid = true;
                            store.app().addImportError(message);
                            store.app().setImportTransition('process');
                        }
                    } else if (ctdlasn === "ctdlasnProgression") {
                        if (me.conceptMode || me.progressionMode) {
                            store.app().setImportStatus("1 Progression Detected.");
                            store.app().setImportFileType('ctdlasnjsonldprogression');
                            store.app().setImportTransition('info');
                        } else {
                            var message = "Progression Models must be imported in the concept scheme editor.";
                            invalid = true;
                            store.app().addImportError(message);
                            store.app().setImportTransition('process');
                        }
                    } else {
                        if (!me.conceptMode && !me.progressionMode) {
                            if (ctdlasn === 'ctdlasnCollection') {
                                store.app().setImportFileType('ctdlasnjsonldcollection');
                                feedback = "1 Collection and " + (EcObject.keys(data).length - 1) + " Competencies Detected.";
                            } else {
                                store.app().setImportFileType('ctdlasnjsonld');
                                feedback = "1 Framework and " + (EcObject.keys(data).length - 1) + " Competencies Detected.";
                            }
                            store.app().setImportStatus(feedback);
                            store.app().setImportTransition('info');
                        } else {
                            error = "Frameworks must be imported in the competency editor.";
                            invalid = true;
                            store.app().addImportError(error);
                            store.app().setImportTransition('process');
                        }
                    }
                    me.competencyCount = EcObject.keys(data).length;
                    if (!invalid && (ctdlasn === "ctdlasn" || ctdlasn === "ctdlasnConcept" || ctdlasn === "ctdlasnProgression" || ctdlasn === "ctdlasnCollection")) {
                        // Do nothing
                    } else if (!invalid) {
                        let error = "Context is not CTDL-ASN";
                        store.app().addImportError(error);
                        store.app().setImportTransition('process');
                    }
                }, function (failure) {
                    if (file.name.endsWith(".json") && !me.conceptMode && !me.progressionMode) {
                        // If JSON-LD doesn't work, try JSON
                        ASNImport.analyzeFile(file, function (data) {
                            store.app().setImportFileType('asn');
                            store.app().setImportStatus("1 Framework and " + EcObject.keys(data).length + " Competencies Detected.");
                            store.app().setImportTransition('info');
                            me.competencyCount = EcObject.keys(data).length;
                        }, function (error) {
                            store.app().addImportError(error);
                            store.app().setImportTransition('process');
                        });
                    } else {
                        store.app().addImportError(failure);
                        store.app().setImportTransition('process');
                    }
                });
            } else if (file.name.endsWith(".xml")) {
                if (this.conceptMode) {
                    store.app().setImportTransition('process');
                    if (me.queryParams.ceasnDataFields === 'true') {
                        store.app().addImportError("This is not a valid file format for concept schemes");
                    } else {
                        store.app().addImportError("This is not a valid file format for taxonomies");
                    }
                } else if (this.progressionMode) {
                    store.app().setImportTransition('process');
                    store.app().addImportError("This is not a valid file format for progression models");
                } else {
                    MedbiqImport.analyzeFile(file, function (data) {
                        store.app().setImportFileType('medbiq');
                        me.importFrameworkName = file.name.replace(".xml", "");
                        store.app().setImportStatus("1 Framework and " + EcObject.keys(data).length + " Competencies Detected.");
                        me.competencyCount = EcObject.keys(data).length;
                        store.app().setImportTransition('info');
                    }, function (error) {
                        store.app().setImportTransition('process');
                        store.app().addImportError(error);
                    });
                }
            } else if (file.name.endsWith(".pdf")) {
                if (this.conceptMode) {
                    store.app().setImportTransition('process');
                    if (me.queryParams.ceasnDataFields === 'true') {
                        store.app().addImportError("This is not a valid file format for concept schemes");
                    } else {
                        store.app().addImportError("This is not a valid file format for taxonomies");
                    }
                } else if (this.progressionMode) {
                    store.app().setImportTransition('process');
                    store.app().addImportError("This is not a valid file format for progression models");
                } else {
                    store.app().setImportFileType('pdf');
                    me.firstImport = false;
                    me.detailsDetected.fileType = "pdf";
                    store.app().setImportStatus("File selected.");
                    store.app().setImportTransition('info');
                }
            } else if (file.name.endsWith(".docx")) {
                if (this.conceptMode) {
                    store.app().setImportTransition('process');
                    if (me.queryParams.ceasnDataFields === 'true') {
                        store.app().addImportError("This is not a valid file format for concept schemes");
                    } else {
                        store.app().addImportError("This is not a valid file format for taxonomies");
                    }
                } else if (this.progressionMode) {
                    store.app().setImportTransition('process');
                    store.app().addImportError("This is not a valid file format for progression models");
                } else {
                    store.app().setImportFileType("pdf");
                    me.firstImport = false;
                    store.app().setImportStatus("File selected.");
                    store.app().setImportTransition('info');
                }
            } else if (file.name.endsWith(".html")) {
                if (this.conceptMode) {
                    store.app().setImportTransition('process');
                    if (me.queryParams.ceasnDataFields === 'true') {
                        store.app().addImportError("This is not a valid file format for concept schemes");
                    } else {
                        store.app().addImportError("This is not a valid file format for taxonomies");
                    }
                } else if (this.progressionMode) {
                    store.app().setImportTransition('process');
                    store.app().addImportError("This is not a valid file format for progression models");
                } else {
                    store.app().setImportFileType("pdf");
                    me.detailsDetected.fileType = "html";
                    me.firstImport = false;
                    store.app().setImportStatus("File selected.");
                    store.app().setImportTransition('info');
                }
            } else {
                store.app().setImportFileType('');
                let error = ("CaSS cannot read the file " + file.name + ". Please check that the file has the correct file extension.");
                store.app().addImportError(error);
                store.app().setImportTransition('process');
                return;
            }
            if (!me.firstImport) {
                me.importFromFile();
            }
        },
        analyzeCsvRelation: function (e) {
            console.log(e);
            var files = e.target.files || e.dataTransfer.files;
            var relationFile;
            if (!files.length) {
                relationFile = null;
            } else {
                relationFile = files[0];
            }
            store.app().setCsvRelationFile(relationFile);
            let me = this;
            CSVImport.analyzeFile(relationFile, function (data) {
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
            }, function (error) {
                store.app().setImportStatus(error);
                store.app().setImportTransition('process');
                store.app().addImportError(error);
            });
        },
        analyzeJsonLdFramework: function (file, success, failure) {
            if (file == null) {
                failure("No file to analyze");
                return;
            }
            if ((file)["name"] == null) {
                failure("Invalid file");
                return;
            }
            var reader = new FileReader();
            reader.onload = function (e) {
                var result = ((e)["target"])["result"];
                var jsonObj = JSON.parse(result);
                if (jsonObj["@graph"]) {
                    if (jsonObj["@context"] === "http://credreg.net/ctdlasn/schema/context/json" || jsonObj["@context"] === "http://credreg.net/ctdl/schema/context/json" ||
                        jsonObj["@context"] === "https://credreg.net/ctdlasn/schema/context/json" || jsonObj["@context"] === "https://credreg.net/ctdl/schema/context/json") {
                        if (jsonObj["@graph"][0]["@type"].indexOf("Concept") !== -1) {
                            success(jsonObj["@graph"], "ctdlasnConcept");
                        } else if (jsonObj["@graph"][0]["@type"].indexOf("Progression") !== -1) {
                            success(jsonObj["@graph"], "ctdlasnProgression");
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
        importMedbiq: function () {
            var identity = EcIdentityManager.default.ids[0];
            var f = new EcFramework();
            if (identity != null) { f.addOwner(identity.ppk.toPk()); }
            if (this.queryParams.newObjectEndpoint != null && this.queryParams.newObjectEndpoint !== undefined) {
                f.generateShortId(this.queryParams.newObjectEndpoint == null ? this.repo.selectedServer : this.queryParams.newObjectEndpoint);
            } else {
                f.generateId(this.queryParams.newObjectEndpoint == null ? this.repo.selectedServer : this.queryParams.newObjectEndpoint);
            }
            f["schema:dateCreated"] = new Date().toISOString();
            console.log(this.importFrameworkName);
            f.setName(this.importFrameworkName);
            f.setDescription(this.importFrameworkDescription);
            let me = this;
            store.app().setImportAllowCancel(true);
            MedbiqImport.importCompetencies(this.queryParams.newObjectEndpoint == null ? this.repo.selectedServer : this.queryParams.newObjectEndpoint, identity, function (competencies) {
                store.app().setImportAllowCancel(false);
                for (var i = 0; i < competencies.length; i++) {
                    f.addCompetency(competencies[i].shortId());
                }
                me.repo.saveTo(f, function (success) {
                    me.importFile.splice(0, 1);
                    if (me.importFile.length > 0) {
                        me.firstImport = false;
                        me.analyzeImportFile();
                    } else {
                        store.app().setImportFramework(f);
                        store.editor().setFramework(f);
                        me.importSuccess();
                        me.spitEvent("importFinished", f.shortId(), "importPage");
                    }
                }, function (failure) {
                    store.app().setImportStatus(failure);
                    store.app().setImportTransition('process');
                    store.app().addImportError(failure);
                });
            },
                function (failure) {
                    store.app().setImportStatus(failure);
                    store.app().setImportTransition('process');
                    store.app().addImportError(failure);
                },
                function (increment) {
                    store.app().setImportStatus(increment.competencies + "/" + me.competencyCount + " competencies imported.");
                }, me.repo);
        },
        importAsn: function () {
            var identity = EcIdentityManager.default.ids[0];
            let me = this;
            store.app().setImportTransition('process');
            store.app().setImportAllowCancel(true);
            ASNImport.importCompetencies(this.repo.selectedServer, identity, true, function (competencies, f) {
                store.app().setImportAllowCancel(false);
                me.importFile.splice(0, 1);
                if (me.importFile.length > 0) {
                    me.firstImport = false;
                    me.analyzeImportFile();
                } else {
                    store.app().setImportFramework(f);
                    store.editor().setFramework(f);
                    me.importSuccess();
                    me.spitEvent("importFinished", f.shortId(), "importPage");
                }
            },
                function (failure) {
                    store.app().setImportTransition('process');
                    store.app().addImportError(failure);
                },
                function (increment) {
                    store.app().setImportStatus(increment.competencies + "/" + me.competencyCount + " competencies imported.");
                }, me.repo);
        },
        importCtdlAsnCsv: function () {
            let ceo = null;
            if (EcIdentityManager.default.ids.length > 0) { ceo = EcIdentityManager.default.ids[0]; }
            let me = this;
            store.app().setImportAllowCancel(true);
            let skip = store.app().importSkip;

            // Define validation rules based on import type
            var validationRules = null;
            if (this.queryParams.ceasnDataFields === 'true') {
                if (me.importFileType === 'collectioncsv') {
                    // Validation rules for Collections
                    validationRules = {
                        requiredProps: {
                            "ceterms:Collection": ["@id", "ceasn:name", "ceasn:description", "ceasn:inLanguage", "ceterms:ownedBy"],
                            "ceasn:Competency": ["@id", "ceasn:competencyText"]
                        },
                        hierarchyRules: {
                            "ceterms:Collection": {
                                requiredProperties: ["ceterms:hasMember"],
                                childProperties: ["ceterms:isMemberOf"],
                                errorMessage: "CSV must contain at least one of: ceterms:hasMember (for collection level) or ceterms:isMemberOf (for competency level)"
                            }
                        },
                        validateHierarchy: true
                    };
                } else {
                    // Validation rules for Frameworks
                    validationRules = {
                        requiredProps: {
                            "ceasn:CompetencyFramework": ["@id", "ceasn:name", "ceasn:description", "ceasn:inLanguage", "ceasn:publisher"],
                            "ceasn:Competency": ["@id", "ceasn:competencyText"]
                        },
                        hierarchyRules: {
                            "ceasn:CompetencyFramework": {
                                requiredProperties: ["ceasn:hasTopChild"],
                                childProperties: ["ceasn:isPartOf", "ceasn:isTopChildOf"],
                                errorMessage: "CSV must contain at least one of: ceasn:hasTopChild (for framework level) or ceasn:isPartOf/ceasn:isTopChildOf (for competency level)"
                            }
                        },
                        validateHierarchy: true
                    };
                }
            }

            CTDLASNCSVImport.importFrameworksAndCompetencies(me.repo, me.importFile[0], function (frameworks, competencies, relations) {
                store.app().setImportAllowCancel(false);
                for (var i = 0; i < frameworks.length; i++) {
                    if (me.queryParams.ceasnDataFields === true) {
                        if (frameworks[i]["schema:inLanguage"] == null || frameworks[i]["schema:inLanguage"] === undefined) {
                            me.setDefaultLanguage();
                            frameworks[i]["schema:inLanguage"] = store.editor().defaultLanguage;
                        }
                    }
                }
                var all = frameworks.concat(competencies).concat(relations);
                store.app().setImportStatus("Saving " + all.length + " objects.");
                me.repo.multiput(all, function () {
                    for (var i = 0; i < frameworks.length; i++) {
                        store.app().setImportFramework(frameworks[i]);
                        store.editor().setFramework(frameworks[i]);
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
                            store.app().setSortResults( {
                                id: 'dateCreated',
                                label: 'created date'
                            });
                            if (me.importFileType === 'ctdlasncsv') {
                                me.$router.push({ name: "frameworks" });
                            } else {
                                me.$router.push({ name: "collections" });
                            }
                        }
                    }
                }, function (failure) {
                    store.app().setImportStatus(failure);
                    store.app().setImportTransition('process');
                    store.app().addImportError(failure);
                });
            }, function(failure) {
                me.handleImportErrors(failure);
            }, ceo, (this.queryParams.newObjectEndpoint ? this.queryParams.newObjectEndpoint : null), EcIdentityManager.default, me.importFileType === 'collectioncsv', skip, validationRules,
            this.queryParams.ceasnDataFields === 'true' ? [
                checkDuplicateCtidsInFrameworks,
                checkDuplicateCtidsInConceptSchemes,
                checkCtidCollisionsWithFrameworksAndConceptSchemes,
                checkFrameworkCtidCollisions
            ] : null);
        },
        importPdf: function () {
            var me = this;
            store.app().setImportStatus('importing framework...');
            var formData = new FormData();
            formData.append(me.importFile[0].name, me.importFile[0]);
            store.app().setImportStatus('importing file...');
            EcRemote.postExpectingString(
                "https://t3.cassproject.org/service/parse/",
                "docx",
                formData,
                function (s) {
                    var d = s;
                    if (d == null) {
                        store.app().setImportStatus(s);
                        store.app().setImportTransition('process');
                        store.app().addImportError(s);
                        return;
                    }
                    var uuid = new UUID(3, "nil", d.name).format();
                    var f = new EcFramework();
                    store.app().setImportStatus('looking for existing framework...');
                    if (me.queryParams && me.queryParams.newObjectEndpoint) {
                        f.id = me.queryParams.newObjectEndpoint + uuid;
                    } else {
                        f.assignId(me.repo.selectedServer, uuid);
                    }
                    me.repo.search("(@id:\"" + f.shortId() + "\") AND (@type:Framework)", function () { }, function (frameworks) {
                        console.log(frameworks);
                        store.app().setImportStatus('looking for existing framwork...');
                        if (frameworks.length > 0) {
                            store.app().setImportStatus('framework found...');
                            me.showModal('duplicate', d);
                        } else {
                            store.app().setImportStatus('no match, saving new framework...');
                            me.savePdfImport(d);
                        } /* TO DO - ERROR HANDLING HERE */
                    }, function (error) {
                        store.app().setImportStatus(error);
                        store.app().setImportTransition('process');
                        store.app().addImportError(error);
                    });
                },
                /* TO DO - ERROR HANDLING HERE */
                function (error) {
                    console.log("error here");
                    if (error === "") {
                        error = "Server unresponsive.";
                    }
                    store.app().setImportStatus(error);
                    store.app().setImportTransition('process');
                    store.app().addImportError(error);
                }
            );
            store.app().setImportTransition('process');
            store.app().setImportStatus('processing file...');
        },
        savePdfImport: function (d, newName) {
            var me = this;
            store.app().setImportStatus('saving file...');
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
            console.log("d", d);
            console.log("message: ", JSON.parse(f.toJson()));
            var cs = {};
            if (!d.competencies) {
                store.app().setImportStatus("Error importing competencies.");
                store.app().setImportTransition('process');
                store.app().addImportError("Error importing competencies, no competencies found in file.");
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
                if (d.competencies[i]["ceasn:altCodedNotation"] != null) {
                    c["ceasn:altCodedNotation"] = d.competencies[i]["ceasn:altCodedNotation"];
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
                    console.log(JSON.parse(c.toJson()));
                }
            }
            me.repo.multiput(toSave, function () {
                store.app().setImportFramework(f);
                store.editor().setFramework(f);
                store.editor().setT3Profile(true);
                store.app().setImportStatus("");
                me.importSuccess();
            }, function (error) {
                store.app().setImportStatus(error);
                store.app().setImportTransition('process');
                store.app().addImportError(error);
            });
            store.app().setImportTransition('process');
            store.app().setImportStatus('saving import...');
        },
        importCsv: function () {
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
            store.app().setImportAllowCancel(true);
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
                function (competencies, alignments) {
                    store.app().setImportAllowCancel(false);
                    f.competency = [];
                    f.relation = [];
                    for (var i = 0; i < competencies.length; i++) {
                        f.competency.push(competencies[i].shortId());
                    }
                    for (var i = 0; i < alignments.length; i++) {
                        f.relation.push(alignments[i].shortId());
                    }
                    me.repo.saveTo(f, function (success) {
                        me.importFile.splice(0, 1);
                        if (me.importFile.length > 0) {
                            me.firstImport = false;
                            me.analyzeImportFile();
                        } else {
                            store.app().setImportFramework(f);
                            store.editor().setFramework(f);
                            me.importSuccess();
                            me.spitEvent("importFinished", f.shortId(), "importPage");
                        }
                    }, function (failure) {
                        store.app().setImportTransition('process');
                        store.app().addImportError(failure);
                    });
                },
                function (failure) {
                    store.app().setImportStatus(failure);
                    store.app().setImportTransition('process');
                    store.app().addImportError(failure);
                },
                function (increment) {
                    if (increment.relations != null && increment.relations !== undefined) {
                        store.app().setImportStatus((increment.relations + "/" + me.relationCount + " relations imported."));
                    } else if (increment.competencies != null && increment.competencies !== undefined) {
                        store.app().setImportStatus((increment.competencies + "/" + me.competencyCount + " competencies imported."));
                    } else {
                        store.app().setImportStatus("Importing...");
                    }
                }, false, me.repo);
        },
        importJsonLd: function (importData) {
            return new Promise((resolve, reject) => {
                store.app().setImportTransition('process');
                var formData = new FormData();
                if (importData != null && importData !== undefined) {
                    formData.append('data', JSON.stringify(importData));
                } else {
                    var file = this.importFile[0];
                    formData.append('file', file);
                }
                var identity = EcIdentityManager.default.ids[0];
                if (identity != null) { formData.append('owner', identity.ppk.toPk().toPem()); }
                let me = this;
                store.app().setImportAllowCancel(true);
                store.app().setImportFramework(null);
                EcRemote.postInner(this.repo.selectedServer, "ctdlasn", formData, null, async function (data) {
                    store.app().setImportAllowCancel(false);
                    var framework;
                    if (EcRepository.cache) {
                        delete EcRepository.cache[data];
                    }
                    if (me.conceptMode || me.progressionMode) {
                        framework = await EcConceptScheme.get(data);
                    } else {
                        framework = await EcFramework.get(data);
                        store.app().setImportFramework(framework);
                    }
                    store.editor().setFramework(framework);
                    store.app().setImportFramework(framework);
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
                }, function (failure) {
                    store.app().setImportTransition('process');
                    store.app().setImportStatus("Import failed. Check your import file for any errors.");
                    console.log(failure.statusText);
                    store.app().addImportError(failure);
                    reject(failure.statusText);
                }).catch((err) => {
                    store.app().setImportTransition('process');
                    store.app().setImportStatus("Import failed. Check your import file for any errors.");
                    console.log(err);
                    store.app().addImportError(err);
                    reject(err);
                });
                if (me.conceptMode || me.progressionMode) {
                    if (me.importFileType === 'ctdlasnjsonldprogression') {
                        store.app().setImportStatus("Importing Progression Model");
                    } else {
                        if (me.queryParams.ceasnDataFields === 'true') {
                            store.app().setImportStatus("Importing Concept Scheme");
                        } else {
                            store.app().setImportStatus("Importing Taxonomy");
                        }
                    }
                } else {
                    if (me.importFileType === 'ctdlasnjsonldcollection') {
                        store.app().setImportStatus('Importing Collection');
                    } else {
                        store.app().setImportStatus('Importing Framework');
                    }
                }
            });
        },
        importCtdlAsnConceptCsv: function () {
            var me = this;
            var ceo = null;
            if (EcIdentityManager.default.ids.length > 0) {
                ceo = EcIdentityManager.default.ids[0];
            }
            store.app().setImportStatus('process');
            store.app().setImportAllowCancel(true);

            // Define validation rules based on import type
            var validationRules = null;
            if (this.queryParams.ceasnDataFields === 'true') {
                if (me.importFileType === 'progressioncsv') {
                    // Validation rules for Progression Models
                    validationRules = {
                        requiredProps: {
                            "asn:ProgressionModel": ["@id", "ceasn:name", "ceasn:description", "ceasn:inLanguage", "ceasn:publicationStatusType"],
                            "asn:ProgressionLevel": ["@id", "skos:prefLabel"]
                        },
                        hierarchyRules: {
                            "asn:ProgressionModel": {
                                requiredProperties: ["skos:hasTopConcept"],
                                childProperties: ["ceasn:inProgressionModel"],
                                errorMessage: "CSV must contain at least one of: skos:hasTopConcept (for Progression Model level) or ceasn:inProgressionModel (for progression level)"
                            }
                        },
                        validateHierarchy: true
                    };
                } else {
                    // Validation rules for Concept Schemes
                    validationRules = {
                        requiredProps: {
                            "skos:ConceptScheme": ["@id", "ceasn:name", "ceasn:description", "ceasn:inLanguage", "ceasn:publicationStatusType"],
                            "skos:Concept": ["@id", "skos:prefLabel"]
                        },
                        hierarchyRules: {
                            "skos:ConceptScheme": {
                                requiredProperties: ["skos:hasTopConcept"],
                                childProperties: ["skos:inScheme", "skos:topConceptOf"],
                                errorMessage: "CSV must contain at least one of: skos:hasTopConcept (for Concept Scheme level) or skos:inScheme (for concept level)"
                            }
                        },
                        validateHierarchy: true
                    };
                }
            }

            CTDLASNCSVConceptImport.importFrameworksAndCompetencies(me.repo, me.importFile[0], function (frameworks, competencies) {
                store.app().setImportAllowCancel(false);
                if (me.queryParams.ceasnDataFields === 'true') {
                    for (var i = 0; i < frameworks.length; i++) {
                        if (frameworks[i]["dcterms:language"] == null || frameworks[i]["dcterms:language"] === undefined) {
                            me.setDefaultLanguage();
                            frameworks[i]["dcterms:language"] = store.editor().defaultLanguage;
                        }
                    }
                }
                if (me.importFileType === "progressioncsv") {
                    for (var i = 0; i < frameworks.length; i++) {
                        frameworks[i]["subType"] = "Progression";
                    }
                    for (var i = 0; i < competencies.length; i++) {
                        competencies[i]["subType"] = "Progression";
                    }
                }
                var all = frameworks.concat(competencies);
                store.app().setImportStatus("Saving " + all.length + " objects.");
                me.repo.multiput(all, function () {
                    for (var i = 0; i < frameworks.length; i++) {
                        me.spitEvent("importFinished", frameworks[i].shortId(), "importPage");
                    }
                    store.editor().setFramework(frameworks[0]);
                    store.app().setImportFramework(frameworks[0]);
                    me.importSuccess();
                }, function (failure) {
                    store.app().setImportTransition('process');
                    store.app().addImportError("Failed to save: " + failure);
                    console.error(failure);
                });
            }, function(failure) {
                me.handleImportErrors(failure);
                appError(failure);
            }, ceo, (this.queryParams.newObjectEndpoint ? this.queryParams.newObjectEndpoint : null), EcIdentityManager.default, me.importFileType === 'progressioncsv', validationRules,
            this.queryParams.ceasnDataFields === 'true' ? [
                checkDuplicateCtidsInFrameworks,
                checkDuplicateCtidsInConceptSchemes,
                checkCtidCollisionsWithFrameworksAndConceptSchemes,
                checkFrameworkCtidCollisions
            ] : null);
        },
        importFromFile: function () {
            let me = this;
            try {
                const fileType = store.app().importFileType;
                console.log(fileType);
                store.app().setImportTransition('process');
                if (fileType === "csv") {
                    me.importCsv();
                } else if (fileType === "ctdlasncsv" || fileType === "collectioncsv") {
                    me.importCtdlAsnCsv();
                } else if (fileType === "conceptcsv" || fileType === "progressioncsv") {
                    me.importCtdlAsnConceptCsv();
                } else if (fileType === "ctdlasnjsonld" || fileType === "ctdlasnjsonldprogression" || fileType === "ctdlasnjsonldcollection") {
                    me.importJsonLd();
                } else if (fileType === "asn") {
                    me.importAsn();
                } else if (fileType === "pdf") {
                    me.importPdf();
                } else if (fileType === "medbiq") {
                    me.importMedbiq();
                } else {
                    console.log("unsupported file type");
                    let error = "Unsupported file type" + fileType;
                    store.app().addImportError(error);
                    store.app().setImportTransition('process');
                }
            } catch (error) {
                console.log("error during importFromFile", error);
                store.app().addImportError(error);
                store.app().setImportTransition('process');
            }
        },
        parseText: function () {
            var me = this;
            if (EcIdentityManager.default.ids != null && EcIdentityManager.default.ids.length > 0) {
                this.importFramework.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
            }
            if (this.queryParams.newObjectEndpoint !== null && this.queryParams.newObjectEndpoint !== undefined) {
                this.importFramework.generateShortId(this.queryParams.newObjectEndpoint);
            } else {
                this.importFramework.generateId(this.repo.selectedServer);
            }
            this.importFramework.name = store.app().importFrameworkName;
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
            this.repo.multiput(toSave, function () {
                me.spitEvent("importFinished", me.importFramework.shortId(), "importPage");
                store.editor().setFramework(me.importFramework);
                me.$router.push({ name: "framework", params: { frameworkId: me.importFramework.shortId() } });
            }, function (failure) {
                console.log("failure", failure);
                store.app().addImportError(failure);
                store.app().setImportTransition('process');
            });
        },
        showImportModal: function (type) {
            let modalObject = {
                component: 'SupportedImportDetails',
                documentContent: type
            };
            store.app().setShowModal(modalObject);
        },
        importFromUrl: function () {
            return new Promise((resolve, reject) => {
                let me = this;
                let error = {
                    message: "Unable to import from the URL source provided.",
                    details: ""
                };
                if (!this.isValidUrl(this.importUrl)) {
                    error.details = "The URL provided is not valid.";
                    store.app().addImportError(error.details);
                    store.app().setImportTransition('upload');
                    me.showModal('error', error);
                    reject(error.details);
                    return;
                }
                EcRemote.getExpectingString(this.importUrl, null, function (result) {
                    var graph = result["@graph"];
                    if (graph != null) {
                        var id = graph[0]["@id"];
                        if (id) {
                            me.repo.search("(@id:\"" + id + "\") AND (@type:Framework)", function () { }, function (frameworks) {
                                console.log(frameworks);
                                if (frameworks.length > 0) {
                                    store.app().setImportStatus('framework found...');
                                    if (me.importType === 'url') {
                                        me.showModal('duplicateOverwriteOnly', [result, frameworks[0]]);
                                        resolve();
                                    }
                                } else {
                                    store.app().setImportStatus('no match, saving new framework...');
                                    me.importJsonLd(result).then(resolve).catch(reject);
                                } /* TO DO - ERROR HANDLING HERE */
                            }, function (failure) {
                                error.details = failure;
                                store.app().setImportStatus(failure);
                                store.app().setImportTransition('process');
                                store.app().addImportError(failure);
                                me.showModal('error', error);
                                reject(error.details);
                            });
                        } else {
                            me.importJsonLd(result).then(resolve).catch(reject);
                        }
                    } else {
                        error.details = "URL must have an '@graph' field at the top level.";
                        store.app().addImportError(error.details);
                        store.app().setImportTransition('process');
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
                        store.app().addImportError(error.details);
                        store.app().setImportTransition('process');
                        me.showModal('error', error);
                        reject(error.details);
                    }
                }, function (failure) {
                    if (!failure) {
                        store.app().addImportError(error.message);
                        store.app().setImportTransition('upload');
                        me.showModal('error', error);
                    } else {
                        error.details = failure;
                        store.app().addImportError(failure);
                        store.app().setImportTransition('upload');
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
        importType: function (val) {
            this.caseDocs = [];
            this.clearImport();
        },
        importTransition: function (val) {
            if (val === 'processFiles') {
                return this.uploadFiles(this.importFile);
            } else if (val === 'uploadCsv' || val === 'uploadMedbiq' || val === 'uploadOtherNonPdf') {
                this.importFromFile();
            } else if (val === 'connectToServer') {
                this.connectToServer();
            }
        },
        importText: function (newText, oldText) {
            var me = this;
            TabStructuredImport.importCompetencies(
                newText,
                this.queryParams.newObjectEndpoint ? this.queryParams.newObjectEndpoint : this.repo.selectedServer,
                EcIdentityManager.default.ids[0],
                function (competencies, relations) {
                    store.app().setImportTransition('light');
                    let feedback = competencies.length + " competencies and " + relations.length + " relations.";
                    store.app().setImportStatus(feedback);
                    var f = new EcFramework();
                    store.app().setImportFramework(null);
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
                    me.$nextTick(function () {
                        store.app().setImportFramework(f);
                        store.editor().setFramework(f);
                    });
                }, function (status) {
                    store.app().setImportStatus(status);
                },
                console.error,
                this.repo,
                false);
        },
        importFrameworkName: function () {
            if (this.importType === "text" && this.importFramework) {
                let framework = this.importFramework;
                framework.name = this.importFrameworkName;
                store.editor().setChangedObject("update");
                store.app().setImportFramework(framework);
            }
        },
        importFramework: function () {
            if (this.importFramework && !this.conceptMode && !this.progressionMode && (!this.importFramework.competency || this.importFramework.competency === 0)) {
                this.hierarchyIsdoneLoading = true;
            }
        }
    }
};