<template>
    <div
        class="modal"
        :class="{'is-active': isActive}">
        <div class="modal-background" />
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">
                    <span class="title">Share Framework</span>
                    <br><span class="subtitle">
                        Sharing settings for {{ frameworkName }}
                    </span>
                </p>
                <button
                    class="delete"
                    @click="$emit('closeShareModalEvent')"
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
                                    <select>
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
                                        <select v-model="group.view">
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
                                        <select v-model="user.view">
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
                <div class="columns is-12">
                    <div class="column is-12">
                        <button class="button is-left is-light">
                            Cancel
                        </button>
                    </div>
                    <div class="column is-12">
                        <button class="button is-fullwidth is-success">
                            Save Framework Settings
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ShareModal',
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