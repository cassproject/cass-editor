import common from '@/mixins/common.js';
export default {
    mixins: [common],
    methods: {
        removeObject: function(thing) {
            // Remove from container but don't delete
            appLog("removing " + thing.id);
            var me = this;
            var thisFramework = this.$store.getters['editor/framework'];
            var initialCompetencies = thisFramework.competency ? thisFramework.competency.slice() : null;
            var initialRelations = thisFramework.relation ? thisFramework.relation.slice() : null;
            var initialLevels = thisFramework.level ? thisFramework.level.slice() : null;
            thisFramework["schema:dateModified"] = new Date().toISOString();
            thisFramework.removeCompetency(thing.shortId(), function() {
                var framework = me.framework;
                me.$store.commit('editor/addEditsToUndo', [{operation: "update", id: framework.shortId(), fieldChanged: ["competency", "relation", "level"], initialValue: [initialCompetencies, initialRelations, initialLevels]}]);
                if (me.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[f.id] !== true) {
                    framework = EcEncryptedValue.toEncryptedValue(framework);
                }
                window.repo.saveTo(framework, function() {
                    me.$store.commit('editor/framework', thisFramework);
                }, appError);
            }, appLog);
        },
        deleteObject: function(thing) {
            appLog("deleting " + thing.id);
            var me = this;
            var framework = this.$store.getters['editor/framework'];
            if (thing.shortId() === framework.shortId()) {
                // delete framework
                window.repo.deleteRegistered(framework, function(success) {
                    me.spitEvent("frameworkDeleted", framework.shortId(), "editFrameworkSection");
                    // Delete the framework, delete all non-used stuff.
                    if (framework.competency != null) {
                        for (var i = 0; i < framework.competency.length; i++) {
                            me.conditionalDelete(framework.competency[i]);
                        }
                    }
                    if (framework.relation != null) {
                        for (var i = 0; i < framework.relation.length; i++) {
                            me.conditionalDelete(framework.relation[i]);
                        }
                    }
                    if (framework.level != null) {
                        for (var i = 0; i < framework.level.length; i++) {
                            me.conditionalDelete(framework.level[i]);
                        }
                    }
                    me.$store.commit('editor/framework', null);
                    if (me.importType) {
                        // Calling function from import page
                        me.$store.commit('app/importFramework', null);
                    } else {
                        me.$router.push({name: "frameworks"});
                    }
                }, appLog);
            } else {
                // Delete competency and relations
                var initialCompetencies = framework.competency ? framework.competency.slice() : null;
                var initialRelations = framework.relation ? framework.relation.slice() : null;
                var initialLevels = framework.level ? framework.level.slice() : null;
                this.$store.commit('editor/selectedCompetency', thing);
                framework["schema:dateModified"] = new Date().toISOString();
                framework.removeCompetency(thing.shortId(), function() {
                    framework.removeLevel(thing.shortId());
                    me.$store.commit('editor/addEditsToUndo', [
                        {operation: "delete", obj: thing},
                        {operation: "update", id: framework.shortId(), fieldChanged: ["competency", "relation", "level"], initialValue: [initialCompetencies, initialRelations, initialLevels], changedValue: [framework.competency, framework.relation, framework.level]}
                    ]);
                    me.conditionalDelete(thing.shortId());
                    me.spitEvent("competencyDeleted", thing.shortId(), "editFrameworkSection");
                    me.$store.commit('editor/selectedCompetency', null);
                    var frameworkToSave = framework;
                    if (me.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[framework.id] !== true) {
                        frameworkToSave = EcEncryptedValue.toEncryptedValue(framework);
                    }
                    window.repo.saveTo(frameworkToSave, function() {
                        me.$store.commit('editor/framework', framework);
                    }, appError);
                }, appLog);
            }
        }
    }
};