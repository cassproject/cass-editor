export default {
    data() {
        return {
            levels: null,
            relations: {}
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
        }
    },
    computed: {
        refreshLevels: function() {
            return this.$store.getters['editor/refreshLevels'];
        },
        relationArray: function() {
            return this.framework.relation;
        }
    },
    methods: {
        updateLevels: function() {
            var me = this;
            // Make reactive when the same level is applied to multiple competencies in the same framework
            if (this.$store.getters['editor/refreshLevels'] === true) {
                this.$store.commit('editor/refreshLevels', false);
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
            if (!this.framework.relation) {
                this.relations = {};
                return;
            }
            var me = this;
            var relations = {};
            new EcAsyncHelper().each(this.framework.relation, function(relationId, done) {
                EcAlignment.get(relationId, function(a) {
                    if (a && a.source && a.target) {
                        var relationType = a.relationType;
                        var reciprocalRelation = null;
                        if (me.queryParams.ceasnDataFields === "true" && relationType === "narrows") {
                            if (me.framework.competency.indexOf(a.target) !== -1) {
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
                        relations[relationType][a.source].push({"@id": a.target});
                        if (reciprocalRelation) {
                            if (!relations[reciprocalRelation]) {
                                relations[reciprocalRelation] = {};
                            }
                            if (!relations[reciprocalRelation][a.target]) {
                                relations[reciprocalRelation][a.target] = [];
                            }
                            relations[reciprocalRelation][a.target].push({"@id": a.source});
                        }
                    }
                    done();
                }, done);
            }, function(relationIds) {
                me.relations = relations;
            });
        }
    }
};