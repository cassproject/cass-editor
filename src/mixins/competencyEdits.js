export default {
    methods: {
        removeObject: function(thing) {
            // Remove from container but don't delete
            console.log("removing " + thing.id);
            var me = this;
            this.framework["schema:dateModified"] = new Date().toISOString();
            this.framework.removeCompetency(thing.shortId(), function() {
                var framework = me.framework;
                if (me.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[f.id] !== true) {
                    framework = EcEncryptedValue.toEncryptedValue(framework);
                }
                repo.saveTo(framework, function() {
                    me.confirmDialog = false;
                    me.$store.commit('editor/framework', me.framework);
                }, console.error);
            }, console.log);
        },
        deleteObject: function(thing) {
            console.log("deleting " + thing.id);
            var me = this;
            if (thing.shortId() === this.framework.shortId()) {
                // delete framework
                var framework = this.framework;
                this.repo.deleteRegistered(framework, function(success) {
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
                    me.$router.push({name: "frameworks"});
                }, console.log);
            } else {
                // Delete competency and relations
                var initialCompetencies = this.framework.competency ? this.framework.competency.slice() : null;
                var initialRelations = this.framework.relation ? this.framework.relation.slice() : null;
                var initialLevels = this.framework.level ? this.framework.level.slice() : null;
                this.$store.commit('editor/selectedCompetency', thing);
                this.framework["schema:dateModified"] = new Date().toISOString();
                this.framework.removeCompetency(thing.shortId(), function() {
                    me.framework.removeLevel(thing.shortId());
                    me.$store.commit('editor/addEditsToUndo', [
                        {operation: "delete", obj: thing},
                        {operation: "update", id: me.framework.shortId(), fieldChanged: ["competency", "relation", "level"], initialValue: [initialCompetencies, initialRelations, initialLevels], changedValue: [me.framework.competency, me.framework.relation, me.framework.level]}
                    ]);
                    me.conditionalDelete(thing.shortId());
                    me.spitEvent("competencyDeleted", thing.shortId(), "editFrameworkSection");
                    me.$store.commit('editor/selectedCompetency', null);
                    var framework = me.framework;
                    if (me.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[me.framework.id] !== true) {
                        framework = EcEncryptedValue.toEncryptedValue(framework);
                    }
                    me.repo.saveTo(framework, function() {
                        me.$store.commit('editor/framework', me.framework);
                    }, console.error);
                }, console.log);
            }
        }
    }
};