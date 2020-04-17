<template>
    <div
        class="modal"
        :class="{'is-active': isActive}">
        <div class="modal-background" />
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">
                    <span class="title">Share Framework</span>
                    <br><span class="subtitle">
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
                                    <select>
                                        <option
                                            v-for="(option, index) in viewOptions"
                                            :key="index">
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
                                        <select v-model="group.view">
                                            <option
                                                :value="option.value"
                                                v-for="option in viewOptions"
                                                :key="option">
                                                {{ option.label }}
                                            </option>
                                        </select>
                                    </td>
                                    <td>
                                        <div class="button is-text">
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
                                        <select v-model="user.view">
                                            <option
                                                :value="option.value"
                                                v-for="option in viewOptions"
                                                :key="option">
                                                {{ option.label }}
                                            </option>
                                        </select>
                                    </td>
                                    <td>
                                        <div class="button is-text">
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
                        <button class="button is-left is-light">
                            Cancel
                        </button>
                    </div>
                    <div class="column is-12">
                        <button class="button is-fullwidth is-success">
                            Save Framework Settings
                        </button>
                    </div>
                </div>
            </footer>
        </div>
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
            userOrGroupToAdd: null
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
                        var user = {header: success.name, view: "admin", id: success.shortId()};
                        me.users.push(user);
                    }, function(failure) {
                        // If it's not a Person, check organizations
                        this.getOrganizationByEcPk(pk, function(success) {
                            console.log(success);
                            var org = {header: success.name, view: "admin", id: success.shortId()};
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
                        var user = {header: success.name, view: "view", id: success.shortId()};
                        me.users.push(user);
                    }, function(failure) {
                        // If it's not a Person, check organizations
                        this.getOrganizationByEcPk(pk, function(success) {
                            console.log(success);
                            var org = {header: success.name, view: "view", id: success.shortId()};
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
                    let person = {id: success[i].shortId(), name: success[i].name};
                    me.possibleGroupsAndUsers.push(person);
                }
            }, function(failure) {
                console.error(failure);
            }, paramObj);
            EcOrganization.search(window.repo, '', function(success) {
                console.log(success);
                for (var i = 0; i < success.length; i++) {
                    let org = {id: success[i].shortId(), name: success[i].name};
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
            this.userOrGroupToAdd = nameAndId.id;
            this.search = nameAndId.name;
            this.isOpenAutocomplete = false;
        }
    }
};
</script>


<style>
</style>