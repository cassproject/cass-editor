export default {
    data() {
        return {
            levels: null
        };
    },
    watch: {
        refreshLevels: function() {
            if (this.refreshLevels) {
                this.updateLevels();
            }
        }
    },
    computed: {
        refreshLevels: function() {
            return this.$store.getters['editor/refreshLevels'];
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
        }
    }
};