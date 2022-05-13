<template>
    <modal-template
        @close="closeModal; $emit('close')"
        :active="true"
        type="primary">
        <template slot="modal-header">
            <span class="title has-text-white">Share Assertions</span>
        </template>
        <!-- processing -->
        <template
            v-if="isProcessing"
            slot="modal-body">
            <h2 class="header has-text-centered">
                Processing request...
            </h2>
            <div class="section has-background-white has-text-centered">
                <span class="icon is-large">
                    <i class="fa fa-spinner fa-2x fa-pulse" />
                </span>
            </div>
        </template>
        <template
            v-else-if="isDone"
            slot="modal-body">
            <div class="section has-background-white has-text-centered">
                <p>
                    <strong>Success!</strong>
                </p>
            </div>
        </template>
        <template
            v-else
            slot="modal-body">
            <div class="assertion-share-container">
                <div class="assertion-share-block">
                    <h4 class="header is-size-3">
                        Share assertions about:
                    </h4>
                    <div
                        class="field">
                        <input
                            data-id="share-assertions-subject-search"
                            type="text"
                            class="input"
                            v-model="subjectFilter"
                            placeholder="search for person...">
                    </div>
                    <div v-if="filteredAvailableSubjects.length === 0 && subjectFilter === ''">
                        <i class="fa fa-info-circle" /> No users found
                    </div>
                    <div v-if="filteredAvailableSubjects.length > 0">
                        <div class="table-container">
                            <table class="table is-hoverable is-fullwidth">
                                <thead>
                                    <tr>
                                        <th title="Select">
                                            <input
                                                data-id="share-assertions-select-all-subjects"
                                                type="checkbox"
                                                @change="selectAllSubjects">
                                        </th>
                                        <th title="Add as member">
                                            <i class="fa fa-user" />
                                        </th>
                                        <th title="Add as manager">
                                            <i class="fa fa-user-shield" />
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        data-id="share-assertions-subject-option"
                                        style="cursor: pointer;"
                                        @click="setSubject(prs.owner[0])"
                                        v-for="(prs, index) in filteredAvailableSubjects"
                                        :key="index">
                                        <td>
                                            <input
                                                type="checkbox"
                                                @click.stop="setSubject(prs.owner[0])"
                                                :checked="shareSubjects[prs.owner[0]]">
                                        </td>
                                        <td> {{ prs.getName() }} </td>
                                        <td> {{ prs.email }} </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="assertion-share-icon" />
                <div class="assertion-share-block">
                    <h4 class="header is-size-3">
                        Send to:
                    </h4>
                    <div
                        class="field">
                        <input
                            data-id="share-assertions-target-search"
                            type="text"
                            class="input"
                            v-model="targetFilter"
                            placeholder="search for person...">
                    </div>
                    <div v-if="filteredAvailableTargets.length === 0 && targetFilter === ''">
                        <i class="fa fa-info-circle" /> No users found
                    </div>
                    <div v-if="filteredAvailableTargets.length > 0">
                        <div class="table-container">
                            <table class="table is-hoverable is-fullwidth">
                                <thead>
                                    <tr>
                                        <th title="Select">
                                            <input
                                                data-id="share-assertions-select-all-targets"
                                                type="checkbox"
                                                @change="selectAllTargets">
                                        </th>
                                        <th title="Add as member">
                                            <i class="fa fa-user" />
                                        </th>
                                        <th title="Add as manager">
                                            <i class="fa fa-user-shield" />
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        data-id="share-assertions-target-option"
                                        style="cursor: pointer;"
                                        @click="setTarget(prs.owner[0])"
                                        v-for="(prs, index) in filteredAvailableTargets"
                                        :key="index">
                                        <td>
                                            <input
                                                type="checkbox"
                                                @click.stop="setTarget(prs.owner[0])"
                                                :checked="shareTargets[prs.owner[0]]">
                                        </td>
                                        <td> {{ prs.getName() }} </td>
                                        <td> {{ prs.email }} </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="assertion-share-count-container">
                <div class="assertion-share-count">
                    <strong>{{ Object.keys(shareSubjects).length }} selected</strong>
                </div>
                <div class="assertion-share-count">
                    <strong>{{ Object.keys(shareTargets).length }} selected</strong>
                </div>
            </div>
        </template>
        <template slot="modal-foot">
            <div
                class="buttons is-spaced">
                <button
                    :disabled="isProcessing"
                    class="button is-secondary is-outlined"
                    @click="$store.commit('app/closeModal')">
                    <span>Cancel</span>
                    <span class="icon">
                        <i class="fa fa-times-circle" />
                    </span>
                </button>
                <button
                    v-if="isDone"
                    data-id="share-more-assertions-button"
                    class="button is-primary is-outlined"
                    @click="isDone = false;">
                    Share More
                </button>
                <button
                    v-else
                    data-id="share-assertions-button"
                    :disabled="isProcessing || notSelected"
                    class="button is-primary is-outlined"
                    @click="shareAssertions">
                    <span>Share</span>
                    <span class="icon">
                        <i class="fa fa-share" />
                    </span>
                </button>
            </div>
        </template>
    </modal-template>
</template>

<script>
import ModalTemplate from './ModalTemplate.vue';
export default {
    name: 'ShareAssertionsModal',
    props: {
        isActive: Boolean
    },
    components: {
        ModalTemplate
    },
    data() {
        return {
            isProcessing: false,
            shareSubjects: {},
            shareTargets: {},
            availablePersons: [],
            subjectFilter: '',
            targetFilter: '',
            isDone: false
        };
    },
    computed: {
        filteredAvailableSubjects: function() {
            return this.availablePersons.filter(person => {
                return (((person.getName() && person.getName().toLowerCase().indexOf(this.subjectFilter.toLowerCase()) > -1) ||
                        (person.email && person.email.toLowerCase().indexOf(this.subjectFilter.toLowerCase()) > -1))
                );
            });
        },
        filteredAvailableTargets: function() {
            let myKey = EcIdentityManager.default.ids[0].ppk.toPk().toPem();
            return this.availablePersons.filter(person => {
                if (myKey === person.owner[0]) {
                    return false;
                }
                return (((person.getName() && person.getName().toLowerCase().indexOf(this.targetFilter.toLowerCase()) > -1) ||
                        (person.email && person.email.toLowerCase().indexOf(this.targetFilter.toLowerCase()) > -1))
                );
            });
        },
        notSelected: function() {
            return Object.keys(this.shareSubjects).length === 0 || Object.keys(this.shareTargets).length === 0;
        }
    },
    mounted: async function() {
        EcPerson.search(window.repo, '*', null, null, {size: 10000}).then((people) => {
            this.availablePersons = people;
        });
    },
    methods: {
        selectAllSubjects: function(evt) {
            let checked = evt.target.checked;
            if (checked) {
                for (let prs of this.filteredAvailableSubjects) {
                    this.$set(this.shareSubjects, prs.owner[0], 1);
                }
            } else {
                this.shareSubjects = {};
            }
        },
        selectAllTargets: function(evt) {
            let checked = evt.target.checked;
            if (checked) {
                for (let prs of this.filteredAvailableTargets) {
                    this.$set(this.shareTargets, prs.owner[0], 1);
                }
            } else {
                this.shareTargets = {};
            }
        },
        setSubject: function(subject) {
            if (this.shareSubjects[subject]) {
                this.$delete(this.shareSubjects, subject);
            } else {
                this.$set(this.shareSubjects, subject, 1);
            }
        },
        setTarget: function(target) {
            if (this.shareTargets[target]) {
                this.$delete(this.shareTargets, target);
            } else {
                this.$set(this.shareTargets, target, 1);
            }
        },
        shareAssertions: function() {
            this.isProcessing = true;
            let searchQuery = '';
            let subjects = Object.keys(this.shareSubjects);
            for (let i = 0; i < subjects.length; i++) {
                searchQuery += `\\*reader:"${subjects[i]}"`;
                if (i !== subjects.length - 1) {
                    searchQuery += ' OR ';
                }
            }
            let doSearch = async function(start, count) {
                return new Promise((resolve, reject) => {
                    EcAssertion.search(window.repo, `\\*owner:"${this.$store.getters['editor/getMe']}" AND (${searchQuery})`, async(results) => {
                        assertions.push(...results);
                        start += count;
                        if (results.length > 0) {
                            await doSearch(start, count);
                        }
                        resolve();
                    }, reject, {size: count, start: start});
                });
            };

            doSearch(0, 5000).then(() => {
                var eah = new EcAsyncHelper();
                eah.each(assertions, (assertion, callback) => {
                    if (assertion.assertionDateDecrypted != null) {
                        callback();
                    } else {
                        assertion.getAssertionDateAsync((date) => {
                            assertion.assertionDateDecrypted = date;
                            callback();
                        }, callback);
                    }
                },
                (assertions) => {
                    let eah = new EcAsyncHelper();
                    eah.each(assertions, (assertion, after) => {
                        assertion.getSubjectAsync((subject) => {
                            if (subjects.includes(subject.toPem())) {
                                assertion.getAgentAsync(async(agent) => {
                                    if (this.$store.getters['editor/getMe'] === agent.toPem()) {
                                        for (let target of Object.keys(this.shareTargets)) {
                                            await assertion.addReader(EcPk.fromPem(target));
                                        }
                                        await EcRepository.save(assertion);
                                        after();
                                    } else {
                                        after();
                                    }
                                }, appError);
                            } else {
                                after();
                            }
                        }, appError);
                    }, () => {
                        this.isProcessing = false;
                        this.isDone = true;
                    });
                });
            }).catch(appError);
        }
    },
    watch: {}
};
</script>


<style lang="scss">
    @import '@/scss/variables.scss';
    .assertion-share-container {
        display: flex;
        justify-content: space-between;
        .active {
            background: $primary-color;
            color: white;
        }
        .assertion-share-block {
            width: 48%;
        }
    }
    .assertion-share-icon {
        display: flex;
        align-items: center;
        border: 1px solid $light-color;
    }
    .assertion-share-count-container {
        display: flex;
    }
    .assertion-share-count {
        text-align: right;
        margin-top: 1rem;
        width: 50%;
    }
</style>