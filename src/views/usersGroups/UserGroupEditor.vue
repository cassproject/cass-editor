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
            <h3>User Groups</h3>
            <div v-if="userGroupViewMode.equals('list')">
                <h4>Groups</h4>
                <div v-if="userGroupList.length === 0">
                    <p>No user groups are available.</p>
                </div>
                <div v-if="userGroupList.length > 0">
                    <div class="columns">
                        <div class="column is-3 listHdr">name</div>
                        <div class="column is-5 listHdr">description</div>
                        <div class="column is-2 listHdr">number of members</div>
                        <div class="column is-2 listHdr"></div>
                    </div>
                    <user-group-list-item
                        v-for="grp in userGroupList"
                        :id="grp.shortId()"
                        :name="grp.getName()"
                        :description="grp.getDescription()"
                        :numMembers="getUserGroupNumMembers(grp)"
                        :isOwned="doesAnyIdentityOwnObject(grp)"
                        @showDetails="showUserGroupDetails">
                    </user-group-list-item>
                </div>
                <br>
                <button @click="createNewUserGroup" :disabled="!amLoggedIn" :title="getCreateUserGroupButtonTitle">create new group</button>
            </div>
            <div v-if="userGroupViewMode.equals('detail')">
                <h4>User Group Details</h4>
                <user-group-details
                    :group="currentUserGroup"
                    :personList="personList"
                    :groupManagers="currentUserGroupManagers"
                    :groupUsers="currentUserGroupUsers"
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
    mixins: [cassUtil],
    name: 'UserGroupEditor',
    components: {
        UserGroupDetails,
        UserGroupListItem
    },
    data: () => ({
        GROUP_SEARCH_SIZE: 10000,
        PERSON_SEARCH_SIZE: 10000,
        GROUP_PPK_KEY: 'https://schema.cassproject.org/0.3/ppk',
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
        saveCurrentUserGroup(groupManagers, groupUsers) {
            // TODO implement
            console.log("WOULD HAVE TRIGGERED SAVE");
            console.log(groupManagers);
            console.log(groupUsers);
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
            console.log("Person search failure: " + msg);
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
            newUserGroup.setName('New User Group');
            newUserGroup.setDescription('New group of users');
            newUserGroup.employee = [];
            newUserGroup.addEmployee(this.$store.state.editor.loggedOnPerson);
            this.addAllIdentityPksAsOwners(newUserGroup);
            let newUserGroupPpk = EcPpk.generateKey();
            newUserGroup[this.GROUP_PPK_KEY] = EcEncryptedValue.encryptValue(newUserGroupPpk.toPem(), this.GROUP_PPK_KEY, newUserGroup.owner, newUserGroup.reader);
            console.log('New user group created: ');
            console.log(newUserGroup);
            this.currentUserGroup = newUserGroup;
            this.userGroupBusy = false;
            this.fetchPersonListForDetailViewAndPopulateUserLists();
        },
        searchRepositoryForGroupsSuccess(ecoa) {
            console.log("Group search success: ");
            console.log(ecoa);
            if (ecoa && ecoa.length > 0) this.userGroupList = ecoa;
            else this.userGroupList = [];
            this.userGroupBusy = false;
        },
        searchRepositoryForGroupsFailure(msg) {
            console.log("Group search failure: " + msg);
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
        // *******************************************************************************
        // TAKE THIS OUT AT SOME POINT  JUST DONT WANT TO HAVE TO LOGIN every time
        // *******************************************************************************
        if (EcIdentityManager.ids.length <= 0) {
            let tempIdent = new EcIdentity();
            tempIdent.ppk = EcPpk.fromPem("-----BEGIN RSA PRIVATE KEY-----MIIEowIBAAKCAQEA6at3xRErrHESxqie/SbKm84QQXIe6HVfoT7nZTQZzbRQdyiHzJufcJ6WhchofF1PE2aAniWqR1HM7af8LxdtVzir4JKzypHmuoQGyzDjTPH10lD6NSHTokLSHGpftm3aRvWjU/Vrw9JC40eXR1naxV4vJMOI8LY/CEg6kTSvLseHbUpGb9XT/NWD7cIAczMp45DCUf3qoZtaWltB0RV15tPKWImLX5tME8Plygq4P/9mMDU4H5Oili38s0383tO/nYFOtehQ5wfEoMgfGEHsQy/xw4DGyCPyGWiTNQwhPD1ybtQc2J+HueC+nwqgZOH/PA2KieCglk0OB28VoZ0oPwIDAQABAoIBADTDAOJAhEoFpiWxQWUL80fG+aitagk3J4azO3CAmSr3ggvF3RP4N8IoLPi8Tct3DjnlNTmAa7h64fjvq2O+uHOvWi/1MB+XXi/TS+1pdomTQNxiaHzCzJSg3eyIoGAC4fyPzndQvSqUOYI0UhZMVbenEqIMfMlNfWITXRYYfU3kVVJCM84ax6GlhLlpDIdo49c9jmacsBKjH1qWYPi+Aynt4MyY3MxU3GqQpamXKBJegjXXQpFzvVlAm2WSf7gSAiDgr1fHqrtjRbHa0HMdMMta85DvC2o8s9zMmdiBCmpJwoM4MAukzRyGq8FqC5Aa20fZryCJ4lIhW2KPiivykWECgYEA+8v/QkuIZTW+k7VapKZm+kF1HU6pn9wOZdUzivBoVTYmBfavChrJuk1sWo7c8mCjG4LP+BKV6cZGAK+1nRheqU1k1M+G0OxAe1qkxh7dMvOaQwg23NhWVhEzA5OrgCFHJr3uNIV+gXH+4HfRPxzx6fVUmbTnahPskFSDAi8BPDcCgYEA7ZICJiXHtgt486EsnC5phZwzsoD5mHVuwAm+gW/dmleaK9xFh+0C9tljROMBdQWvvDEFMg9xPCscUmfDDBq2GIMP1/eg4H5KS4Dg+xuMlXTjGYqhr6Y+OniCq/K0e2dasFuiI+hXTDexj/UX3vpBVTQXYT24+1gjBDjoveR/QDkCgYBiiIvVN5WidYukZb2Y3P1DRUY9N8EtK4H+25WV80oAvnXWs5f/zkfOvel+7pULzEFHzMLxguRjXRGbxya82QKCIiUpGiTZsPnyy5/bX8yT2bwuKxK9DXOLrqNV7P2Z4Gvlf0GuD+dXZHKnCHw7xGnucfCvTZmZaz6RpGC4BAjptQKBgHAyX49ykkH4YxP0T2QnSzCNl6C65qXI+Bf7whvRIAAvVSFXswLBvX+lJQu4hcylddxT7lc5EcpPtd15IZWK2+rxor7lNPYwzpef8yDEXv2KqWI7paaVxZfJqDTat7/8DMlzTTzWErxtJQ+OucpVuBssMcp74uvZMRhiZBCiZDKJAoGBAN1XsaLCJYi5Cogc4HV9bAt2Q5L1nn62OU32NbMwmpr4ibmQe0xESDEDVEaeB1RfycTyVe3P9ydKbycMJ+cswBFme1ZW/RzO47lsr70scUiu80UxH5g2IkjEeF0FtM1CBgKr2M2re/wwXRS1+tXm35/oEIW+9SCNFrUu4ivceVWF-----END RSA PRIVATE KEY-----");
            EcIdentityManager.addIdentity(tempIdent);
            let p = EcPerson.getBlocking("https://dev.api.cassproject.org/api/data/schema.org.Person/2e522c778a1f0a2b31db7b2848ba4212");
            this.$store.commit('editor/loggedOnPerson', p);
        }
    }
};
</script>


<style lang="scss" scoped>
    h3 {
        font-size: 2rem;
        padding-bottom: 1rem;
    }
    h4 {
        font-size: 1.6rem;
        padding-bottom: 1rem;
    }
    h4 {
        font-size: 1.3rem;
        padding-bottom: .5rem;
    }
    .listHdr {
        font-weight: bold;
    }
</style>
