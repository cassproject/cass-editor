<template>
    <div>
        <!-- busy modal-->
        <div
            class="modal"
            :class="[{'is-active': userGroupBusy}]">
            <div class="modal-background"></div>
            <div class="modal-content has-text-centered">
                <span class="icon is-large has-text-center has-text-link">
                    <i class="fas fa-3x fa-spinner is-info fa-pulse" />
                </span>
            </div>
        </div>
        <!-- user group editor content-->
        <div v-if="!userGroupBusy">
            <h3>Configuration</h3>
            <div v-if="userGroupViewMode.equals('list')">
                <h4>User Groups</h4>
                <div class="columns">
                    <div class="column is-3 listHdr">name</div>
                    <div class="column is-5 listHdr">description</div>
                    <div class="column is-2 listHdr">number of members</div>
                    <div class="column is-2 listHdr"></div>
                </div>
                <user-group-list-item
                    v-for="grp in userGroupList"
                    :id="grp.id"
                    :name="grp.name"
                    :description="grp.description"
                    :numMembers="getUserGroupNumMembers(grp)"
                    :isOwned="doesAnyIdentityOwnObject(grp)"
                    @showDetails="showUserGroupDetails">
                </user-group-list-item>
                <br>
                <button @click="createNewUserGroup" :disabled="!amLoggedIn">create new group</button>
            </div>
            <div v-if="userGroupViewMode.equals('detail')">
                <h4>Configuration Details</h4>
                <user-group-details
                    :group="currentUserGroup"
                    :readOnly="currentUserGroupIsReadOnly"
                    @save="saveCurrentUserGroup"
                    @cancel="cancelEditCurrentUserGroup"
                    @back="backFromEditCurrentUserGroup">
                </user-group-details>
            </div>
        </div>
    </div>
</template>


<script>
import UserGroupListItem from '../../components/userGroups/UserGroupListItem';
import UserGroupDetails from "../../components/userGroups/UserGroupDetails";
import {cassUtil} from '../../mixins/cassUtil';

export default {
    name: 'UserGroupEditor',
    components: {
        UserGroupDetails,
        UserGroupListItem
    },
    data: () => ({
        userGroupViewMode: "list",
        userGroupBusy: false,
        currentUserGroup: {},
        userGroupList: []
    }),
    computed: {
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
        saveCurrentUserGroup() {
            // TODO implement
        },
        cancelEditCurrentUserGroup() {
            // TODO implement
        },
        backFromEditCurrentUserGroup() {
            // TODO implement
        },
        showUserGroupDetails() {
            // TODO implement
        },
        createNewUserGroup() {
            // TODO implement
        },
        buildUserGroupData() {
            // TODO implement
        }
    },
    mounted() {
        this.buildUserGroupData();
    }
};
</script>
