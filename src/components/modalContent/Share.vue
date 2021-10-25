<template>
    <modal-template
        @close="closeModal; $emit('close')"
        :active="true"
        type="primary">
        <template slot="modal-header">
            <span class="title has-text-white">Share {{ objectType }}</span>
            <br><span class="subtitle has-text-white has-text-weight-medium">
                Sharing settings for {{ frameworkName }} {{ objectType }}
            </span>
        </template>
        <!-- processing -->
        <template
            v-if="isProcessing"
            slot="modal-body">
            <h2 class="header has-text-centered">
                Processing request...
            </h2>
            <div class="section has-background-white has-text-centered">
                <span class="icon is-large">
                    <i class="fa fa-spinner fa-2x fa-pulse" />
                </span>
            </div>
        </template>
        <!-- confirm make private -->
        <template
            slot="modal-body"
            v-else-if="confirmMakePrivate">
            <h2 class="header is-size-3">
                Confirm make private
            </h2>
            <p>
                Making this {{ objectType }} private means only those users/groups in
                your access list will have the ability to read, write, or edit this {{ objectType }}.
            </p>
        </template>
        <!-- confirm make public -->
        <template
            slot="modal-body"
            v-else-if="confirmMakePublic">
            <h2 class="header is-size-3">
                Confirm make public
            </h2>
            <p>
                Making this {{ objectType }} public means anyone with a link can access and read this {{ objectType }}.
                Only those with admin access will be able to edit or delete the {{ objectType }}.
            </p>
        </template>
        <template
            slot="modal-body"
            v-else-if="!confirmMakePublic && !confirmMakePrivate">
            <div
                class="columns box is-mobile is-multiline"
                v-if="shareEnabled">
                <!-- share link -->
                <div class="column is-12">
                    <h3 class="has-text-weight-bold">
                        Shareable link
                    </h3>
                </div>
                <div class="column">
                    <p class="share-url has-text-weight-light">
                        {{ shareableFrameworkInEditor }}
                    </p>
                </div>
                <div class="column is-narrow">
                    <div
                        class="button is-outlined is-large is-primary"
                        title="Copy URL to the clipboard."
                        v-clipboard="shareableFrameworkInEditor"
                        v-clipboard:success="successfulClip"
                        v-clipboard:error="errorClip">
                        <i
                            v-if="clipStatus === 'ready'"
                            class="fa fa-copy" />
                        <i
                            v-if="clipStatus === 'success'"
                            class="fa fa-check" />
                        <i
                            v-if="clipStatus === 'error'"
                            class="fa fa-times" />
                    </div>
                </div>
            </div>
            <div
                class="columns is-multiline is-mobile"
                v-if="canEditFramework && userManagementEnabled">
                <!-- end share link -->
                <div v-if="ownerCount === 0">
                    To add users or groups or to make your {{ objectType }} private, first add yourself as an owner.
                    <button @click="makeCurrentUserAnOwner">
                        Make me an owner
                    </button>
                </div>
                <!-- input new groups or users -->
                <div
                    class="column is-12"
                    v-else>
                    <div class="columns is-vcentered is-mobile">
                        <div class="column">
                            <label class="label">Add users or groups</label>
                        </div>
                        <div
                            class="column is-narrow"
                            v-if="loggedIn">
                            <div class="buttons has-addons is-pulled-right">
                                <button
                                    @click="handlePublicClick"
                                    :class="{'is-outlined': privateFramework}"
                                    class="button is-small is-link">
                                    Public
                                </button>
                                <button
                                    @click="handlePrivateClick"
                                    :class="{'is-outlined': !privateFramework}"
                                    class="button is-small is-link">
                                    Private
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="field is-grouped">
                        <div class="control is-expanded share auto-complete__control">
                            <input
                                @blur="closeAutoComplete"
                                type="search"
                                placeholder="search"
                                class="input share is-fullwidth"
                                v-model="search"
                                @input="filterResults">
                            <div
                                v-show="isOpenAutocomplete"
                                class="auto">
                                <ul>
                                    <li
                                        v-for="(result, i) in filtered"
                                        :key="i"
                                        @mousedown="selectUserOrGroup(result)">
                                        {{ result.name + " (" + result.email + ")" }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="control">
                            <div class="select is-dark">
                                <select v-model="selectViewOrAdmin">
                                    <option
                                        v-for="(option, index) in viewOptions"
                                        :key="index"
                                        :value="option.value"
                                        :disabled="option.disabled"
                                        :title="option.title">
                                        {{ option.label }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="control is-narrow">
                            <div
                                @click="saveSettings"
                                class="button is-outlined is-primary">
                                <span class="icon">
                                    <i class="fa fa-save" />
                                </span>
                                <span>Add Selection</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end input new users or groups -->
                <!-- begin list of access -->
                <div
                    class="column is-12"
                    v-if="canEditFramework">
                    <div
                        class="table-container"
                        v-if="groups.length>0">
                        <table class="table is-fullwidth">
                            <thead>
                                <tr>
                                    <th><abbr title="Username">Group Name</abbr></th>
                                    <th><abbr title="Access">View</abbr></th>
                                    <th><abbr title="Delete">Delete</abbr></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="group in groups"
                                    :key="group">
                                    <td> {{ group.header }}</td>
                                    <td>
                                        <div class="select is-small is-primary">
                                            <select
                                                v-model="group.view"
                                                @change="group.changed=true">
                                                <option
                                                    :value="option.value"
                                                    v-for="option in viewOptions"
                                                    :key="option">
                                                    {{ option.label }}
                                                </option>
                                            </select>
                                        </div>
                                    </td>
                                    <td>
                                        <div
                                            class="button is-text is-small has-text-danger"
                                            @click="removeOwnerOrReader(group, 'group')"
                                            :disabled="group.currentUser && numGroupsAsOwner === 1 && group.view == 'admin' && cantRemoveCurrentUserAsOwner && !userIsOwner">
                                            <div class="icon">
                                                <i class="fa fa-trash" />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- user table -->
                <div
                    class="column is-12"
                    v-if="canEditFramework">
                    <div
                        class="table-container"
                        v-if="users.length>0">
                        <table class="table is-fullwidth">
                            <thead>
                                <tr>
                                    <th><abbr title="User name">User Name</abbr></th>
                                    <th><abbr title="User email">User Email</abbr></th>
                                    <th><abbr title="Access">View</abbr></th>
                                    <th><abbr title="Delete">Delete</abbr></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="user in users"
                                    :key="user">
                                    <td> {{ user.header }}</td>
                                    <td> {{ user.email }}</td>
                                    <td>
                                        <div class="select is-primary is-small">
                                            <select
                                                v-model="user.view"
                                                @change="user.changed=true;saveSettings()">
                                                <option
                                                    :value="option.value"
                                                    v-for="option in viewOptions"
                                                    :key="option">
                                                    {{ option.label }}
                                                </option>
                                            </select>
                                        </div>
                                    </td>
                                    <td>
                                        <div
                                            class="button is-text is-small has-text-danger"
                                            @click="removeOwnerOrReader(user, 'user')"
                                            :disabled="cantRemoveCurrentUserAsOwner && user.currentUser && !numGroupsAsOwner">
                                            <div class="icon">
                                                <i class="fa fa-trash" />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </template>
        <template slot="modal-foot">
            <div
                v-if="!confirmMakePrivate && !confirmMakePublic"
                class="buttons is-spaced">
                <button
                    :disabled="isProcessing"
                    class="button is-primary is-outlined"
                    @click="$store.commit('app/closeModal')">
                    Done
                </button>
            </div>
            <div
                v-if="confirmMakePrivate"
                class="buttons is-centered">
                <div
                    @click="confirmMakePrivate = false"
                    :disabled="isProcessing"
                    class="button is-dark is-outlined">
                    <span class="icon">
                        <i class="fa fa-times" />
                    </span><span>cancel</span>
                </div>
                <div
                    class="button is-primary is-outlined"
                    :disabled="isProcessing"
                    @click="makePrivate">
                    <span class="icon">
                        <i class="fa fa-check" />
                    </span><span>confirm make private</span>
                </div>
            </div>
            <div
                v-if="confirmMakePublic"
                class="buttons is-centered">
                <div
                    @click="confirmMakePublic = false"
                    :disabled="isProcessing"
                    class="button is-dark is-outlined">
                    <span class="icon">
                        <i class="fa fa-times" />
                    </span><span>cancel</span>
                </div>
                <div
                    class="button is-primary is-outlined"
                    :disabled="isProcessing"
                    @click="makePublic">
                    <span class="icon">
                        <i class="fa fa-check" />
                    </span><span>confirm make public</span>
                </div>
            </div>
        </template>
    </modal-template>
</template>

<script>
import {cassUtil} from '@/mixins/cassUtil.js';
import ModalTemplate from './ModalTemplate.vue';
export default {
    name: 'ShareModal',
    props: {
        isActive: Boolean
    },
    components: {
        ModalTemplate
    },
    mixins: [ cassUtil ],
    data() {
        return {
            isProcessing: false,
            confirmMakePrivate: false,
            confirmMakePublic: false,
            clipStatus: 'ready',
            viewOptions: [
                {
                    label: 'Admin',
                    value: 'admin',
                    disabled: false,
                    title: null
                },
                {
                    label: 'View',
                    value: 'view',
                    disabled: true,
                    title: 'Make the ' + (this.$store.getters['editor/conceptMode'] ? 'concept scheme' : 'framework') + ' private to add users/groups with view access'
                }
            ],
            groups: [],
            users: [],
            search: "",
            filtered: [],
            possibleGroupsAndUsers: [],
            isOpenAutocomplete: false,
            userOrGroupToAdd: null,
            selectViewOrAdmin: "admin",
            removeReader: [],
            removeOwner: [],
            addReader: [],
            privateFramework: false,
            addOwner: [],
            repo: window.repo,
            conceptsProcessed: 0,
            conceptsToProcess: 0,
            cantRemoveCurrentUserAsOwner: false,
            ownerCount: 0,
            decryptingConcepts: false,
            toSave: [],
            frameworksToProcess: 0,
            numGroupsAsOwner: 0,
            userIsOwner: false
        };
    },
    computed: {
        loggedIn: function() {
            if (EcIdentityManager.default.ids && EcIdentityManager.default.ids.length > 0) {
                return true;
            }
            return false;
        },
        shareableFrameworkInEditor: function() {
            let link = window.location.href;
            link = link.replace('/frameworks', '').replace('/directory', '');
            if (this.directory) {
                return (link + "?directoryId=" + this.directory.shortId());
            } else if (this.$store.getters['editor/conceptMode'] === true) {
                return (link + "?concepts=true&frameworkId=" + this.frameworkId);
            }
            return (link + "?frameworkId=" + this.frameworkId);
        },
        framework: function() {
            if (this.objFromListItemInfo && (this.objFromListItemInfo.type === "Framework" || this.objFromListItemInfo.type === "ConceptScheme")) {
                return this.objFromListItemInfo;
            }
            return this.$store.state.editor.framework;
        },
        frameworkId: function() {
            if (this.framework) {
                return this.framework.shortId();
            }
            return null;
        },
        directory: function() {
            if (this.objFromListItemInfo && this.objFromListItemInfo.type === "Directory") {
                return this.objFromListItemInfo;
            } else if (this.objFromListItemInfo || this.$route.name === "framework" || this.$route.name === "conceptScheme") {
                return null;
            }
            return this.$store.getters['app/selectedDirectory'];
        },
        resource: function() {
            if (this.objFromListItemInfo && this.objFromListItemInfo.type === "CreativeWork") {
                return this.objFromListItemInfo;
            }
            return null;
        },
        frameworkName: function() {
            if (this.directory) {
                return this.directory.name;
            }
            if (this.resource) {
                return this.resource.name;
            }
            if (this.framework.name) {
                return schema.Thing.getDisplayStringFrom(this.framework.name);
            } else {
                return schema.Thing.getDisplayStringFrom(this.framework["dcterms:title"]);
            }
        },
        queryParams: function() {
            return this.$store.getters['editor/queryParams'];
        },
        canEditFramework: function() {
            if (!this.loggedIn) {
                return false;
            }
            if (this.queryParams && this.queryParams.view === 'true') {
                return false;
            } else if (this.framework && !this.framework.canEditAny(EcIdentityManager.default.getMyPks())) {
                return false;
            } else if (this.directory && !this.directory.canEditAny(EcIdentityManager.default.getMyPks())) {
                return false;
            } else if (this.resource && !this.resource.canEditAny(EcIdentityManager.default.getMyPks())) {
                return false;
            }
            return true;
        },
        loggedOnPerson: function() {
            return this.$store.getters['user/loggedOnPerson'];
        },
        objectType: function() {
            if (this.resource) {
                return 'resource';
            }
            if (this.directory) {
                return 'directory';
            }
            return this.$store.getters['editor/conceptMode'] ? 'concept scheme' : 'framework';
        },
        shareEnabled: function() {
            if (this.resource) {
                return false;
            }
            return this.$store.state.featuresEnabled.shareEnabled;
        },
        userManagementEnabled: function() {
            return this.$store.state.featuresEnabled.userManagementEnabled;
        },
        objFromListItemInfo: function() {
            return this.$store.getters['app/objForShareModal'];
        }
    },
    mounted: async function() {
        if (this.objFromListItemInfo && this.objFromListItemInfo.encryptedType) {
            let type = "Ec" + this.object.encryptedType;
            let obj = new window[type]();
            obj.copyFrom(await EcEncryptedValue.fromEncryptedValue(this.object));
            this.$store.commit('app/objForShareModal', obj);
        }
        this.getCurrentOwnersAndReaders(true);
        this.checkIsPrivate();
    },
    methods: {
        handlePrivateClick: function() {
            if (!this.privateFramework) {
                this.confirmMakePrivate = true;
            }
        },
        handlePublicClick: function() {
            if (this.privateFramework) {
                this.confirmMakePublic = true;
            }
        },
        checkIsPrivate: function() {
            let obj = this.directory ? this.directory : (this.resource ? this.resource : this.framework);
            delete EcRepository.cache[obj.shortId()];
            let me = this;
            EcRepository.get(obj.shortId(), function(success) {
                if (success.type === "EncryptedValue") {
                    me.privateFramework = true;
                    me.viewOptions[1].disabled = false;
                    me.viewOptions[1].title = null;
                    me.cantRemoveCurrentUserAsOwner = true;
                } else {
                    me.privateFramework = false;
                    me.viewOptions[1].disabled = true;
                    me.viewOptions[1].title = 'Make the ' + me.objectType + ' private to add users/groups with view access';
                    if (me.ownerCount < 2) {
                        me.cantRemoveCurrentUserAsOwner = false;
                    }
                }
            }, function(failure) {
                appError(failure);
            });
        },
        closeAutoComplete: function() {
            this.isOpenAutocomplete = false;
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
        getEachOwner: function(ownerPem) {
            var pk = EcPk.fromPem(ownerPem);
            let me = this;
            EcPerson.getByPk(window.repo, pk, function(success) {
                appLog(success);
                if (success) {
                    let currentUser = false;
                    if (me.loggedOnPerson.shortId() === success.shortId()) {
                        currentUser = true;
                        me.userIsOwner = true;
                    }
                    var user = {header: success.name, email: success.email, view: "admin", id: success.shortId(), changed: false, pk: pk, currentUser: currentUser};
                    // don't add user if already in array
                    if ((me.users.filter(each => each.id === user.id)).length === 0) {
                        me.users.push(user);
                        me.ownerCount++;
                    }
                }
            }, function(failure) {
                // If it's not a Person, check organizations
                me.getOrganizationByEcPk(pk, function(success) {
                    appLog(success);
                    if (success) {
                        let ownerFingerprint = pk.fingerprint();
                        let currentUser = false;
                        for (let each in EcIdentityManager.default.ids) {
                            let idFingerprint = EcIdentityManager.default.ids[each].ppk.toPk().fingerprint();
                            if (ownerFingerprint.equals(idFingerprint)) {
                                currentUser = true;
                                me.numGroupsAsOwner++;
                            }
                        }
                        var org = {header: success.name, view: "admin", id: success.shortId(), changed: false, pk: pk, currentUser: currentUser};
                        if ((me.groups.filter(each => each.id === org.id)).length === 0) {
                            me.groups.push(org);
                            me.ownerCount++;
                        }
                    }
                }, function(error) {
                    appError(error);
                });
            });
        },
        getEachReader: function(readerPem) {
            let me = this;
            var pk = EcPk.fromPem(readerPem);
            EcPerson.getByPk(window.repo, pk, function(success) {
                appLog(success);
                if (success) {
                    var user = {header: success.name, email: success.email, view: "view", id: success.shortId(), changed: false, pk: pk};
                    if ((me.users.filter(each => each.id === user.id)).length === 0) {
                        me.users.push(user);
                    }
                }
            }, function(failure) {
                // If it's not a Person, check organizations
                me.getOrganizationByEcPk(pk, function(success) {
                    appLog(success);
                    if (success) {
                        var org = {header: success.name, view: "view", id: success.shortId(), changed: false, pk: pk};
                        if ((me.groups.filter(each => each.id === org.id)).length === 0) {
                            me.groups.push(org);
                        }
                    }
                }, function(error) {
                    appError(error);
                });
            });
        },
        getCurrentOwnersAndReaders: function(getPossibleAfter) {
            var me = this;
            me.numGroupsAsOwner = 0;
            me.userIsOwner = false;
            let obj = this.directory ? this.directory : (this.resource ? this.resource : this.framework);
            if (obj.owner) {
                for (var i = 0; i < obj.owner.length; i++) {
                    this.getEachOwner(obj.owner[i]);
                }
            }
            if (obj.reader) {
                this.cantRemoveCurrentUserAsOwner = true;
                for (var i = 0; i < obj.reader.length; i++) {
                    this.getEachReader(obj.reader[i]);
                }
            }
            if (getPossibleAfter) {
                // May not need timeout after 'Cannot add a Reader if you don't know the secret' issue is resolved
                setTimeout(() => {
                    this.getPossibleOwnersAndReaders();
                }, 4000);
            }
        },
        getPossibleOwnersAndReaders: function() {
            let paramObj = {};
            paramObj.size = 10000;
            let me = this;
            EcPerson.search(window.repo, '', function(success) {
                appLog(success);
                for (var i = 0; i < success.length; i++) {
                    let person = {id: success[i].shortId(), name: success[i].name, email: success[i].email, pk: me.getPersonEcPk(success[i])};
                    me.possibleGroupsAndUsers.push(person);
                }
            }, function(failure) {
                appError(failure);
            }, paramObj);
            EcOrganization.search(window.repo, '', async function(success) {
                appLog(success);
                for (var i = 0; i < success.length; i++) {
                    let pk = await me.getOrganizationEcPk(success[i]);
                    if (pk) {
                        let org = {id: success[i].shortId(), name: success[i].name, pk: pk};
                        me.possibleGroupsAndUsers.push(org);
                    }
                }
            }, function(failure) {
                appError(failure);
            }, paramObj);
        },
        filterResults: function() {
            this.isOpenAutocomplete = true;
            this.filtered = this.possibleGroupsAndUsers.filter(item => item.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1);
        },
        selectUserOrGroup: function(nameAndId) {
            this.userOrGroupToAdd = nameAndId;
            this.search = nameAndId.name;
            this.isOpenAutocomplete = false;
        },
        saveSettings: function() {
            this.populateAddAndRemoveArrays();
            this.addAndRemoveFromAllObjects();
        },
        populateAddAndRemoveArrays: function() {
            this.isProcessing = true;
            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].changed) {
                    if (this.users[i].view === "view") {
                        this.removeOwner.push(this.users[i].pk);
                        this.addReader.push(this.users[i].pk);
                    } else if (this.users[i].view === "admin") {
                        this.removeReader.push(this.users[i].pk);
                        this.addOwner.push(this.users[i].pk);
                    }
                }
            }
            for (let i = 0; i < this.groups.length; i++) {
                if (this.groups[i].changed) {
                    if (this.groups[i].view === "view") {
                        this.removeOwner.push(this.groups[i].pk);
                        this.addReader.push(this.groups[i].pk);
                    } else if (this.groups[i].view === "admin") {
                        this.removeReader.push(this.groups[i].pk);
                        this.addOwner.push(this.groups[i].pk);
                    }
                }
            }
            if (this.userOrGroupToAdd) {
                if (this.selectViewOrAdmin === "view") {
                    this.addReader.push(this.userOrGroupToAdd.pk);
                } else if (this.selectViewOrAdmin === "admin") {
                    this.addOwner.push(this.userOrGroupToAdd.pk);
                }
            }
            // Make sure current user is added as an owner if a reader is being added, otherwise framework could become uneditable
            if (this.addReader.length > 0) {
                this.addOwner.push(EcIdentityManager.default.ids[0].ppk.toPk());
            }
        },
        multiput: function(toSave, callback) {
            let me = this;
            this.frameworksToProcess--;
            if (this.frameworksToProcess <= 0) {
                this.repo.multiput(toSave, function(success) {
                    me.resetVariables();
                    me.confirmMakePublic = false;
                    if (!me.confirmMakePrivate) {
                        me.getCurrentOwnersAndReaders();
                    }
                    me.confirmMakePrivate = false;
                    if (callback) {
                        callback();
                    }
                }, appError);
            }
        },
        addAndRemoveFromAllObjects: function() {
            if (this.resource) {
                return this.addAndRemoveFromResource(this.resource);
            }
            if (this.directory) {
                return this.addAndRemoveFromAllDirectoryObjects(this.directory);
            }
            if (this.$store.getters['editor/conceptMode'] === true) {
                return this.addAndRemoveFromAllConceptObjects();
            }
            return this.addAndRemoveFromAllFrameworkObjects(this.framework);
        },
        addAndRemoveFromAllDirectoryObjects: function(directory) {
            let me = this;
            for (let i = 0; i < me.removeReader.length; i++) {
                directory.removeReader(me.removeReader[i]);
            }
            for (let i = 0; i < me.removeOwner.length; i++) {
                directory.removeOwner(me.removeOwner[i]);
            }
            for (let i = 0; i < me.addReader.length; i++) {
                directory.addReader(me.addReader[i]);
            }
            for (let i = 0; i < me.addOwner.length; i++) {
                directory.addOwner(me.addOwner[i]);
            }
            me.toSave.push(directory);
            this.repo.search("(directory:\"" + directory.shortId() + "\" OR parentDirectory:\"" + directory.shortId() + "\")", function() {}, function(success) {
                me.frameworksToProcess += success.length;
                new EcAsyncHelper().each(success, function(obj, done) {
                    if (obj.type === 'Framework' || obj.encryptedType === "Framework") {
                        me.addAndRemoveFromAllFrameworkObjects(obj);
                    } else if (obj.type === 'CreativeWork' || obj.encryptedType === "CreativeWork") {
                        me.addAndRemoveFromResource(obj);
                    } else if (obj.type === 'Directory' || obj.encryptedType === "Directory") {
                        me.frameworksToProcess--;
                        me.addAndRemoveFromAllDirectoryObjects(obj);
                    }
                    done();
                }, function(ids) {
                    if (ids.length === 0) {
                        me.multiput(me.toSave);
                    }
                });
            }, appError);
        },
        addAndRemoveFromResource: function(resource) {
            for (let i = 0; i < this.removeReader.length; i++) {
                resource.removeReader(this.removeReader[i]);
            }
            for (let i = 0; i < this.removeOwner.length; i++) {
                resource.removeOwner(this.removeOwner[i]);
            }
            for (let i = 0; i < this.addReader.length; i++) {
                resource.addReader(this.addReader[i]);
            }
            for (let i = 0; i < this.addOwner.length; i++) {
                resource.addOwner(this.addOwner[i]);
            }
            this.toSave.push(resource);
            this.multiput(this.toSave);
        },
        addAndRemoveFromAllFrameworkObjects: function(framework, passedInToSave) {
            let me = this;
            if (framework.competency && framework.competency.length > 0) {
                new EcAsyncHelper().each(framework.competency, function(competencyId, done) {
                    EcCompetency.get(competencyId, function(c) {
                        for (let i = 0; i < me.removeReader.length; i++) {
                            c.removeReader(me.removeReader[i]);
                        }
                        for (let i = 0; i < me.removeOwner.length; i++) {
                            c.removeOwner(me.removeOwner[i]);
                        }
                        for (let i = 0; i < me.addReader.length; i++) {
                            c.addReader(me.addReader[i]);
                        }
                        for (let i = 0; i < me.addOwner.length; i++) {
                            c.addOwner(me.addOwner[i]);
                        }
                        me.toSave.push(c);
                        done();
                    }, done);
                }, function(competencyIds) {
                    if (framework.relation && framework.relation.length > 0) {
                        new EcAsyncHelper().each(framework.relation, function(relationId, done) {
                            EcAlignment.get(relationId, function(r) {
                                for (let i = 0; i < me.removeReader.length; i++) {
                                    r.removeReader(me.removeReader[i]);
                                }
                                for (let i = 0; i < me.removeOwner.length; i++) {
                                    r.removeOwner(me.removeOwner[i]);
                                }
                                for (let i = 0; i < me.addReader.length; i++) {
                                    r.addReader(me.addReader[i]);
                                }
                                for (let i = 0; i < me.addOwner.length; i++) {
                                    r.addOwner(me.addOwner[i]);
                                }
                                me.toSave.push(r);
                                done();
                            }, done);
                        }, function(relationIds) {
                            me.addAndRemoveFromFrameworkObject(framework);
                        });
                    } else {
                        me.addAndRemoveFromFrameworkObject(framework);
                    }
                });
            } else {
                me.addAndRemoveFromFrameworkObject(framework);
            }
        },
        addAndRemoveFromFrameworkObject: function(f) {
            let me = this;
            for (let i = 0; i < me.removeReader.length; i++) {
                f.removeReader(me.removeReader[i]);
            }
            for (let i = 0; i < me.removeOwner.length; i++) {
                f.removeOwner(me.removeOwner[i]);
            }
            for (let i = 0; i < me.addReader.length; i++) {
                f.addReader(me.addReader[i]);
            }
            for (let i = 0; i < me.addOwner.length; i++) {
                f.addOwner(me.addOwner[i]);
            }
            me.toSave.push(f);
            me.multiput(me.toSave, function() {
                if (me.framework) {
                    me.$store.commit('editor/framework', f);
                }
            }, function() {});
        },
        addAndRemoveFromAllConceptObjects: function() {
            if (this.framework["skos:hasTopConcept"]) {
                this.addAndRemoveFromConceptArray(this.framework["skos:hasTopConcept"]);
            }
        },
        addAndRemoveFromConceptArray(concepts) {
            this.conceptsToProcess += concepts.length;
            var me = this;
            new EcAsyncHelper().each(concepts, function(conceptId, done) {
                EcConcept.get(conceptId, function(c) {
                    for (let i = 0; i < me.removeReader.length; i++) {
                        c.removeReader(me.removeReader[i]);
                    }
                    for (let i = 0; i < me.removeOwner.length; i++) {
                        c.removeOwner(me.removeOwner[i]);
                    }
                    for (let i = 0; i < me.addReader.length; i++) {
                        c.addReader(me.addReader[i]);
                    }
                    for (let i = 0; i < me.addOwner.length; i++) {
                        c.addOwner(me.addOwner[i]);
                    }
                    if (c["skos:narrower"]) {
                        me.addAndRemoveFromConceptArray(c["skos:narrower"]);
                    }
                    me.conceptsProcessed++;
                    me.toSave.push(c);
                    done();
                }, done);
            }, function() {});
        },
        removeOwnerOrReader: function(userOrGroup, type) {
            if (type === 'user') {
                if (this.cantRemoveCurrentUserAsOwner && userOrGroup.currentUser && !this.numGroupsAsOwner) {
                    return;
                }
            } else if (type === 'group') {
                if (userOrGroup.currentUser && this.numGroupsAsOwner === 1 && userOrGroup.view === 'admin' && this.cantRemoveCurrentUserAsOwner && !this.userIsOwner) {
                    return;
                }
            }
            if (userOrGroup.view === "view") {
                this.removeReader.push(userOrGroup.pk);
            } else if (userOrGroup.view === "admin") {
                this.removeOwner.push(userOrGroup.pk);
            }
            this.saveSettings();
        },
        resetVariables: function() {
            var me = this;
            me.users.splice(0, me.users.length);
            me.groups.splice(0, me.groups.length);
            me.removeOwner.splice(0, me.removeOwner.length);
            me.removeReader.splice(0, me.removeReader.length);
            me.addOwner.splice(0, me.addOwner.length);
            me.addReader.splice(0, me.addReader.length);
            me.userOrGroupToAdd = null;
            me.search = "";
            me.conceptsProcessed = 0;
            me.conceptsToProcess = 0;
            me.isProcessing = false;
            if (!me.privateFramework) {
                me.cantRemoveCurrentUserAsOwner = false;
            }
            me.ownerCount = 0;
            me.selectViewOrAdmin = 'admin';
            me.toSave.splice(0, me.toSave.length);
            me.decryptingConcepts = false;
        },
        makePrivate: function() {
            this.isProcessing = true;
            var framework = this.framework;
            this.$store.commit('editor/private', true);
            if (this.resource) {
                return this.handleMakePrivateResource(this.resource);
            }
            if (this.directory) {
                return this.handleMakePrivateDirectory(this.directory);
            }
            if (this.$store.getters['editor/conceptMode'] === true) {
                this.handleMakePrivateConceptScheme();
            } else {
                this.handleMakePrivateFramework(framework);
            }
        },
        handleMakePrivateDirectory: function(directory) {
            let me = this;
            if (directory.canEditAny(EcIdentityManager.default.getMyPks())) {
                if (!directory.owner) {
                    directory.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
                }
                if (this.directory.shortId() === directory.shortId()) {
                    // Make sure new owner gets into store
                    this.$store.commit('app/selectDirectory', directory);
                }
                directory["schema:dateModified"] = new Date().toISOString();
                EcEncryptedValue.toEncryptedValue(directory, false, function(edirectory) {
                    me.toSave.push(edirectory);
                    me.repo.search("(directory:\"" + directory.shortId() + "\" OR parentDirectory:\"" + directory.shortId() + "\")", function() {}, function(success) {
                        me.frameworksToProcess += success.length;
                        new EcAsyncHelper().each(success, function(obj, done) {
                            if (obj.type === 'Framework') {
                                me.handleMakePrivateFramework(obj);
                            } else if (obj.type === 'CreativeWork') {
                                me.handleMakePrivateResource(obj);
                            } else if (obj.type === 'Directory') {
                                me.frameworksToProcess--;
                                me.handleMakePrivateDirectory(obj);
                            } else {
                                me.frameworksToProcess--;
                            }
                            done();
                        }, function(ids) {
                            if (ids.length === 0) {
                                me.multiput(me.toSave);
                            }
                        });
                    }, appError);
                }, appError);
            }
        },
        handleMakePrivateResource: function(resource) {
            let me = this;
            if (resource.canEditAny(EcIdentityManager.default.getMyPks())) {
                if (!resource.owner) {
                    resource.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
                }
                if (this.resource) {
                    this.$store.commit('app/objForShareModal', resource);
                }
                resource["schema:dateModified"] = new Date().toISOString();
                EcEncryptedValue.toEncryptedValue(resource, false, function(eresource) {
                    me.toSave.push(eresource);
                    me.multiput(me.toSave);
                }, appError);
            }
        },
        handleMakePrivateFramework: function(framework) {
            let me = this;
            if (framework.competency && framework.competency.length > 0) {
                new EcAsyncHelper().each(framework.competency, function(competencyId, done) {
                    EcCompetency.get(competencyId, function(c) {
                        if (c.canEditAny(EcIdentityManager.default.getMyPks())) {
                            if (!c.owner) {
                                c.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
                            }
                            c["schema:dateModified"] = new Date().toISOString();
                            EcEncryptedValue.toEncryptedValue(c, false, function(ec) {
                                me.toSave.push(ec);
                                done();
                            }, done);
                        } else {
                            done();
                        }
                    }, done);
                }, function(competencyIds) {
                    if (framework.relation && framework.relation.length > 0) {
                        new EcAsyncHelper().each(framework.relation, function(relationId, done) {
                            EcAlignment.get(relationId, function(r) {
                                if (!r.owner) {
                                    r.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
                                }
                                EcEncryptedValue.toEncryptedValue(r, false, function(er) {
                                    me.toSave.push(er);
                                    done();
                                }, done);
                            }, done);
                        }, function(relationIds) {
                            me.encryptFramework(framework);
                        });
                    } else {
                        me.encryptFramework(framework);
                    }
                });
            } else {
                me.encryptFramework(framework);
            }
        },
        makePublic: function() {
            this.isProcessing = true;
            var framework = this.framework;
            this.$store.commit('editor/private', false);
            if (this.resource) {
                return this.handleMakePublicResource(this.resource);
            }
            if (this.directory) {
                return this.handleMakePublicDirectory(this.directory);
            }
            if (this.$store.getters['editor/conceptMode'] === true) {
                this.handleMakePublicConceptScheme();
            } else {
                this.handleMakePublicFramework(framework);
            }
        },
        handleMakePublicDirectory: async function(directory) {
            let me = this;
            let d = new EcDirectory();
            d.copyFrom(await EcEncryptedValue.fromEncryptedValue(directory));
            d["schema:dateModified"] = new Date().toISOString();
            delete d.reader;
            EcEncryptedValue.encryptOnSave(d.id, false);
            me.toSave.push(d);
            if (this.directory.shortId() === d.shortId()) {
                this.$store.commit('app/selectDirectory', d);
            }
            this.repo.search("(directory:\"" + directory.shortId() + "\" OR parentDirectory:\"" + directory.shortId() + "\")", function() {}, function(success) {
                me.frameworksToProcess += success.length;
                new EcAsyncHelper().each(success, function(obj, done) {
                    if (obj.type === 'Framework' || obj.encryptedType === 'Framework') {
                        me.handleMakePublicFramework(obj);
                    } else if (obj.type === 'CreativeWork' || obj.encryptedType === 'CreativeWork') {
                        me.handleMakePublicResource(obj);
                    } else if (obj.type === 'Directory' || obj.encryptedType === 'Directory') {
                        me.frameworksToProcess--;
                        me.handleMakePublicDirectory(obj);
                    }
                    done();
                }, function(ids) {
                    if (ids.length === 0) {
                        me.multiput(me.toSave);
                    }
                });
            }, appError);
        },
        handleMakePublicResource: async function(resource) {
            let cw = new schema.CreativeWork();
            cw.copyFrom(await EcEncryptedValue.fromEncryptedValue(resource));
            cw["schema:dateModified"] = new Date().toISOString();
            delete cw.reader;
            EcEncryptedValue.encryptOnSave(cw.id, false);
            this.toSave.push(cw);
            if (this.resource) {
                this.$store.commit('app/objForShareModal', cw);
            }
            this.multiput(this.toSave);
        },
        handleMakePublicFramework: async function(framework) {
            let me = this;
            let f = new EcFramework();
            f.copyFrom(await EcEncryptedValue.fromEncryptedValue(framework));
            f["schema:dateModified"] = new Date().toISOString();
            delete f.reader;
            EcEncryptedValue.encryptOnSave(f.id, false);
            me.toSave.push(f);
            if (this.framework) {
                me.$store.commit('editor/framework', f);
            }
            framework = f;
            if (framework.competency && framework.competency.length > 0) {
                new EcAsyncHelper().each(framework.competency, function(competencyId, done) {
                    EcRepository.get(competencyId, async function(c) {
                        if (c.canEditAny(EcIdentityManager.default.getMyPks())) {
                            let d = new EcCompetency();
                            d.copyFrom(await EcEncryptedValue.fromEncryptedValue(c));
                            d["schema:dateModified"] = new Date().toISOString();
                            delete d.reader;
                            EcEncryptedValue.encryptOnSave(d.id, false);
                            me.toSave.push(d);
                            done();
                        } else {
                            done();
                        }
                    }, done);
                }, function(competencyIds) {
                    if (framework.relation && framework.relation.length > 0) {
                        new EcAsyncHelper().each(framework.relation, function(relationId, done) {
                            EcRepository.get(relationId, async function(r) {
                                let d = new EcAlignment();
                                d.copyFrom(await EcEncryptedValue.fromEncryptedValue(r));
                                delete d.reader;
                                EcEncryptedValue.encryptOnSave(d.id, false);
                                me.toSave.push(d);
                                done();
                            }, done);
                        }, function(relationIds) {
                            me.finishedMakingPublic();
                        });
                    } else {
                        me.finishedMakingPublic();
                    }
                });
            } else {
                me.finishedMakingPublic();
            }
        },
        finishedMakingPublic: function() {
            let me = this;
            this.multiput(this.toSave, function() {
                if (me.framework) {
                    me.confirmMakePublic = false;
                    me.isProcessing = false;
                    me.resetVariables();
                    me.getCurrentOwnersAndReaders();
                }
            });
        },
        encryptFramework: function(framework) {
            var me = this;
            var f = new EcFramework();
            f.copyFrom(framework);
            if (!f.owner) {
                f.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
            }
            if (this.framework) {
                // Make sure new owner gets into store
                this.$store.commit('editor/framework', f);
            }
            f["schema:dateModified"] = new Date().toISOString();
            EcEncryptedValue.toEncryptedValue(f, false, function(ef) {
                me.toSave.push(ef);
                me.multiput(me.toSave, function() {
                    if (me.framework) {
                        me.confirmMakePrivate = false;
                        me.cantRemoveCurrentUserAsOwner = true;
                        me.isProcessing = false;
                        me.toSave.splice(0, me.toSave.length);
                    }
                });
            }, appError);
        },
        handleMakePrivateConceptScheme: async function() {
            var me = this;
            var framework = this.framework;
            var cs = new EcConceptScheme();
            cs.copyFrom(framework);
            if (!cs.owner) {
                cs.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
            }
            this.$store.commit('editor/framework', cs);
            var name = cs["dcterms:title"];
            cs["schema:dateModified"] = new Date().toISOString();
            cs = await EcEncryptedValue.toEncryptedValue(cs);
            cs["dcterms:title"] = name;
            this.toSave.push(cs);
            if (framework["skos:hasTopConcept"]) {
                this.encryptConcepts(framework);
            } else {
                this.repo.multiput(this.toSave, function() {
                    me.confirmMakePrivate = false;
                    me.isProcessing = false;
                    me.toSave.splice(0, me.toSave.length);
                }, appError);
            }
        },
        handleMakePublicConceptScheme: async function() {
            var me = this;
            var framework = this.framework;
            var cs = new EcConceptScheme();
            cs.copyFrom(await EcEncryptedValue.fromEncryptedValue(framework));
            delete cs.reader;
            EcEncryptedValue.encryptOnSave(cs.id, false);
            cs["schema:dateModified"] = new Date().toISOString();
            me.decryptingConcepts = true;
            me.toSave.push(cs);
            me.$store.commit('editor/framework', cs);
            if (cs["skos:hasTopConcept"]) {
                me.decryptConcepts(cs);
            } else {
                me.finishedMakingPublic();
            }
        },
        encryptConcepts: function(c) {
            var me = this;
            var concepts = c["skos:hasTopConcept"] ? c["skos:hasTopConcept"] : c["skos:narrower"];
            new EcAsyncHelper().each(concepts, function(conceptId, done) {
                EcRepository.get(conceptId, async function(concept) {
                    if (!concept.owner) {
                        concept.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
                    }
                    concept["schema:dateModified"] = new Date().toISOString();
                    if (concept["skos:narrower"] && concept["skos:narrower"].length > 0) {
                        me.encryptConcepts(concept);
                    }
                    if (EcEncryptedValue.encryptOnSaveMap[concept.id] !== true) {
                        concept = await EcEncryptedValue.toEncryptedValue(concept);
                    }
                    me.toSave.push(concept);
                    done();
                }, done);
            }, function(conceptIds) {
                me.repo.multiput(me.toSave, function() {
                    me.confirmMakePrivate = false;
                    me.isProcessing = false;
                    me.toSave.splice(0, me.toSave.length);
                }, appError);
            });
        },
        decryptConcepts: function(c) {
            var me = this;
            var concepts = c["skos:hasTopConcept"] ? c["skos:hasTopConcept"] : c["skos:narrower"];
            me.conceptsToProcess += concepts.length;
            new EcAsyncHelper().each(concepts, function(conceptId, done) {
                EcRepository.get(conceptId, async function(concept) {
                    let c = new EcConcept();
                    c.copyFrom(await EcEncryptedValue.fromEncryptedValue(concept));
                    delete c.reader;
                    EcEncryptedValue.encryptOnSave(c.id, false);
                    if (c["skos:narrower"]) {
                        me.decryptConcepts(c);
                    }
                    c["schema:dateModified"] = new Date().toISOString();
                    me.conceptsProcessed++;
                    me.toSave.push(c);
                    done();
                }, done);
            }, function(conceptIds) {
            });
        },
        makeCurrentUserAnOwner: function() {
            this.isProcessing = true;
            if (this.resource) {
                return this.makeCurrentUserResourceOwner(this.resource);
            }
            if (this.directory) {
                return this.makeCurrentUserDirectoryOwner(this.directory);
            }
            if (this.$store.getters['editor/conceptMode'] === true) {
                return this.makeCurrentUserAnOwnerForConceptObjects();
            }
            this.makeCurrentUserFrameworkAndSubObjectOwner(this.framework);
        },
        makeCurrentUserDirectoryOwner: function(directory) {
            let me = this;
            directory.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
            me.toSave.push(directory);
            if (this.directory.shortId() === directory.shortId()) {
                this.$store.commit('app/selectDirectory', directory);
            }
            this.repo.search("(directory:\"" + directory.shortId() + "\" OR parentDirectory:\"" + directory.shortId() + "\")", function() {}, function(success) {
                me.frameworksToProcess += success.length;
                new EcAsyncHelper().each(success, function(obj, done) {
                    if (obj.type === 'Framework' || obj.encryptedType === "Framework") {
                        me.makeCurrentUserFrameworkAndSubObjectOwner(obj);
                    } else if (obj.type === 'CreativeWork' || obj.encryptedType === "CreativeWork") {
                        me.makeCurrentUserResourceOwner(obj);
                    } else if (obj.type === 'Directory' || obj.encryptedType === "Directory") {
                        me.frameworksToProcess--;
                        me.makeCurrentUserDirectoryOwner(obj);
                    }
                    done();
                }, function(ids) {
                    if (ids.length === 0) {
                        me.multiput(me.toSave);
                    }
                });
            }, appError);
        },
        makeCurrentUserResourceOwner: function(resource) {
            resource.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
            this.toSave.push(resource);
            this.multiput(this.toSave);
        },
        makeCurrentUserFrameworkAndSubObjectOwner: function(framework) {
            let me = this;
            if (framework.competency && framework.competency.length > 0) {
                new EcAsyncHelper().each(framework.competency, function(competencyId, done) {
                    EcCompetency.get(competencyId, function(c) {
                        c.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
                        me.toSave.push(c);
                        done();
                    }, done);
                }, function(competencyIds) {
                    if (framework.relation && framework.relation.length > 0) {
                        new EcAsyncHelper().each(framework.relation, function(relationId, done) {
                            EcAlignment.get(relationId, function(r) {
                                r.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
                                me.toSave.push(r);
                                done();
                            }, done);
                        }, function(relationIds) {
                            me.makeCurrentUserFrameworkOwner(framework);
                        });
                    } else {
                        me.makeCurrentUserFrameworkOwner(framework);
                    }
                });
            } else {
                me.makeCurrentUserFrameworkOwner(framework);
            }
        },
        makeCurrentUserFrameworkOwner: function(framework) {
            let f = framework;
            let me = this;
            f.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
            me.toSave.push(f);
            me.multiput(me.toSave, function() {
                if (me.framework) {
                    me.$store.commit('editor/framework', f);
                }
            }, function() {});
        },
        makeCurrentUserAnOwnerForConceptObjects: function() {
            if (this.framework["skos:hasTopConcept"]) {
                this.makeCurrentUserAnOwnerForConcepts(this.framework["skos:hasTopConcept"]);
            }
        },
        makeCurrentUserAnOwnerForConcepts: function(concepts) {
            this.conceptsToProcess += concepts.length;
            var me = this;
            new EcAsyncHelper().each(concepts, function(conceptId, done) {
                EcConcept.get(conceptId, function(c) {
                    c.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
                    if (c["skos:narrower"]) {
                        me.makeCurrentUserAnOwnerForConcepts(c["skos:narrower"]);
                    }
                    me.conceptsProcessed++;
                    me.toSave.push(c);
                    done();
                }, done);
            }, function() {});
        }
    },
    watch: {
        conceptsProcessed: function() {
            if (this.conceptsToProcess && this.conceptsProcessed === this.conceptsToProcess) {
                if (this.decryptingConcepts === true) {
                    this.finishedMakingPublic();
                } else {
                    if (this.ownerCount > 0) {
                        this.addAndRemoveFromFrameworkObject(this.framework);
                    } else {
                        this.makeCurrentUserFrameworkOwner(this.framework);
                    }
                }
            }
        },
        confirmMakePublic: function() {
            this.checkIsPrivate();
        },
        confirmMakePrivate: function() {
            this.checkIsPrivate();
            this.resetVariables();
            this.getCurrentOwnersAndReaders();
        },
        ownerCount: function() {
            if (this.ownerCount > 1) {
                this.cantRemoveCurrentUserAsOwner = true;
            }
        }
    }
};
</script>


<style lang="scss">
    @import '@/scss/variables.scss';
.share-url {
    overflow-wrap: anywhere;
    font-size: .8rem;
    line-height: 1rem;
}

.control.auto-complete__control {
  input {
    height: 37px;
    transform: translateX(0);
    outline: 0;
    box-shadow: none;
  }
  .auto {
    position: absolute;
    min-height: 0px;
    max-height: 120px;
    border-radius: 0rem 0rem 0.5rem 0.5rem;
    border-right: solid 1px rgba($primary, 0.5);
    border-bottom: solid 1px rgba($primary, 0.5);
    border-left: solid 1px rgba($primary, 0.5);
    width: 100%;
    background-color: white;
    overflow: scroll;
    ul {
      li {
        padding: 0.25rem;
      }
      li:hover {
        padding: 0.25rem;
        background-color: $light;
      }
    }
  }
}
</style>