<template>
    <aside
        id="right-side-bar__comments"
        class="menu has-background-lightest">
        <div class="right-aside-bar__title">
            <h3 class="title is-size-3">
                {{ objectName }}
            </h3>
        </div>
        <div v-if="object.type === 'Directory'">
            <div>
                Details
                <div>Last Modified: {{ lastModified }}</div>
                <div>Date Created: {{ dateCreated }}</div>
                <div>Subdirectories: {{ numSubdirectories }}</div>
                <div>Objects: {{ numObjects }}</div>
            </div>
            <div>
                Description
                <div>{{ objectDescription }}</div>
            </div>
            <button @click="openObject">
                Open
            </button>
        </div>
        <div v-if="object.type === 'CreativeWork'">
            {{ object.url }}
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
            if (this.objectType === "Directory") {
                this.$store.commit('app/selectDirectory', this.object);
                if (this.$route.name !== "directory") {
                    this.$router.push({name: "directory"});
                }
                this.$store.commit('app/closeRightAside');
            }
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

