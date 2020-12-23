<template>
    <div id="user-groups">
        <!-- busy modal-->
        <div
            class="modal"
            :class="[{'is-active': userGroupBusy}]">
            <div class="modal-background" />
            <div class="modal-content has-text-centered">
                <span class="icon is-large has-text-center has-text-link">
                    <i class="fas fa-2x fa-spinner is-info fa-pulse" />
                </span>
            </div>
        </div>
        <!-- user group editor content-->
        <div
            class="container"
            v-if="!userGroupBusy">
            <div class="section">
                <h3 class="title is-size-1">
                    User Groups
                </h3>
                <p class="description">
                    User groups provide the capability to assign multiple users the ability to assume a single shared ‘identity’.
                    Members of a group are granted access to any CaSS object that the group has been explicitly assigned.
                    These grouped rules can be applied at the configuration level in the
                    configuration management screen or at the framework level in the framework editor.
                </p>
            </div>
            <div
                class="section">
                <h4 class="header is-size-3">
                    Groups
                </h4>
                <div v-if="userGroupList.length === 0">
                    <p>No user groups are available.</p>
                </div>
                <div
                    class="table-container"
                    v-if="userGroupList.length > 0">
                    <table class="table is-hoverable is-fullwidth">
                        <thead>
                            <tr>
                                <th>
                                    name
                                </th>
                                <th>
                                    description
                                </th>
                                <th>
                                    number of members
                                </th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            <user-group-list-item
                                v-for="(grp, index) in userGroupList"
                                :id="grp.shortId()"
                                :key="index"
                                :name="grp.getName()"
                                :description="grp.getDescription()"
                                :numMembers="getUserGroupNumMembers(grp)"
                                :isOwned="doesAnyIdentityOwnObject(grp)"
                                @show-details="showUserGroupDetails" />
                        </tbody>
                    </table>
                </div>
                <div class="buttons is-right">
                    <div
                        class="button is-outlined is-primary"
                        @click="createNewUserGroup"
                        :disabled="!amLoggedIn"
                        :title="getCreateUserGroupButtonTitle">
                        <span class="icon">
                            <i class="fa fa-plus" />
                        </span>
                        <span>
                            create new group
                        </span>
                    </div>
                </div>
            </div>
            <div v-if="userGroupViewMode.equals('detail')">
                <user-group-details
                    :group="currentUserGroup"
                    :personList="personList"
                    :groupManagers="currentUserGroupManagers"
                    :groupUsers="currentUserGroupUsers"
                    :readOnly="currentUserGroupIsReadOnly"
                    @save="saveCurrentUserGroup"
                    @cancel="cancelEditCurrentUserGroup"
                    @back="backFromEditCurrentUserGroup" />
            </div>
            <div class="columns">
                <div class="column is-12">
                    No group
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserGroupListItem from '../../components/userGroups/UserGroupListItem';
import UserGroupDetails from "../../components/userGroups/UserGroupDetails";
import {cassUtil} from '../../mixins/cassUtil';

export default {
    mixins: [cassUtil],
    name: 'UserGroupEditor-OLD',
    components: {
        UserGroupDetails,
        UserGroupListItem
    },
    data: () => ({
        GROUP_SEARCH_SIZE: 10000,
        PERSON_SEARCH_SIZE: 10000,
        userGroupViewMode: 'list',
        userGroupBusy: false,
        currentUserGroup: {},
        currentUserGroupManagers: [],
        currentUserGroupUsers: [],
        userGroupList: [],
        personList: []
    }),
    computed: {
        getCreateUserGroupButtonTitle: function() {
            if (this.amLoggedIn) return '';
            else return 'Must be logged in';
        },
        currentUserGroupIsReadOnly: function() {
            if (this.doesAnyIdentityOwnObject(this.currentUserGroup)) return false;
            else return true;
        }
    },
    methods: {
        getUserGroupNumMembers(grp) {
            if (grp.employee) return grp.employee.length;
            else return 0;
        },
        showListView() {
            this.userGroupViewMode = "list";
        },
        showDetailView() {
            this.userGroupViewMode = "detail";
        },
        updateCurrentUserGroupPpk() {
            let ecevGroupPpk = new EcEncryptedValue();
            ecevGroupPpk.copyFrom(this.currentUserGroup[this.GROUP_PPK_KEY]);
            let currentGroupPpkPem = ecevGroupPpk.decryptIntoString();
            this.currentUserGroup[this.GROUP_PPK_KEY] = EcEncryptedValue.encryptValue(currentGroupPpkPem, this.GROUP_PPK_KEY, this.currentUserGroup.owner, this.currentUserGroup.reader);
        },
        updateCurrentUserGroupMemberList(groupManagers, groupUsers) {
            this.currentUserGroup.employee = [];
            this.currentUserGroup.owner = [];
            this.currentUserGroup.reader = [];
            for (let gm of groupManagers) {
                let gmEcPk = this.getPersonEcPk(gm);
                if (gmEcPk) {
                    this.currentUserGroup.addEmployee(gm);
                    this.currentUserGroup.addOwner(gmEcPk);
                }
            }
            for (let gu of groupUsers) {
                let guEcPk = this.getPersonEcPk(gu);
                if (guEcPk) {
                    this.currentUserGroup.addEmployee(gu);
                    this.currentUserGroup.addReader(guEcPk);
                }
            }
        },
        saveCurrentUserGroupSuccess() {
            appLog("Save user group success...");
            this.showListView();
            this.buildUserGroupData();
        },
        saveCurrentUserGroupFailure(msg) {
            appLog("Save user group failure: " + msg);
            this.userGroupBusy = false;
        },
        saveCurrentUserGroup(groupManagers, groupUsers) {
            this.userGroupBusy = true;
            this.updateCurrentUserGroupMemberList(groupManagers, groupUsers);
            this.updateCurrentUserGroupPpk();
            EcRepository.save(this.currentUserGroup, this.saveCurrentUserGroupSuccess, this.saveCurrentUserGroupFailure);
        },
        cancelEditCurrentUserGroup() {
            this.buildUserGroupData();
            this.showListView();
            this.currentUserGroup = {};
            this.currentUserGroupManagers = [];
            this.currentUserGroupUsers = [];
        },
        backFromEditCurrentUserGroup() {
            this.showListView();
            this.currentUserGroup = {};
            this.currentUserGroupManagers = [];
            this.currentUserGroupUsers = [];
        },
        getPersonById(personId) {
            for (let p of this.personList) {
                if (p.shortId().equals(personId)) {
                    return p;
                }
            }
            return null;
        },
        setCurrentUserGroupManagerAndUserListsForDetailView() {
            this.currentUserGroupManagers = [];
            this.currentUserGroupUsers = [];
            if (!this.currentUserGroup.employee) return;
            for (let empId of this.currentUserGroup.employee) {
                let p = this.getPersonById(empId);
                if (this.isPersonIdAnObjectOwner(empId, this.currentUserGroup)) this.currentUserGroupManagers.push(p);
                if (this.isPersonIdAnObjectReader(empId, this.currentUserGroup)) this.currentUserGroupUsers.push(p);
            }
            this.showDetailView();
        },
        sortPersonList() {
            this.personList.sort(function(p1, p2) {
                if (p1.name > p2.name) return 1;
                else if (p2.name > p1.name) return -1;
                else return 0;
            });
        },
        fetchPersonListForDetailViewSuccess(ecpa) {
            this.personList = ecpa;
            this.sortPersonList();
            this.userGroupBusy = false;
            this.setCurrentUserGroupManagerAndUserListsForDetailView();
        },
        fetchPersonListForDetailViewFailure(msg) {
            appLog("Person search failure: " + msg);
            this.userGroupBusy = false;
        },
        fetchPersonListForDetailViewAndPopulateUserLists() {
            if (this.personList.length > 0) this.setCurrentUserGroupManagerAndUserListsForDetailView();
            else {
                this.userGroupBusy = true;
                let paramObj = {};
                paramObj.size = this.PERSON_SEARCH_SIZE;
                EcPerson.search(window.repo, '', this.fetchPersonListForDetailViewSuccess, this.fetchPersonListForDetailViewFailure, paramObj);
            }
        },
        getUserGroupById(userGroupId) {
            for (let ug of this.userGroupList) {
                if (ug.shortId().equals(userGroupId)) {
                    return ug;
                }
            }
            return null;
        },
        setCurrentUserGroup(userGroupId) {
            this.currentUserGroup = this.getUserGroupById(userGroupId);
        },
        showUserGroupDetails(userGroupId) {
            this.setCurrentUserGroup(userGroupId);
            this.fetchPersonListForDetailViewAndPopulateUserLists();
        },
        createNewUserGroup() {
            this.userGroupBusy = true;
            let newUserGroup = new EcOrganization();
            newUserGroup.generateId(window.repo.selectedServer);
            newUserGroup.setName('New User Group');
            newUserGroup.setDescription('New group of users');
            newUserGroup.employee = [];
            newUserGroup.addEmployee(this.$store.state.user.loggedOnPerson);
            this.addAllIdentityPksAsOwners(newUserGroup);
            // Vue wasn't updating the this.userGroupBusy before it got busy generating the key.  Putting this timeout here
            // to let it 'catch up'.  Seems to be 'work' ok.
            setTimeout(() => {
                let newUserGroupPpk = EcPpk.generateKey();
                newUserGroup[this.GROUP_PPK_KEY] = EcEncryptedValue.encryptValue(newUserGroupPpk.toPem(), this.GROUP_PPK_KEY, newUserGroup.owner, newUserGroup.reader);
                appLog('New user group created: ');
                appLog(newUserGroup);
                this.currentUserGroup = newUserGroup;
                this.userGroupBusy = false;
                this.fetchPersonListForDetailViewAndPopulateUserLists();
            }, 300);
        },
        sortUserGroupList() {
            let me = this;
            this.userGroupList.sort(function(ug1, ug2) {
                let ug1Owned = me.doesAnyIdentityOwnObject(ug1);
                let ug2Owned = me.doesAnyIdentityOwnObject(ug2);
                if (ug1Owned !== ug2Owned) {
                    if (ug2Owned) return 1;
                    else return -1;
                } else {
                    if (ug1.name > ug2.name) return 1;
                    else if (ug2.name > ug1.name) return -1;
                    else return 0;
                }
            });
        },
        searchRepositoryForGroupsSuccess(ecoa) {
            appLog("Group search success: ");
            appLog(ecoa);
            if (ecoa && ecoa.length > 0) {
                this.userGroupList = ecoa;
                this.sortUserGroupList();
            } else this.userGroupList = [];
            this.userGroupBusy = false;
        },
        searchRepositoryForGroupsFailure(msg) {
            appLog("Group search failure: " + msg);
            this.userGroupBusy = false;
        },
        buildUserGroupData() {
            this.userGroupBusy = true;
            let paramObj = {};
            paramObj.size = this.GROUP_SEARCH_SIZE;
            EcOrganization.search(window.repo, '', this.searchRepositoryForGroupsSuccess, this.searchRepositoryForGroupsFailure, paramObj);
        }
    },
    mounted() {
        this.buildUserGroupData();
    }
};
</script>


<style lang="scss">

    p.description {
        padding-bottom: .75rem;
    }
</style>
