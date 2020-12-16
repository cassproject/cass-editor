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
        <button v-if="objectType === 'Framework' || objectType === 'CreativeWork'">
            Copy to Directory
        </button>
        <button v-if="objectType === 'Framework' || objectType === 'CreativeWork'">
            Move to Directory
        </button>
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
            numObjects: "unknown"
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

