import {useEditorStore} from '@/stores/editor';
import {useAppStore} from '@/stores/app';

export default {
    methods: {
        deleteObject: async function(obj) {
            appLog("deleting " + obj.id);
            var me = this;
            const editorStore = useEditorStore();
            let children = await editorStore.getDirectoryChildren(obj);
            window.repo.multiget(children, function(success) {
                new EcAsyncHelper().each(success, function(obj, done) {
                    if (obj.type === 'Framework') {
                        me.deleteFramework(obj);
                    } else if (obj.type === 'CreativeWork') {
                        me.repo.deleteRegistered(obj, appLog, appError);
                    } else if (obj.type === "Directory") {
                        me.deleteObject(obj);
                    }
                    done();
                }, function(objs) {
                    me.repo.deleteRegistered(obj, function() {
                        const appStore = useAppStore();
                        appStore.refreshDirectories();
                    }, appError);
                    if (obj.shortId() === me.directory.shortId()) {
                        me.$router.push({name: "frameworks"});
                    }
                });
            }, appError);
        },
        deleteFramework: function(framework) {
            let me = this;
            this.repo.deleteRegistered(framework, function(success) {
                me.spitEvent("frameworkDeleted", framework.shortId(), "directoryPage");
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
            }, appLog);
        },
        onDoneEditingNode: function() {
            let me = this;
            const appStore = useAppStore();
            if (appStore.rightAsideObject) {
                EcRepository.get(appStore.rightAsideObject.shortId(), function(success) {
                    const appStore = useAppStore();
                    appStore.setRightAsideObject(success);
                }, appError);
            }
            appStore.setEditDirectory(false);
        }
    },
    computed: {
        editDirectory: function() {
            const appStore = useAppStore();
            return appStore.directories.editDirectory;
        },
        canEditDirectory: function() {
            if (!this.directory) {
                return false;
            }
            if (this.queryParams && this.queryParams.view === 'true') {
                return false;
            } else if (!this.canEditAny(this.directory)) {
                return false;
            }
            return true;
        },
        directory: function() {
            const appStore = useAppStore();
            return appStore.rightAsideObject;
        },
        directoryProfile: function() {
            return {
                "http://schema.org/name": {
                    "@id": "http://schema.org/name",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Directory"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The name of the directory."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Name"}],
                    "isRequired": "true"
                },
                "http://schema.org/description": {
                    "@id": "http://schema.org/description",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Directory"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The description of the directory."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Description"}]
                },
                "@id": {
                    "@id": "https://schema.cassproject.org/0.4/Framework/id",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The URL of the framework."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Framework URL"}],
                    "readOnly": "true",
                    "max": 1,
                    "heading": "Keys"
                },
                "primaryProperties": [
                    "http://schema.org/name",
                    "http://schema.org/description"
                ],
                "secondaryProperties": ["@id"],
                "tertiaryProperties": []
            };
        },
        changedObject: function() {
            const editorStore = useEditorStore();
            return editorStore.changedObject;
        }
    },
    watch: {
        changedObject: function() {
            if (this.changedObject && this.directory && this.changedObject === this.directory.shortId()) {
                let me = this;
                const appStore = useAppStore();
                const editorStore = useEditorStore();
                EcRepository.get(this.directory.shortId(), function(dir) {
                    const appStore = useAppStore();
                    if (appStore.directories.selectedDirectory && appStore.directories.selectedDirectory.shortId() === dir.shortId()) {
                        appStore.selectDirectory(dir);
                    } else {
                        appStore.setRefreshSearch(true);
                    }
                    if (me.showRightAside && dir.shortId() === appStore.rightAsideObject.shortId()) {
                        appStore.setRightAsideObject(dir);
                    }
                    appStore.refreshDirectories();
                }, appError);
                editorStore.setChangedObject(null);
            }
        }
    }
};