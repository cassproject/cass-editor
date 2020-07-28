<template>
    <div>
        <!-- member search modal -->
        <div
            class="modal"
            :class="[{'is-active': showAddMemberModal}]">
            <div class="modal-background" />
            <div class="modal-card">
                <header class="modal-card-head has-background-primary">
                    <p class="is-size-3 modal-card-title has-text-white">
                        {{ addMemberModalTitle }}
                        <button
                            class="delete is-pulled-right"
                            aria-label="close"
                            @click="closeAddMemberModal" />
                    </p>
                </header>
                <div class="modal-card-body has-text-dark">
                    <div class="field">
                        <input
                            type="text"
                            class="input"
                            v-model="selectedPersonsFilter"
                            placeholder="search for person...">
                    </div>
                    <h4 class="header is-size-3">
                        Available Member List
                    </h4>
                    <div class="table-container">
                        <table class="table is-hoverable is-fullwidth">
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
                        </table>
                    </div>
                </div>
                <footer class="modal-card-foot has-background-light">
                    <div
                        class="buttons is-spaced"
                        v-if="!readOnly">
                        <button
                            class="button is-outlined is-dark"
                            @click="closeAddMemberModal">
                            <span class="icon">
                                <i class="fa fa-times" />
                            </span>
                            <span>
                                cancel
                            </span>
                        </button>
                        <button
                            class="button is-outlined is-primary"
                            @click="applyAddMembers">
                            <span class="icon">
                                <i class="fa fa-save" />
                            </span>
                            <span>
                                apply
                            </span>
                        </button>
                    </div>
                </footer>
            </div>
        </div>
        <!-- ************************************** Content ************************************************ -->
        <div class="columns">
            <div class="column is-3">
                <nav :class="panelClass">
                    <p class="panel-heading">
                        Sections
                    </p>
                    <a
                        class="panel-block"
                        :class="{'is-active': tab === 'general'}"
                        @click="tab ='general'">
                        <span class="panel-icon">
                            <i
                                class="fas fa-list-alt"
                                aria-hidden="true" />
                        </span>
                        General Details
                    </a>
                    <a
                        class="panel-block"
                        :class="{'is-active': tab === 'owners'}"
                        @click="tab ='owners'">
                        <span class="panel-icon">
                            <i
                                class="fas fa-list-alt"
                                aria-hidden="true" />
                        </span>
                        Default Owners
                    </a>
                    <a
                        :class="{'is-active': tab === 'readers'}"
                        class="panel-block"
                        @click="tab = 'readers'">
                        <span class="panel-icon">
                            <i
                                class="fas fa-list-alt"
                                aria-hidden="true" />
                        </span>
                        Default Readers
                    </a>
                    <a
                        class="panel-block"
                        v-if="readOnly">
                        <div
                            class="buttons is-fullwidth is-right">
                            <div
                                class="button is-outlined is-primary"
                                @click="$emit('back')">
                                back
                            </div>
                        </div>
                    </a>
                    <div
                        class="panel-block"
                        v-if="!readOnly">
                        <div
                            class="button is-fullwidth is-outlined is-dark"
                            @click="$emit('cancel')">
                            <span class="icon">
                                <i class="fa fa-arrow-left" />
                            </span>
                            <span>cancel</span>
                        </div>
                    </div>
                    <div
                        class="panel-block"
                        v-if="!readOnly">
                        <div
                            class="button is-fullwidth  is-outlined is-primary"
                            @click="validateCurrentGroupAndEmitSave">
                            <span class="icon">
                                <i class="fa fa-save" />
                            </span><span>save user group</span>
                        </div>
                    </div>
                </nav>
            </div>
            <div class="column is-9">
                <div
                    class="section box px-4 py-4"
                    v-if="tab === 'general'">
                    <h3 class="is-size-3 title">
                        General details
                    </h3>
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
                <div
                    class="section box py-4 px-4"
                    v-if="tab === 'owners' || tab === 'general'">
                    <h5 class="title is-size-3">
                        Managers
                        <button
                            class="button is-pulled-right is-family-primary is-small is-outlined is-primary"
                            v-if="!readOnly"
                            @click="addManagers">
                            <span class="icon">
                                <i class="fa fa-user-plus" />
                            </span>
                            <span>
                                add managers
                            </span>
                        </button>
                    </h5>
                    <p class="subtitle">
                        Managers can read, edit, comment, delete, and manage user access to frameworks.
                    </p>
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
                                            class="button is-outlined is-small is-primary"
                                            v-if="!readOnly && !areAnyIdentitiesThisPerson(mgr)"
                                            @click="moveManagerToUser(mgrIdx)">
                                            reassign as user
                                        </button>
                                    </td>
                                    <td>
                                        <div class="buttons is-centered">
                                            <button
                                                class="button is-outlined is-small is-danger"
                                                v-if="!readOnly && !areAnyIdentitiesThisPerson(mgr)"
                                                @click="removeManager(mgrIdx)">
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
                <div
                    class="section box py-4 px-4"
                    v-if="tab === 'readers' || tab === 'general'">
                    <h5 class="title is-size-3">
                        Users
                        <button
                            class="button is-family-primary is-small is-pulled-right is-outlined is-primary"
                            v-if="!readOnly"
                            @click="addUsers">
                            <span class="icon">
                                <i class="fa fa-user-plus" />
                            </span>
                            <span>
                                add users
                            </span>
                        </button>
                    </h5>
                    <p class="subtitle">
                        Readers can read, and comment on frameworks.
                    </p>
                    <div v-if="groupUsers.length === 0">
                        <p class="help is-info">
                            No users assigned to this group yet.
                        </p>
                    </div>
                    <div
                        class="table-container"
                        v-if="groupUsers.length > 0">
                        <table class="table is-hoverable is-fullwidth">
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
                                            class="button is-outlined is-small is-primary"
                                            @click="moveUserToManager(usrIdx)">
                                            reassign as manager
                                        </button>
                                    </td>
                                    <td>
                                        <div class="buttons is-centered">
                                            <div
                                                v-if="!readOnly && !areAnyIdentitiesThisPerson(usr)"
                                                class="button is-outlined is-small is-danger"
                                                @click="removeUser(usrIdx)">
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
            panelClass: 'panel',
            tab: 'general',
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
    .panel {
        top: 16px;
        position: sticky;
    }
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
