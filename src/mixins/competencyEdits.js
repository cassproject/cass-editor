import common from '@/mixins/common.js';
import {useEditorStore} from '@/stores/editor';
import {useAppStore} from '@/stores/app';

export default {
    mixins: [common],
    methods: {
        removeObject: function(thing) {
            // Remove from container but don't delete
            appLog("removing " + thing.id);
            var me = this;
            const editorStore = useEditorStore();
            var thisFramework = editorStore.framework;
            var initialCompetencies = thisFramework.competency ? thisFramework.competency.slice() : null;
            var initialRelations = thisFramework.relation ? thisFramework.relation.slice() : null;
            var initialLevels = thisFramework.level ? thisFramework.level.slice() : null;
            thisFramework["schema:dateModified"] = new Date().toISOString();
            thisFramework.removeCompetency(thing.shortId(), async function() {
                var framework = me.framework;
                const editorStore = useEditorStore();
                editorStore.addEditsToUndo([{operation: "update", id: framework.shortId(), fieldChanged: ["competency", "relation", "level"], initialValue: [initialCompetencies, initialRelations, initialLevels]}]);
                if (editorStore.private === true && EcEncryptedValue.encryptOnSaveMap[f.id] !== true) {
                    framework = await EcEncryptedValue.toEncryptedValue(framework);
                }
                window.repo.saveTo(framework, function() {
                    editorStore.setFramework(thisFramework);
                }, appError);
            }, appLog);
        },
        deleteObject: function(thing) {
            appLog("deleting " + thing.id);
            var me = this;
            const editorStore = useEditorStore();
            var framework = editorStore.framework;
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
                    const editorStore = useEditorStore();
                    editorStore.setFramework(null);
                    if (me.importType) {
                        // Calling function from import page
                        const appStore = useAppStore();
                        appStore.setImportFramework(null);
                    } else {
                        me.$router.push({name: "frameworks"});
                    }
                }, appLog);
            } else {
                // Delete competency and relations
                var initialCompetencies = framework.competency ? framework.competency.slice() : null;
                var initialRelations = framework.relation ? framework.relation.slice() : null;
                var initialLevels = framework.level ? framework.level.slice() : null;
                editorStore.setSelectedCompetency(thing);
                framework["schema:dateModified"] = new Date().toISOString();
                framework.removeCompetency(thing.shortId(), async function() {
                    framework.removeLevel(thing.shortId());
                    const editorStore = useEditorStore();
                    editorStore.addEditsToUndo([
                        {operation: "delete", obj: thing},
                        {operation: "update", id: framework.shortId(), fieldChanged: ["competency", "relation", "level"], initialValue: [initialCompetencies, initialRelations, initialLevels], changedValue: [framework.competency, framework.relation, framework.level]}
                    ]);
                    me.conditionalDelete(thing.shortId());
                    me.spitEvent("competencyDeleted", thing.shortId(), "editFrameworkSection");
                    editorStore.setSelectedCompetency(null);
                    var frameworkToSave = framework;
                    if (editorStore.private === true && EcEncryptedValue.encryptOnSaveMap[framework.id] !== true) {
                        frameworkToSave = await EcEncryptedValue.toEncryptedValue(framework);
                    }
                    window.repo.saveTo(frameworkToSave, function() {
                        editorStore.setFramework(framework);
                    }, appError);
                }, appLog);
            }
        }
    }
};