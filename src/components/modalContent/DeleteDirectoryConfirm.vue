<template>
    <modal-template
        :active="true"
        type="danger"
        @close="closeModal">
        <template slot="modal-header">
            <span class="title has-text-white">
                Are you sure?
            </span>
        </template>
        <template slot="modal-body">
            <h3 class="title is-size-4">
                <span class="">Delete the following directory</span>
            </h3>
            <p
                class="py-2">
                {{ directory.name }}
            </p>
            <p>
                You are about to delete the above directory. <b>This action is not reversable.</b>
                Deleting this directory will delete all of its
                contents and make it unavailable to others who might be using it.
            </p>
            <div class="py-2">
                <div class="field">
                    <div class="label">
                        <label>Type the name of the directory to enable this action.</label>
                    </div>
                    <div class="control">
                        <input
                            v-model="typedInName"
                            class="input">
                    </div>
                </div>
            </div>
        </template>
        <template slot="modal-foot">
            <div class="buttons is-spaced">
                <button
                    class="button is-dark is-outlined"
                    @click="closeModal">
                    Cancel
                </button>
                <button
                    :disabled="typedInName !== directory.name"
                    class="button is-outlined is-danger"
                    @click="deleteDirectory(directory)">
                    Delete Directory
                </button>
            </div>
        </template>
    </modal-template>
</template>

<script>
import ModalTemplate from './ModalTemplate.vue';

import {cassUtil} from '../../mixins/cassUtil';
import common from '@/mixins/common.js';

export default {
    mixins: [cassUtil, common],
    name: 'DeleteDirectory',
    components: {
        ModalTemplate
    },
    data() {
        return {
            typedInName: '',
            loggedInPersonEcPk: {},
            commentToSave: {},
            commentIsBusy: false,
            numDirectories: 1,
            repo: window.repo
        };
    },
    methods: {
        deleteDirectory: async function(obj) {
            appLog("deleting " + obj.id);
            var me = this;
            let children = await this.$store.dispatch('editor/getDirectoryChildren', obj);
            window.repo.multiget(children, function(success) {
                new EcAsyncHelper().each(success, async function(obj, done) {
                    if (obj.type === 'Framework') {
                        me.deleteFramework(obj, done);
                    } else if (obj.type === 'CreativeWork') {
                        me.repo.deleteRegistered(obj, appLog, appError);
                        done();
                    } else if (obj.type === "Directory") {
                        me.numDirectories++;
                        me.deleteDirectory(obj);
                        done();
                    }
                }, function(objs) {
                    me.repo.deleteRegistered(obj, function(success) {
                        appLog(success);
                        me.numDirectories--;
                        if (me.numDirectories === 0) {
                            me.$store.dispatch('app/refreshDirectories');
                            me.$store.commit('app/refreshSearch', true);
                            if (me.$route.name !== "frameworks") {
                                me.$router.push({name: "frameworks"});
                            }
                            me.$store.commit('app/rightAsideObject', null);
                            me.$store.commit('app/closeRightAside');
                            me.$store.commit('app/refreshSearch', true);
                            me.$store.commit('app/closeModal');
                        }
                    }, function(error) {
                        appError(error);
                        me.numDirectories--;
                        if (me.numDirectories === 0) {
                            if (me.$route.name !== "frameworks") {
                                me.$router.push({name: "frameworks"});
                            }
                            me.$store.commit('app/rightAsideObject', null);
                            me.$store.commit('app/closeRightAside');
                            me.$store.commit('app/refreshSearch', true);
                            me.$store.commit('app/closeModal');
                        }
                    });
                });
            }, appError);
        },
        deleteFramework: function(framework, callback) {
            let me = this;
            this.repo.deleteRegistered(framework, function(success) {
                me.spitEvent("frameworkDeleted", framework.shortId(), "directoryPage");
                // Delete the framework, delete all non-used stuff.
                if (framework.competency != null) {
                    for (var i = 0; i < framework.competency.length; i++) {
                        me.conditionalDelete(framework.competency[i]);
                    }
                }
                if (framework.relation != null) {
                    for (var i = 0; i < framework.relation.length; i++) {
                        me.conditionalDelete(framework.relation[i]);
                    }
                }
                if (framework.level != null) {
                    for (var i = 0; i < framework.level.length; i++) {
                        me.conditionalDelete(framework.level[i]);
                    }
                }
                callback();
            }, appLog);
        },
        closeModal: function() {
            this.$store.commit('app/closeModal');
        }
    },
    computed: {
        loggedInPerson: function() {
            return this.$store.state.user.loggedOnPerson;
        },
        directory: function() {
            return this.$store.getters['app/rightAsideObject'];
        }
    },
    mounted: function() {
    }
};
</script>

<style lang="scss">
    @import './../../scss/variables.scss';

    .comment-modal__details {
        margin-left: 0rem;
        .comment-modal__details__header {
            font-size: 1rem;
            font-weight: 500;
        }
        .comment-modal__details__framework {
            font-size: 1rem;
        }
        .comment-modal__details__competency {
            font-size: 1rem;
            padding-bottom: .5rem;
        }
    }
    .commentReply {
        margin-top: 1rem;
        margin-bottom: 1rem;
        font-style: italic;
    }
</style>