<template>
    <div>
        <!-- member search modal -->
        <div
            class="modal"
            :class="[{'is-active': showAddMemberModal}]">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="subtitle is-size-3 modal-card-title">
                        {{ addMemberModalTitle }}
                        <button
                            class="delete is-pulled-right"
                            aria-label="close"
                            @click="closeAddMemberModal">
                        </button>
                    </p>
                </header>
                <div class="modal-card-body has-text-dark">
                    <div>
                        <div class="columns">
                            <div class="column is-3 listHdr">
                                <label>Available Members:</label>
                            </div>
                            <div class="column is-9 listHdr">
                                <input type="text" v-model="selectedPersonsFilter" placeholder="person filter">
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column is-1 listHdr"></div>
                            <div class="column is-4 listHdr">name</div>
                            <div class="column is-4 listHdr">email</div>
                        </div>
                    </div>
                    <div class="selectBox">
                        <div class="columns is-multiline" v-for="prs in filteredPersons">
                            <div class="column is-1">
                                <input :id="prs.shortId()" :value="prs.shortId()" name="prs.shortId()" type="checkbox" v-model="selectedPersons" />
                            </div>
                            <div class="column is-4">{{ prs.getName() }}</div>
                            <div class="column is-4">{{ prs.email }}</div>
                        </div>
                    </div>
                    <br>
                    <div v-if="!readOnly">
                        <button @click="applyAddMembers">apply</button>
                        <button @click="closeAddMemberModal">cancel</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- ************************************** Content ************************************************ -->
        <label>Name: </label>
        <div v-if="readOnly">
            {{ group.name }}
        </div>
        <div v-if="!readOnly">
            <input type="text" v-model="group.name">
        </div>
        <br>
        <label>Description: </label>
        <div v-if="readOnly">
            {{ group.description }}
        </div>
        <div v-if="!readOnly">
            <input type="text" v-model="group.description">
        </div>
        <br>
        <h5>Managers</h5>
        <button v-if="!readOnly" @click="addManagers">add managers</button>
        <div class="columns">
            <div class="column is-3 listHdr">name</div>
            <div class="column is-3 listHdr">email</div>
            <div class="column is-2 listHdr"></div>
        </div>
        <div class="columns is-multiline" v-for="(mgr, mgrIdx) in localGroupManagers">
            <div class="column is-3">{{ mgr.getName() }}</div>
            <div class="column is-3">{{ mgr.email }}</div>
            <div class="column is-2">
                <div v-if="!readOnly && !areAnyIdentitiesThisPerson(mgr)">
                    <button @click="moveManagerToUser(mgrIdx)">reassign as user</button>
                    <button @click="removeManager(mgrIdx)">remove</button>
                </div>
            </div>
        </div>
        <br>
        <br>
        <h5>Users</h5>
        <button v-if="!readOnly" @click="addUsers">add users</button>
        <div v-if="groupUsers.length === 0">
            <p>No users assigned to this group</p>
        </div>
        <div v-if="groupUsers.length > 0">
            <div class="columns">
                <div class="column is-3 listHdr">name</div>
                <div class="column is-3 listHdr">email</div>
                <div class="column is-2 listHdr"></div>
            </div>
            <div class="columns is-multiline" v-for="(usr, usrIdx) in localGroupUsers">
                <div class="column is-3">{{ usr.getName() }}</div>
                <div class="column is-3">{{ usr.email }}</div>
                <div class="column is-2">
                    <div v-if="!readOnly && !areAnyIdentitiesThisPerson(usr)">
                        <button @click="moveUserToManager(usrIdx)">reassign as manager</button>
                        <button @click="removeUser(usrIdx)">remove</button>
                    </div>
                </div>
            </div>
        </div>
        <br>
        <br>
        <!-- ************************************** Validation ************************************************ -->
        <div v-if="groupInvalid">
            <p>User Group is invalid:</p>
            <p v-if="groupNameInvalid">*User group name is required</p>
            <p v-if="groupDescriptionInvalid">*User group description is required</p>
        </div>
        <!-- ************************************** Actions ************************************************ -->
        <div v-if="!readOnly">
            <button @click="validateCurrentGroupAndEmitSave">save</button>
            <button @click="$emit('cancel')">cancel</button>
        </div>
        <div v-if="readOnly">
            <button @click="$emit('back')">back</button>
        </div>
    </div>
</template>

<script>
import {cassUtil} from '../../mixins/cassUtil';

export default {
    mixins: [cassUtil],
    name: 'userGroupDetails',
    props: {
        group: {
            type: Object
        },
        personList: {
            type: Array
        },
        groupManagers: {
            type: Array
        },
        groupUsers: {
            type: Array
        },
        readOnly: {
            type: Boolean,
            default: true
        }
    },
    data: function() {
        return {
            addMemberMode: '',
            showAddMemberModal: false,
            addMemberModalTitle: '',
            selectedPersons: [],
            selectedPersonsFilter: '',
            localGroupManagers: this.groupManagers,
            localGroupUsers: this.groupUsers,
            groupInvalid: false,
            groupNameInvalid: false,
            groupDescriptionInvalid: false
        };
    },
    methods: {
        setAllConfigValidationsChecksToValid() {
            this.groupInvalid = false;
            this.groupNameInvalid = false;
            this.groupDescriptionInvalid = false;
        },
        validateGroupFields() {
            if (!this.group.name || this.group.name.trim().equals('')) {
                this.groupInvalid = true;
                this.groupNameInvalid = true;
            }
            if (!this.group.description || this.group.description.trim().equals('')) {
                this.groupInvalid = true;
                this.groupDescriptionInvalid = true;
            }
        },
        validateCurrentGroupAndEmitSave() {
            this.setAllConfigValidationsChecksToValid();
            this.validateGroupFields();
            if (!this.groupInvalid) {
                this.$emit('save', this.localGroupManagers, this.localGroupUsers);
            }
        },
        closeAddMemberModal() {
            this.selectedPersonsFilter = '';
            this.selectedPersons = [];
            this.addMemberMode = '';
            this.addMemberModalTitle = '';
            this.showAddMemberModal = false;
        },
        getPersonById(personId) {
            for (let p of this.personList) {
                if (p.shortId().equals(personId)) {
                    return p;
                }
            }
            return null;
        },
        applyAddMembers() {
            for (let sp of this.selectedPersons) {
                let p = this.getPersonById(sp);
                if (this.addMemberMode.equals('manager')) this.localGroupManagers.push(p);
                else if (this.addMemberMode.equals('user')) this.localGroupUsers.push(p);
            }
            this.closeAddMemberModal();
        },
        addManagers() {
            this.selectedPersonsFilter = '';
            this.selectedPersons = [];
            this.addMemberMode = 'manager';
            this.addMemberModalTitle = 'Add Managers';
            this.showAddMemberModal = true;
        },
        addUsers() {
            this.selectedPersonsFilter = '';
            this.selectedPersons = [];
            this.addMemberMode = 'user';
            this.addMemberModalTitle = 'Add Users';
            this.showAddMemberModal = true;
        },
        removeManager(managerIdx) {
            this.localGroupManagers =
                this.localGroupManagers.slice(0, managerIdx).concat(this.localGroupManagers.slice(managerIdx + 1, this.localGroupManagers.length));
        },
        moveManagerToUser(managerIdx) {
            let memberToMove = this.localGroupManagers[managerIdx];
            this.localGroupUsers.push(memberToMove);
            this.removeManager(managerIdx);
        },
        removeUser(userIdx) {
            this.localGroupUsers =
                this.localGroupUsers.slice(0, userIdx).concat(this.localGroupUsers.slice(userIdx + 1, this.localGroupUsers.length));
        },
        moveUserToManager(userIdx) {
            let memberToMove = this.localGroupUsers[userIdx];
            this.localGroupManagers.push(memberToMove);
            this.removeUser(userIdx);
        },
        groupHasManager(personShortId) {
            for (let p of this.localGroupManagers) {
                if (p.shortId().equals(personShortId)) {
                    return true;
                }
            }
            return false;
        },
        groupHasUser(personShortId) {
            for (let p of this.localGroupUsers) {
                if (p.shortId().equals(personShortId)) {
                    return true;
                }
            }
            return false;
        }
    },
    computed: {
        filteredPersons() {
            return this.personList.filter(person => {
                if (this.groupHasManager(person.shortId()) || this.groupHasUser(person.shortId())) return false;
                return (((person.getName() && person.getName().toLowerCase().indexOf(this.selectedPersonsFilter.toLowerCase()) > -1) ||
                     (person.email && person.email.toLowerCase().indexOf(this.selectedPersonsFilter.toLowerCase()) > -1))

                );
            });
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
    h5 {
        font-size: 1.3rem;
        padding-bottom: .5rem;
    }
    .listHdr {
        font-weight: bold;
    }
    .selectBox {
        min-height: 20rem;
        max-height: 20rem;
        overflow: auto;
    }
</style>
