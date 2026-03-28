import pLimit from 'p-limit';
import store from '@/stores/index.js';

const limit = pLimit(50);

export default {
    data() {
        return {
            levels: null,
            relations: {},
            alignments: {}
        };
    },
    watch: {
        refreshLevels: function() {
            if (this.refreshLevels) {
                this.updateLevels();
            }
        },
        relationArray: function() {
            this.updateRelations();
        },
        refreshAlignments: function() {
            if (this.refreshAlignments) {
                this.updateAlignments();
            }
        }
    },
    computed: {
        refreshLevels: function() {
            return store.editor().refreshLevels;
        },
        relationArray: function() {
            if (this.framework) {
                return this.framework.relation;
            } else if (this.importFramework) {
                return this.importFramework.relation;
            }
        },
        refreshAlignments: function() {
            return store.editor().refreshAlignments;
        }
    },
    methods: {
        updateLevels: function() {
            var me = this;
            // Make reactive when the same level is applied to multiple competencies in the same framework
            if (store.editor().refreshLevels === true) {
                store.editor().refreshLevels = false;
            }
            var levels = {};
            if (!this.framework) {
                return;
            }
            if (!this.framework.level) {
                this.levels = null;
                return;
            }
            new EcAsyncHelper().each(this.framework.level, function(levelId, done) {
                EcLevel.get(levelId, function(level) {
                    var comp = level.competency;
                    if (!EcArray.isArray(comp)) {
                        comp = [comp];
                    }
                    for (var j = 0; j < comp.length; j++) {
                        if (!EcArray.isArray(levels[comp[j]])) {
                            levels[comp[j]] = [];
                        }
                        levels[comp[j]].push({"@id": level.shortId()});
                    }
                    done();
                }, done);
            }, function(levelIds) {
                me.levels = levels;
            });
        },
        updateRelations: function() {
            if (!this.framework?.relation && !this.importFramework?.relation) {
                this.relations = {};
                store.editor().setRelations({});
                return;
            }
            var me = this;
            var relations = [];
            new EcAsyncHelper().each((this.framework ? this.framework.relation : this.importFramework.relation), function(relationId, done) {
                EcAlignment.get(relationId, function(a) {
                    if (a && a.source && a.target) {
                        var relation = {};
                        var relationType = a.relationType;
                        var reciprocalRelation = null;
                        if (me.queryParams.ceasnDataFields === "true" && relationType === "narrows") {
                            let framework = me.framework;
                            if (!framework) {
                                framework = me.importFramework;
                            }
                            if (framework.competency && framework.competency.indexOf(a.target) !== -1 && framework.competency.indexOf(a.source) !== -1) {
                                relationType = "isChildOf";
                                reciprocalRelation = "hasChild";
                            }
                        }
                        if (relationType === "narrows") {
                            reciprocalRelation = "broadens";
                        } else if (relationType === "broadens") {
                            reciprocalRelation = "narrows";
                        } else if (relationType === "isEquivalentTo") {
                            reciprocalRelation = "isEquivalentTo";
                        } else if (relationType === "requires") {
                            reciprocalRelation = "isRequiredBy";
                        } else if (relationType === "implies") {
                            reciprocalRelation = "isImpliedBy";
                        } else if (relationType === "desires") {
                            reciprocalRelation = "isDesiredBy";
                        } else if (relationType === "isRelatedTo") {
                            reciprocalRelation = "isRelatedTo";
                        }
                        relation.type = relationType;
                        relation.source = a.source;
                        relation.target = {"@id": a.target};
                        relations.push(relation);
                        if (reciprocalRelation) {
                            var reciprocal = {};
                            reciprocal.type = reciprocalRelation;
                            reciprocal.source = a.target;
                            reciprocal.target = {"@id": a.source};
                            relations.push(reciprocal);
                        }
                    }
                    done();
                }, done);
            }, function(relationIds) {
                let relationObject = {};
                for (let i = 0; i < relations.length; i++) {
                    let each = relations[i];
                    if (!relationObject[each.type]) {
                        relationObject[each.type] = {};
                    }
                    if (!relationObject[each.type][each.source]) {
                        relationObject[each.type][each.source] = [];
                    }
                    relationObject[each.type][each.source].push(each.target);
                }
                me.relations = relationObject;
                store.editor().setRelations(me.relations);
            });
        },
        updateAlignments: async function() {
            var me = this;
            if (store.editor().refreshAlignments === true) {
                store.editor().refreshAlignments = false;
            }
            if (!this.framework) {
                return;
            }
            if (!this.framework.competency) {
                return;
            }
            var alignments = {};

            let promises = [];
            for (let compId of this.framework.competency) {
                promises.push(limit(() => {
                    return new Promise((resolve) => {
                        var search = "@type:CreativeWork AND educationalAlignment.targetUrl:\"" + compId + "\"";
                        me.repo.searchWithParams(search, {size: 25}).then((resources) => {
                            for (var i = 0; i < resources.length; i++) {
                                let resourceType = resources[i].educationalAlignment.alignmentType + " (resource)";
                                if (!alignments[resourceType]) {
                                    alignments[resourceType] = {};
                                }
                                if (!alignments[resourceType][compId]) {
                                    alignments[resourceType][compId] = [];
                                }
                                alignments[resourceType][compId].push({"@id": resources[i].shortId(), "name": resources[i].name, "@value": resources[i].url});
                            }
                            resolve();
                        });
                    });
                }));
            }

            await Promise.all(promises);
            me.alignments = alignments;
        }
    }
};