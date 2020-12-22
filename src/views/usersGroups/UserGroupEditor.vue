<template>
    <div class="cass-users-and-groups">
        <div class="container">
            <h3 class="title is-size-1">
                User Groups
            </h3>
            <div class="columns">
                <div class="column is-narrow">
                    <nav>
                        <a @click="showMemberListView">Membership List</a>
                    </nav>
                </div>
            </div>
            <div class="columns">
                <div class="column is-narrow">
                    <div class="buttons">
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
            </div>
            <div class="columns">
                <div class="column is-narrow">
                    <cass-panel>
                        <cass-panel-item
                            :depth="0"
                            :label="group.name"
                            :nodes="group.subGroups"
                            :id="group.id"
                            v-for="group in userGroupDisplayList"
                            @showDetails="showGroupDetailsById"
                            :key="group" />
                    </cass-panel>
                </div>
                <!-- main content section -->
                <div class="column">
                    <div class="columns is-multiline is-gapless is-paddingless">
                        <div class="column is-12">
                            <div v-if="viewMode === 'memberList'">
                                <template>
                                    <h3 class="title is-size-1">
                                        Membership List
                                    </h3>
                                    <div v-if="allGroupMembersList.length === 0">
                                        <h3 class="title is-size-5">
                                            <i class="fa fa-info-circle"/> No user groups are available to you
                                        </h3>
                                    </div>
                                    <div
                                        v-if="allGroupMembersList.length > 0"
                                        class="section box py-4 px-4">
                                        <div class="table-container">
                                            <table class="table is-hoverable is-fullwidth">
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            name
                                                        </th>
                                                        <th>
                                                            email
                                                        </th>
                                                        <th>
                                                            membership
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr
                                                        v-for="(member, memberIdx) in allGroupMembersList"
                                                        :key="memberIdx">
                                                        <th>
                                                            {{ member.name }}
                                                        </th>
                                                        <td>
                                                            {{ member.email }}
                                                        </td>
                                                        <td>
                                                            <div v-if="member.managerOf.length > 0">
                                                                <b>Manager of</b>
                                                                <br>
                                                                <span v-for="(memMgrOf, memMgrOfIdx) in member.managerOf">
                                                                    <span v-if="memMgrOfIdx > 0">, </span>
                                                                    <a @click="showGroupDetailsById(memMgrOf.id)">
                                                                        {{memMgrOf.name}}
                                                                    </a>
                                                                </span>
                                                            </div>
                                                            <div v-if="member.memberOf.length > 0">
                                                                <b>Member of</b>
                                                                <br>
                                                                <span v-for="(memMemOf, memMemOfIdx) in member.memberOf">
                                                                    <span v-if="memMemOfIdx > 0">, </span>
                                                                    <a @click="showGroupDetailsById(memMemOf.id)">
                                                                        {{memMemOf.name}}
                                                                    </a>
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </template>
                            </div>
                            <div v-if="viewMode === 'groupDetail'">
                                <!-- this should update based on group selected -->
                                <template>
                                    <h3
                                        class="title is-size-1"
                                        v-if="!isEditingCurrentGroupName">
                                        {{ currentUserGroupName }}
                                        <span
                                            class="icon"
                                            v-if="currentUserGroupIsManager"
                                            @click="isEditingCurrentGroupName = true">
                                            <i class="fa fa-edit has-text-dark" />
                                        </span>
                                    </h3>
                                    <div
                                        class=""
                                        v-if="isEditingCurrentGroupName">
                                        <label>Group Name</label>
                                        <input
                                            @change="setCurrentUserGroupAsChanged"
                                            type="text"
                                            class="input"
                                            v-model="currentUserGroupName">
                                    </div>
                                </template>
                                <!-- should display breadcrumbs about groups -->
                                <nav
                                    class="breadcrumb"
                                    aria-label="breadcrumbs"
                                    v-if="currentUserGroupLineage && currentUserGroupLineage.length > 1">
                                    <ul>
                                        <li v-for="lineageObj in currentUserGroupLineage">
                                            <a @click="showGroupDetailsById(lineageObj.id)">
                                                {{ lineageObj.name }}
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                                <div class="description">
                                    <div v-if="!isEditingCurrentGroupDescription">
                                        <span v-if="currentUserGroupDescription && currentUserGroupDescription.trim().length > 0">
                                            {{ currentUserGroupDescription }}
                                        </span>
                                        <span v-else>
                                            <i>Group Description</i>
                                        </span>
                                        <span
                                            class="icon"
                                            v-if="currentUserGroupIsManager"
                                            @click="isEditingCurrentGroupDescription = true">
                                            <i class="fa fa-edit has-text-dark" />
                                        </span>
                                    </div>
                                    <div
                                        class=""
                                        v-if="isEditingCurrentGroupDescription">
                                        <label>Group Description</label>
                                        <input
                                            @change="setCurrentUserGroupAsChanged"
                                            type="text"
                                            class="input"
                                            v-model="currentUserGroupDescription">
                                    </div>
                                </div>
                                <div class="section box py-4 px-4">
                                    <span class="subtitle is-size-4">
                                        <div class="columns">
                                            <div class="column is-6">
                                                Group Members
                                            </div>
                                            <div class="column is-6">
                                                <div
                                                    v-if="currentUserGroupIsManager"
                                                    class="buttons is-right">
                                                    <div
                                                        class="button is-small is-outlined is-primary"
                                                        @click="showAddGroupMembersModal"
                                                        title="Add group members">
                                                        <span class="icon">
                                                            <i class="fa fa-plus" />
                                                        </span>
                                                        <span>
                                                            add group members
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </span>
                                    <div class="table-container">
                                        <table class="table is-hoverable is-fullwidth">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        name
                                                    </th>
                                                    <th>
                                                        email
                                                    </th>
                                                    <th>
                                                        role
                                                    </th>
                                                    <th v-if="currentUserGroupIsManager">
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr
                                                    v-for="(manager, managerIdx) in currentUserGroupManagers"
                                                    :key="managerIdx + '_mgr'">
                                                    <th>
                                                        {{ manager.name }}
                                                    </th>
                                                    <td>
                                                        {{ manager.email }}
                                                    </td>
                                                    <td>
                                                        <b>manager</b>
                                                    </td>
                                                    <td v-if="currentUserGroupIsManager">
                                                        <div
                                                            v-if="!areAnyIdentitiesThisPerson(manager)"
                                                            class="buttons is-right">
                                                            <div
                                                                class="button is-small is-outlined is-primary"
                                                                @click="changeManagerToMember(manager.shortId())"
                                                                title="Change role to member">
                                                                <span class="icon">
                                                                    <i class="fa fa-arrow-down" />
                                                                </span>
                                                                <span>
                                                                    change role
                                                                </span>
                                                            </div>
                                                            <div
                                                                class="button is-small is-outlined is-warning"
                                                                @click="removeGroupMember(manager.shortId())"
                                                                title="Remove manager">
                                                                <span class="icon">
                                                                    <i class="fa fa-trash" />
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr
                                                    v-for="(member, memberIdx) in currentUserGroupMembers"
                                                    :key="memberIdx + '_mem'">
                                                    <th>
                                                        {{ member.name }}
                                                    </th>
                                                    <td>
                                                        {{ member.email }}
                                                    </td>
                                                    <td>
                                                        member
                                                    </td>
                                                    <td v-if="currentUserGroupIsManager">
                                                        <div class="buttons is-right">
                                                            <div
                                                                class="button is-small is-outlined is-primary"
                                                                @click="changeMemberToManager(manager.shortId())"
                                                                title="Change role to manager">
                                                                <span class="icon">
                                                                    <i class="fa fa-arrow-up" />
                                                                </span>
                                                                <span>
                                                                    change role
                                                                </span>
                                                            </div>
                                                            <div
                                                                class="button is-small is-outlined is-warning"
                                                                @click="removeGroupMember(manager.shortId())"
                                                                title="Remove member">
                                                                <span class="icon">
                                                                    <i class="fa fa-trash" />
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="buttons is-right">
                                    <div
                                        v-if="currentUserGroupIsManager && currentUserGroupChanged"
                                        class="button is-outlined is-primary"
                                        @click="saveCurrentUserGroup"
                                        title="Save group">
                                        <span class="icon">
                                            <i class="fa fa-save" />
                                        </span>
                                        <span>
                                            save
                                        </span>
                                    </div>
                                    <div
                                        v-if="currentUserGroupIsManager && currentUserGroupChanged"
                                        class="button is-outlined is-secondary"
                                        @click="cancelCurrentUserGroupChanges"
                                        title="Cancel group changes">
                                        <span class="icon">
                                            <i class="fa fa-undo" />
                                        </span>
                                        <span>
                                            cancel
                                        </span>
                                    </div>
                                    <div
                                        v-if="currentUserGroupIsManager && !currentUserGroupIsNewGroup"
                                        class="button is-outlined is-primary"
                                        @click="createSubGroupForCurrentUserGroup"
                                        title="Create sub-group">
                                        <span class="icon">
                                            <i class="fa fa-level-down-alt" />
                                        </span>
                                        <span>
                                            create sub-group
                                        </span>
                                    </div>
                                    <div
                                        v-if="currentUserGroupIsManager && !currentUserGroupIsNewGroup"
                                        class="button is-outlined is-warning"
                                        @click="showDeleteCurrentUserGroupConfirm"
                                        title="Delete group and sub-groups">
                                        <span class="icon">
                                            <i class="fa fa-trash" />
                                        </span>
                                        <span>
                                            delete
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- modals go down at bottom please -->
        <!-- NO!!!!!!!!!!!!!!!!!!!!!!!!!!!!! -->
        <!-- busy modal -->
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
        <!-- member search modal -->
        <div
            class="modal"
            :class="[{'is-active': showAddMemberModal}]">
            <div class="modal-background" />
            <div class="modal-card">
                <header class="modal-card-head has-background-primary">
                    <p class="is-size-3 modal-card-title has-text-white">
                        Add members to '{{ currentUserGroupName }}'
                        <button
                            class="delete is-pulled-right"
                            aria-label="close"
                            @click="closeAddGroupMemberModal" />
                    </p>
                </header>
                <div class="modal-card-body has-text-dark">
                    <div
                        v-if="!(filteredAvailablePersonsForMembership.length === 0 && addMemberPersonFilter === '')"
                        class="field">
                        <input
                            type="text"
                            class="input"
                            v-model="addMemberPersonFilter"
                            placeholder="search for person...">
                    </div>
                    <div v-if="filteredAvailablePersonsForMembership.length === 0 && addMemberPersonFilter === ''">
                        <i class="fa fa-info-circle"/> No group members available. Users must be managers or members of any parent groups in order to be available for sub-groups.
                    </div>
                    <div v-if="filteredAvailablePersonsForMembership.length > 0">
                        <h4 class="header is-size-3">
                            Available members
                        </h4>
                        <div class="table-container">
                            <table class="table is-hoverable is-fullwidth">
                                <thead>
                                    <tr>
                                        <th title="Add as member">
                                            <i class="fa fa-user"/>
                                        </th>
                                        <th title="Add as manager">
                                            <i class="fa fa-user-shield"/>
                                        </th>
                                        <th>name</th>
                                        <th>email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="(prs, index) in filteredAvailablePersonsForMembership"
                                        :key="index">
                                        <th>
                                            <div class="checkbox">
                                                <input
                                                    :id="prs.shortId()"
                                                    :value="prs.shortId()"
                                                    name="prs.shortId()"
                                                    type="checkbox"
                                                    title="Add as member"
                                                    @change="removeFromSelectedNewManagers(prs.shortId())"
                                                    v-model="selectedNewMembers">
                                            </div>
                                        </th>
                                        <th>
                                            <div class="checkbox">
                                                <input
                                                    :id="prs.shortId()"
                                                    :value="prs.shortId()"
                                                    name="prs.shortId()"
                                                    type="checkbox"
                                                    title="Add as manager"
                                                    @change="removeFromSelectedNewMembers(prs.shortId())"
                                                    v-model="selectedNewManagers">
                                            </div>
                                        </th>
                                        <td> {{ prs.getName() }} </td>
                                        <td> {{ prs.email }} </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
                <footer class="modal-card-foot has-background-light">
                    <div class="buttons is-right">
                        <div
                            v-if="selectedNewMembers.length > 0 || selectedNewManagers.length > 0"
                            class="button is-outlined is-primary is-small"
                            @click="applySelectedNewMembers"
                            title="Apply new members">
                            <span class="icon">
                                <i class="fa fa-save" />
                            </span>
                            <span>
                                apply
                            </span>
                        </div>
                        <div
                            class="button is-outlined is-secondary is-small"
                            @click="closeAddGroupMemberModal"
                            title="Cancel add new members">
                            <span class="icon">
                                <i class="fa fa-times" />
                            </span>
                            <span>
                                cancel
                            </span>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    </div>
</template>
<script>
import CassPanel from '../../components/Panel';
import CassPanelItem from '../../components/PanelItem';
import {cassUtil} from '../../mixins/cassUtil';

export default {
    name: 'UserGroupEditor',
    mixins: [cassUtil],
    data: () => ({
        GROUP_SEARCH_SIZE: 10000,
        PERSON_SEARCH_SIZE: 10000,
        userGroupBusy: false,
        currentUserGroup: {},
        currentUserGroupId: '',
        currentUserGroupNeedsRekey: false,
        currentUserGroupIsManager: false,
        currentUserGroupManagers: [],
        currentUserGroupMembers: [],
        currentUserGroupName: '',
        currentUserGroupDescription: '',
        currentUserGroupLineage: [],
        currentUserGroupIsNewGroup: false,
        currentUserGroupChanged: false,
        isEditingCurrentGroupName: false,
        isEditingCurrentGroupDescription: false,
        showAddMemberModal: false,
        addMemberPersonFilter: '',
        availablePersonsForMembership: [],
        selectedNewMembers: [],
        selectedNewManagers: [],
        allPersonList: [],
        allPersonMap: {},
        allGroupMembersList: [],
        userGroupDisplayList: [],
        userGroupDisplayMap: {},
        userGroupMap: {},
        viewMode: 'memberList'
    }),
    components: {
        CassPanel,
        CassPanelItem
    },
    computed: {
        getCreateUserGroupButtonTitle: function() {
            if (this.amLoggedIn) return '';
            else return 'Must be logged in';
        },
        filteredAvailablePersonsForMembership: function() {
            return this.availablePersonsForMembership.filter(person => {
                if (this.currentUserGroupHasManager(person.shortId()) || this.currentUserGroupHasMember(person.shortId())) return false;
                return (((person.getName() && person.getName().toLowerCase().indexOf(this.addMemberPersonFilter.toLowerCase()) > -1) ||
                        (person.email && person.email.toLowerCase().indexOf(this.addMemberPersonFilter.toLowerCase()) > -1))

                );
            });
        }
    },
    methods: {
        showMemberListView() {
            this.currentUserGroupNeedsRekey = false;
            this.currentUserGroupIsManager = false;
            this.isEditingCurrentGroupName = false;
            this.isEditingCurrentGroupDescription = false;
            this.currentUserGroup = {};
            this.currentUserGroupId = '';
            this.currentUserGroupManagers = [];
            this.currentUserGroupMembers = [];
            this.currentUserGroupName = '';
            this.currentUserGroupDescription = '';
            this.currentUserGroupLineage = [];
            this.currentUserGroupIsNewGroup = false;
            this.currentUserGroupChanged = false;
            this.viewMode = "memberList";
        },
        showGroupDetailView() {
            this.viewMode = "groupDetail";
        },
        setCurrentUserGroupAsChanged() {
            this.currentUserGroupChanged = true;
        },
        changeManagerToMember(personId) {
            console.log('TODO changeManagerToMember');
            this.currentUserGroupChanged = true;
        },
        changeMemberToManager(personId) {
            console.log('TODO changeMemberToManager');
            this.currentUserGroupChanged = true;
        },
        removeGroupMember(personId) {
            // TODO this really needs to be thought about...
            // Removing a member should remove him/her from all sub groups
            // that may leave us with a group without a manager
            // If that happens then what?  Add current user as group manager?
            console.log('TODO removeGroupMember');
            this.currentUserGroupChanged = true;
            this.currentUserGroupNeedsRekey = true;
        },
        closeAddGroupMemberModal() {
            this.selectedNewMembers = [];
            this.selectedNewManagers = [];
            this.showAddMemberModal = false;
        },
        getPersonListFromIdList(personIdList) {
            let pl = [];
            for (let pid of personIdList) {
                let p = this.allPersonMap[pid];
                if (p) pl.push(p);
            }
            return pl;
        },
        removeFromSelectedNewMembers(personId) {
            this.selectedNewMembers = this.selectedNewMembers.filter(p => p !== personId);
        },
        removeFromSelectedNewManagers(personId) {
            this.selectedNewManagers = this.selectedNewManagers.filter(p => p !== personId);
        },
        currentUserGroupHasManager(personId) {
            for (let p of this.currentUserGroupManagers) {
                if (p.shortId().equals(personId)) {
                    return true;
                }
            }
            return false;
        },
        currentUserGroupHasMember(personId) {
            for (let p of this.currentUserGroupMembers) {
                if (p.shortId().equals(personId)) {
                    return true;
                }
            }
            return false;
        },
        buildAvailablePersonsForMembership() {
            let apl = [];
            if (!this.currentUserGroup.memberOf || !this.userGroupMap[this.currentUserGroup.memberOf]) {
                apl = this.allPersonList;
            } else {
                let parentGroup = this.userGroupMap[this.currentUserGroup.memberOf];
                apl = this.getPersonListFromIdList(parentGroup.employee);
            }
            this.availablePersonsForMembership = apl;
        },
        showAddGroupMembersModal() {
            this.selectedNewMembers = [];
            this.selectedNewManagers = [];
            this.buildAvailablePersonsForMembership();
            this.addMemberPersonFilter = '';
            this.showAddMemberModal = true;
        },
        applySelectedNewMembers() {
            for (let newMemId of this.selectedNewMembers) {
                this.currentUserGroupMembers.push(this.allPersonMap[newMemId]);
            }
            for (let newMgrId of this.selectedNewManagers) {
                this.currentUserGroupManagers.push(this.allPersonMap[newMgrId]);
            }
            this.currentUserGroupChanged = true;
            this.closeAddGroupMemberModal();
        },
        saveCurrentUserGroup() {
            console.log('TODO saveCurrentUserGroup');
        },
        cancelCurrentUserGroupChanges() {
            console.log('TODO cancelCurrentUserGroupChanges');
        },
        showDeleteCurrentUserGroupConfirm() {
            console.log('TODO showDeleteCurrentUserGroupConfirm');
        },
        deleteCurrentUserGroup() {
            console.log('TODO deleteCurrentUserGroup');
        },
        createNewUserGroup(parentGroupId) {
            console.log('TODO createNewUserGroup');
            this.currentUserGroupIsNewGroup = true;
            // this.userGroupBusy = true;
            // let newUserGroup = new EcOrganization();
            // newUserGroup.generateId(window.repo.selectedServer);
            // newUserGroup.setName('New User Group');
            // newUserGroup.setDescription('New group of users');
            // newUserGroup.employee = [];
            // newUserGroup.addEmployee(this.$store.state.user.loggedOnPerson);
            // this.addAllIdentityPksAsOwners(newUserGroup);
            // // Vue wasn't updating the this.userGroupBusy before it got busy generating the key.  Putting this timeout here
            // // to let it 'catch up'.  Seems to be 'work' ok.
            // setTimeout(() => {
            //     let newUserGroupPpk = EcPpk.generateKey();
            //     newUserGroup[this.GROUP_PPK_KEY] = EcEncryptedValue.encryptValue(newUserGroupPpk.toPem(), this.GROUP_PPK_KEY, newUserGroup.owner, newUserGroup.reader);
            //     appLog('New user group created: ');
            //     appLog(newUserGroup);
            //     this.currentUserGroup = newUserGroup;
            //     this.userGroupBusy = false;
            //     this.fetchPersonListForDetailViewAndPopulateUserLists();
            // }, 300);
        },
        appendGroupSubGroupsToArray(groupId, subGroupArray) {
            let ugdo = this.userGroupDisplayMap[groupId];
            if (ugdo.subGroups && ugdo.subGroups.length > 0) {
                for (let sg of ugdo.subGroups) {
                    subGroupArray.push(sg.id);
                    this.appendGroupSubGroupsToArray(sg.id, subGroupArray);
                }
            }
        },
        getSubGroupsForUserGroup(groupId) {
            let sga = [];
            this.appendGroupSubGroupsToArray(groupId, sga);
            return sga;
        },
        createSubGroupForCurrentUserGroup() {
            this.createNewUserGroup(this.currentUserGroupId);
        },
        setCurrentUserGroupManagerAndUserListsForDetailView() {
            this.currentUserGroupManagers = [];
            this.currentUserGroupMembers = [];
            if (!this.currentUserGroup.employee) return;
            for (let empId of this.currentUserGroup.employee) {
                let p = this.allPersonMap[empId];
                if (p) {
                    if (this.isPersonIdAnObjectOwner(empId, this.currentUserGroup)) this.currentUserGroupManagers.push(p);
                    if (this.isPersonIdAnObjectReader(empId, this.currentUserGroup)) this.currentUserGroupMembers.push(p);
                }
            }
        },
        generateLineageObject(userGroup) {
            let lo = {};
            lo.name = userGroup.getName();
            lo.id = userGroup.shortId();
            return lo;
        },
        fillOutLineage(ugLineage, userGroup) {
            if (userGroup) {
                ugLineage.unshift(this.generateLineageObject(userGroup));
                if (userGroup.memberOf && userGroup.memberOf !== '') {
                    this.fillOutLineage(ugLineage, this.userGroupMap[userGroup.memberOf]);
                }
            }
        },
        buildUserGroupLineage(userGroup, inheritedLineage) {
            let ugLineage = [];
            if (!inheritedLineage) {
                this.fillOutLineage(ugLineage, userGroup);
            } else {
                ugLineage = inheritedLineage();
                ugLineage.push(this.generateLineageObject(userGroup));
            }
            return ugLineage;
        },
        showGroupDetails(userGroup, inheritedLineage) {
            if (userGroup) {
                this.currentUserGroupChanged = this.currentUserGroupIsNewGroup;
                this.currentUserGroup = userGroup;
                this.currentUserGroupId = userGroup.shortId();
                this.currentUserGroupNeedsRekey = false;
                this.isEditingCurrentGroupName = false;
                this.isEditingCurrentGroupDescription = false;
                this.currentUserGroupName = this.currentUserGroup.getName();
                this.currentUserGroupDescription = this.currentUserGroup.getDescription();
                this.currentUserGroupIsManager = this.doesAnyIdentityOwnObject(this.currentUserGroup);
                this.setCurrentUserGroupManagerAndUserListsForDetailView();
                this.currentUserGroupLineage = this.buildUserGroupLineage(this.currentUserGroup, inheritedLineage);
                this.showGroupDetailView();
            } else {
                appLog('Cannot find user group: ' + id);
            }
        },
        showGroupDetailsById(id) {
            let userGroup = this.userGroupMap[id];
            if (userGroup) {
                this.currentUserGroupIsNewGroup = false;
                this.showGroupDetails(userGroup, null);
            } else appLog('Cannot find user group: ' + id);
        },
        sortUserGroupList(userGroupList) {
            let me = this;
            userGroupList.sort(function(ug1, ug2) {
                let ug1Owned = me.doesAnyIdentityOwnObject(ug1);
                let ug2Owned = me.doesAnyIdentityOwnObject(ug2);
                if (ug1Owned !== ug2Owned) {
                    if (ug2Owned) return 1;
                    else return -1;
                } else {
                    if (ug1.getName() > ug2.getName()) return 1;
                    else if (ug2.getName() > ug1.getName()) return -1;
                    else return 0;
                }
            });
        },
        buildUserGroupMap(userGroupList) {
            this.userGroupMap = {};
            for (let ug of userGroupList) {
                this.userGroupMap[ug.shortId()] = ug;
            }
        },
        buildUserGroupDisplayObjects(userGroupList) {
            let ugDisplayObjs = {};
            ugDisplayObjs.doMap = {}; // map by ID
            ugDisplayObjs.doList = []; // list to preserve sort order
            for (let ug of userGroupList) {
                let ugdo = {};
                ugdo.id = ug.shortId();
                ugdo.name = ug.getName();
                // if (ug.memberOf && ug.memberOf !== '') ugdo.memberOf = ug.memberOf;
                // changing this a little bit so that dangling groups can be seen...if needed
                if (ug.memberOf && ug.memberOf !== '' && this.userGroupMap[ug.memberOf]) ugdo.memberOf = ug.memberOf;
                ugdo.subGroups = [];
                ugDisplayObjs.doMap[ugdo.id] = ugdo;
                ugDisplayObjs.doList.push(ugdo);
            }
            return ugDisplayObjs;
        },
        assignUserGroupDisplayObjectsSubGroups(ugDisplayObjs) {
            for (let ugdo of ugDisplayObjs.doList) {
                if (ugdo.memberOf) {
                    ugDisplayObjs.doMap[ugdo.memberOf].subGroups.push(ugdo);
                }
            }
        },
        addRootUserGroupsToUserGroupDisplayList(ugDisplayObjs) {
            for (let ugdo of ugDisplayObjs.doList) {
                if (!ugdo.memberOf) {
                    this.userGroupDisplayList.push(ugdo);
                }
            }
        },
        buildUserGroupDisplayList(userGroupList) {
            this.userGroupDisplayList = [];
            this.userGroupDisplayMap = {};
            let ugDisplayObjs = this.buildUserGroupDisplayObjects(userGroupList);
            this.assignUserGroupDisplayObjectsSubGroups(ugDisplayObjs);
            this.addRootUserGroupsToUserGroupDisplayList(ugDisplayObjs);
            this.userGroupDisplayMap = ugDisplayObjs.doMap;
        },
        buildInitialGroupMembersDisplayData() {
            let initGrpMemDispData = {};
            initGrpMemDispData.gmList = [];
            initGrpMemDispData.gmMap = {};
            for (let p of this.allPersonList) {
                let pdo = {};
                pdo.name = p.getName();
                pdo.email = p.email;
                pdo.managerOf = [];
                pdo.memberOf = [];
                initGrpMemDispData.gmList.push(pdo);
                initGrpMemDispData.gmMap[p.getFingerprint()] = pdo;
            }
            return initGrpMemDispData;
        },
        addMembershipData(gmMap, pdoKey, pkData, ug) {
            if (pkData) {
                for (let pk of pkData) {
                    let pkFingerprint = EcPk.fromPem(pk).fingerprint();
                    if (gmMap[pkFingerprint]) {
                        let mo = {};
                        mo.name = ug.getName();
                        mo.id = ug.shortId();
                        gmMap[pkFingerprint][pdoKey].push(mo);
                    }
                }
            }
        },
        fillOutMembershipData(initGrpMemDispData) {
            for (let ugKey of Object.keys(this.userGroupMap)) {
                let ug = this.userGroupMap[ugKey];
                this.addMembershipData(initGrpMemDispData.gmMap, 'managerOf', ug.owner, ug);
                this.addMembershipData(initGrpMemDispData.gmMap, 'memberOf', ug.reader, ug);
            }
        },
        filterOutNonMembers(initGrpMemDispData) {
            for (let gm of initGrpMemDispData.gmList) {
                if (gm.managerOf.length > 0 || gm.memberOf.length > 0) {
                    this.allGroupMembersList.push(gm);
                }
            }
        },
        buildGroupMembersDisplayList() {
            this.allGroupMembersList = [];
            let initGrpMemDispData = this.buildInitialGroupMembersDisplayData();
            this.fillOutMembershipData(initGrpMemDispData);
            this.filterOutNonMembers(initGrpMemDispData);
        },
        searchRepositoryForGroupsSuccess(ecoa) {
            let userGroupList = [];
            if (ecoa && ecoa.length > 0) {
                userGroupList = ecoa;
                this.sortUserGroupList(userGroupList);
            }
            this.buildUserGroupMap(userGroupList);
            this.buildUserGroupDisplayList(userGroupList);
            this.buildGroupMembersDisplayList();
            this.showMemberListView();
            this.userGroupBusy = false;
        },
        searchRepositoryForGroupsFailure(msg) {
            appLog("Group search failure: " + msg);
            this.userGroupBusy = false;
        },
        buildGroupListData() {
            let paramObj = {};
            paramObj.size = this.GROUP_SEARCH_SIZE;
            EcOrganization.search(window.repo, '', this.searchRepositoryForGroupsSuccess, this.searchRepositoryForGroupsFailure, paramObj);
        },
        sortAllPersonList() {
            this.allPersonList.sort(function(p1, p2) {
                if (p1.getName() > p2.getName()) return 1;
                else if (p2.getName() > p1.getName()) return -1;
                else return 0;
            });
        },
        buildAllPersonMap() {
            this.allPersonMap = {};
            for (let p of this.allPersonList) {
                this.allPersonMap[p.shortId()] = p;
            }
        },
        fetchPersonListForDetailViewSuccess(ecpa) {
            this.allPersonList = ecpa;
            this.sortAllPersonList();
            this.buildAllPersonMap();
            this.buildGroupListData();
        },
        fetchPersonListForDetailViewFailure(msg) {
            appLog("Person search failure: " + msg);
            this.userGroupBusy = false;
        },
        buildUserGroupData() {
            this.userGroupBusy = true;
            let paramObj = {};
            paramObj.size = this.PERSON_SEARCH_SIZE;
            EcPerson.search(window.repo, '', this.fetchPersonListForDetailViewSuccess, this.fetchPersonListForDetailViewFailure, paramObj);
        }
    },
    mounted() {
        this.buildUserGroupData();
        // *******************************************************************************
        // TAKE THIS OUT AT SOME POINT  JUST DONT WANT TO HAVE TO LOGIN every time
        // *******************************************************************************
        if (EcIdentityManager.ids.length <= 0) {
            console.log("USING BOBO LOGIN");
            // CAT Admin
            let tempIdent = new EcIdentity();
            tempIdent.ppk = EcPpk.fromPem("-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqRiQ0AxctuVuicg3yhriN39sRMkZmfsV9AdMMF6lHf5Ygnts0g/edqcaB57tuFPpCBvjvLXHKKBrfPMoZS3YdDFU4GfBo/uAa+uI7Tsz0PyWWw1Zv4AVptC80wOhcmyV8nl0OHmXXLQ2UkiL1x4wYHWiV293WPaoE/m4rD7EdK1memSoX7kFPkPZfQqEpjAROBtPJd+ebnjuBXXr6bUEhs6UBe9t371hQc41Ge7aS8KplJu/re9fFzNLDifSe3PPgjKIkwhHnt4somXJCPjuXITacoYVY+pdRac+W7PereOBZ+OYevnphbejU8DKxsEg8mOih6Nbn1LqEigGzv/oAQIDAQAB-----END PUBLIC KEY----");
            EcIdentityManager.addIdentity(tempIdent);
            let p = EcPerson.getBlocking("https://dev.api.cassproject.org/api/data/schema.org.Person/0bfd2fca207beb1d889a2461e4595a87");
            this.$store.commit('user/loggedOnPerson', p);
        }
    }
};
</script>
<style>
.cass-users-and-groups {
    width: calc(100vw - 72px);
}
</style>