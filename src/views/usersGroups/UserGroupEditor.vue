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
                            @showDetails="showGroupDetails"
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
                                    <div class="section box py-4 px-4">
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
                                                                    <a @click="showGroupDetails(memMgrOf.id)">
                                                                        {{memMgrOf.name}}
                                                                    </a>
                                                                </span>
                                                            </div>
                                                            <div v-if="member.memberOf.length > 0">
                                                                <b>Member of</b>
                                                                <br>
                                                                <span v-for="(memMemOf, memMemOfIdx) in member.memberOf">
                                                                    <span v-if="memMemOfIdx > 0">, </span>
                                                                    <a @click="showGroupDetails(memMemOf.id)">
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
                                        v-if="!isEditingName">
                                        {{ selectedGroupName }}
                                        <span
                                            class="icon"
                                            @click="isEditingName = true">
                                            <i class="fa fa-edit has-text-dark" />
                                        </span>
                                    </h3>
                                    <div
                                        class=""
                                        v-if="isEditingName">
                                        <label>Name of group</label>
                                        <input
                                            type="text"
                                            class="input">
                                    </div>
                                </template>
                                <!-- should display breadcrumbs about groups -->
                                <nav
                                    class="breadcrumb"
                                    aria-label="breadcrumbs">
                                    <ul>
                                        <li><a href="#">Groups</a></li>
                                        <li><a href="#">Developers</a></li>
                                        <li><a href="#">CaSS Developers</a></li>
                                    </ul>
                                </nav>
                                <p class="description">
                                    User groups provide the capability to assign multiple users the ability to assume a single shared ‘identity’.
                                    Members of a group are granted access to any CaSS object that the group has been explicitly assigned.
                                    These grouped rules can be applied at the configuration level in the
                                    configuration management screen or at the framework level in the framework editor.
                                </p>
                                <!-- TO DO: if we are creating a new group, hide this button until saved -->
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- modals go down at bottom please -->
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
        isEditingName: false,
        selectedGroupName: 'All Users',
        GROUP_SEARCH_SIZE: 10000,
        PERSON_SEARCH_SIZE: 10000,
        userGroupBusy: false,
        currentUserGroup: {},
        allPersonList: [],
        allPersonMap: {},
        allGroupMembersList: [],
        userGroupDisplayList: [],
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
        currentUserGroupIsReadOnly: function() {
            if (this.doesAnyIdentityOwnObject(this.currentUserGroup)) return false;
            else return true;
        }
    },
    methods: {
        showMemberListView() {
            this.viewMode = "memberList";
        },
        showGroupDetailView() {
            this.viewMode = "groupDetail";
        },
        showGroupDetails(id) {
            console.log('TODO showGroupDetails: ' + id);
        },
        createNewUserGroup() {
            console.log('TODO createNewUserGroup');
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
                if (ug.memberOf && ug.memberOf !== '') ugdo.memberOf = ug.memberOf;
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
            let ugDisplayObjs = this.buildUserGroupDisplayObjects(userGroupList);
            this.assignUserGroupDisplayObjectsSubGroups(ugDisplayObjs);
            this.addRootUserGroupsToUserGroupDisplayList(ugDisplayObjs);
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