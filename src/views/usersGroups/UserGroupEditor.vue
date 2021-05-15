<template>
    <div
        id="user-groups"
        class="cass-users-and-groups">
        <div class="section">
            <div class="container">
                <div class="columns is-mobile is-multiline">
                    <!-- desktop vs of navigation -->
                    <div class="column is-narrow is-hidden-touch">
                        <div class="cass-left-panel">
                            <!-- group nav tree -->
                            <div class="cass-left-panel---container">
                                <h3 class="title is-size-4 is-family-primary">
                                    My User Groups
                                </h3>
                                <div class="buttons">
                                    <div
                                        class="button is-rounded is-primary is-small"
                                        @click="createNewUserGroup(null)"
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
                                <cass-panel>
                                    <cass-panel-item
                                        :depth="0"
                                        label="Member List"
                                        :nodes="[]"
                                        id="all-members"
                                        @showDetails="showMemberListView"
                                        key="all-members" />
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
                        </div>
                    </div>
                    <!-- mobile vs of navigation -->
                    <div class="column is-12 is-hidden-desktop">
                        <cass-dropdown
                            @closeDropdown="groupsDropdownActive=false"
                            :label="currentUserGroupName"
                            :active="groupsDropdownActive"
                            @click="groupsDropdownActive = true"
                            @showDropdown="groupsDropdownActive = true">
                            <cass-dropdown-item
                                :depth="0"
                                label="Member List"
                                :nodes="[]"
                                id="all-members"
                                @showDetails="showMemberListView"
                                key="all-members" />
                            <cass-dropdown-item
                                :depth="0"
                                :label="group.name"
                                :nodes="group.subGroups"
                                :id="group.id"
                                v-for="group in userGroupDisplayList"
                                @showDetails="showGroupDetailsById"
                                :key="group" />
                        </cass-dropdown>
                    </div>
                    <div class="column">
                        <!-- main content section -->
                        <!-- member list section -->
                        <div class="px-2">
                            <div v-if="viewMode === 'memberList'">
                                <h3 class="title is-size-1 is-family-secondary">
                                    All Group Members
                                </h3>
                                <p>
                                    A view of all members within your groups and sub-groups.  Click a group name to view the group details.
                                </p>
                                <div v-if="allGroupMembersList.length === 0">
                                    <h3 class="title is-size-5">
                                        <i class="fa fa-info-circle" /> No user groups available
                                    </h3>
                                </div>
                                <div
                                    v-if="allGroupMembersList.length > 0"
                                    class="">
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
                                                                    {{ memMgrOf.name }}
                                                                </a>
                                                            </span>
                                                        </div>
                                                        <div v-if="member.memberOf.length > 0">
                                                            <b>Member of</b>
                                                            <br>
                                                            <span v-for="(memMemOf, memMemOfIdx) in member.memberOf">
                                                                <span v-if="memMemOfIdx > 0">, </span>
                                                                <a @click="showGroupDetailsById(memMemOf.id)">
                                                                    {{ memMemOf.name }}
                                                                </a>
                                                            </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <!-- group detail section -->
                            <div v-if="viewMode === 'groupDetail'">
                                <!-- group breadcrumbs -->
                                <nav
                                    class="breadcrumb pb-2"
                                    aria-label="breadcrumbs"
                                    v-if="currentUserGroupLineage && currentUserGroupLineage.length > 1">
                                    <ul>
                                        <li
                                            v-for="lineageObj in currentUserGroupLineage"
                                            :key="lineageObj.id">
                                            <a @click="showGroupDetailsById(lineageObj.id)">
                                                {{ lineageObj.name }}
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                                <!-- group name and description -->
                                <div class="columns">
                                    <div class="column is-8">
                                        <!-- name of grou -->
                                        <h2 class="is-size-1 is-family-secondary">
                                            Group Details
                                        </h2>
                                        <div
                                            class="columns is-multiline is-mobile"
                                            v-if="!isEditingCurrentGroupName">
                                            <div class="column is-12 pb-0">
                                                <label class="label">Group name</label>
                                            </div>
                                            <div class="column pt-0">
                                                <h3
                                                    class="subtitle is-size-3">
                                                    {{ currentUserGroupName }}
                                                </h3>
                                            </div>
                                            <div class="column is-narrow">
                                                <span
                                                    class="icon is-size-7 users-edit-icon"
                                                    v-if="currentUserGroupIsManager"
                                                    @click="isEditingCurrentGroupName = true">
                                                    <i class="fa fa-pencil-alt has-text-dark" />
                                                </span>
                                            </div>
                                        </div>
                                        <!-- group name input -->
                                        <div
                                            v-if="isEditingCurrentGroupName"
                                            class="pb-2">
                                            <div
                                                class="field">
                                                <label class="label">Group Name</label>
                                                <p class="control is-expanded">
                                                    <input
                                                        @keypress="setCurrentUserGroupAsChanged"
                                                        type="text"
                                                        class="input"
                                                        v-model="currentUserGroupName">
                                                </p>
                                            </div>
                                            <span
                                                @click="isEditingCurrentGroupName = false"
                                                class="button is-primary is-rounded is-small is-outlined">
                                                done editing
                                            </span>
                                        </div>
                                        <div
                                            class="field has-text-danger"
                                            v-if="currentUserGroupNameInvalid">
                                            <div class="label has-text-danger">
                                                Group name is required
                                            </div>
                                        </div>
                                        <!-- group description -->
                                        <div class="description pb-2">
                                            <div v-if="!isEditingCurrentGroupDescription">
                                                <div class="columns is-multiline is-mobile">
                                                    <div class="column is-12 pb-0">
                                                        <label class="label">
                                                            Group Description
                                                        </label>
                                                    </div>
                                                    <div class="column">
                                                        <div
                                                            :class="showMore && currentUserGroupDescription.trim().length > 300 ? 'cass__user-groups--description' : 'cass__user-groups--description-overflow'"
                                                            v-if="currentUserGroupDescription && currentUserGroupDescription.trim().length > 0">
                                                            <span v-if="showMore">
                                                                {{ currentUserGroupDescription }}
                                                            </span>
                                                            <span v-else>
                                                                {{ currentUserGroupDescription.trim(0, 300) }}
                                                            </span>
                                                            <span
                                                                v-if="showMore && currentUserGroupDescription.trim().length > 300"
                                                                title="Show more"
                                                                @click="showMore = false"
                                                                class="button is-small is-text has-text-primary">
                                                                <b>hide</b>
                                                            </span>
                                                            <span
                                                                v-else-if="currentUserGroupDescription.trim().length > 300"
                                                                title="Show more"
                                                                @click="showMore = true"
                                                                class="button is-small is-text has-text-primary">
                                                                <b>...</b>
                                                            </span>
                                                        </div>
                                                        <div v-else>
                                                            <i>No description</i>
                                                        </div>
                                                    </div>
                                                    <div class="column is-narrow">
                                                        <span
                                                            class="icon"
                                                            v-if="currentUserGroupIsManager"
                                                            @click="isEditingCurrentGroupDescription = true">
                                                            <i class="fa fa-pencil-alt is-size-7 has-text-dark" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                v-if="isEditingCurrentGroupDescription"
                                                class="pt-2">
                                                <label class="label">Group Description</label>
                                                <div
                                                    class="field">
                                                    <p class="control is-expanded">
                                                        <textarea
                                                            @keyup="setCurrentUserGroupAsChanged"
                                                            type="text"
                                                            :rows="3"
                                                            class="textarea"
                                                            v-model="currentUserGroupDescription" />
                                                    </p>
                                                </div>
                                                <div class="buttons">
                                                    <span
                                                        @click="isEditingCurrentGroupDescription = false"
                                                        class="button is-rounded is-primary is-small is-outlined"
                                                        :class="currentUserGroupChanged ? '' : 'is-disabled'"
                                                        :disabled="!currentUserGroupChanged">
                                                        done editing
                                                    </span>
                                                </div>
                                            </div>
                                            <div
                                                class="field has-text-danger"
                                                v-if="currentUserGroupDescriptionInvalid">
                                                <div class="label has-text-danger">
                                                    Group description is required
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column is-1" />
                                    <div class="column is-3 pt-3 pr-3">
                                        <div class="columns is-multiline px-2">
                                            <div
                                                class="cass-group--actions"
                                                v-if="currentUserGroupIsManager">
                                                <h5 class="title is-size-5">
                                                    Group actions
                                                </h5>
                                                <!-- group action buttons -->
                                                <div
                                                    v-if="currentUserGroupIsManager"
                                                    class="button my-1 is-small is-rounded is-small  is-fullwidth is-primary"
                                                    @click="showAddGroupMembersModal"
                                                    title="Add group members">
                                                    <span class="icon">
                                                        <i class="fa fa-plus" />
                                                    </span>
                                                    <span>
                                                        member
                                                    </span>
                                                </div>
                                                <div
                                                    v-if="currentUserGroupIsManager && currentUserGroupChanged"
                                                    :disabled="!currentUserGroupChanged"
                                                    :class=" currentUserGroupIsManager && currentUserGroupChanged ? '' : 'is-disabled'"
                                                    class="button is-rounded my-1 is-fullwidth is-primary is-small"
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
                                                    :disabled="!currentUserGroupChanged"
                                                    class="button is-fullwidth my-1 is-outlined is-rounded is-small"
                                                    :class="currentUserGroupIsManager && currentUserGroupChanged ? '' : 'is-disbaled'"
                                                    @click="cancelCurrentUserGroupChanges"
                                                    title="Cancel group changes">
                                                    <span class="icon">
                                                        <i class="fa fa-undo" />
                                                    </span>
                                                    <span>
                                                        Discard
                                                    </span>
                                                </div>
                                                <div
                                                    v-if="currentUserGroupIsManager && !currentUserGroupIsNewGroup"
                                                    class="button my-1 is-fullwidth is-rounded is-primary is-small"
                                                    @click="createSubGroupForCurrentUserGroup"
                                                    title="Create sub-group">
                                                    <span class="icon">
                                                        <i class="fa fa-plus" />
                                                    </span>
                                                    <span>
                                                        sub-group
                                                    </span>
                                                </div>
                                                <div
                                                    v-if="currentUserGroupIsManager && !currentUserGroupIsNewGroup"
                                                    class="button my-1 is-outlined is-fullwidth is-rounded is-small is-danger"
                                                    @click="showDeleteCurrentUserGroupConfirmModal"
                                                    title="Delete group and sub-groups">
                                                    <span class="icon">
                                                        <i class="fa fa-trash" />
                                                    </span>
                                                    <span>
                                                        Delete
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- group members table -->
                                <div class="pt-3">
                                    <div class="columns">
                                        <div class="column">
                                            <span class="subtitle is-size-4">
                                                {{ currentUserGroupName }} Members
                                            </span>
                                        </div>
                                    </div>
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
                                                    <th v-if="currentUserGroupIsManager" />
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <!-- group managers -->
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
                                                                v-if="isPersonRemovableFromCurrentUserGroup(manager.shortId())"
                                                                class="button is-small is-outlined is-warning"
                                                                @click="removeMemberFromCurrentUserGroup(manager.shortId())"
                                                                title="Remove manager">
                                                                <span class="icon">
                                                                    <i class="fa fa-trash" />
                                                                </span>
                                                            </div>
                                                            <button
                                                                v-else
                                                                class="button is-small is-outlined is-disabled"
                                                                disabled
                                                                title="Cannot remove: member of sub-group you do not manage.">
                                                                <span class="icon">
                                                                    <i class="fa fa-trash" />
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <!-- group members/non-managers -->
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
                                                                @click="changeMemberToManager(member.shortId())"
                                                                title="Change role to manager">
                                                                <span class="icon">
                                                                    <i class="fa fa-arrow-up" />
                                                                </span>
                                                                <span>
                                                                    change role
                                                                </span>
                                                            </div>
                                                            <div
                                                                v-if="isPersonRemovableFromCurrentUserGroup(member.shortId())"
                                                                class="button is-small is-outlined is-warning"
                                                                @click="removeMemberFromCurrentUserGroup(member.shortId())"
                                                                title="Remove member">
                                                                <span class="icon">
                                                                    <i class="fa fa-trash" />
                                                                </span>
                                                            </div>
                                                            <button
                                                                v-else
                                                                class="button is-small is-outlined is-disabled"
                                                                disabled
                                                                title="Cannot remove: member of sub-group you do not manage.">
                                                                <span class="icon">
                                                                    <i class="fa fa-trash" />
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
        <!-- add member search modal -->
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
                        <i class="fa fa-info-circle" /> No group members available. Users must be managers or members of any parent groups in order to be available for sub-groups.
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
                                            <i class="fa fa-user" />
                                        </th>
                                        <th title="Add as manager">
                                            <i class="fa fa-user-shield" />
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
                            @click="applySelectedNewMembersToCurrentUserGroup"
                            title="Apply new members">
                            <span class="icon">
                                <i class="fa fa-save" />
                            </span>
                            <span>
                                apply
                            </span>
                        </div>
                        <div
                            class="button is-outlined is-small"
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
        <!-- group deletion confirm modal-->
        <div
            class="modal"
            :class="[{'is-active': showConfirmDeleteUserGroupModal}]">
            <div class="modal-background" />
            <div class="modal-card">
                <header class="modal-card-head has-background-primary">
                    <p class="modal-card-title">
                        <span class="title has-text-white">
                            Delete User Group?
                        </span>
                    </p>
                    <button
                        class="delete"
                        @click="closeDeleteGroupConfirmModal"
                        aria-label="close" />
                </header>
                <section class="modal-card-body">
                    Are you sure you wish to delete the user group <b>'{{ currentUserGroupName }}'</b>?
                    <div
                        class="field has-text-danger pt-4"
                        v-if="deleteConfirmNumberOfSubGroups > 0">
                        <div class="label has-text-danger">
                            <i class="fa fa-exclamation-triangle" /> Warning! Deleting this group will also delete all of
                            its sub-groups (<b>{{ deleteConfirmNumberOfSubGroups }}</b>).  This is non-reversible.
                        </div>
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <div class="buttons is-right">
                        <div
                            class="button is-outlined"
                            @click="closeDeleteGroupConfirmModal"
                            title="Cancel user group delete">
                            <span class="icon">
                                <i class="fa fa-times" />
                            </span>
                            <span>
                                cancel
                            </span>
                        </div>
                        <div
                            class="button is-outlined is-warning"
                            @click="deleteCurrentUserGroupAndSubGroups"
                            title="Confirm user group delete">
                            <span class="icon">
                                <i class="fa fa-trash" />
                            </span>
                            <span>
                                delete
                            </span>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    </div>
</template>
<script>
import CassPanel from '@/components/Panel';
import CassPanelItem from '@/components/PanelItem';
import CassDropdown from '@/components/Dropdown';
import CassDropdownItem from '@/components/DropdownItem';
import {cassUtil} from '@/mixins/cassUtil';

export default {
    name: 'UserGroupEditor',
    mixins: [cassUtil],
    data: () => ({
        displayLength: 300,
        showMore: false,
        groupsDropdownActive: false,
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
        currentUserGroupInvalid: false,
        currentUserGroupNameInvalid: false,
        currentUserGroupDescriptionInvalid: false,
        membersToRemove: [],
        userGroupsToSave: [],
        numberOfUserGroupsToSave: 0,
        numberOfUserGroupsSaved: 0,
        userGroupsToDelete: [],
        numberOfUserGroupsToDelete: 0,
        numberOfUserGroupsDeleted: 0,
        showAddMemberModal: false,
        showConfirmDeleteUserGroupModal: false,
        deleteConfirmNumberOfSubGroups: 0,
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
        userGroupIdToShowAfterReload: '',
        viewMode: 'memberList'
    }),
    components: {
        CassPanel,
        CassPanelItem,
        CassDropdown,
        CassDropdownItem
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
    beforeRouteLeave(to, from, next) {
        if (this.currentUserGroupChanged) {
            this.saveWorkBeforeNav(to);
        } else {
            next();
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
            this.currentUserGroupManagers = this.currentUserGroupManagers.filter(mgr => mgr.shortId() !== personId);
            this.currentUserGroupMembers.push(this.allPersonMap[personId]);
            this.currentUserGroupChanged = true;
        },
        changeMemberToManager(personId) {
            this.currentUserGroupMembers = this.currentUserGroupMembers.filter(mem => mem.shortId() !== personId);
            this.currentUserGroupManagers.push(this.allPersonMap[personId]);
            this.currentUserGroupChanged = true;
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
        removePersonFromMembersToRemoveBuffer(personId) {
            this.membersToRemove = this.membersToRemove.filter(p => p !== personId);
        },
        applySelectedNewMembersToCurrentUserGroup() {
            for (let newMemId of this.selectedNewMembers) {
                this.currentUserGroupMembers.push(this.allPersonMap[newMemId]);
                this.removePersonFromMembersToRemoveBuffer(newMemId);
            }
            for (let newMgrId of this.selectedNewManagers) {
                this.currentUserGroupManagers.push(this.allPersonMap[newMgrId]);
                this.removePersonFromMembersToRemoveBuffer(newMgrId);
            }
            this.currentUserGroupChanged = true;
            this.closeAddGroupMemberModal();
        },
        removeMemberFromCurrentUserGroup(personId) {
            this.membersToRemove.push(personId);
            this.currentUserGroupManagers = this.currentUserGroupManagers.filter(mgr => mgr.shortId() !== personId);
            this.currentUserGroupMembers = this.currentUserGroupMembers.filter(mem => mem.shortId() !== personId);
            this.currentUserGroupChanged = true;
        },
        isPersonRemovableFromCurrentUserGroup(personId) {
            // A person can't be removed if he/she is also a member of a sub-group of which the logged in person is not a manager
            // This isn't 100% fool proof but it works for now
            let subGroupIds = this.getSubGroupIdsForUserGroup(this.currentUserGroupId);
            for (let sgId of subGroupIds) {
                let ug = this.userGroupMap[sgId];
                if (ug.employee.includes(personId) && !this.isPersonalIdentityAnObjectOwner(ug)) return false;
            }
            return true;
        },
        closeDeleteGroupConfirmModal() {
            this.showConfirmDeleteUserGroupModal = false;
        },
        showDeleteCurrentUserGroupConfirmModal() {
            this.deleteConfirmNumberOfSubGroups = this.getSubGroupIdsForUserGroup(this.currentUserGroupId).length;
            this.showConfirmDeleteUserGroupModal = true;
        },
        addCurrentUserGroupSubGroupsToGroupsToDelete() {
            let subGroupIds = this.getSubGroupIdsForUserGroup(this.currentUserGroupId);
            for (let sgid of subGroupIds) {
                this.userGroupsToDelete.push(this.userGroupMap[sgid]);
            }
        },
        checkUserGroupDeleteStatus() {
            if (this.numberOfUserGroupsDeleted >= this.numberOfUserGroupsToDelete) {
                this.buildUserGroupData();
            } else {
                this.deleteUserGroup(this.numberOfUserGroupsDeleted);
            }
        },
        handleDeleteUserGroupSuccess() {
            appLog("Delete user group success...");
            this.numberOfUserGroupsDeleted++;
            this.checkUserGroupDeleteStatus();
        },
        handleDeleteUserGroupFailure(msg) {
            appLog("Delete user group failure: " + msg);
            this.numberOfUserGroupsDeleted++;
            this.checkUserGroupDeleteStatus();
        },
        deleteUserGroup(ugIdx) {
            let grp = this.userGroupsToDelete[ugIdx];
            window.repo.deleteRegistered(grp, this.handleDeleteUserGroupSuccess, this.handleDeleteUserGroupFailure);
        },
        deleteCurrentUserGroupAndSubGroups() {
            this.userGroupBusy = true;
            this.showConfirmDeleteUserGroupModal = false;
            this.userGroupsToDelete = [];
            this.numberOfUserGroupsDeleted = 0;
            this.addCurrentUserGroupSubGroupsToGroupsToDelete();
            this.userGroupsToDelete.push(this.currentUserGroup);
            this.numberOfUserGroupsToDelete = this.userGroupsToDelete.length;
            if (this.currentUserGroup.memberOf && this.currentUserGroup.memberOf !== '') {
                this.userGroupIdToShowAfterReload = this.currentUserGroup.memberOf;
            } else this.userGroupIdToShowAfterReload = '';
            this.deleteUserGroup(0);
        },
        setCurrentUserGroupValidationsChecksToValid() {
            this.currentUserGroupInvalid = false;
            this.currentUserGroupNameInvalid = false;
            this.currentUserGroupDescriptionInvalid = false;
        },
        validateCurrentUserGroupFields() {
            this.setCurrentUserGroupValidationsChecksToValid();
            if (!this.currentUserGroupName || this.currentUserGroupName.trim().equals('')) {
                this.currentUserGroupInvalid = true;
                this.currentUserGroupNameInvalid = true;
            }
            if (!this.currentUserGroupDescription || this.currentUserGroupDescription.trim().equals('')) {
                this.currentUserGroupInvalid = true;
                this.currentUserGroupDescriptionInvalid = true;
            }
        },
        checkUserGroupSaveStatus() {
            if (this.numberOfUserGroupsSaved >= this.numberOfUserGroupsToSave) {
                this.currentUserGroupChanged = false;
                this.buildUserGroupData();
            } else {
                this.saveUserGroup(this.numberOfUserGroupsSaved);
            }
        },
        handleSaveUserGroupSuccess() {
            appLog("Save user group success...");
            this.numberOfUserGroupsSaved++;
            this.checkUserGroupSaveStatus();
        },
        handleSaveUserGroupFailure(msg) {
            appLog("Save user group failure: " + msg);
            this.numberOfUserGroupsSaved++;
            this.checkUserGroupSaveStatus();
        },
        saveUserGroup(ugIdx) {
            let grp = this.userGroupsToSave[ugIdx];
            if (this.currentUserGroupNeedsRekey) {
                appLog('Calling group save with rekey: ' + grp.shortId());
                setTimeout(() => {
                    grp.rekeyAndSave(this.handleSaveUserGroupSuccess, this.handleSaveUserGroupFailure, window.repo);
                }, 300);
            } else {
                grp.save(this.handleSaveUserGroupSuccess, this.handleSaveUserGroupFailure, window.repo);
            }
        },
        updateCurrentUserGroupMemberList() {
            this.currentUserGroup.employee = [];
            this.currentUserGroup.owner = [];
            this.currentUserGroup.reader = [];
            for (let gm of this.currentUserGroupManagers) {
                let gmEcPk = this.getPersonEcPk(gm);
                if (gmEcPk) {
                    this.currentUserGroup.addEmployee(gm);
                    this.currentUserGroup.addOwner(gmEcPk);
                }
            }
            for (let gu of this.currentUserGroupMembers) {
                let guEcPk = this.getPersonEcPk(gu);
                if (guEcPk) {
                    this.currentUserGroup.addEmployee(gu);
                    this.currentUserGroup.addReader(guEcPk);
                }
            }
        },
        pushRemovedMembersToSubGroupsForSave() {
            let alreadyInSaveBuffer = [];
            for (let mtrId of this.membersToRemove) {
                let memberToRemove = this.allPersonMap[mtrId];
                if (memberToRemove) {
                    let memberPk = this.getPersonEcPk(memberToRemove);
                    if (memberPk) {
                        let subGroupIds = this.getSubGroupIdsForUserGroup(this.currentUserGroupId);
                        for (let sgId of subGroupIds) {
                            let subGroup = this.userGroupMap[sgId];
                            if (subGroup && this.isPersonalIdentityAnObjectOwner(subGroup) && subGroup.employee.includes(mtrId)) {
                                subGroup.removeEmployeeById(mtrId);
                                subGroup.removeOwner(memberPk);
                                subGroup.removeReader(memberPk);
                                if (!alreadyInSaveBuffer.includes(subGroup.shortId())) {
                                    this.userGroupsToSave.push(subGroup);
                                    alreadyInSaveBuffer.push(subGroup.shortId());
                                }
                            }
                        }
                    }
                }
            }
        },
        saveCurrentUserGroup() {
            this.validateCurrentUserGroupFields();
            if (!this.currentUserGroupInvalid) {
                this.userGroupBusy = true;
                this.updateCurrentUserGroupMemberList();
                this.currentUserGroup.name = this.currentUserGroupName;
                this.currentUserGroup.description = this.currentUserGroupDescription;
                this.userGroupIdToShowAfterReload = this.currentUserGroup.shortId();
                this.userGroupsToSave = [];
                this.numberOfUserGroupsSaved = 0;
                this.pushRemovedMembersToSubGroupsForSave();
                // this.currentUserGroupNeedsRekey = false;
                this.currentUserGroupNeedsRekey = this.membersToRemove.length > 0;
                this.userGroupsToSave.push(this.currentUserGroup);
                this.numberOfUserGroupsToSave = this.userGroupsToSave.length;
                this.saveUserGroup(0);
            }
        },
        cancelCurrentUserGroupChanges() {
            this.currentUserGroupChanged = false;
            if (this.currentUserGroupIsNewGroup) {
                if (this.currentUserGroup.memberOf && this.currentUserGroup.memberOf !== '') {
                    this.showGroupDetailsById(this.currentUserGroup.memberOf);
                } else {
                    this.showMemberListView();
                }
            } else this.showGroupDetailsById(this.currentUserGroupId);
        },
        createNewUserGroup(parentGroupId) {
            this.userGroupBusy = true;
            this.currentUserGroupIsNewGroup = true;
            let newUserGroup = new EcOrganization();
            newUserGroup.generateId(window.repo.selectedServer);
            newUserGroup.setName('New User Group');
            newUserGroup.setDescription('New group of users');
            newUserGroup.employee = [];
            newUserGroup.addEmployee(this.$store.state.user.loggedOnPerson);
            newUserGroup.addOwner(this.getPersonalIdentityPk());
            let parentGroupLineage = null;
            if (parentGroupId) {
                newUserGroup.memberOf = parentGroupId;
                let parentGroup = this.userGroupMap[parentGroupId];
                parentGroupLineage = this.buildUserGroupLineage(parentGroup, null);
            }
            // Vue wasn't updating the this.userGroupBusy before it got busy generating the key.  Putting this timeout here
            // to let it 'catch up'.  Seems to be 'work' ok.
            setTimeout(() => {
                newUserGroup.addOrgKey(EcPpk.generateKey());
                this.showGroupDetails(newUserGroup, parentGroupLineage);
                this.userGroupBusy = false;
            }, 300);
        },
        appendGroupSubGroupIdsToArray(groupId, subGroupArray) {
            let ugdo = this.userGroupDisplayMap[groupId];
            if (ugdo && ugdo.subGroups && ugdo.subGroups.length > 0) {
                for (let sg of ugdo.subGroups) {
                    subGroupArray.push(sg.id);
                    this.appendGroupSubGroupIdsToArray(sg.id, subGroupArray);
                }
            }
        },
        getSubGroupIdsForUserGroup(groupId) {
            let sga = [];
            this.appendGroupSubGroupIdsToArray(groupId, sga);
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
                ugLineage = inheritedLineage;
                ugLineage.push(this.generateLineageObject(userGroup));
            }
            return ugLineage;
        },
        showGroupDetails(userGroup, inheritedLineage) {
            if (userGroup) {
                this.membersToRemove = [];
                this.userGroupsToSave = [];
                this.userGroupsToDelete = [];
                this.setCurrentUserGroupValidationsChecksToValid();
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
            }
        },
        showGroupDetailsById(id) {
            if (this.currentUserGroupChanged) {
                this.showModal(id);
            } else {
                this.switchUserGroupDetailsById(id);
                this.groupsDropdownActive = false;
            }
        },
        switchUserGroupDetailsById(id) {
            let userGroup = this.userGroupMap[id];
            if (userGroup) {
                this.currentUserGroupIsNewGroup = false;
                this.showGroupDetails(userGroup, null);
                this.groupsDropdownActive = false;
            } else {
                appLog('Cannot find user group: ' + id);
            }
        },
        saveWorkBeforeNav(val) {
            let params = {};
            var me = this;
            appLog("modal");
            params = {
                type: 'removeObject',
                selectedExportOption: '',
                title: "Discard unsaved changes?",
                text: "You have unsaved changes.  Cancel to return to group and save changes, or confirm to discard changes.",
                onConfirm: () => {
                    this.currentUserGroupChanged = false;
                    return this.$router.push(val.name);
                }
            };
            // reveal modal
            this.$modal.show(params);
        },
        showModal(val) {
            let params = {};
            var me = this;
            appLog("modal");
            params = {
                type: 'removeObject',
                selectedExportOption: '',
                title: "Discard unsaved changes?",
                text: "You have unsaved changes.  Cancel to return to group and save changes, or confirm to discard changes.",
                onConfirm: () => {
                    return this.switchUserGroupDetailsById(val);
                }
            };
            // reveal modal
            this.$modal.show(params);
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
        sortMembershipData(membershipData) {
            membershipData.sort((mo1, mo2) => (mo1.name > mo2.name) ? 1 : -1);
        },
        sortGroupMemberListMembershipData() {
            for (let gm of this.allGroupMembersList) {
                this.sortMembershipData(gm.managerOf);
                this.sortMembershipData(gm.memberOf);
            }
        },
        buildGroupMembersDisplayList() {
            this.allGroupMembersList = [];
            let initGrpMemDispData = this.buildInitialGroupMembersDisplayData();
            this.fillOutMembershipData(initGrpMemDispData);
            this.filterOutNonMembers(initGrpMemDispData);
            this.sortGroupMemberListMembershipData();
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
            if (this.userGroupIdToShowAfterReload && this.userGroupIdToShowAfterReload.trim().length > 0 && this.userGroupMap[this.userGroupIdToShowAfterReload]) {
                let goToId = this.userGroupIdToShowAfterReload;
                this.userGroupIdToShowAfterReload = '';
                this.showGroupDetailsById(goToId);
            } else this.showMemberListView();
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
    }
};
</script>
<style lang="scss">
.cass-users-and-groups {
    width: calc(100vw - 72px);
}
.cass__user-groups--description {
    height: fit-content;
    position: relative;
    padding-right: 1.25rem;
    .button {
        position: absolute;
        right: 0;
        bottom: 0rem;
    }
}
.cass__user-groups--description-overflow {
    height: 4.75rem;
    position: relative;
    max-width: 100%;
    white-space: wrap;
    display: inline-block;
    overflow: hidden;
    padding-right: 1.5rem;
    .button {
        position: absolute;
        right: 0;
        top: 3rem;
    }
}
.cass__user-groups--description-overflow::after {
    content: "";
    width: 1rem;
    height: 1rem;
}

</style>