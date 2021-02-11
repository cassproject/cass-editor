<template>
    <div class="modal-card comment-modal">
        <header class="modal-card-head has-background-danger">
            <p class="modal-card-title">
                <span class="title has-text-white">
                    Are you sure?
                </span>
            </p>
            <button
                class="delete"
                @click="closeModal"
                aria-label="close" />
        </header>
        <section class="modal-card-body comment-modal__details">
            <h3 class="has-text-weight-bold is-size-4">
                <span class="">Delete the following directory</span>
            </h3>
            <p
                class="comment-modal__details__competency">
                {{ directory.name }}
            </p>
        </section>
        <section class="modal-card-body pt-0 mt-0">
            <p>
                You are about to delete the above directory. <b>This action is not reversable.</b>
                Deleting this directory will delete all of its
                contents and make it unavailble to others who might be using it.
            </p>
        </section>
        <section class="modal-card-body pt-0 mt-0">
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
        </section>
        <footer class="modal-card-foot">
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
        </footer>
    </div>
</template>

<script>

import {cassUtil} from '../../mixins/cassUtil';
import common from '@/mixins/common.js';

export default {
    mixins: [cassUtil, common],
    name: 'DeleteDirectory',
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
        deleteDirectory: function(obj) {
            appLog("deleting " + obj.id);
            var me = this;
            this.repo.search("(directory:\"" + obj.shortId() + "\" OR parentDirectory:\"" + obj.shortId() + "\")", function() {}, function(success) {
                new EcAsyncHelper().each(success, function(obj, done) {
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