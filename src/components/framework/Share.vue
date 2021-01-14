<template>
    <div class="modal-card">
        <header class="modal-card-head has-background-primary">
            <p class="modal-card-title">
                <span class="title has-text-white">Share {{ conceptOrFramework }}</span>
                <br><span class="subtitle has-text-white has-text-weight-medium">
                    Sharing settings for {{ frameworkName }} {{ conceptOrFramework }}
                </span>
            </p>
            <button
                class="delete"
                @click="$store.commit('app/closeModal')"
                aria-label="close" />
        </header>
        <section
            v-if="isProcessing"
            class="modal-card-body">
            <h2 class="header has-text-centered">
                Processing request...
            </h2>
            <div class="section has-background-white has-text-centered">
                <span class="icon is-large">
                    <i class="fa fa-spinner fa-2x fa-pulse" />
                </span>
            </div>
        </section>
        <!-- confirm make private -->
        <section
            v-else-if="confirmMakePrivate"
            class="modal-card-body">
            <h2 class="header is-size-3">
                Confirm make private
            </h2>
            <p>
                Making this {{ conceptOrFramework }} private means only those users/groups in
                your access list will have the ability to read, write, or edit this {{ conceptOrFramework }}.
            </p>
        </section>
        <!-- confirm make public -->
        <section
            v-else-if="confirmMakePublic"
            class="modal-card-body">
            <h2 class="header is-size-3">
                Confirm make public
            </h2>
            <p>
                Making this {{ conceptOrFramework }} public means anyone with a link can access and read this {{ conceptOrFramework }}.
                Only those with admin access will be able to edit or delete the {{ conceptOrFramework }}.
            </p>
        </section>
        <section
            v-else-if="!confirmMakePublic && !confirmMakePrivate"
            class="modal-card-body">
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
                    To add users or groups or to make your {{ conceptOrFramework }} private, first add yourself as an owner.
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
                                            @click="removeOwnerOrReader(group, 'group')">
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
                                            :disabled="cantRemoveCurrentUserAsOwner && user.currentUser">
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
        </section>
        <footer class="modal-card-foot has-background-light">
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
        </footer>
    </div>
</template>

<script>
import {cassUtil} from '@/mixins/cassUtil.js';
export default {
    name: 'ShareModal',
    props: {
        isActive: Boolean
    },
    mixins: [ cassUtil ],
    data() {
        return {
            isProcessing: false,
            confirmMakePrivate: false,
            confirmMakePublic: false,
            clipStatus: 'ready',
            frameworkId: this.$store.state.editor.framework.shortId(),
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
            toSave: []
        };
    },
    computed: {
        loggedIn: function() {
            if (EcIdentityManager.ids && EcIdentityManager.ids.length > 0) {
                return true;
            }
            return false;
        },
        shareableFrameworkInEditor: function() {
            if (this.$store.getters['editor/conceptMode'] === true) {
                return window.location.href.replace('/conceptScheme', "?concepts=true&frameworkId=" + this.frameworkId);
            }
            return window.location.href.replace('/framework', "?frameworkId=" + this.frameworkId);
        },
        framework: function() {
            return this.$store.state.editor.framework;
        },
        frameworkName: function() {
            if (this.framework.name) {
                return this.framework.getName();
            } else {
                return Thing.getDisplayStringFrom(this.framework["dcterms:title"]);
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
            } else if (!this.framework.canEditAny(EcIdentityManager.getMyPks())) {
                return false;
            }
            return true;
        },
        loggedOnPerson: function() {
            return this.$store.getters['user/loggedOnPerson'];
        },
        conceptOrFramework: function() {
            return this.$store.getters['editor/conceptMode'] ? 'concept scheme' : 'framework';
        },
        shareEnabled: function() {
            return this.$store.state.featuresEnabled.shareEnabled;
        },
        userManagementEnabled: function() {
            return this.$store.state.featuresEnabled.userManagementEnabled;
        }
    },
    mounted: function() {
        this.getCurrentOwnersAndReaders();
        this.getPossibleOwnersAndReaders();
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
            delete EcRepository.cache[this.framework.shortId()];
            if (EcRepository.getBlocking(this.framework.shortId())) {
                if (EcRepository.getBlocking(this.framework.shortId()).type === "EncryptedValue") {
                    this.privateFramework = true;
                    this.viewOptions[1].disabled = false;
                    this.viewOptions[1].title = null;
                    this.cantRemoveCurrentUserAsOwner = true;
                } else {
                    this.privateFramework = false;
                    this.viewOptions[1].disabled = true;
                    this.viewOptions[1].title = 'Make the ' + this.conceptOrFramework + ' private to add users/groups with view access';
                    if (this.ownerCount < 2) {
                        this.cantRemoveCurrentUserAsOwner = false;
                    }
                }
            }
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
            this.slipStatus = 'error';
            setTimeout(() => {
                this.clipStatus = 'ready';
            }, 1000);
        },
        getCurrentOwnersAndReaders: function() {
            var me = this;
            if (this.framework.owner) {
                for (var i = 0; i < this.framework.owner.length; i++) {
                    var pk = EcPk.fromPem(this.framework.owner[i]);
                    EcPerson.getByPk(window.repo, pk, function(success) {
                        appLog(success);
                        if (success) {
                            let currentUser = false;
                            if (me.loggedOnPerson.shortId() === success.shortId()) {
                                currentUser = true;
                            }
                            var user = {header: success.name, email: success.email, view: "admin", id: success.shortId(), changed: false, pk: pk, currentUser: currentUser};
                            me.users.push(user);
                            me.ownerCount++;
                        }
                    }, function(failure) {
                        // If it's not a Person, check organizations
                        me.getOrganizationByEcPk(pk, function(success) {
                            appLog(success);
                            if (success) {
                                var org = {header: success.name, view: "admin", id: success.shortId(), changed: false, pk: pk};
                                me.groups.push(org);
                                me.ownerCount++;
                            }
                        }, function(error) {
                            appError(error);
                        });
                    });
                }
            }
            if (this.framework.reader) {
                this.cantRemoveCurrentUserAsOwner = true;
                for (var i = 0; i < this.framework.reader.length; i++) {
                    var pk = EcPk.fromPem(this.framework.reader[i]);
                    EcPerson.getByPk(window.repo, pk, function(success) {
                        appLog(success);
                        if (success) {
                            var user = {header: success.name, email: success.email, view: "view", id: success.shortId(), changed: false, pk: pk};
                            me.users.push(user);
                        }
                    }, function(failure) {
                        // If it's not a Person, check organizations
                        me.getOrganizationByEcPk(pk, function(success) {
                            appLog(success);
                            if (success) {
                                var org = {header: success.name, view: "view", id: success.shortId(), changed: false, pk: pk};
                                me.groups.push(org);
                            }
                        }, function(error) {
                            appError(error);
                        });
                    });
                }
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
            EcOrganization.search(window.repo, '', function(success) {
                appLog(success);
                for (var i = 0; i < success.length; i++) {
                    let org = {id: success[i].shortId(), name: success[i].name, pk: me.getOrganizationEcPk(success[i])};
                    me.possibleGroupsAndUsers.push(org);
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
                this.addOwner.push(EcIdentityManager.ids[0].ppk.toPk());
            }
        },
        addAndRemoveFromAllObjects: function() {
            let me = this;
            if (this.$store.getters['editor/conceptMode'] === true) {
                return this.addAndRemoveFromAllConceptObjects();
            }
            if (this.framework.competency && this.framework.competency.length > 0) {
                new EcAsyncHelper().each(this.framework.competency, function(competencyId, done) {
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
                    if (me.framework.relation && me.framework.relation.length > 0) {
                        new EcAsyncHelper().each(me.framework.relation, function(relationId, done) {
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
                            me.addAndRemoveFromFrameworkObject();
                        });
                    } else {
                        me.addAndRemoveFromFrameworkObject();
                    }
                });
            } else {
                me.addAndRemoveFromFrameworkObject();
            }
        },
        addAndRemoveFromFrameworkObject: function() {
            let f = this.framework;
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
            me.repo.multiput(me.toSave, function() {
                me.resetVariables();
                me.$store.commit('editor/framework', f);
                me.getCurrentOwnersAndReaders();
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
            var me = this;
            this.isProcessing = true;
            var framework = this.framework;
            if (this.$store.getters['editor/conceptMode'] === true) {
                this.handleMakePrivateConceptScheme();
            } else {
                this.$store.commit('editor/private', true);
                if (framework.competency && framework.competency.length > 0) {
                    new EcAsyncHelper().each(framework.competency, function(competencyId, done) {
                        EcCompetency.get(competencyId, function(c) {
                            if (c.canEditAny(EcIdentityManager.getMyPks())) {
                                c.addOwner(EcIdentityManager.ids[0].ppk.toPk());
                                c["schema:dateModified"] = new Date().toISOString();
                                EcEncryptedValue.toEncryptedValueAsync(c, false, function(ec) {
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
                                    r.addOwner(EcIdentityManager.ids[0].ppk.toPk());
                                    EcEncryptedValue.toEncryptedValueAsync(r, false, function(er) {
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
            }
        },
        makePublic: function() {
            var me = this;
            this.isProcessing = true;
            var framework = this.framework;
            if (this.$store.getters['editor/conceptMode'] === true) {
                this.handleMakePublicConceptScheme();
            } else {
                this.$store.commit('editor/private', false);
                framework = EcEncryptedValue.toEncryptedValue(framework);
                var f = new EcFramework();
                f.copyFrom(framework.decryptIntoObject());
                f["schema:dateModified"] = new Date().toISOString();
                delete f.reader;
                EcEncryptedValue.encryptOnSave(f.id, false);
                me.toSave.push(f);
                me.$store.commit('editor/framework', f);
                framework = f;
                if (framework.competency && framework.competency.length > 0) {
                    new EcAsyncHelper().each(framework.competency, function(competencyId, done) {
                        EcRepository.get(competencyId, function(c) {
                            var v;
                            if (c.canEditAny(EcIdentityManager.getMyPks())) {
                                if (c.isAny(new EcEncryptedValue().getTypes())) {
                                    v = new EcEncryptedValue();
                                    v.copyFrom(c);
                                } else {
                                    v = EcEncryptedValue.toEncryptedValue(c);
                                }
                                c = new EcCompetency();
                                c.copyFrom(v.decryptIntoObject());
                                c["schema:dateModified"] = new Date().toISOString();
                                delete c.reader;
                                EcEncryptedValue.encryptOnSave(c.id, false);
                                me.toSave.push(c);
                                done();
                            } else {
                                done();
                            }
                        }, done);
                    }, function(competencyIds) {
                        if (framework.relation && framework.relation.length > 0) {
                            new EcAsyncHelper().each(framework.relation, function(relationId, done) {
                                EcRepository.get(relationId, function(r) {
                                    var v;
                                    if (r.isAny(new EcEncryptedValue().getTypes())) {
                                        v = new EcEncryptedValue();
                                        v.copyFrom(r);
                                    } else {
                                        v = EcEncryptedValue.toEncryptedValue(r);
                                    }
                                    r = new EcAlignment();
                                    r.copyFrom(v.decryptIntoObject());
                                    delete r.reader;
                                    EcEncryptedValue.encryptOnSave(r.id, false);
                                    me.toSave.push(r);
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
            }
        },
        finishedMakingPublic: function() {
            let me = this;
            this.repo.multiput(this.toSave, function() {
                me.confirmMakePublic = false;
                me.isProcessing = false;
                me.resetVariables();
                me.getCurrentOwnersAndReaders();
            }, appError);
        },
        encryptFramework: function(framework) {
            var me = this;
            var f = new EcFramework();
            f.copyFrom(framework);
            f.addOwner(EcIdentityManager.ids[0].ppk.toPk());
            // Make sure new owner gets into store
            this.$store.commit('editor/framework', f);
            f["schema:dateModified"] = new Date().toISOString();
            f = EcEncryptedValue.toEncryptedValue(f);
            EcEncryptedValue.toEncryptedValueAsync(f, false, function(ef) {
                me.toSave.push(ef);
                me.repo.multiput(me.toSave, function() {
                    me.confirmMakePrivate = false;
                    me.cantRemoveCurrentUserAsOwner = true;
                    me.isProcessing = false;
                    me.toSave.splice(0, me.toSave.length);
                }, appError);
            }, appError);
        },
        handleMakePrivateConceptScheme: function() {
            var me = this;
            var framework = this.framework;
            this.$store.commit('editor/private', true);
            var cs = new EcConceptScheme();
            cs.copyFrom(framework);
            cs.addOwner(EcIdentityManager.ids[0].ppk.toPk());
            this.$store.commit('editor/framework', cs);
            var name = cs["dcterms:title"];
            cs["schema:dateModified"] = new Date().toISOString();
            cs = EcEncryptedValue.toEncryptedValue(cs);
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
        handleMakePublicConceptScheme: function() {
            var me = this;
            var framework = this.framework;
            this.$store.commit('editor/private', false);
            framework = EcEncryptedValue.toEncryptedValue(framework);
            var cs = new EcConceptScheme();
            appLog(framework);
            appLog(framework.decryptIntoObject());
            appLog(cs);
            cs.copyFrom(framework.decryptIntoObject());
            delete cs.reader;
            framework = cs;
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
                EcRepository.get(conceptId, function(concept) {
                    concept.addOwner(EcIdentityManager.ids[0].ppk.toPk());
                    concept["schema:dateModified"] = new Date().toISOString();
                    if (concept["skos:narrower"] && concept["skos:narrower"].length > 0) {
                        me.encryptConcepts(concept);
                    }
                    if (EcEncryptedValue.encryptOnSaveMap[concept.id] !== true) {
                        concept = EcEncryptedValue.toEncryptedValue(concept);
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
                EcRepository.get(conceptId, function(concept) {
                    var v;
                    if (concept.isAny(new EcEncryptedValue().getTypes())) {
                        v = new EcEncryptedValue();
                        v.copyFrom(concept);
                    } else {
                        v = EcEncryptedValue.toEncryptedValue(concept);
                    }
                    concept = new EcConcept();
                    concept.copyFrom(v.decryptIntoObject());
                    delete concept.reader;
                    EcEncryptedValue.encryptOnSave(concept.id, false);
                    if (concept["skos:narrower"]) {
                        me.decryptConcepts(concept);
                    }
                    concept["schema:dateModified"] = new Date().toISOString();
                    me.conceptsProcessed++;
                    me.toSave.push(concept);
                    done();
                }, done);
            }, function(conceptIds) {
            });
        },
        makeCurrentUserAnOwner: function() {
            let me = this;
            this.isProcessing = true;
            if (this.$store.getters['editor/conceptMode'] === true) {
                return this.makeCurrentUserAnOwnerForConceptObjects();
            }
            if (this.framework.competency && this.framework.competency.length > 0) {
                new EcAsyncHelper().each(this.framework.competency, function(competencyId, done) {
                    EcCompetency.get(competencyId, function(c) {
                        c.addOwner(EcIdentityManager.ids[0].ppk.toPk());
                        me.toSave.push(c);
                        done();
                    }, done);
                }, function(competencyIds) {
                    if (me.framework.relation && me.framework.relation.length > 0) {
                        new EcAsyncHelper().each(me.framework.relation, function(relationId, done) {
                            EcAlignment.get(relationId, function(r) {
                                r.addOwner(EcIdentityManager.ids[0].ppk.toPk());
                                me.toSave.push(r);
                                done();
                            }, done);
                        }, function(relationIds) {
                            me.makeCurrentUserFrameworkOwner();
                        });
                    } else {
                        me.makeCurrentUserFrameworkOwner();
                    }
                });
            } else {
                me.makeCurrentUserFrameworkOwner();
            }
        },
        makeCurrentUserFrameworkOwner: function() {
            let f = this.framework;
            let me = this;
            f.addOwner(EcIdentityManager.ids[0].ppk.toPk());
            me.toSave.push(f);
            me.repo.multiput(me.toSave, function() {
                me.resetVariables();
                me.$store.commit('editor/framework', f);
                me.getCurrentOwnersAndReaders();
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
                    c.addOwner(EcIdentityManager.ids[0].ppk.toPk());
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
                        this.addAndRemoveFromFrameworkObject();
                    } else {
                        this.makeCurrentUserFrameworkOwner();
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