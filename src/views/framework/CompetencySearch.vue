<template>
    <div
        class="modal"
        :class="{'is-active': isActive}">
        <div class="modal-background" />
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">
                    <span class="title">Search for Competency</span>
                    <br><span class="subtitle">
                        Sharing settings for {{ frameworkName }}
                    </span>
                </p>
                <button
                    class="delete"
                    @click="$store.commit('competencySearchModalOpen', false)"
                    aria-label="close" />
            </header>
            <section class="modal-card-body">
                <div class="column is-12">
                    <!--
                            I'm guessing this will be a hierarchy/node/thing:framework
                            structure, so leaving blank for now.
                        -->
                </div>
            </section>
            <footer class="modal-card-foot">
                <div class="buttons">
                    <button
                        class="button is-left is-light"
                        @click="$store.commit('competencySearchModalOpen', false)">
                        Cancel
                    </button>
                    <button class="button is-success">
                        Copy Competency
                    </button>
                    <button class="button is-success">
                        Link Competency
                    </button>
                </div>
            </footer>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CompetencySearch',
    props: {
        isActive: Boolean
    },
    data() {
        return {
            frameworkName: 'My Framework Name',
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
    }
};
</script>


<style>
</style>