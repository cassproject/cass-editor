<template>
    <div class="modal-card">
        <header class="modal-card-head has-background-primary">
            <p class="modal-card-title">
                <span class="title has-text-white">Share Framework</span>
                <br><span class="subtitle has-text-white has-text-weight-medium">
                    Sharing settings for {{ frameworkName }}
                </span>
            </p>
            <button
                class="delete"
                @click="$emit('closeShareModalEvent')"
                aria-label="close" />
        </header>
        <section class="modal-card-body">
            <div class="columns is-multiline">
                <!-- share link -->
                <div class="column is-12">
                    {{ shareableFrameworkInEditor }}
                    <button
                        title="Copy URL to the clipboard."
                        v-clipboard="shareableFrameworkInEditor">
                        <i class="fa fa-copy" />
                    </button>
                </div>
                <!-- end share link -->
                <!-- input new groups or users -->
                <div class="column is-12">
                    <label>Add users or groups</label>
                    <div class="field has-addons">
                        <div class="control is-expanded">
                            <input
                                type="text"
                                class="input is-fullwidth"
                                v-model="search"
                                @input="filterResults">
                            <span class="auto-complete">
                                <ul v-show="isOpenAutocomplete">
                                    <li
                                        v-for="(result, i) in filtered"
                                        :key="i"
                                        @mousedown="selectUserOrGroup(result)">
                                        {{ result.name }}
                                    </li>
                                </ul>
                            </span>
                        </div>
                        <div class="control">
                            <div class="select">
                                <select v-model="selectViewOrAdmin">
                                    <option
                                        v-for="(option, index) in viewOptions"
                                        :key="index"
                                        :value="option.value">
                                        {{ option.label }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end input new users or groups -->
                <!-- begin list of access -->
                <div class="column is-12">
                    <table class="table is-fullwidth">
                        <thead>
                            <tr>
                                <th><abbr title="Position">Group Name</abbr></th>
                                <th><abbr title="Played">View</abbr></th>
                                <th><abbr title="Won">Delete</abbr></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="group in groups"
                                :key="group">
                                <th> {{ group.header }}</th>
                                <td>
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
                                </td>
                                <td>
                                    <div
                                        class="button is-text"
                                        @click="removeOwnerOrReader(group, 'group')">
                                        <div class="icon">
                                            <i class="fa fa-times" />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- user table -->
                <div class="column is-12">
                    <table class="table is-fullwidth">
                        <thead>
                            <tr>
                                <th><abbr title="Position">User Name</abbr></th>
                                <th><abbr title="Played">View</abbr></th>
                                <th><abbr title="Won">Delete</abbr></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="user in users"
                                :key="user">
                                <th> {{ user.header }}</th>
                                <td>
                                    <select
                                        v-model="user.view"
                                        @change="user.changed=true">
                                        <option
                                            :value="option.value"
                                            v-for="option in viewOptions"
                                            :key="option">
                                            {{ option.label }}
                                        </option>
                                    </select>
                                </td>
                                <td>
                                    <div
                                        class="button is-text"
                                        @click="removeOwnerOrReader(user, 'user')">
                                        <div class="icon">
                                            <i class="fa fa-times" />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
        <footer class="modal-card-foot">
            <div class="columns is-12">
                <div class="column is-12">
                    <button
                        class="button is-left is-light"
                        @click="$emit('closeShareModalEvent')">
                        Cancel
                    </button>
                </div>
                <div class="column is-12">
                    <button
                        class="button is-fullwidth is-success"
                        @click="saveSettings">
                        Save Framework Settings
                    </button>
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
            frameworkName: this.$store.state.editor.framework.getName(),
            frameworkId: this.$store.state.editor.framework.shortId(),
            viewOptions: [
                {
                    label: 'View',
                    value: 'view'
                },
                {
                    label: 'Admin',
                    value: 'admin'
                }
            ],
            groups: [],
            users: [],
            search: "",
            filtered: [],
            possibleGroupsAndUsers: [],
            isOpenAutocomplete: false,
            userOrGroupToAdd: null,
            selectViewOrAdmin: "view",
            removeReader: [],
            removeOwner: [],
            addReader: [],
            addOwner: [],
            repo: window.repo
        };
    },
    computed: {
        shareableFrameworkInEditor: function() {
            return window.location.href + "?frameworkId=" + this.frameworkId;
        },
        framework: function() {
            return this.$store.state.editor.framework;
        }
    },
    mounted: function() {
        this.getCurrentOwnersAndReaders();
        this.getPossibleOwnersAndReaders();
    },
    methods: {
        getCurrentOwnersAndReaders: function() {
            var me = this;
            if (this.framework.owner) {
                for (var i = 0; i < this.framework.owner.length; i++) {
                    var pk = EcPk.fromPem(this.framework.owner[i]);
                    EcPerson.getByPk(window.repo, pk, function(success) {
                        console.log(success);
                        var user = {header: success.name, view: "admin", id: success.shortId(), changed: false, pk: pk};
                        me.users.push(user);
                    }, function(failure) {
                        // If it's not a Person, check organizations
                        this.getOrganizationByEcPk(pk, function(success) {
                            console.log(success);
                            var org = {header: success.name, view: "admin", id: success.shortId(), changed: false, pk: pk};
                            me.groups.push(org);
                        }, function(error) {
                            console.error(error);
                        });
                    });
                }
            }
            if (this.framework.reader) {
                for (var i = 0; i < this.framework.reader.length; i++) {
                    var pk = EcPk.fromPem(this.framework.reader[i]);
                    EcPerson.getByPk(window.repo, pk, function(success) {
                        console.log(success);
                        var user = {header: success.name, view: "view", id: success.shortId(), changed: false, pk: pk};
                        me.users.push(user);
                    }, function(failure) {
                        // If it's not a Person, check organizations
                        this.getOrganizationByEcPk(pk, function(success) {
                            console.log(success);
                            var org = {header: success.name, view: "view", id: success.shortId(), changed: false, pk: pk};
                            me.groups.push(org);
                        }, function(error) {
                            console.error(error);
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
                console.log(success);
                for (var i = 0; i < success.length; i++) {
                    let person = {id: success[i].shortId(), name: success[i].name, pk: me.getPersonEcPk(success[i])};
                    me.possibleGroupsAndUsers.push(person);
                }
            }, function(failure) {
                console.error(failure);
            }, paramObj);
            EcOrganization.search(window.repo, '', function(success) {
                console.log(success);
                for (var i = 0; i < success.length; i++) {
                    let org = {id: success[i].shortId(), name: success[i].name, pk: me.getOrganizationEcPk(success[i])};
                    me.possibleGroupsAndUsers.push(org);
                }
            }, function(failure) {
                console.error(failure);
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
        },
        addAndRemoveFromAllObjects: function() {
            let me = this;
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
                        me.repo.saveTo(c, done, done);
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
                                me.repo.saveTo(r, done, done);
                            }, done);
                        }, function(relationIds) {
                            me.addAndRemoveFromFrameworkObject();
                        });
                    } else {
                        me.addAndRemoveFromFrameworkObject();
                    }
                });
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
            me.repo.saveTo(f, function() {
                me.$emit('closeShareModalEvent');
            }, function() {});
        },
        removeOwnerOrReader: function(userOrGroup, type) {
            if (userOrGroup.view === "view") {
                this.removeReader.push(userOrGroup.pk);
            } else if (userOrGroup.view === "admin") {
                this.removeOwner.push(userOrGroup.pk);
            }
            if (type === "user") {
                EcArray.setRemove(this.users, userOrGroup);
            } else if (type === "group") {
                EcArray.setRemove(this.groups, userOrGroup);
            }
        }
    }
};
</script>


<style>
</style>