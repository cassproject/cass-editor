<template>
    <div class="modal-card">
        <header class="modal-card-head has-background-primary">
            <h3 class="modal-card-title has-text-white is-size-3">
                Edit Multiple Competencies
            </h3>
            <button
                class="delete"
                aria-label="close"
                @click="$store.commit('app/closeModal')" />
        </header>
        <section class="modal-card-body">
            <div
                v-for="(item,idx) in addedPropertiesAndValues"
                :key="item">
                <AddProperty
                    :profile="profile"
                    :editingMultipleCompetencies="true"
                    @propertyStringUpdated="propertyStringUpdated"
                    :idx="idx"
                    @removeValueAtIndex="removeValueAtIndex"
                    @checkedOptions="onCheckedOptions" />
                <span v-if="item['error']">
                    {{ item['error'] }}
                </span>
            </div>
            <!-- after adding one property, show button to add another -->
            <div class="buttons is-right">
                <div class="button is-small is-outlined is-primary">
                    <span class="icon">
                        <i class="fa fa-plus" />
                    </span>
                    <span @click="addAnotherProperty">Add another property</span>
                </div>
            </div>
        </section>
        <footer class="modal-card-foot">
            <div class="buttons is-spaced">
                <button
                    @click="$store.commit('app/closeModal');"
                    class="button is-outlined is-dark">
                    <span class="icon">
                        <i class="fa fa-times" />
                    </span>
                    <span>cancel</span>
                </button>
                <button
                    class="button is-outlined is-success"
                    @click="applyToMultiple"
                    :disabled="disableApplyButton">
                    <span class="icon">
                        <i class="fa fa-save" />
                    </span>
                    <span>Apply to multiple</span>
                </button>
            </div>
        </footer>
    </div>
</template>
<script>
import AddProperty from '@/lode/components/lode/AddProperty.vue';
export default {
    name: 'MultiEdit',
    components: {
        AddProperty
    },
    props: {
        content: Object
    },
    data() {
        return {
            addedPropertiesAndValues: [{"property": "", "value": "", "range": []}],
            repo: window.repo,
            saveCount: 0,
            errorMessage: [],
            checkedOptions: [],
            changedItemsForUndo: []
        };
    },
    computed: {
        profile: function() {
            return this.content.profile;
        },
        selectedCompetencies: function() {
            return this.content.selectedCompetencies;
        },
        disableApplyButton: function() {
            for (var i = 0; i < this.addedPropertiesAndValues.length; i++) {
                if (this.addedPropertiesAndValues[i].error) {
                    return true;
                }
            }
            return false;
        }
    },
    methods: {
        showModal() {
            let params = {};

            params = {
                type: "errors",
                title: "Errors saving",
                text: this.errorMessage
            };
            // reveal modal
            this.$modal.show(params);
        },
        addErrorMessage: function(msg) {
            this.errorMessage.push(msg);
        },
        onCheckedOptions: function(options) {
            this.checkedOptions = options;
        },
        propertyStringUpdated: function(property, value, range, index) {
            this.addedPropertiesAndValues[index].property = property;
            this.addedPropertiesAndValues[index].value = value;
            this.addedPropertiesAndValues[index].range = range;
            this.$set(this.addedPropertiesAndValues[index], "error", null);
            // Validate input
            if (range.length === 1 && (range[0] === "http://schema.org/URL" ||
            range[0].toLowerCase().indexOf("concept") !== -1 || range[0].toLowerCase().indexOf("competency") !== -1 ||
            range[0].toLowerCase().indexOf("level") !== -1)) {
                if (value.indexOf("http") === -1) {
                    this.addedPropertiesAndValues[index].error = "This property must be a URL. For example: https://credentialengineregistry.org/, https://eduworks.com, https://case.georgiastandards.org/.";
                    return;
                }
            }
            if (range[0].toLowerCase().indexOf("level") !== -1) {
                var level = EcLevel.getBlocking(value);
                if (!level) {
                    this.addedPropertiesAndValues[index].error = "This URL must be a Level that is already in the system.";
                    return;
                }
            }
            if (range.length === 1 && range[0].toLowerCase().indexOf("langstring") !== -1) {
                if (value["@language"] == null || value["@language"] === undefined || value["@language"].trim().length === 0) {
                    this.addedPropertiesAndValues[index].error = "This property must have a language.";
                }
            }
        },
        validateOnePerLanguage: function(expandedCompetency, property, competency) {
            var languagesUsed = [];
            for (var k = 0; k < expandedCompetency[property].length; k++) {
                if (languagesUsed.includes(expandedCompetency[property][k]["@language"].toLowerCase())) {
                    this.addErrorMessage(property + " can only have one entry per language. Competency " + competency.getName() + " was not saved.");
                    return false;
                }
                languagesUsed.push(expandedCompetency[property][k]["@language"].toLowerCase());
            }
            return true;
        },
        validateMax: function(expandedCompetency, property, competencyId, competency) {
            if (this.profile[property]["valuesIndexed"]) {
                var f = this.profile[property]["valuesIndexed"];
                f = f();
                if (f && f[EcRemoteLinkedData.trimVersionFromUrl(competencyId)]) {
                    this.addErrorMessage(property + " can only have one value. Competency " + competency.getName() + " was not saved.");
                    return false;
                }
            } else {
                if (expandedCompetency[property] != null && expandedCompetency[property].length > 0) {
                    this.addErrorMessage(property + " can only have one value. Competency " + competency.getName() + " was not saved.");
                    return false;
                }
            }
            return true;
        },
        applyToMultiple: function() {
            var me = this;
            for (var i = 0; i < this.selectedCompetencies.length; i++) {
                var competencyId = this.selectedCompetencies[i];
                var competency = EcCompetency.getBlocking(competencyId);
                this.expand(competency, function(expandedCompetency) {
                    var initialValues = [];
                    var changedValues = [];
                    var properties = [];
                    for (var j = 0; j < me.addedPropertiesAndValues.length; j++) {
                        var property = me.addedPropertiesAndValues[j].property.value;
                        var value = me.addedPropertiesAndValues[j].value;
                        var range = me.addedPropertiesAndValues[j].range;

                        properties.push(property);
                        if (expandedCompetency[property]) {
                            initialValues.push(JSON.parse(JSON.stringify(expandedCompetency[property])));
                        } else {
                            initialValues.push([]);
                        }

                        if (range.length === 1 && range[0].toLowerCase().indexOf("langstring") !== -1) {
                            if (me.profile && me.profile[property] && (me.profile[property]["onePerLanguage"] === 'true' || me.profile[property]["onePerLanguage"] === true)) {
                                var okayToSave = me.validateOnePerLanguage(expandedCompetency, property, competency);
                                if (!okayToSave) {
                                    continue;
                                }
                            }
                        }

                        // If one value is allowed for a property and it already exists, the user cannot add another
                        if (me.profile[property]["max"] === 1) {
                            var okayToSave = me.validateMax(expandedCompetency, property, competencyId, competency);
                            if (!okayToSave) {
                                continue;
                            }
                        }

                        if (me.profile && me.profile[property]["add"]) {
                            var f = me.profile[property]["add"];
                            if (f !== "checkedOptions") {
                                var shortId = EcRemoteLinkedData.trimVersionFromUrl(competencyId);
                                f(shortId, [value]);
                            }
                        } else {
                            if (!value["@value"]) {
                                value = {"@value": value};
                            }
                            expandedCompetency = me.add(property, value, expandedCompetency);
                        }
                        if (me.profile && me.profile[property]["save"]) {
                            var f = me.profile[property]["save"];
                            if (me.checkedOptions) {
                                f(expandedCompetency, me.checkedOptions, me.profile[property]["options"]);
                            } else {
                                f();
                            }
                        }
                        changedValues.push(expandedCompetency[property]);
                    }
                    if (me.errorMessage && me.errorMessage.length > 0) {
                        me.showModal();
                    }
                    me.changedItemsForUndo.push({operation: "update", id: competencyId, fieldChanged: properties, initialValue: initialValues, changedValue: changedValues});
                    me.save(expandedCompetency);
                    me.saveCount++;
                });
            }
        },
        removeValueAtIndex: function(index) {
            if (this.addedPropertiesAndValues.length > 1) {
                this.addedPropertiesAndValues.splice(index, 1);
            } else {
                this.addedPropertiesAndValues = [{"property": "", "value": "", "range": []}];
            }
        },
        addAnotherProperty: function() {
            this.addedPropertiesAndValues.push({"property": "", "value": "", "range": []});
        },
        expand: function(o, after) {
            var toExpand = JSON.parse(o.toJson());
            if (toExpand["@context"] != null && toExpand["@context"].startsWith("http://")) {
                toExpand["@context"] = toExpand["@context"].replace("http://", "https://");
            }
            if (toExpand["@context"] != null && toExpand["@context"].indexOf("skos") !== -1) {
                toExpand["@context"] = "https://schema.cassproject.org/0.4/skos/";
            }
            jsonld.expand(toExpand, function(err, expanded) {
                if (err == null) {
                    after(expanded[0]);
                } else {
                    after(null);
                }
            });
        },
        add: function(property, value, expandedCompetency) {
            if (expandedCompetency[property] === undefined || expandedCompetency[property] == null) {
                expandedCompetency[property] = [];
            }
            if (!EcArray.isArray(expandedCompetency[property])) {
                expandedCompetency[property] = [expandedCompetency[property]];
            }
            expandedCompetency[property].push(value);
            return expandedCompetency;
        },
        save: function(expandedCompetency) {
            var me = this;
            var context = "https://schema.cassproject.org/0.4";
            jsonld.compact(expandedCompetency, this.$store.state.lode.rawSchemata[context], function(err, compacted) {
                if (err != null) {
                    console.error(err);
                }
                var rld = new EcRemoteLinkedData();
                rld.copyFrom(compacted);
                rld.context = context;
                delete rld["@context"];
                if (rld.owner && !EcArray.isArray(rld.owner)) {
                    rld.owner = [rld.owner];
                }
                rld["schema:dateModified"] = new Date().toISOString();
                if (me.$store.state.editor && me.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[rld.id] !== true) {
                    rld = EcEncryptedValue.toEncryptedValue(rld);
                }
                me.repo.saveTo(rld, console.log, console.error);
            });
        }
    },
    watch: {
        saveCount: function() {
            if (this.saveCount === this.selectedCompetencies.length) {
                // Done saving, close modal
                this.$store.commit('editor/addEditsToUndo', this.changedItemsForUndo);
                this.$store.commit('app/closeModal');
            }
        }
    }
};
</script>
<style>
</style>