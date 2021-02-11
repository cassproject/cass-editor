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
                Name of Directory
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
                        class="input"/>
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
                    :disabled="typedInName === ''"
                    class="button is-outlined is-danger"
                    @click="deleteDirectory">
                    Delete Directory
                </button>
            </div>
        </footer>
    </div>
</template>

<script>

import {cassUtil} from '../../mixins/cassUtil';

export default {
    mixins: [cassUtil],
    name: 'DeleteDirectory',
    data() {
        return {
            typedInName: '',
            loggedInPersonEcPk: {},
            commentToSave: {},
            commentIsBusy: false
        };
    },
    methods: {
        deleteDirectory: function() {
            console.log("TO DO: delete directory");
        },
        closeModal: function() {
            this.$store.commit('app/closeModal');
        }
    },
    computed: {
        loggedInPerson: function() {
            return this.$store.state.user.loggedOnPerson;
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