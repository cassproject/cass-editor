<template>
    <div
        class="hierarchy-buttons columns is-gapless is-paddingless is-mobile is-marginless is-paddingless">
        <!-- CONTROLS FOR SELECT: ENABLED MULTI EDIT  -->
        <div class="column is-narrow">
            <div
                v-if="(canEdit && view !== 'importPreview' && view !== 'importLight' && view !== 'crosswalk') || queryParams.select"
                class="check-radio-all-column">
                <div
                    class="field">
                    <input
                        class="is-checkradio"
                        id="selectAllCheckbox"
                        type="checkbox"
                        name="selectAllCheckbox"
                        v-model="selectAll">
                    <label for="selectAllCheckbox" />
                </div>
            </div>
        </div>
        <!-- CONTROLS FOR EXPAND  -->
        <div class="column is-narrow">
            <div
                v-if="expanded"
                class="icon is-vcentered"
                id="framework-buttons-collapse"
                @click="expanded=false">
                <i class="fa fa-caret-down has-text-primary is-size-2" />
            </div>
            <div
                v-else-if="!expanded"
                class="icon is-vcentered"
                id="framework-buttons-expand"
                @click="expanded=true">
                <i class="fa fa-caret-right has-text-primary is-size-2" />
            </div>
            <div
                v-else
                class="icon is-vcentered">
                <i class="fa fa-circle is-size-6 has-text-light" />
            </div>
            <div
                v-if="selectButtonText"
                id="framework-buttons-select"
                @click="$emit('select-button-click', selectedArray)"
                class="button is-outlined is-primary">
                {{ selectButtonText }}
            </div>
        </div>
        <!-- CROSSWALK CHANGE FRAMEWORK BUTTONS -->
        <div
            class="crosswalk-buttons column is-fullwidth"
            v-if="view === 'crosswalk'">
            <div class="buttons is-right">
                <div
                    @click="filterHierarchy('showAligned')"
                    id="framework-buttons-show-aligned"
                    title="show aligned only"
                    class="button is-small is-outlined is-primary"
                    :class="{'is-focused': filter === 'showAligned'}">
                    <span class="icon">
                        <i class="fa fa-link" />
                    </span>
                </div>
                <div
                    @click="filterHierarchy('showUnaligned')"
                    id="framework-buttons-show-unaligned"
                    title="show unaligned only"
                    class="button is-small is-outlined is-primary"
                    :class="{'is-focused': filter === 'showUnaligned'}">
                    <span class="icon">
                        <i class="fa fa-unlink" />
                    </span>
                </div>
                <div
                    @click="filterHierarchy('showAll')"
                    id="framework-buttons-show-all"
                    title="show all"
                    class="button is-outlined is-small is-primary"
                    :class="{'is-focused': filter === 'showAll'}">
                    <span class="icon">
                        <i class="fa fa-list-alt" />
                    </span>
                </div>
                <button
                    @click="changeFrameworkSource"
                    id="framework-buttons-change-source"
                    title="change source"
                    v-if="subview === 'crosswalkSource' && alignmentsToSave.length === 0"
                    class="button is-small is-outlined is-dark">
                    <span class="icon">
                        <i class="fa fa-exchange-alt" />
                    </span>
                </button>
                <button
                    @click="changeFrameworkTarget"
                    id="framework-buttons-change-target"
                    title="change target"
                    v-else-if="subview === 'crosswalkTarget' && alignmentsToSave.length === 0"
                    class="button is-small is-outlined is-dark">
                    <span class="icon">
                        <i class="fa fa-exchange-alt" />
                    </span>
                </button>
            </div>
        </div>
        <!-- MULTI EDIT BUTTONS -->
        <div
            class="column is-narrow"
            v-if="view !== 'crosswalk'">
            <div
                class="buttons">
                <div
                    v-if="multipleSelected && view !== 'import' && canEdit"
                    @click="$emit('edit-multiple-event')"
                    id="framework-buttons-edit-multiple"
                    class="button is-outlined is-primary">
                    <span class="icon">
                        <i class="fa fa-cog" />
                    </span>
                    <span>
                        Edit multiple
                    </span>
                </div>
                <!-- if multiple are selected allow for edit multiple -->
                <div
                    @click="addingNode = true;"
                    id="framework-buttons-add-competency"
                    v-if="!addingNode && canEdit && !multipleSelected"
                    class="button is-outlined is-primary">
                    <span class="icon">
                        <i class="fa fa-plus-circle" />
                    </span>
                    <span>
                        Add Competency
                    </span>
                </div>
                <div
                    v-if="addingNode"
                    @click="addingNode = false;"
                    id="framework-buttons-cancel-add"
                    class="button is-outlined is-dark ">
                    <span class="icon">
                        <i class="fa fa-times" />
                    </span>
                    <span>cancel</span>
                </div>
                <div
                    v-if="addingNode"
                    @click="add(container.shortId(), null); addingNode = false;"
                    id="framework-buttons-create-new"
                    class="button is-outlined is-primary ">
                    <span class="icon">
                        <i class="fa fa-plus" />
                    </span>
                    <span>
                        create new
                    </span>
                </div>
                <div
                    v-if="addingNode"
                    @click="clickToSearch"
                    id="framework-buttons-search-to-add"
                    class="button is-outlined is-primary ">
                    <span class="icon">
                        <i class="fa fa-search" />
                    </span>
                    <span>search</span>
                </div>
            </div>
        </div>
        <!-- IMPORT WORKFLOW BUTTONS -->
        <div
            class="column"
            v-if="view === 'importPreview' || view === 'importLight'">
            <div class="buttons is-right">
                <!-- import details options -->
                <div
                    class="buttons is-small is-right">
                    <!-- cancel button -->
                    <div
                        @click="cancelImport"
                        id="framework-buttons-cancel-import"
                        class=" button is-light is-small is-pulled-right is-dark is-outlined">
                        <span>
                            Cancel
                        </span>
                        <span class="icon">
                            <i class="fa fa-times-circle" />
                        </span>
                    </div>
                    <!-- export -->
                    <div
                        v-if="view === 'importLight' && (importType !== 'text' || (importType === 'text' && importStatus === 'Competency detected'))"
                        class="button is-small is-dark is-outlined is-pulled-right"
                        @click="showModal('export')"
                        id="framework-buttons-export">
                        <span>
                            Export
                        </span>
                        <span class="icon">
                            <i class="fa fa-download" />
                        </span>
                    </div>
                    <!--  start over -->
                    <div
                        v-if="view === 'importLight' && (importType !== 'text' || (importType === 'text' && importStatus === 'Competency detected'))"
                        @click="$store.dispatch('app/clearImport')"
                        id="framework-buttons-import-again"
                        class="button is-small is-dark is-outlined is-pulled-right">
                        <span>
                            import again
                        </span>
                        <span class="icon">
                            <i class="fa fa-redo-alt" />
                        </span>
                    </div>
                    <!-- open in editor -->
                    <div
                        v-if="view === 'importLight' && (importType !== 'text' || (importType === 'text' && importStatus === 'Competency detected'))"
                        @click="openFramework"
                        id="framework-buttons-view-in-editor"
                        class="button is-small is-dark is-outlined is-pulled-right">
                        <span>view in editor</span>
                        <span class="icon">
                            <i class="fa fa-edit" />
                        </span>
                    </div>
                    <!--  accept preview -->
                    <div
                        @click="$store.commit('app/importTransition', 'light')"
                        id="framework-buttons-done-editing"
                        v-if="view === 'importPreview'"
                        class="button  is-small is-primary is-outlined is-pulled-right">
                        <span>
                            done editing
                        </span>
                        <span class="icon">
                            <i class="fa fa-arrow-right" />
                        </span>
                    </div>
                    <!--  home -->
                    <router-link
                        v-if="view === 'importLight' && (importType !== 'text' || (importType === 'text' && importStatus === 'Competency detected'))"
                        class="button is-small is-primary is-outlined is -pulled-right"
                        id="framework-buttons-done"
                        :to="{path: '/frameworks', query: queryParams}">
                        <span>
                            Done
                        </span>
                        <span class="icon">
                            <i class="fa fa-home" />
                        </span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FrameworkButtons',
    computed: {
        queryParams() {
            return this.$store.getters['editor/queryParams'];
        }
    }
};
</script>