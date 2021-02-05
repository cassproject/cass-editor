<template>
    <div
        id="cass__right-aside"
        class="has-background-lightest">
        <div class="cass__right-aside--header">
            <div class="right-aside-bar__title">
                <h3
                    class="is-size-4 is-family-secondary">
                    {{ objectName }}
                </h3>
                <span class="tag is-info">{{ objectTypeForDisplay }}</span>
                <div
                    class="buttons pt-2"
                    v-if="objectShortId !== selectedDirectoryId">
                    <div
                        class="button is-small is-primary"
                        @click="openObject">
                        <span>Open {{ objectTypeForDisplay }}</span>
                        <span class="icon">
                            <i class="fa fa-folder-open" />
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="cass__right-aside--body">
            <div class="cass__right-side--details">
                <!-- begin accordion elements here -->
                <div
                    class="cass__right-side--details-wrapper">
                    <!-- details -->
                    <template v-if="objectType === 'Directory' || objectType === 'Framework' || objectType === 'ConceptScheme'">
                        <button
                            @click="clickAccordion('details')"
                            class="cass__right-side--accordion details">
                            Details
                            <span class="icon is-pulled-right">
                                <i
                                    v-if="accordion === 'details'"
                                    class="fa fa-minus" />
                                <i
                                    v-else
                                    class="fa fa-plus" />
                            </span>
                        </button>
                        <div
                            :class=" accordion === 'details' ? 'active' : ''"
                            class="cass__right-side--accordion-panel details">
                            <div class="cass__right-aside--half-item">
                                <b>Last Modified:</b>
                            </div>
                            <div class="cass__right-aside--half-item">
                                {{ lastModified }}
                            </div>
                            <!-- open -->
                            <template v-if="object.directory">
                                <div class="cass__right-aside--half-item">
                                    <b>Directory:</b>
                                </div>
                                <div class="cass__right-aside--half-item">
                                    {{ getName(object.directory) }}
                                    <span
                                        class="button is-primary is-outlined is-small"
                                        @click="goToParentDirectory">
                                        Open
                                    </span>
                                </div>
                            </template>
                            <template v-else-if="object.parentDirectory">
                                <!-- open parent directory -->
                                <div class="cass__right-aside--half-item">
                                    <b>Parent Directory:</b>
                                </div>
                                <div class="cass__right-aside--half-item">
                                    {{ getName(object.parentDirectory) }}
                                    <span
                                        title="Navigate to parent directory"
                                        class="inline-link is-small"
                                        @click="goToParentDirectory">
                                        <span>Go to parent</span>
                                        <span class="icon">
                                            <i class="fa fa-folder-open" />
                                        </span>
                                    </span>
                                </div>
                            </template>
                            <!-- date created -->
                            <div class="cass__right-aside--half-item">
                                <b>
                                    Date Created:
                                </b>
                            </div>
                            <div class="cass__right-aside--half-item">
                                {{ dateCreated }}
                            </div>
                            <!-- number of directories -->
                            <div
                                class="cass__right-aside--half-item"
                                v-if="objectType === 'Directory'">
                                <b>Subdirectories:</b>
                            </div>
                            <div
                                v-if="objectType === 'Directory'"
                                class="cass__right-aside--half-item">
                                {{ numSubdirectories }}
                            </div>
                            <!-- object count -->
                            <template v-if="objectType === 'Directory'">
                                <div class="cass__right-aside--half-item">
                                    <b>Objects:</b>
                                </div>
                                <div class="cass__right-aside--half-item">
                                    {{ numObjects }}
                                </div>
                            </template>
                            <!-- item count -->
                            <template v-else-if="objectType === 'Framework'">
                                <div class="cass__right-aside--half-item">
                                    <b>Item Count:</b>
                                </div>
                                <div class="cass__right-aside--half-item">
                                    {{ object.competency ? object.competency.length : 0 }}
                                </div>
                            </template>
                            <!-- published date -->
                            <template v-if="object.Published">
                                <div class="cass__right-aside--half-item">
                                    <b>Published Date:</b>
                                </div>
                                <div class="cass__right-aside--half-item">
                                    {{ object.Published }}
                                </div>
                            </template>
                            <!-- approved -->
                            <template v-if="object.Approved">
                                <div class="cass__right-aside--half-item">
                                    <b>Approved Date:</b>
                                </div>
                                <div class="cass__right-aside--half-item">
                                    {{ object.Approved }}
                                </div>
                            </template>
                            <!-- publisher name -->
                            <template v-if="publisherName">
                                <div class="cass__right-aside--half-item">
                                    <b>Publisher:</b>
                                </div>
                                <div class="cass__right-aside--half-item">
                                    {{ publisherName }}
                                </div>
                            </template>
                            <!-- creator -->
                            <template v-if="creatorName">
                                <div class="cass__right-aside--half-item">
                                    <b>Creator:</b>
                                </div>
                                <div class="cass__right-aside--half-item">
                                    {{ creatorName }}
                                </div>
                            </template>
                            <!-- share link -->
                            <template>
                                <div class="cass__right-aside--half-item">
                                    <span>
                                        <b>Share:</b>
                                    </span>
                                </div>
                                <div class="cass__right-aside--half-item">
                                    <span
                                        class="inline-link"
                                        title="Copy URL to the clipboard."
                                        v-clipboard="shareLink"
                                        v-clipboard:success="successfulClip"
                                        v-clipboard:error="errorClip">
                                        <span
                                            :title="shareLink">copy link</span>
                                        <span class="icon">
                                            <i
                                                v-if="clipStatus === 'success'"
                                                class="fa fa-check" />
                                            <i
                                                v-else-if="clipStatus === 'error'"
                                                class="fa fa-times" />
                                            <i
                                                v-else
                                                class="fa fa-link"
                                                name="copyURL" />
                                        </span>
                                    </span>
                                </div>
                            </template>
                        </div>
                    </template>
                    <!-- properties -->
                    <template v-if="objectType === 'CreativeWork' || canEditObject && objectType === 'Directory' && objectShortId === selectedDirectoryId">
                        <button
                            @click="clickAccordion('properties')"
                            class="cass__right-side--accordion details">
                            Properties
                            <span class="icon is-pulled-right">
                                <i
                                    v-if="accordion === 'properties'"
                                    class="fa fa-minus" />
                                <i
                                    v-else
                                    class="fa fa-plus" />
                            </span>
                        </button>
                        <div
                            :class=" accordion === 'properties' ? 'active' : ''"
                            class="cass__right-side--accordion-panel">
                            <template v-if="objectType === 'CreativeWork'">
                                <!-- resource link -->
                                <div class="cass__right-aside--property">
                                    <div class="cass__right-aside--property-text">
                                        <div v-if="!editingResource">
                                            {{ object.url }}
                                        </div>
                                        <div
                                            v-else-if="editingResource">
                                            <input
                                                class="input"
                                                v-model="resourceUrl">
                                        </div>
                                    </div>
                                    <div
                                        class="cass__right-aside--property-icons"
                                        v-if="objectType === 'CreativeWork' && canEditObject">
                                        <span
                                            class="icon"
                                            v-if="editingResource"
                                            @click="saveResource">
                                            <i class="fa fa-save" />
                                        </span>
                                        <span
                                            class="icon"
                                            v-if="!editingResource && canEditObject"
                                            @click="editResource">
                                            <i class="fa fa-edit" />
                                        </span>
                                    </div>
                                    <div class="cass__right-aside--property-label">
                                        Url
                                    </div>
                                </div>
                                <!-- resource name -->
                                <div class="cass__right-aside--property">
                                    <div class="cass__right-aside--property-text">
                                        <div v-if="!editingResource">
                                            {{ objectName }}
                                        </div>
                                        <div
                                            v-else-if="editingResource">
                                            <input
                                                class="input"
                                                v-model="resourceName">
                                        </div>
                                    </div>
                                    <div
                                        class="cass__right-aside--property-icons"
                                        v-if="objectType === 'CreativeWork' && canEditObject">
                                        <span
                                            class="icon"
                                            v-if="editingResource"
                                            @click="saveResource">
                                            <i class="fa fa-save" />
                                        </span>
                                        <span
                                            class="icon"
                                            v-if="!editingResource && canEditObject"
                                            @click="editResource">
                                            <i class="fa fa-edit" />
                                        </span>
                                    </div>
                                    <div class="cass__right-aside--property-label">
                                        Name
                                    </div>
                                </div>
                            </template>
                            <!-- directory name -->
                            <template v-if="objectType === 'Directory'">
                                <div class="cass__right-aside--property">
                                    <div class="cass__right-aside--property-text">
                                        <div v-if="!editingResource">
                                            {{ objectName }}
                                        </div>
                                        <div
                                            class="control"
                                            v-else-if="editingResource">
                                            <div class="control">
                                                <input
                                                    class="input"
                                                    v-model="resourceName">
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        class="cass__right-aside--property-icons"
                                        v-if="canEditObject && objectType === 'Directory' && objectShortId === selectedDirectoryId">
                                        <div
                                            @click="editDirectory"
                                            class="icon is-small">
                                            <i class="fa fa-edit is-size-5" />
                                        </div>
                                    </div>
                                    <div class="cass__right-aside--property-label">
                                        Directory Name
                                    </div>
                                </div>
                            </template>
                            <span v-if="errorEditing">
                                {{ errorEditing }}
                            </span>
                        </div>
                    </template>
                    <!-- users -->
                    <template v-if="loggedIn && canEditObject">
                        <button
                            :class="accordion === 'users' ? 'active' : ''"
                            @click="clickAccordion('users')"
                            class="cass__right-side--accordion">
                            Users
                            <span class="icon is-pulled-right">
                                <i
                                    v-if="accordion === 'users'"
                                    class="fa fa-minus" />
                                <i
                                    v-else
                                    class="fa fa-plus" />
                            </span>
                        </button>
                        <div
                            :class=" accordion === 'users' ? 'active' : ''"
                            class="cass__right-side--accordion-panel">
                            <div
                                class="cass__right-aside--whole-item">
                                <b>Manage Users and Privacy:</b>
                                <span
                                    class="icon"
                                    @click="manageUsers">
                                    <i class="fas fa-users" />
                                </span>
                            </div>
                        </div>
                        <!-- manage users for resources -->
                    </template>
                    <!-- description -->
                    <template>
                        <button
                            :class="accordion === 'description' ? 'active' : ''"
                            @click="clickAccordion('description')"
                            class="cass__right-side--accordion">
                            Description
                            <span class="icon is-pulled-right">
                                <i
                                    v-if="accordion === 'description'"
                                    class="fa fa-minus" />
                                <i
                                    v-else
                                    class="fa fa-plus" />
                            </span>
                        </button>
                        <div
                            :class=" accordion === 'description' ? 'active' : ''"
                            class="cass__right-side--accordion-panel">
                            {{ objectDescription }}
                        </div>
                    </template>
                    <!-- copy to directory -->
                    <button
                        @click="clickAccordion('copy'); copyingToDirectory = true;"
                        class="cass__right-side--accordion">
                        Copy to Directory
                    </button>
                    <div
                        :class=" accordion === 'copy' ? 'active' : ''"
                        class="cass__right-side--accordion-panel">
                        <li
                            class="cass--list-item-info--search-result--li"
                            v-for="directory in directoryOptions"
                            :key="directory"
                            @click="copyOrMove(directory)">
                            {{ directory.name }}
                        </li>
                    </div>
                    <!-- move to directory -->
                    <button
                        @click="clickAccordion('move'); movingToDirectory = true;"
                        class="cass__right-side--accordion">
                        Move to Directory
                        <span class="icon is-pulled-right">
                            <i
                                v-if="accordion === 'move'"
                                class="fa fa-minus" />
                            <i
                                v-else
                                class="fa fa-plus" />
                        </span>
                    </button>
                    <div
                        :class=" accordion === 'move' ? 'active' : ''"
                        class="cass__right-side--accordion-panel">
                        <li
                            class="cass--list-item-info--search-result--li"
                            v-for="directory in directoryOptions"
                            :key="directory"
                            @click="copyOrMove(directory)">
                            {{ directory.name }}
                        </li>
                        <!--<li
                            class="cass--list-item-info--search-result--li"
                            @click="removeFromDirectory"
                            v-if="movingToDirectory">
                            Remove from directory
                        </li>-->
                    </div>
                    <!--<ul
                        class="cass--list-item-info--search-result"
                        v-if="copyingToDirectory || movingToDirectory">
                        <div class="title is-size-4">
                            Choose a directory
                        </div>
                        <li
                            class="cass--list-item-info--search-result--li"
                            @click="removeFromDirectory"
                            v-if="movingToDirectory">
                            Remove from directory
                        </li>
                    </ul>-->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import common from '@/mixins/common.js';

export default {
    name: 'ListItemInfo',
    mixins: [common],
    data() {
        return {
            accordion: 'details',
            numSubdirectories: "unknown",
            numObjects: "unknown",
            copyingToDirectory: false,
            movingToDirectory: false,
            repo: window.repo,
            frameworksToProcess: 0,
            clipStatus: 'ready',
            ineligibleDirectoriesForMove: [],
            editingResource: false,
            resourceName: '',
            resourceUrl: '',
            errorEditing: null
        };
    },
    methods: {
        clickAccordion(item) {
            if (this.accordion === item) {
                this.accordion = '';
            } else {
                this.accordion = item;
            }
        },
        successfulClip({value, event}) {
            appLog('success', value);
            this.clipStatus = 'success';
            setTimeout(() => {
                this.clipStatus = 'ready';
            }, 1000);
        },
        errorClip({value, event}) {
            appLog('error', value);
            this.clipStatus = 'error';
            setTimeout(() => {
                this.clipStatus = 'ready';
            }, 1000);
        },
        setNumSubdirectoriesAndObjects: function() {
            let me = this;
            if (this.objectType === "Directory") {
                me.repo.searchWithParams("(@type:Directory AND parentDirectory:\"" + this.object.shortId() + "\")", {'size': 10000}, null, function(results) {
                    me.numSubdirectories = results.length;
                    if (results.length === 10000) {
                        me.numSubdirectories = "More than 10,000";
                    }
                }, function(error) {
                    appError(error);
                    me.numSubdirectories = "unknown";
                });
                me.repo.searchWithParams("(directory:\"" + this.object.shortId() + "\")", {'size': 10000}, null, function(results) {
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
            } else if (this.object.type === "CreativeWork") {
                window.open(this.object.url, '_blank');
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
            this.frameworksToProcess = 0;
            // To do: add confirmation step once we have this in the right spot
            if (this.copyingToDirectory && this.objectType === 'Framework') {
                this.copyFrameworkToDirectory(directory, this.object);
            } else if (this.copyingToDirectory && this.objectType === 'CreativeWork') {
                this.copyResourceToDirectory(directory, this.object);
            } else if (this.copyingToDirectory && this.objectType === 'Directory') {
                this.copySubdirectoryToDirectory(directory, this.object);
            } else if (this.movingToDirectory && this.objectType === 'Framework') {
                this.moveFrameworkToDirectory(directory, this.object);
            } else if (this.movingToDirectory && this.objectType === 'CreativeWork') {
                this.moveResourceToDirectory(directory, this.object);
            } else if (this.movingToDirectory && this.objectType === 'Directory') {
                this.moveSubdirectoryToDirectory(directory, this.object);
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
        multiput: function(toSave, shouldRefresh) {
            let me = this;
            this.frameworksToProcess--;
            if (this.frameworksToProcess <= 0) {
                this.repo.multiput(toSave, function(success) {
                    me.copyingToDirectory = false;
                    if (me.movingToDirectory) {
                        // Remove the moved item from the right panel
                        me.$store.commit('app/rightAsideObject', null);
                        me.$store.commit('app/closeRightAside');
                        me.movingToDirectory = false;
                    }
                    if (shouldRefresh) {
                        // If removing or moving, need to refresh search results
                        me.$store.commit('app/refreshSearch', true);
                    }
                }, appError);
            }
        },
        copyFrameworkToDirectory: function(directory, framework, toSaveFromSubdirectory) {
            let toSave = [];
            if (toSaveFromSubdirectory) {
                toSave = toSaveFromSubdirectory;
            }
            var f = new EcFramework();
            f.copyFrom(framework);
            if (this.queryParams.newObjectEndpoint != null) {
                f.generateShortId(this.queryParams.newObjectEndpoint);
            } else {
                f.generateId(this.repo.selectedServer);
            }
            f.directory = directory.shortId();
            f["schema:dateCreated"] = new Date().toISOString();
            f["schema:dateModified"] = new Date().toISOString();
            delete f.owner;
            delete f.reader;
            if (directory.owner) {
                f.owner = directory.owner;
            }
            if (directory.reader) {
                f.reader = directory.reader;
            }
            if (EcIdentityManager.ids.length > 0) {
                f.addOwner(EcIdentityManager.ids[0].ppk.toPk());
            }
            f['ceasn:derivedFrom'] = framework.id;
            let competencyMap = {};
            // to do: replace all the competency (etc) URLs in framework object and THEN push framework obj
            if (framework.competency && framework.competency.length > 0) {
                this.copyCompetenciesToDirectory(f, toSave, competencyMap);
            } else if (framework.level && framework.level.length > 0) {
                this.copyLevelsToDirectory(f, toSave, competencyMap);
            } else if (framework.relation && framework.relation.length > 0) {
                this.copyRelationsToDirectory(f, toSave, competencyMap);
            } else {
                toSave.push(f);
                this.multiput(toSave);
            }
        },
        copyCompetenciesToDirectory: function(framework, toSave, competencyMap) {
            let me = this;
            new EcAsyncHelper().each(framework.competency, function(competencyId, done) {
                EcCompetency.get(competencyId, function(competency) {
                    var c = new EcCompetency();
                    c.copyFrom(competency);
                    if (me.queryParams.newObjectEndpoint != null) {
                        c.generateShortId(me.queryParams.newObjectEndpoint);
                    } else {
                        c.generateId(me.repo.selectedServer);
                    }
                    competencyMap[competency.shortId()] = c.shortId();
                    let index = framework.competency.indexOf(competencyId);
                    if (index !== -1) {
                        framework.competency[index] = c.shortId();
                    }
                    c["schema:dateCreated"] = new Date().toISOString();
                    c["schema:dateModified"] = new Date().toISOString();
                    delete c.owner;
                    delete c.reader;
                    if (framework.owner) {
                        c.owner = framework.owner;
                    }
                    if (framework.reader) {
                        c.reader = framework.reader;
                    }
                    c['ceasn:derivedFrom'] = competency.id;
                    toSave.push(c);
                    done();
                }, done);
            }, function(competencyIds) {
                if (framework.level && framework.level.length > 0) {
                    me.copyLevelsToDirectory(framework, toSave, competencyMap);
                } else if (framework.relation && framework.relation.length > 0) {
                    me.copyRelationsToDirectory(framework, toSave, competencyMap);
                } else {
                    toSave.push(framework);
                    me.multiput(toSave);
                }
            });
        },
        copyLevelsToDirectory: function(framework, toSave, competencyMap) {
            let me = this;
            new EcAsyncHelper().each(framework.level, function(levelId, done) {
                EcLevel.get(levelId, function(level) {
                    var c = new EcLevel();
                    c.copyFrom(level);
                    if (me.queryParams.newObjectEndpoint != null) {
                        c.generateShortId(me.queryParams.newObjectEndpoint);
                    } else {
                        c.generateId(me.repo.selectedServer);
                    }
                    let index = framework.level.indexOf(levelId);
                    if (index !== -1) {
                        framework.level[index] = c.shortId();
                    }
                    if (c.competency) {
                        if (!EcArray.isArray(c.competency)) {
                            c.competency = [c.competency];
                        }
                        for (let each in c.competency) {
                            c.competency[each] = competencyMap[c.competency[each]];
                        }
                    }
                    c["schema:dateCreated"] = new Date().toISOString();
                    c["schema:dateModified"] = new Date().toISOString();
                    delete c.owner;
                    delete c.reader;
                    if (framework.owner) {
                        c.owner = framework.owner;
                    }
                    if (framework.reader) {
                        c.reader = framework.reader;
                    }
                    c['ceasn:derivedFrom'] = level.id;
                    toSave.push(c);
                    done();
                }, done);
            }, function(competencyIds) {
                if (framework.relation && framework.relation.length > 0) {
                    me.copyRelationsToDirectory(framework, toSave, competencyMap);
                } else {
                    toSave.push(framework);
                    me.multiput(toSave);
                }
            });
        },
        copyRelationsToDirectory: function(framework, toSave, competencyMap) {
            let me = this;
            new EcAsyncHelper().each(framework.relation, function(relationId, done) {
                EcAlignment.get(relationId, function(relation) {
                    var c = new EcAlignment();
                    c.copyFrom(relation);
                    if (me.queryParams.newObjectEndpoint != null) {
                        c.generateShortId(me.queryParams.newObjectEndpoint);
                    } else {
                        c.generateId(me.repo.selectedServer);
                    }
                    let index = framework.relation.indexOf(relationId);
                    if (index !== -1) {
                        framework.relation[index] = c.shortId();
                    }
                    if (relation.source && competencyMap[relation.source]) {
                        c.source = competencyMap[relation.source];
                    }
                    if (relation.target && competencyMap[relation.target]) {
                        c.target = competencyMap[relation.target];
                    }
                    c["schema:dateCreated"] = new Date().toISOString();
                    c["schema:dateModified"] = new Date().toISOString();
                    delete c.owner;
                    delete c.reader;
                    if (framework.owner) {
                        c.owner = framework.owner;
                    }
                    if (framework.reader) {
                        c.reader = framework.reader;
                    }
                    c['ceasn:derivedFrom'] = relation.id;
                    toSave.push(c);
                    done();
                }, done);
            }, function(competencyIds) {
                toSave.push(framework);
                me.multiput(toSave);
            });
        },
        copyResourceToDirectory: function(directory, resource, toSaveFromSubdirectory) {
            let me = this;
            let c = new CreativeWork();
            if (this.queryParams.newObjectEndpoint != null) {
                c.generateShortId(this.queryParams.newObjectEndpoint);
            } else {
                c.generateId(this.repo.selectedServer);
            }
            c.name = resource.name;
            c.url = resource.url;
            c.directory = directory.shortId();
            if (directory.owner) {
                c.owner = directory.owner;
            }
            if (directory.reader) {
                c.reader = directory.reader;
            }
            if (EcIdentityManager.ids.length > 0) {
                c.addOwner(EcIdentityManager.ids[0].ppk.toPk());
            }
            if (toSaveFromSubdirectory) {
                toSaveFromSubdirectory.push(c);
                me.multiput(toSaveFromSubdirectory);
            } else {
                me.repo.saveTo(c, function() {
                    appLog("Resource copied: " + c.id);
                    me.copyingToDirectory = false;
                }, appError);
            }
        },
        copySubdirectoryToDirectory: function(directory, oldSubdirectory, passedInToSave) {
            let me = this;
            let toSave = [];
            if (passedInToSave) {
                toSave = passedInToSave;
            }
            let subdirectory = new EcDirectory();
            subdirectory.copyFrom(oldSubdirectory);
            if (this.queryParams.newObjectEndpoint != null) {
                subdirectory.generateShortId(this.queryParams.newObjectEndpoint);
            } else {
                subdirectory.generateId(this.repo.selectedServer);
            }
            subdirectory.parentDirectory = directory.shortId();
            subdirectory["schema:dateCreated"] = new Date().toISOString();
            subdirectory["schema:dateModified"] = new Date().toISOString();
            delete subdirectory.owner;
            delete subdirectory.reader;
            if (directory.owner) {
                subdirectory.owner = directory.owner;
            }
            if (directory.reader) {
                subdirectory.reader = directory.reader;
            }
            if (EcIdentityManager.ids.length > 0) {
                subdirectory.addOwner(EcIdentityManager.ids[0].ppk.toPk());
            }
            subdirectory['ceasn:derivedFrom'] = oldSubdirectory.id;
            toSave.push(subdirectory);
            this.repo.search("(directory:\"" + oldSubdirectory.shortId() + "\" OR parentDirectory:\"" + oldSubdirectory.shortId() + "\")", function() {}, function(success) {
                me.frameworksToProcess += success.length;
                new EcAsyncHelper().each(success, function(obj, done) {
                    if (obj.type === 'Framework') {
                        me.copyFrameworkToDirectory(subdirectory, obj, toSave);
                    } else if (obj.type === 'CreativeWork') {
                        me.copyResourceToDirectory(subdirectory, obj, toSave);
                    } else if (obj.type === 'Directory') {
                        me.frameworksToProcess--;
                        me.copySubdirectoryToDirectory(subdirectory, obj, toSave);
                    }
                    done();
                }, function(ids) {
                    if (ids.length === 0) {
                        me.multiput(toSave);
                    }
                });
            }, appError);
        },
        moveFrameworkToDirectory: function(directory, framework, toSaveFromSubdirectory) {
            let toSave = [];
            if (toSaveFromSubdirectory) {
                toSave = toSaveFromSubdirectory;
            }
            framework.owner = directory.owner;
            framework.reader = directory.reader;
            framework.directory = directory.shortId();
            framework["schema:dateModified"] = new Date().toISOString();
            toSave.push(framework);
            let subobjects = [];
            if (framework.competency && framework.competency.length > 0) {
                subobjects = framework.competency;
            }
            if (framework.level && framework.level.length > 0) {
                subobjects = subobjects.concat(framework.level);
            }
            if (framework.relation && framework.relation.length > 0) {
                subobjects = subobjects.concat(framework.relation);
            }
            if (subobjects.length > 0) {
                this.moveSubobjectsToDirectory(subobjects, directory, toSave);
            } else {
                this.multiput(toSave, true);
            }
        },
        moveSubobjectsToDirectory: function(subobjects, directory, toSave) {
            let me = this;
            new EcAsyncHelper().each(subobjects, function(id, done) {
                EcRepository.get(id, function(obj) {
                    obj.owner = directory.owner;
                    obj.reader = directory.reader;
                    obj["schema:dateModified"] = new Date().toISOString();
                    toSave.push(obj);
                    done();
                }, done);
            }, function(ids) {
                me.multiput(toSave, true);
            });
        },
        moveResourceToDirectory: function(directory, resource, toSaveFromSubdirectory) {
            let me = this;
            resource.owner = directory.owner;
            resource.reader = directory.reader;
            resource.directory = directory.shortId();
            if (toSaveFromSubdirectory) {
                toSaveFromSubdirectory.push(resource);
                me.multiput(toSaveFromSubdirectory, true);
            } else {
                me.repo.saveTo(resource, function() {
                    appLog("resource moved");
                    me.$store.commit('app/refreshSearch', true);
                    me.$store.commit('app/rightAsideObject', null);
                    me.$store.commit('app/closeRightAside');
                    me.movingToDirectory = false;
                }, appError);
            }
        },
        moveSubdirectoryToDirectory: function(directory, subdirectory, passedInToSave) {
            let me = this;
            let toSave = [];
            if (passedInToSave) {
                toSave = passedInToSave;
            }
            subdirectory.parentDirectory = directory.shortId();
            subdirectory["schema:dateModified"] = new Date().toISOString();
            subdirectory.owner = directory.owner;
            subdirectory.reader = directory.reader;
            toSave.push(subdirectory);
            this.repo.search("(directory:\"" + subdirectory.shortId() + "\" OR parentDirectory:\"" + subdirectory.shortId() + "\")", function() {}, function(success) {
                me.frameworksToProcess += success.length;
                new EcAsyncHelper().each(success, function(obj, done) {
                    if (obj.type === 'Framework') {
                        me.moveFrameworkToDirectory(subdirectory, obj, toSave);
                    } else if (obj.type === 'CreativeWork') {
                        me.moveResourceToDirectory(subdirectory, obj, toSave);
                    } else if (obj.type === "Directory") {
                        me.frameworksToProcess--;
                        me.moveSubdirectoryToDirectory(subdirectory, obj, toSave);
                    }
                    done();
                }, function(ids) {
                    if (ids.length === 0) {
                        me.multiput(toSave, true);
                    }
                });
            }, appError);
        },
        removeFrameworkFromDirectory: function() {
            let framework = this.object;
            let me = this;
            let toSave = [];
            EcDirectory.get(framework.directory, function(directory) {
                if (directory.owner) {
                    for (let each of directory.owner) {
                        framework.removeOwner(EcPk.fromPem(each));
                    }
                    framework.addOwner(EcIdentityManager.ids[0].ppk.toPk());
                }
                if (directory.reader) {
                    for (let each of directory.reader) {
                        framework.removeReader(EcPk.fromPem(each));
                    }
                }
                delete framework.directory;
                framework["schema:dateModified"] = new Date().toISOString();
                toSave.push(framework);
                let subobjects = [];
                if (framework.competency && framework.competency.length > 0) {
                    subobjects = framework.competency;
                }
                if (framework.level && framework.level.length > 0) {
                    subobjects = subobjects.concat(framework.level);
                }
                if (framework.relation && framework.relation.length > 0) {
                    subobjects = subobjects.concat(framework.relation);
                }
                if (subobjects.length > 0) {
                    me.removeSubobjectsFromDirectory(subobjects, directory, toSave);
                } else {
                    this.multiput(toSave, true);
                }
            }, appError);
        },
        removeSubobjectsFromDirectory: function(subobjects, directory, toSave) {
            let me = this;
            new EcAsyncHelper().each(subobjects, function(id, done) {
                EcRepository.get(id, function(obj) {
                    if (directory.owner) {
                        for (let each of directory.owner) {
                            obj.removeOwner(EcPk.fromPem(each));
                        }
                        obj.addOwner(EcIdentityManager.ids[0].ppk.toPk());
                    }
                    if (directory.reader) {
                        for (let each of directory.reader) {
                            obj.removeReader(EcPk.fromPem(each));
                        }
                    }
                    obj["schema:dateModified"] = new Date().toISOString();
                    toSave.push(obj);
                    done();
                }, done);
            }, function(ids) {
                me.multiput(toSave, true);
            });
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
                delete me.object.directory;
                me.repo.saveTo(me.object, function() {
                    appLog("resource removed");
                    me.$store.commit('app/refreshSearch', true);
                    me.movingToDirectory = false;
                }, appError);
            }, appError);
        },
        removeSubdirectoryFromDirectory: function() {
            let me = this;
            let toSave = [];
            let subdirectory = this.object;
            EcDirectory.get(subdirectory.parentDirectory, function(directory) {
                if (directory.owner) {
                    for (let each of directory.owner) {
                        subdirectory.removeOwner(EcPk.fromPem(each));
                    }
                    subdirectory.addOwner(EcIdentityManager.ids[0].ppk.toPk());
                }
                if (directory.reader) {
                    for (let each of directory.reader) {
                        subdirectory.removeReader(EcPk.fromPem(each));
                    }
                }
                delete subdirectory.parentDirectory;
                subdirectory["schema:dateModified"] = new Date().toISOString();
                toSave.push(subdirectory);
                let subobjects = [];
                me.repo.search("directory:\"" + subdirectory.shortId() + "\"", function() {}, function(success) {
                    me.frameworksToProcess = success.length;
                    new EcAsyncHelper().each(success, function(obj, done) {
                        subobjects.push(obj.shortId());
                        if (obj.competency && obj.competency.length > 0) {
                            subobjects = subobjects.concat(obj.competency);
                        }
                        if (obj.level && obj.level.length > 0) {
                            subobjects = subobjects.concat(obj.level);
                        }
                        if (obj.relation && obj.relation.length > 0) {
                            subobjects = subobjects.concat(obj.relation);
                        }
                        if (subobjects.length > 0) {
                            me.removeSubobjectsFromDirectory(subobjects, directory, toSave);
                        }
                        done();
                    }, function(ids) {
                        if (ids.length === 0) {
                            me.multiput(toSave, true);
                        }
                    });
                }, appError);
            }, appError);
        },
        // Make sure user can't move directory into its child/grandchild/etc
        setIneligibleDirectoriesForMove: function(obj) {
            let me = this;
            this.repo.search("parentDirectory:\"" + obj.shortId() + "\"", function(each) {
                me.ineligibleDirectoriesForMove.push(each.shortId());
                me.setIneligibleDirectoriesForMove(each);
            }, function() {}, appError);
        },
        manageUsers: function() {
            this.$store.commit('app/objForShareModal', this.object);
            this.$store.commit('app/showModal', {component: 'Share'});
        },
        editResource: function() {
            this.editingResource = true;
            this.resourceName = this.objectName;
            this.resourceUrl = this.object.url;
        },
        saveResource: function() {
            if (this.resourceName.length === 0) {
                this.errorEditing = "Resource must have a name.";
                return;
            }
            if (this.resourceUrl.length === 0 || !this.resourceUrl.startsWith("http")) {
                this.errorEditing = "Resource must have a URL starting with http.";
                return;
            }
            this.errorEditing = null;
            let me = this;
            let resource = this.object;
            resource.name = this.resourceName;
            resource.url = this.resourceUrl;
            repo.saveTo(resource, function() {
                me.$store.commit('app/rightAsideObject', resource);
                me.editingResource = false;
            }, appError);
        },
        editDirectory: function() {
            this.$store.commit('app/editDirectory', true);
        }
    },
    mounted: function() {
        this.setNumSubdirectoriesAndObjects();
        if (this.object.type === "Directory") {
            this.setIneligibleDirectoriesForMove(this.object);
        }
    },
    computed: {
        objectName: function() {
            let name = this.object.name;
            if (!name && this.object["dcterms:title"]) {
                name = this.object["dcterms:title"];
            } else if (!name && this.object["skos:prefLabel"]) {
                name = this.object["skos:prefLabel"];
            }
            return Thing.getDisplayStringFrom(name);
        },
        objectDescription: function() {
            let description = this.object.description;
            if (!description && this.object["dcterms:description"]) {
                description = this.object["dcterms:description"];
            } else if (!description && this.object["skos:definition"]) {
                description = this.object["skos:definition"];
            }
            return Thing.getDisplayStringFrom(description);
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
        objectTypeForDisplay: function() {
            if (this.objectType === 'CreativeWork') {
                return "Resource";
            }
            if (this.objectType === "ConceptScheme") {
                if (this.queryParams.ceasnDataFields === 'true') {
                    return "Concept Scheme";
                } else {
                    return "Taxonomy";
                }
            }
            return this.objectType;
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
            if (this.movingToDirectory && this.objectType === "Directory") {
                return this.$store.getters['app/directoryList'].filter(directory => {
                    return (directory.shortId() !== me.object.shortId() &&
                        (me.object.parentDirectory ? (directory.shortId() !== me.object.parentDirectory) : true) &&
                        (me.object.directory ? (directory.shortId() !== me.object.directory) : true) &&
                        !EcArray.has(me.ineligibleDirectoriesForMove, directory.shortId()));
                });
            } else {
                return this.$store.getters['app/directoryList'].filter(directory => {
                    return (directory.shortId() !== me.object.shortId() &&
                        (me.object.parentDirectory ? (directory.shortId() !== me.object.parentDirectory) : true) &&
                        (me.object.directory ? (directory.shortId() !== me.object.directory) : true));
                });
            }
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
            if (this.objectType === 'ConceptScheme') {
                return false;
            }
            return true;
        },
        queryParams: function() {
            return this.$store.getters['editor/queryParams'];
        },
        loggedIn: function() {
            if (EcIdentityManager.ids && EcIdentityManager.ids.length > 0) {
                return true;
            }
            return false;
        },
        selectedDirectoryId: function() {
            if (this.$store.getters['app/selectedDirectory']) {
                return this.$store.getters['app/selectedDirectory'].shortId();
            }
            return null;
        }
    },
    watch: {
        objectShortId: function() {
            this.copyingToDirectory = false;
            this.movingToDirectory = false;
            this.ineligibleDirectoriesForMove = [];
            this.setNumSubdirectoriesAndObjects();
            if (this.object.type === "Directory") {
                this.setIneligibleDirectoriesForMove(this.object);
            }
        }
    }
};
</script>

<style lang="scss">
    @import './../../scss/list-item-info.scss';
</style>