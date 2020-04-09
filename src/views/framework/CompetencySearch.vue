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
                    <List
                        type="Competency"
                        :repo="repo"
                        :click="select"
                        :searchOptions="searchOptions"
                        :paramObj="paramObj"
                        :disallowEdits="true"
                        :selectingCompetency="true"
                        :selected="selectedIds" />
                </div>
            </section>
            <footer class="modal-card-foot">
                <div class="buttons">
                    <button
                        class="button is-left is-light"
                        @click="$store.commit('competencySearchModalOpen', false)">
                        Cancel
                    </button>
                    <button
                        class="button is-success"
                        @click="copyCompetency">
                        Copy Competency
                    </button>
                    <button
                        class="button is-success"
                        @click="linkCompetency">
                        Link Competency
                    </button>
                </div>
            </footer>
        </div>
    </div>
</template>

<script>
import List from '@/lode/components/lode/List.vue';
export default {
    name: 'CompetencySearch',
    props: {
        isActive: Boolean,
        framework: Object
    },
    components: {List},
    data() {
        return {
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
            ],
            repo: window.repo,
            selectedIds: []
        };
    },
    computed: {
        frameworkName: function() {
            return this.framework.getName();
        },
        searchOptions: function() {
            let search = "";
            if (this.queryParams && this.queryParams.filter != null) {
                search += " AND (" + this.queryParams.filter + ")";
            }
            if (this.showMine || (this.queryParams && this.queryParams.concepts !== "true" && this.queryParams.show === "mine") ||
                (this.queryParams && this.queryParams.concepts === "true" && this.queryParams.conceptShow === "mine")) {
                search += " AND (";
                for (var i = 0; i < EcIdentityManager.ids.length; i++) {
                    if (i !== 0) {
                        search += " OR ";
                    }
                    var id = EcIdentityManager.ids[i];
                    search += "@owner:\"" + id.ppk.toPk().toPem() + "\"";
                    search += " OR @owner:\"" + this.addNewlinesToId(id.ppk.toPk().toPem()) + "\"";
                }
                search += ")";
            }
            return search;
        },
        paramObj: function() {
            let obj = {};
            obj.size = 20;
            var order = (this.sortBy === "name.keyword" || this.sortBy === "dcterms:title.keyword") ? "asc" : "desc";
            obj.sort = '[ { "' + this.sortBy + '": {"order" : "' + order + '" , "unmapped_type" : "long",  "missing" : "_last"}} ]';
            if (this.queryParams && ((this.queryParams.concepts !== "true" && this.queryParams.show === 'mine') ||
                (this.queryParams.concepts === "true" && this.queryParams.conceptShow === "mine"))) {
                obj.ownership = 'me';
            }
            return obj;
        }
    },
    methods: {
        select: function(competency) {
            if (!EcArray.has(this.selectedIds, competency.shortId())) {
                this.selectedIds.push(competency.shortId());
            } else {
                EcArray.setRemove(this.selectedIds, competency.shortId());
            }
        },
        copyCompetency: function() {

        },
        linkCompetency: function() {

        }
    }
};
</script>


<style>
</style>