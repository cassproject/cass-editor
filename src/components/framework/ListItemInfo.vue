<template>
    <aside
        id="right-side-bar__comments"
        class="menu has-background-lightest">
        <div class="right-aside-bar__title">
            <h3 class="title is-size-3">
                {{ objectName }}
            </h3>
        </div>
        <div v-if="objectType === 'Directory' || objectType === 'Framework'">
            <div>
                Details
                <div>Last Modified: {{ lastModified }}</div>
                <div>Date Created: {{ dateCreated }}</div>
                <div v-if="objectType === 'Directory'">
                    Subdirectories: {{ numSubdirectories }}
                </div>
                <div v-if="objectType === 'Directory'">
                    Objects: {{ numObjects }}
                </div>
                <div v-if="objectType === 'Framework'">
                    Item Count: {{ object.competency ? object.competency.length : 0 }}
                </div>
                <div v-if="objectType === 'Framework' && object.Published">
                    Published Date: {{ object.Published }}
                </div>
                <div v-if="objectType === 'Framework' && object.Approved">
                    Approved Date: {{ object.Approved }}
                </div>
                <div v-if="objectType === 'Framework' && publisherName">
                    Publisher: {{ publisherName }}
                </div>
                <div v-else-if="objectType === 'Framework' && creatorName">
                    Creator: {{ creatorName }}
                </div>
                <div v-if="objectDescription">
                    Description
                    <div>{{ objectDescription }}</div>
                </div>
                <div v-if="object.directory">
                    Directory: {{ getName(object.directory) }}
                    <button @click="goToParentDirectory">
                        Open
                    </button>
                </div>
                <div v-else-if="object.parentDirectory">
                    Parent Directory: {{ getName(object.parentDirectory) }}
                    <button @click="goToParentDirectory">
                        Open
                    </button>
                </div>
                <div>
                    Share: {{ shareLink }}
                </div>
            </div>
            <button @click="openObject">
                Open
            </button>
        </div>
        <div v-if="objectType === 'CreativeWork'">
            {{ object.url }}
        </div>
        <div v-if="canEditObject && canEditDirectory">
            <button
                v-if="objectType === 'Framework' || objectType === 'CreativeWork' || (objectType === 'Directory' && object.parentDirectory)"
                @click="copyingToDirectory=true"
                :disabled="movingToDirectory">
                Copy to Directory
            </button>
            <button
                v-if="objectType === 'Framework' || objectType === 'CreativeWork' || (objectType === 'Directory' && object.parentDirectory)"
                @click="movingToDirectory=true"
                :disabled="copyingToDirectory">
                Move to Directory
            </button>
            <ul v-if="copyingToDirectory || movingToDirectory">
                Choose a directory
                <li
                    v-for="directory in directoryOptions"
                    :key="directory"
                    @click="copyOrMove(directory)">
                    {{ directory.name }}
                </li>
                <li
                    @click="removeFromDirectory"
                    v-if="movingToDirectory">
                    Remove from directory
                </li>
            </ul>
        </div>
    </aside>
</template>
<script>
import common from '@/mixins/common.js';

export default {
    name: 'ListItemInfo',
    mixins: [common],
    data() {
        return {
            numSubdirectories: "unknown",
            numObjects: "unknown",
            copyingToDirectory: false,
            movingToDirectory: false
        };
    },
    methods: {
        setNumSubdirectoriesAndObjects: function() {
            let me = this;
            if (this.objectType === "Directory") {
                window.repo.searchWithParams("(@type:Directory AND parentDirectory:\"" + this.object.shortId() + "\")", {'size': 10000}, null, function(results) {
                    me.numSubdirectories = results.length;
                    if (results.length === 10000) {
                        me.numSubdirectories = "More than 10,000";
                    }
                }, function(error) {
                    appError(error);
                    me.numSubdirectories = "unknown";
                });
                window.repo.searchWithParams("(directory:\"" + this.object.shortId() + "\")", {'size': 10000}, null, function(results) {
                    me.numObjects = results.length;
                    if (results.length === 10000) {
                        me.numObjects = "More than 10,000";
                    }
                }, function(error) {
                    appError(error);
                    me.numObjects = "unknown";
                });
            }
        },
        openObject: function() {
            let me = this;
            if (this.objectType === "Directory") {
                this.$store.commit('app/selectDirectory', this.object);
                if (this.$route.name !== "directory") {
                    this.$router.push({name: "directory"});
                }
                this.$store.commit('app/closeRightAside');
            } else if (this.$store.getters['editor/conceptMode']) {
                EcConceptScheme.get(this.object.id, function(success) {
                    me.$store.commit('editor/framework', success);
                    me.$store.commit('editor/clearFrameworkCommentData');
                    me.$store.commit('app/setCanViewComments', me.canViewCommentsCurrentFramework());
                    me.$store.commit('app/setCanAddComments', me.canAddCommentsCurrentFramework());
                    me.$router.push({name: "conceptScheme", params: {frameworkId: me.object.id}});
                }, appError);
            } else {
                EcFramework.get(this.object.id, function(success) {
                    me.$store.commit('editor/framework', success);
                    me.$store.commit('editor/clearFrameworkCommentData');
                    me.$store.commit('app/setCanViewComments', me.canViewCommentsCurrentFramework());
                    me.$store.commit('app/setCanAddComments', me.canAddCommentsCurrentFramework());
                    me.$router.push({name: "framework", params: {frameworkId: me.object.id}});
                }, appError);
            }
        },
        getName: function(field) {
            let name = EcArray.isArray(field) ? field : [field];
            if (Thing.getDisplayStringFrom(name).toLowerCase().indexOf("http") !== -1) {
                return this.resolveNameFromUrl(Thing.getDisplayStringFrom(name));
            } else {
                return Thing.getDisplayStringFrom(name);
            }
        },
        goToParentDirectory: function() {
            let me = this;
            let directoryId = this.object.directory ? this.object.directory : this.object.parentDirectory;
            EcDirectory.get(directoryId, function(result) {
                me.$store.commit('app/selectDirectory', result);
                if (me.$route.name !== "directory") {
                    me.$router.push({name: "directory"});
                }
                me.$store.commit('app/closeRightAside');
            }, appError);
        },
        copyOrMove: function(directory) {
            // To do: add confirmation step once we have this in the right spot
            if (this.copyingToDirectory && this.objectType === 'Framework') {
                this.copyFrameworkToDirectory(directory);
            } else if (this.copyingToDirectory && this.objectType === 'CreativeWork') {
                this.copyResourceToDirectory(directory);
            } else if (this.copyingToDirectory && this.objectType === 'Directory') {
                this.copySubdirectoryToDirectory(directory);
            } else if (this.movingToDirectory && this.objectType === 'Framework') {
                this.moveFrameworkToDirectory(directory);
            } else if (this.movingToDirectory && this.objectType === 'CreativeWork') {
                this.moveResourceToDirectory(directory);
            } else if (this.movingToDirectory && this.objectType === 'Directory') {
                this.moveSubdirectoryToDirectory(directory);
            }
        },
        removeFromDirectory: function() {
            if (this.objectType === 'Framework') {
                this.removeFrameworkFromDirectory();
            } else if (this.objectType === 'CreativeWork') {
                this.removeResourceFromDirectory();
            } else if (this.objectType === 'Directory') {
                this.removeSubdirectoryFromDirectory();
            }
        },
        copyFrameworkToDirectory: function(directory) {
        },
        copyResourceToDirectory: function(directory) {
            let me = this;
            let c = new CreativeWork();
            c.generateId(window.repo.selectedServer);
            c.name = this.object.name;
            c.url = this.object.url;
            c.directory = directory.shortId();
            if (directory.owner) {
                c.owner = this.directory.owner;
            }
            if (directory.reader) {
                c.reader = this.directory.reader;
            }
            if (EcIdentityManager.ids.length > 0) {
                c.addOwner(EcIdentityManager.ids[0].ppk.toPk());
            }
            window.repo.saveTo(c, function() {
                appLog("Resource copied: " + c.id);
            }, appError);
        },
        copySubdirectoryToDirectory: function(directory) {
        },
        moveFrameworkToDirectory: function(directory) {
        },
        moveResourceToDirectory: function(directory) {
            let me = this;
            this.object.owner = directory.owner;
            this.object.reader = directory.reader;
            if (this.objectType === 'Directory') {
                this.object.parentDirectory = directory.shortId();
            } else {
                this.object.directory = directory.shortId();
            }
            window.repo.saveTo(this.object, function() {
                appLog("resource moved");
                me.$store.commit('app/refreshResources', true);
                me.movingToDirectory = false;
            }, appError);
        },
        moveSubdirectoryToDirectory: function(directory) {
        },
        removeFrameworkFromDirectory: function() {
        },
        removeResourceFromDirectory: function() {
            let me = this;
            EcDirectory.get(this.object.directory, function(directory) {
                if (directory.owner) {
                    for (let each of directory.owner) {
                        me.object.removeOwner(EcPk.fromPem(each));
                    }
                    me.object.addOwner(EcIdentityManager.ids[0].ppk.toPk());
                }
                if (directory.reader) {
                    for (let each of directory.reader) {
                        me.object.removeReader(EcPk.fromPem(each));
                    }
                }
                delete me.object.parentDirectory;
                delete me.object.directory;
                window.repo.saveTo(me.object, function() {
                    appLog("resource removed");
                    me.$store.commit('app/refreshResources', true);
                    me.movingToDirectory = false;
                }, appError);
            }, appError);
        },
        removeSubdirectoryFromDirectory: function() {
        }
    },
    mounted: function() {
        this.setNumSubdirectoriesAndObjects();
    },
    computed: {
        objectName: function() {
            return Thing.getDisplayStringFrom(this.object.name);
        },
        objectDescription: function() {
            return Thing.getDisplayStringFrom(this.object.description);
        },
        objectShortId: function() {
            return this.object.shortId();
        },
        object: function() {
            return this.$store.getters['app/rightAsideObject'];
        },
        objectType: function() {
            return this.object.type;
        },
        lastModified: function() {
            if (this.object.getTimestamp()) {
                return this.$moment(new Date(this.object.getTimestamp())).format("MMM D YYYY");
            }
            if (this.object["schema:dateModified"]) {
                return this.$moment(new Date(this.object['schema:dateModified'])).format("MMM D YYYY");
            }
            return "unknown";
        },
        dateCreated: function() {
            if (this.object["schema:dateCreated"]) {
                return this.$moment(new Date(this.object['schema:dateCreated'])).format("MMM D YYYY");
            }
            return "unknown";
        },
        publisherName: function() {
            if (this.object['ceasn:publisherName']) {
                if (this.getName(this.object['ceasn:publisherName'])) {
                    return this.getName(this.object['ceasn:publisherName']);
                }
            }
            if (this.object['schema:publisher']) {
                if (this.getName(this.object['schema:publisher'])) {
                    return this.getName(this.object['schema:publisher']);
                }
            }
            return null;
        },
        creatorName: function() {
            if (this.object['schema:creator']) {
                if (this.getName(this.object['schema:creator'])) {
                    return this.getName(this.object['schema:creator']);
                }
            }
            return null;
        },
        shareLink: function() {
            let link = window.location.href;
            link = link.replace('/frameworks', '').replace('/directory', '');
            if (this.objectType === "Directory") {
                return (link + "?directoryId=" + this.objectShortId);
            } else if (this.$store.getters['editor/conceptMode'] === true) {
                return (link + "?concepts=true&frameworkId=" + this.objectShortId);
            }
            return (link + "?frameworkId=" + this.objectShortId);
        },
        directoryOptions: function() {
            let me = this;
            return this.$store.getters['app/directoryList'].filter(directory => {
                return (directory.shortId() !== me.object.shortId());
            });
        },
        canEditObject: function() {
            return this.object.canEditAny(EcIdentityManager.getMyPks());
        },
        canEditDirectory: function() {
            if (this.object.directory) {
                return EcDirectory.getBlocking(this.object.directory).canEditAny(EcIdentityManager.getMyPks());
            } else if (this.object.parentDirectory) {
                return EcDirectory.getBlocking(this.object.parentDirectory).canEditAny(EcIdentityManager.getMyPks());
            }
            // Object is not in a directory
            return true;
        }
    },
    watch: {
        objectShortId: function() {
            this.setNumSubdirectoriesAndObjects();
        }
    }
};
</script>

<style lang="scss">
    @import './../../scss/variables.scss';
</style>

