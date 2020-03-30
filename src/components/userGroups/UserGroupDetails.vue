<template>
    <div>
        <!-- member search modal -->
        <div
            class="modal"
            :class="[{'is-active': showAddMemberModal}]">
            <div class="modal-background" />
            <div class="modal-card">
                <header class="modal-card-head has-background-primary">
                    <p class="subtitle is-size-3 modal-card-title has-text-white">
                        {{ addMemberModalTitle }}
                        <button
                            class="delete is-pulled-right"
                            aria-label="close"
                            @click="closeAddMemberModal" />
                    </p>
                </header>
                <div class="modal-card-body has-text-dark">
                    <div class="field">
                        <label class="label">Available Members:</label>
                    </div>
                    <div class="field">
                        <input
                            type="text"
                            class="input"
                            v-model="selectedPersonsFilter"
                            placeholder="person filter">
                    </div>
                    <div class="table-container">
                        <div class="table">
                            <thead>
                                <tr>
                                    <th />
                                    <th>name</th>
                                    <th>email</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(prs, index) in filteredPersons"
                                    :key="index">
                                    <th>
                                        <div class="checkbox">
                                            <input
                                                :id="prs.shortId()"
                                                :value="prs.shortId()"
                                                name="prs.shortId()"
                                                type="checkbox"
                                                v-model="selectedPersons">
                                        </div>
                                    </th>
                                    <td>{{ prs.getName() }}</td>
                                    <td>  {{ prs.email }}</td>
                                </tr>
                            </tbody>
                        </div>
                    </div>
                    <div
                        class="buttons"
                        v-if="!readOnly">
                        <button
                            class="button is-light"
                            @click="closeAddMemberModal">
                            cancel
                        </button>
                        <button
                            class="button is-primary"
                            @click="applyAddMembers">
                            apply
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- ************************************** Content ************************************************ -->
        <div class="section">
            <div class="field">
                <label class="label">Name: </label>
                <div v-if="readOnly">
                    {{ group.name }}
                </div>
                <div
                    div
                    class="control"
                    v-if="!readOnly">
                    <input
                        class="input"
                        type="text"
                        v-model="group.name">
                </div>
            </div>
            <div class="field">
                <label class="label">Description: </label>
                <div v-if="readOnly">
                    {{ group.description }}
                </div>
                <div
                    class="control"
                    v-if="!readOnly">
                    <input
                        class="input"
                        type="text"
                        v-model="group.description">
                </div>
            </div>
        </div>
        <div class="section">
            <h5>Managers</h5>
            <div class="buttons is-left">
                <button
                    class="button is-primary"
                    v-if="!readOnly"
                    @click="addManagers">
                    <span class="icon">
                        <i class="fa fa-user-plus" />
                    </span>
                    <span>
                        add managers
                    </span>
                </button>
            </div>
            <div class="table-container">
                <div class="table">
                    <thead>
                        <tr>
                            <th>
                                name
                            </th>
                            <th>
                                email
                            </th>
                            <th> reassign</th>
                            <th>remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(mgr, mgrIdx) in localGroupManagers"
                            :key="mgrIdx">
                            <th>
                                {{ mgr.getName() }}
                            </th>
                            <td>
                                {{ mgr.email }}
                            </td>
                            <td>
                                <button
                                    class="button is-small is-primary"
                                    v-if="!readOnly && !areAnyIdentitiesThisPerson(mgr)"
                                    @click="moveManagerToUser(mgrIdx)">
                                    reassign as user
                                </button>
                            </td>
                            <td>
                                <button
                                    class="button is-small is-primary"
                                    v-if="!readOnly && !areAnyIdentitiesThisPerson(mgr)"
                                    @click="removeManager(mgrIdx)">
                                    remove
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </div>
            </div>
        </div>
        <div class="section">
            <h5>Users</h5>
            <div class="buttons is-left">
                <button
                    class="button is-primary"
                    v-if="!readOnly"
                    @click="addUsers">
                    <span class="icon">
                        <i class="fa fa-user-plus" />
                    </span>
                    <span>
                        add users
                    </span>
                </button>
            </div>
            <div v-if="groupUsers.length === 0">
                <p>No users assigned to this group</p>
            </div>
            <div
                class="table-container"
                v-if="groupUsers.length > 0">
                <div class="table">
                    <thead>
                        <tr>
                            <th>
                                name
                            </th>
                            <th>
                                email
                            </th>
                            <th>reassign</th>
                            <th>remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(usr, usrIdx) in localGroupUsers"
                            :key="usrIdx">
                            <th>
                                {{ usr.getName() }}
                            </th>
                            <td>
                                {{ usr.email }}
                            </td>
                            <td>
                                <button
                                    v-if="!readOnly && !areAnyIdentitiesThisPerson(usr)"
                                    class="button is-small is-primary"
                                    @click="moveUserToManager(usrIdx)">
                                    reassign as manager
                                </button>
                            </td>
                            <td>
                                <button
                                    v-if="!readOnly && !areAnyIdentitiesThisPerson(usr)"
                                    class="button is-small is-primary"
                                    @click="removeUser(usrIdx)">
                                    remove
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </div>
            </div>
            <!-- ************************************** Validation ************************************************ -->
            <div v-if="groupInvalid">
                <p>User Group is invalid:</p>
                <p v-if="groupNameInvalid">
                    *User group name is required
                </p>
                <p v-if="groupDescriptionInvalid">
                    *User group description is required
                </p>
            </div>
        </div>
        <!-- ************************************** Actions ************************************************ -->
        <div class="section">
            <div
                class="buttons is-right"
                v-if="!readOnly">
                <button
                    class="button is-primary"
                    @click="validateCurrentGroupAndEmitSave">
                    save
                </button>
                <button
                    class="button is-primary"
                    @click="$emit('cancel')">
                    cancel
                </button>
            </div>
            <div v-else>
                <button
                    class="button is-primary"
                    @click="$emit('back')">
                    back
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import {cassUtil} from '../../mixins/cassUtil';

export default {
    mixins: [cassUtil],
    name: 'UserGroupDetails',
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
