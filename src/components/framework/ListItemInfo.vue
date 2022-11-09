<template>
    <div
        id="cass__right-aside"
        class="has-background-lightest">
        <div class="cass__right-aside--header">
            <div class="right-aside-bar__title">
                <!--<span class="tag is-info is-small is-outlined">{{ objectTypeForDisplay }}</span>-->
                <span class="help">{{ objectTypeForDisplay }}</span>
                <div
                    :title="objectName"
                    class="right-aside-bar--title-text is-size-4 is-family-secondary">
                    {{ objectName }}
                </div>
                <div
                    class="buttons pt-2"
                    v-if="objectShortId !== selectedDirectoryId">
                    <div
                        class="button is-small is-rounded is-primary"
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
                            <template v-if="object.directory && object.directory !== selectedDirectoryId">
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
                            <template v-else-if="object.parentDirectory && object.parentDirectory !== selectedDirectoryId">
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
                                        v-clipboard="() => shareLink"
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
                    <template v-if="objectType === 'CreativeWork' || canEditObject && objectType === 'Directory'">
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
                                        <span>
                                            {{ object.url }}
                                        </span>
                                    </div>
                                    <div class="cass__right-aside--property-label">
                                        Url
                                    </div>
                                </div>
                                <!-- resource name -->
                                <div class="cass__right-aside--property">
                                    <div class="cass__right-aside--property-text">
                                        <span>
                                            {{ objectName }}
                                        </span>
                                    </div>
                                    <div class="cass__right-aside--property-label">
                                        Name
                                    </div>
                                </div>
                                <div class="cass__right-aside--property flex-end">
                                    <div
                                        @click="$emit('editResourceDetails', object)"
                                        class="button is-pulled-right is-primary is-outlined">
                                        <span>Edit</span>
                                        <span class="icon">
                                            <i class="fa fa-edit" />
                                        </span>
                                    </div>
                                </div>
                            </template>
                            <!-- directory name -->
                            <template v-if="objectType === 'Directory'">
                                <div class="cass__right-aside--property">
                                    <div class="cass__right-aside--property-text">
                                        <span>
                                            {{ objectName }}
                                        </span>
                                    </div>
                                    <!--<div
                                        class="cass__right-aside--property-icons"
                                        v-if="canEditObject && objectType === 'Directory' && objectShortId === selectedDirectoryId">
                                        <div
                                            @click="editDirectory"
                                            class="icon is-small">
                                            <i class="fa fa-edit is-size-5" />
                                        </div>
                                    </div>-->
                                    <div class="cass__right-aside--property-label">
                                        Directory Name
                                    </div>
                                    <div
                                        v-if="canEditObject && objectType === 'Directory'"
                                        class="cass__right-aside--property flex-end">
                                        <div
                                            @click="editDirectory"
                                            class="button is-pulled-right is-primary is-outlined">
                                            <span>Edit</span>
                                            <span class="icon">
                                                <i class="fa fa-edit" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <span v-if="errorEditing">
                                {{ errorEditing }}
                            </span>
                        </div>
                    </template>
                    <!-- users -->
                    <template v-if="loggedInPerson && loggedInPerson.name && canEditObject && !(objectType === 'CreativeWork' && !$store.state.featuresEnabled.userManagementEnabled)">
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
                            class="cass__right-side--accordion-panel users">
                            <div
                                class="cass__right-aside--whole-item pt-2">
                                <div class="buttons is-centered">
                                    <div
                                        @click="manageUsers"
                                        class="button is-primary is-rounded">
                                        <span>Manage Permissions / Share Framework</span>
                                        <span
                                            class="icon">
                                            <i class="fas fa-users" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                    <!-- description -->
                    <template v-if="objectType === 'Directory'">
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
                            <div
                                v-if="objectDescription"
                                class="p-2">
                                {{ objectDescription }}
                            </div>
                            <div
                                class="p-2"
                                v-else>
                                No description
                            </div>
                        </div>
                    </template>
                    <!-- copy to directory -->
                    <template>
                        <button
                            :class=" accordion === 'copy' ? 'active' : ''"
                            @click="clickAccordion('copy'); copyingToDirectory = true;"
                            class="cass__right-side--accordion">
                            Copy {{ objectTypeForDisplay }}
                            <span class="icon is-pulled-right">
                                <i
                                    v-if="accordion === 'copy'"
                                    class="fa fa-minus" />
                                <i
                                    v-else
                                    class="fa fa-plus" />
                            </span>
                        </button>
                        <div
                            :class=" accordion === 'copy' ? 'active' : ''"
                            class="cass__right-side--accordion-panel">
                            <li
                                class="cass--list-item-info--search-result--li"
                                v-for="directory in copyDirectoryOptions"
                                :key="directory">
                                <span
                                    class="cass--list-item-info--search-results--li-text">
                                    {{ directory.name }}
                                </span>
                                <span
                                    @click="copyOrMove(directory)"
                                    class="button is-primary is-outlined is-small is-pulled-right">
                                    copy here
                                </span>
                            </li>
                        </div>
                    </template>
                    <!-- move to directory -->
                    <template v-if="canEditObject">
                        <button
                            :class=" accordion === 'move' ? 'active' : ''"
                            @click="clickAccordion('move'); movingToDirectory = true;"
                            class="cass__right-side--accordion">
                            Move {{ objectTypeForDisplay }}
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
                                v-for="directory in moveDirectoryOptions"
                                :key="directory">
                                <span
                                    class="cass--list-item-info--search-results--li-text">
                                    {{ directory.name }}
                                </span>
                                <span
                                    @click="copyOrMove(directory)"
                                    class="button is-primary is-v-centered is-outlined is-small is-pulled-right">
                                    move here
                                </span>
                            </li>
                            <li
                                class="cass--list-item-info--search-result--li"
                                v-if="object.directory || object.parentDirectory">
                                <span
                                    class="cass--list-item-info--search-results--li-text has-text-danger">
                                    Remove from directory
                                </span>
                                <span
                                    v-if="movingToDirectory"
                                    @click="removeFromDirectory"
                                    class="button is-danger is-outlined is-small is-pulled-right">
                                    remove
                                </span>
                            </li>
                        </div>
                    </template>
                    <!-- delete directory -->
                    <template v-if="canEditObject && objectType === 'Directory'">
                        <div class="">
                            <div
                                @click="deleteDirectory"
                                class="buttons is-pulled-right p-2">
                                <div class="button is-danger is-outlined">
                                    delete directory
                                </div>
                            </div>
                        </div>
                    </template>
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
    components: {
    },
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
            errorEditing: null,
            processingCopyOrMove: false
        };
    },
    methods: {
        deleteDirectory() {
            this.$store.commit('app/showModal', {component: 'DeleteDirectoryConfirm'});
        },
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
            if (this.objectType === "Directory") {
                if (this.object.directories) {
                    this.numSubdirectories = this.object.directories.length;
                } else {
                    this.numSubdirectories = 0;
                }
                let objects = 0;
                if (this.object.frameworks) {
                    objects += this.object.frameworks.length;
                }
                if (this.object.resources) {
                    objects += this.object.resources.length;
                }
                this.numObjects = objects;
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
                this.$store.commit('app/selectDirectory', null);
                EcConceptScheme.get(this.object.id, function(success) {
                    me.$store.commit('editor/framework', success);
                    me.$store.commit('editor/clearFrameworkCommentData');
                    me.$store.commit('app/setCanViewComments', me.canViewCommentsCurrentFramework());
                    me.$store.commit('app/setCanAddComments', me.canAddCommentsCurrentFramework());
                    me.$router.push({name: "conceptScheme", params: {frameworkId: me.object.id}});
                }, appError);
            } else if (this.$store.getters['editor/progressionMode']) {
                this.$store.commit('app/selectDirectory', null);
                EcConceptScheme.get(this.object.id, function(success) {
                    me.$store.commit('editor/framework', success);
                    me.$store.commit('editor/clearFrameworkCommentData');
                    me.$store.commit('app/setCanViewComments', me.canViewCommentsCurrentFramework());
                    me.$store.commit('app/setCanAddComments', me.canAddCommentsCurrentFramework());
                    me.$router.push({name: "progressionModel", params: {frameworkId: me.object.id}});
                }, appError);
            } else {
                this.$store.commit('app/selectDirectory', null);
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
            if (schema.Thing.getDisplayStringFrom(name).toLowerCase().indexOf("http") !== -1) {
                return this.resolveNameFromUrl(schema.Thing.getDisplayStringFrom(name));
            } else {
                return schema.Thing.getDisplayStringFrom(name);
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
            this.processingCopyOrMove = true;
            this.$Progress.start();
            if (this.copyingToDirectory) {
                this.$emit('beginCopy');
            } else if (this.movingToDirectory) {
                this.$emit('beginMove');
            }
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
        removeFromDirectory: async function() {
            this.$Progress.start();
            if (this.objectType === 'Framework') {
                await this.removeFrameworkFromDirectory(this.object);
            } else if (this.objectType === 'CreativeWork') {
                await this.removeResourceFromDirectory(this.object);
            } else if (this.objectType === 'Directory') {
                await this.removeSubdirectoryFromDirectory(this.object);
            }
        },
        multiput: async function(toSave, shouldRefresh) {
            let me = this;
            this.frameworksToProcess--;
            return new Promise((resolve, reject) => {
                if (this.frameworksToProcess <= 0) {
                    this.repo.multiput(toSave, function(success) {
                        me.processingCopyOrMove = false;
                        me.$Progress.finish();
                        me.copyingToDirectory = false;
                        if (me.movingToDirectory) {
                            // Remove the moved item from the right panel
                            me.$store.commit('app/rightAsideObject', null);
                            me.$store.commit('app/closeRightAside');
                            me.$Progress.finish();
                            me.movingToDirectory = false;
                        }
                        if (shouldRefresh) {
                            // If removing or moving, need to refresh search results
                            me.$store.commit('app/refreshSearch', true);
                        }
                        resolve();
                    }, reject);
                } else {
                    resolve();
                }
            });
        },
        getCopyFrameworkName: function(f) {
            let name = f.name;
            if (!EcArray.isArray(name)) {
                name = [name];
            }
            for (let each in name) {
                if (name[each]["@value"]) {
                    name[each]["@value"] = "Copy of " + name[each]["@value"];
                } else {
                    name[each] = "Copy of " + name[each];
                }
            }
            if (name.length === 1) {
                name = name[0];
            }
            return name;
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
            if (EcIdentityManager.default.ids.length > 0) {
                f.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
            }
            let name = this.getCopyFrameworkName(f);
            f.name = name;
            f['ceasn:derivedFrom'] = framework.id;
            // Original framework was encrypted, make sure the copy is too
            if (EcEncryptedValue.encryptOnSaveMap && EcEncryptedValue.encryptOnSaveMap[framework.shortId()]) {
                EcEncryptedValue.encryptOnSaveMap[f.shortId()] = true;
            }
            // Add this framework as a child of the directory
            if (!directory.frameworks) {
                directory.frameworks = [];
            }
            EcArray.setAdd(directory.frameworks, f.shortId());
            toSave.push(directory);
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
                    if (EcIdentityManager.default.ids.length > 0) {
                        c.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
                    }
                    c['ceasn:derivedFrom'] = competency.id;
                    // If the original competency was encrypted, make sure the copy is too
                    if (EcEncryptedValue.encryptOnSaveMap && EcEncryptedValue.encryptOnSaveMap[competency.shortId()]) {
                        EcEncryptedValue.encryptOnSaveMap[c.shortId()] = true;
                    }
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
                    // If original level was encrypted, encrypt the copy too
                    if (EcEncryptedValue.encryptOnSaveMap && EcEncryptedValue.encryptOnSaveMap[level.shortId()]) {
                        EcEncryptedValue.encryptOnSaveMap[c.shortId()] = true;
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
                    if (EcIdentityManager.default.ids.length > 0) {
                        c.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
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
                    // If original relation was encrypted, make sure copy is too
                    if (EcEncryptedValue.encryptOnSaveMap && EcEncryptedValue.encryptOnSaveMap[relation.shortId()]) {
                        EcEncryptedValue.encryptOnSaveMap[c.shortId()] = true;
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
                    if (EcIdentityManager.default.ids.length > 0) {
                        c.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
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
            let c = new schema.CreativeWork();
            if (this.queryParams.newObjectEndpoint != null) {
                c.generateShortId(this.queryParams.newObjectEndpoint);
            } else {
                c.generateId(this.repo.selectedServer);
            }
            c.name = "Copy of " + resource.name;
            c.url = resource.url;
            c.directory = directory.shortId();
            if (directory.owner) {
                c.owner = directory.owner;
            }
            if (directory.reader) {
                c.reader = directory.reader;
            }
            if (EcIdentityManager.default.ids.length > 0) {
                c.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
            }

            // If original resource is encrypted, make sure copy is too
            if (EcEncryptedValue.encryptOnSaveMap && EcEncryptedValue.encryptOnSaveMap[resource.shortId()]) {
                EcEncryptedValue.encryptOnSaveMap[c.shortId()] = true;
            }
            // Add resource as a child of the directory
            if (!directory.resources) {
                directory.resources = [];
            }
            EcArray.setAdd(directory.resources, c.shortId());
            let toSave = [c, directory];

            if (toSaveFromSubdirectory) {
                toSave = toSave.concat(toSaveFromSubdirectory);
            }

            me.multiput(toSave);
        },
        copySubdirectoryToDirectory: async function(directory, oldSubdirectory, passedInToSave) {
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
            if (EcIdentityManager.default.ids.length > 0) {
                subdirectory.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
            }
            subdirectory['ceasn:derivedFrom'] = oldSubdirectory.id;
            subdirectory.name = "Copy of " + subdirectory.name;
            // If original directory was encrypted, make sure the copy is too
            if (EcEncryptedValue.encryptOnSaveMap && EcEncryptedValue.encryptOnSaveMap[oldSubdirectory.shortId()]) {
                EcEncryptedValue.encryptOnSaveMap[subdirectory.shortId()] = true;
            }
            // Add this directory as a child of the parent
            if (!directory.directories) {
                directory.directories = [];
            }
            EcArray.setAdd(directory.directories, subdirectory.shortId());

            let children = await this.$store.dispatch('editor/getDirectoryChildren', oldSubdirectory);
            // Remove children that do not resolve from the copy
            let validChildren = [];
            for (let child of children) {
                try {
                    let obj = await EcRepository.get(child);
                    if (obj.type === 'EncryptedValue') {
                        obj = await EcEncryptedValue.fromEncryptedValue(obj);
                    }
                    validChildren.push(obj);
                } catch (e) {
                    EcArray.setRemove(subdirectory.directories || [], child);
                    EcArray.setRemove(subdirectory.frameworks || [], child);
                    EcArray.setRemove(subdirectory.resources || [], child);
                }
            }

            toSave.push(...[directory, subdirectory]);

            let done = [];
            for (let obj of validChildren) {
                try {
                    if (obj.type === 'Framework') {
                        await this.copyFrameworkToDirectory(subdirectory, obj, toSave);
                    } else if (obj.type === 'CreativeWork') {
                        await this.copyResourceToDirectory(subdirectory, obj, toSave);
                    } else if (obj.type === 'Directory') {
                        this.frameworksToProcess--;
                        this.copySubdirectoryToDirectory(subdirectory, obj, toSave);
                    }
                    done.push(child);
                } catch (e) {
                    appError(e);
                }
            }
            if (done.length === 0) {
                await this.multiput(toSave, true);
            }
        },
        moveFrameworkToDirectory: async function(directory, framework, toSaveFromSubdirectory) {
            try {
                let toSave = [];
                if (toSaveFromSubdirectory) {
                    toSave = toSaveFromSubdirectory;
                }
                // If the framework was already in a directory, remove it first
                if (framework.directory) {
                    await this.removeFrameworkFromDirectory(framework);
                }
                if (directory.owner) {
                    for (let each of directory.owner) {
                        framework.addOwner(EcPk.fromPem(each));
                    }
                }
                framework.reader = directory.reader;
                framework.directory = directory.shortId();
                framework["schema:dateModified"] = new Date().toISOString();
                // Add this framework as a child of the directory
                if (!directory.frameworks) {
                    directory.frameworks = [];
                }
                EcArray.setAdd(directory.frameworks, framework.shortId());
                toSave.push(...[framework, directory]);
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
                    await this.moveSubobjectsToDirectory(subobjects, directory, toSave);
                } else {
                    await this.multiput(toSave, true);
                }
            } catch (e) {
                appError(e);
            }
        },
        moveSubobjectsToDirectory: async function(subobjects, directory, toSave) {
            let me = this;
            return new Promise((resolve, reject) => {
                new EcAsyncHelper().each(subobjects, function(id, done) {
                    EcRepository.get(id, function(obj) {
                        if (directory.owner) {
                            for (let each of directory.owner) {
                                obj.addOwner(EcPk.fromPem(each));
                            }
                        }
                        obj.reader = directory.reader;
                        obj["schema:dateModified"] = new Date().toISOString();
                        toSave.push(obj);
                        done();
                    }, done);
                }, function(ids) {
                    me.multiput(toSave, true).then(resolve).catch(reject);
                });
            });
        },
        moveResourceToDirectory: async function(directory, resource, toSaveFromSubdirectory) {
            let me = this;
            // If the resource was already in a directory, remove it first
            if (resource.directory) {
                await this.removeResourceFromDirectory(resource);
            }
            if (directory.owner) {
                for (let each of directory.owner) {
                    resource.addOwner(EcPk.fromPem(each));
                }
            }
            resource.reader = directory.reader;
            resource.directory = directory.shortId();
            // Add this resource as a child of the directory
            if (!directory.resources) {
                directory.resources = [];
            }
            EcArray.setAdd(directory.resources, resource.shortId());

            let toSave = [directory, resource];

            if (toSaveFromSubdirectory) {
                toSave = toSave.concat(toSaveFromSubdirectory);
            }

            me.multiput(toSave, true);
        },
        moveSubdirectoryToDirectory: async function(directory, subdirectory, passedInToSave) {
            let me = this;
            let toSave = [];
            if (passedInToSave) {
                toSave = passedInToSave;
            }
            // If the subdirectory is already in a directory, remove it first
            if (subdirectory.parentDirectory) {
                await this.removeSubdirectoryFromDirectory(subdirectory);
            }
            subdirectory.parentDirectory = directory.shortId();
            subdirectory["schema:dateModified"] = new Date().toISOString();
            if (directory.owner) {
                for (let each of directory.owner) {
                    subdirectory.addOwner(EcPk.fromPem(each));
                }
            }
            subdirectory.reader = directory.reader;
            // Add this directory as a child of the directory
            if (!directory.directories) {
                directory.directories = [];
            }
            EcArray.setAdd(directory.directories, subdirectory.shortId());
            toSave.push(...[subdirectory, directory]);

            let children = await this.$store.dispatch('editor/getDirectoryChildren', subdirectory);
            let success = await window.repo.multiget(children);
            this.frameworksToProcess += success.length;
            return new Promise((resolve, reject) => {
                new EcAsyncHelper().each(success, async function(obj, done) {
                    if (obj.type === 'EncryptedValue') {
                        obj = await EcEncryptedValue.fromEncryptedValue(obj);
                    }
                    if (obj.type === 'Framework') {
                        await me.moveFrameworkToDirectory(subdirectory, obj, toSave);
                    } else if (obj.type === 'CreativeWork') {
                        await me.moveResourceToDirectory(subdirectory, obj, toSave);
                    } else if (obj.type === "Directory") {
                        await me.frameworksToProcess--;
                        await me.moveSubdirectoryToDirectory(subdirectory, obj, toSave);
                    }
                    done();
                }, function(ids) {
                    if (ids.length === 0) {
                        me.multiput(toSave, true).then(resolve).catch(reject);
                    } else {
                        resolve();
                    }
                });
            });
        },
        removeFrameworkFromDirectory: async function(framework) {
            let me = this;
            let toSave = [];
            this.$Progress.start();
            let directory = await EcDirectory.ge(framework.directory);
            if (directory.owner) {
                for (let each of directory.owner) {
                    framework.removeOwner(EcPk.fromPem(each));
                }
                framework.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
            }
            if (directory.reader) {
                for (let each of directory.reader) {
                    framework.removeReader(EcPk.fromPem(each));
                }
            }
            delete framework.directory;
            framework["schema:dateModified"] = new Date().toISOString();
            // remove this framework from the list of children
            if (directory.frameworks) {
                EcArray.setRemove(directory.frameworks, framework.shortId());
            }
            toSave.push(...[framework, directory]);
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
                await me.removeSubobjectsFromDirectory(subobjects, directory, toSave);
            } else {
                await me.multiput(toSave, true);
            }
        },
        removeSubobjectsFromDirectory: async function(subobjects, directory, toSave) {
            let me = this;
            return new Promise((resolve, reject) => {
                new EcAsyncHelper().each(subobjects, function(id, done) {
                    EcRepository.get(id, async function(obj) {
                        if (directory.owner) {
                            for (let each of directory.owner) {
                                obj.removeOwner(EcPk.fromPem(each));
                            }
                            obj.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
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
                    me.multiput(toSave, true).then(resolve).catch(reject);
                });
            });
        },
        removeResourceFromDirectory: async function(object) {
            let directory = await EcDirectory.get(object.directory);
            if (directory.owner) {
                for (let each of directory.owner) {
                    object.removeOwner(EcPk.fromPem(each));
                }
                object.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
            }
            if (directory.reader) {
                for (let each of directory.reader) {
                    object.removeReader(EcPk.fromPem(each));
                }
            }
            delete object.directory;
            // Remove this resource from the list of children
            if (directory.resources) {
                EcArray.setRemove(directory.resources, object.shortId());
            }
            toSave = [object, directory];

            await this.multiput(toSave, true);
        },
        removeSubdirectoryFromDirectory: async function(subdirectory) {
            let me = this;
            let toSave = [];
            let directory = await EcDirectory.get(subdirectory.parentDirectory);
            if (directory.owner) {
                for (let each of directory.owner) {
                    subdirectory.removeOwner(EcPk.fromPem(each));
                }
                subdirectory.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
            }
            if (directory.reader) {
                for (let each of directory.reader) {
                    subdirectory.removeReader(EcPk.fromPem(each));
                }
            }
            delete subdirectory.parentDirectory;
            subdirectory["schema:dateModified"] = new Date().toISOString();
            // Remove this directory from the list of children
            if (directory.directories) {
                EcArray.setRemove(directory.directories, subdirectory.shortId());
            }
            toSave.push(...[subdirectory, directory]);

            let children = await me.$store.dispatch('editor/getDirectoryChildren', subdirectory);
            let success = await window.repo.multiget(children);
            this.frameworksToProcess = success.length;

            return new Promise((resolve, reject) => {
                new EcAsyncHelper().each(success, async function(obj, done) {
                    let subobjects = [];
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
                        await me.removeSubobjectsFromDirectory(subobjects, directory, toSave);
                    }
                    done();
                }, function(ids) {
                    if (ids.length === 0) {
                        me.multiput(toSave, true).then(resolve).catch(reject);
                    } else {
                        resolve();
                    }
                });
            });
        },
        // Make sure user can't move directory into its child/grandchild/etc
        setIneligibleDirectoriesForMove: async function(obj) {
            if (obj.directories) {
                for (let child of obj.directories) {
                    let childObj = await EcRepository.get(child);
                    this.ineligibleDirectoriesForMove.push(childObj.shortId());
                    await this.setIneligibleDirectoriesForMove(childObj);
                }
            }
        },
        manageUsers: function() {
            this.$store.commit('app/objForShareModal', this.object);
            this.$store.commit('app/showModal', {component: 'Share'});
        },
        editDirectory: function() {
            this.$store.commit('app/editDirectory', true);
        }
    },
    mounted: async function() {
        this.setNumSubdirectoriesAndObjects();
        if (this.object.encryptedType) {
            let type = "Ec" + this.object.encryptedType;
            let obj = new window[type]();
            obj.copyFrom(await EcEncryptedValue.fromEncryptedValue(this.object));
            this.$store.commit('app/rightAsideObject', obj);
        }
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
            return schema.Thing.getDisplayStringFrom(name);
        },
        objectDescription: function() {
            let description = this.object.description;
            if (!description && this.object["dcterms:description"]) {
                description = this.object["dcterms:description"];
            } else if (!description && this.object["skos:definition"]) {
                description = this.object["skos:definition"];
            }
            return schema.Thing.getDisplayStringFrom(description);
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
            if (this.objectType === "ConceptScheme" && this.object.subType === "Progression") {
                return "Progression";
            }
            if (this.objectType === "ConceptScheme") {
                if (this.queryParams.ceasnDataFields === 'true') {
                    return "Concept Scheme";
                } else {
                    return "Taxonomy";
                }
            }
            if (this.objectType === "Framework" && this.object.subType === "Collection") {
                return "Collection";
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
            } else if ((this.$store.getters['editor/conceptMode'] === true) || (this.$store.getters['editor/progressionMode'] === true)) {
                return (link + "?concepts=true&frameworkId=" + this.objectShortId);
            }
            return (link + "?frameworkId=" + this.objectShortId);
        },
        copyDirectoryOptions: function() {
            let me = this;
            return this.$store.getters['app/directoryList'].filter(directory => {
                return (directory.shortId() !== me.object.shortId() &&
                    (me.object.parentDirectory ? (directory.shortId() !== me.object.parentDirectory) : true) &&
                    (me.object.directory ? (directory.shortId() !== me.object.directory) : true));
            });
        },
        moveDirectoryOptions: function() {
            let me = this;
            if (this.objectType === "Directory") {
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
            return this.canEditAny(this.object);
        },
        queryParams: function() {
            return this.$store.getters['editor/queryParams'];
        },
        loggedInPerson: function() {
            return this.$store.getters['user/loggedOnPerson'];
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