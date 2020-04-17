<template>
    <div class="modal-card">
        <header class="modal-card-head has-background-primary">
            <p class="modal-card-title has-text-white">
                <span class="title has-text-white">Share Framework</span>
                <br><span class="subtitle has-text-white has-text-weight-medium">
                    Sharing settings for {{ frameworkName }}
                </span>
            </p>
            <button
                class="delete"
                @click="$store.commit('app/closeModal')"
                aria-label="close" />
        </header>
        <section class="modal-card-body">
            <div class="columns is-multiline">
                <!-- share link -->
                <div class="column is-12">
                    {{ shareableFrameworkInEditor }}
                    <button
                        title="Copy URL to the clipboard."
                        v-clipboard="shareableFrameworkInEditor">
                        <i class="fa fa-copy" />
                    </button>
                </div>
                <!-- end share link -->
                <!-- input new groups or users -->
                <div class="column is-12">
                    <label>Add users or groups</label>
                    <div class="field has-addons">
                        <div class="control is-expanded">
                            <input
                                type="text"
                                class="input is-fullwidth">
                        </div>
                        <div class="control">
                            <div class="select">
                                <select class="select">
                                    <option
                                        v-for="(option, index) in viewOptions"
                                        :key="index">
                                        {{ option.label }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end input new users or groups -->
                <!-- begin list of access -->
                <div class="column is-12">
                    <table class="table is-fullwidth">
                        <thead>
                            <tr>
                                <th><abbr title="Position">Group Name</abbr></th>
                                <th><abbr title="Played">View</abbr></th>
                                <th><abbr title="Won">Delete</abbr></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="group in groups"
                                :key="group">
                                <th> {{ group.header }}</th>
                                <td>
                                    <select
                                        class="select"
                                        v-model="group.view">
                                        <option
                                            :value="option.value"
                                            v-for="option in viewOptions"
                                            :key="option">
                                            {{ option.label }}
                                        </option>
                                    </select>
                                </td>
                                <td>
                                    <div class="button is-text">
                                        <div class="icon">
                                            <i class="fa fa-times" />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- user table -->
                <div class="column is-12">
                    <table class="table is-fullwidth">
                        <thead>
                            <tr>
                                <th><abbr title="Position">Group Name</abbr></th>
                                <th><abbr title="Played">View</abbr></th>
                                <th><abbr title="Won">Delete</abbr></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="user in users"
                                :key="user">
                                <th> {{ user.header }}</th>
                                <td>
                                    <select
                                        class="select"
                                        v-model="user.view">
                                        <option
                                            :value="option.value"
                                            v-for="option in viewOptions"
                                            :key="option">
                                            {{ option.label }}
                                        </option>
                                    </select>
                                </td>
                                <td>
                                    <div class="button is-text">
                                        <div class="icon">
                                            <i class="fa fa-times" />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
        <footer class="modal-card-foot">
            <div class="buttons is-spaced">
                <button
                    @click="$store.commit('app/closeModal')"
                    class="button is-outlined is-dark is-left">
                    <span class="icon">
                        <i class="fa fa-times" />
                    </span>
                    <span>
                        cancel
                    </span>
                </button>
                <button class="button is-outlined is-primary">
                    <span class="icon">
                        <i class="fa fa-save" />
                    </span>
                    <span>save share settings</span>
                </button>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'Share',
    props: {
        isActive: Boolean
    },
    data() {
        return {
            frameworkName: this.$store.state.editor.framework.getName(),
            frameworkId: this.$store.state.editor.framework.shortId(),
            viewOptions: [
                {
                    label: 'View',
                    value: 'view'
                },
                {
                    label: 'Admin',
                    value: 'admin'
                }
            ],
            groups: [
                {
                    header: 'group 1',
                    view: 'admin'
                },
                {
                    header: 'group 2',
                    view: 'view'
                }
            ],
            users: [
                {
                    header: 'user 1',
                    view: 'admin'
                },
                {
                    header: 'user 2',
                    view: 'view'
                }
            ]
        };
    },
    computed: {
        shareableFrameworkInEditor: function() {
            return window.location.href + "?frameworkId=" + this.frameworkId;
        }
    }
};
</script>


<style>
</style>