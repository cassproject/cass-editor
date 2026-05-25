<template>
    <div id="concept">
        <RightAside v-if="showRightAside" />
        <!-- begin framework -->
        <div v-if="framework" class="framework-content">
            <FrameworkEditorToolbar
                :properties="properties"
                @change-properties="changeProperties"
                @show-export-modal="onOpenExportModal" />
            <div class="framework-wrapper">
                <draggable
                    v-bind="dragOptions"
                    v-model="frameworkDrag"
                    tag="ul"
                    id="framework_drag"
                    :disabled="canEdit !== true"
                    :group="{ name: 'test' }"
                    handle=".handle"
                    item-key="id">
                    <template #item="{ element }">
                        <div>{{ element }}</div>
                    </template>
                </draggable>
                <Component
                    :class="dynamicThingComponent === 'Thing' ? parentObjectClass: ''"
                    :is="dynamicThingComponent"
                    :id="'scroll-' + framework.shortId().split('/').pop()"
                    :obj="framework"
                    :repo="repo"
                    view="concept"
                    :newFramework="newFramework"
                    :parentNotEditable="queryParams.view==='true'"
                    :profile="progressionModelProfile"
                    @edit-node-event="onEditNode()"
                    @done-editing-node-event="onDoneEditingNode()"
                    :properties="properties">
                    <div class="lode__framework__info-bar">
                        <span
                            class="tag is-medium-grey has-text-dark"
                            v-if="timestamp"
                            :title="new Date(timestamp)">
                            Last modified {{ isCeasn ? "(in CaSS)" : "" }} {{ lastModified }}
                        </span>
                        <span
                            class="tag is-medium-grey has-text-dark"
                            v-if="framework['schema:dateCreated']"
                            :title="new Date(framework['schema:dateCreated'])">
                            Created {{ isCeasn ? "(in CaSS)" : "" }} {{ $moment(framework['schema:dateCreated']).format("MMM D YYYY") }}
                        </span>
                        <span
                            class="tag is-medium-grey has-text-dark"
                            v-if="framework['Approved']"
                            :title="framework['Approved']">
                            Approved
                        </span>
                        <span
                            class="tag is-medium-grey has-text-dark"
                            v-if="framework['Published']"
                            :title="framework['Published']">
                            Published
                        </span>
                    </div>
                </Component>
                <ProgressionHierarchy
                    :container="framework"
                    containerType="ConceptScheme"
                    containerTypeGet="EcConceptScheme"
                    :viewOnly="queryParams.view === 'true'"
                    :repo="repo"
                    view="concept"
                    :highlightList="highlightCompetency"
                    :profile="progressionLevelProfile"
                    @edit-multiple-event="onEditMultiple"
                    @search-things="handleSearch($event)"
                    @select-button-click="onSelectButtonClick"
                    :properties="properties"
                    @selected-array="selectedArrayEvent"
                    :doneDragging="doneDragging" />
            </div>
        </div>
        <div
            v-if="scrolled"
            class="extra-space-for-scroll" />
    </div>
</template>
<script>
import { defineAsyncComponent } from 'vue';
import dayjs from 'dayjs';
import debounce from 'lodash/debounce';
import common from '@/mixins/common.js';
import ctdlasnProfile from '@/mixins/ctdlasnProfile.js';
import {mapState} from 'pinia';
import {useEditorStore} from '@/stores/editor';
import {useAppStore} from '@/stores/app';

export default {
    name: "ProgressionModel",
    mixins: [common, ctdlasnProfile],
    data: function() {
        return {
            scrolled: false,
            parentObjectClass: 'parent-object',
            showVersionHistory: false,
            showEditMultiple: false,
            showClipboardSuccessModal: false,
            repo: window.repo,
            highlightCompetency: null,
            editingFramework: false,
            properties: "primary",
            config: null,
            selectedArray: [],
            editsToUndo: [],
            dragOptions: {
                scroll: true,
                swapThreshold: 0.75,
                disabled: false,
                emptyInsertThreshold: 36,
                animation: 0,
                ghostClass: 'ghost-drag',
                chosenClass: 'chosen-drag',
                dragClass: 'drag',
                scrollSensitivity: 30,
                scrollSpeed: 5,
                forceFallback: true
            },
            frameworkDrag: [],
            doneDragging: false
        };
    },
    computed: {
        ...mapState(useEditorStore, ['framework', 'queryParams']),
        ...mapState(useAppStore, ['showRightAside']),
        isCeasn: function() {
            if (this.queryParams["ceasnDataFields"] && this.queryParams["ceasnDataFields"] === 'true') {
                return true;
            } else {
                return false;
            }
        },
        newFramework: function() {
            const editorStore = useEditorStore();
            return editorStore.newFramework === this.framework.shortId();
        },
        dynamicThingComponent: function() {
            const editorStore = useEditorStore();
            if (this.editingFramework || (editorStore.newFramework === this.framework.shortId())) {
                return 'ThingEditing';
            } else {
                return 'Thing';
            }
        },
        timestamp: function() {
            if (this.framework.getTimestamp()) {
                return this.framework.getTimestamp();
            } else if (this.framework["schema:dateModified"]) {
                return this.framework["schema:dateModified"];
            } else {
                return null;
            }
        },
        lastModified: function() {
            if (this.framework == null) return "Unknown.";
            if (this.timestamp) {
                return dayjs(this.timestamp).format("MMM D YYYY");
            } else {
                return null;
            }
        },
        shortId: function() {
            if (this.framework) {
                return this.framework.shortId();
            } else {
                return null;
            }
        },
        loggedIn: function() {
            if (EcIdentityManager.default.ids && EcIdentityManager.default.ids.length > 0) {
                return true;
            }
            return false;
        },
        progressionModelProfile: function() {
            return this.ctdlAsnProgressionModelProfile;
        },
        progressionLevelProfile: function() {
            return this.ctdlAsnProgressionLevelProfile;
        },
        canEdit: function() {
            if (this.queryParams.view === 'true') {
                return false;
            }
            return this.canEditAny(this.framework);
        }
    },
    components: {
        Thing: defineAsyncComponent(() => import('@/lode/components/Thing.vue')),
        ThingEditing: defineAsyncComponent(() => import('@/lode/components/ThingEditing.vue')),
        FrameworkEditorToolbar: defineAsyncComponent(() => import('@/components/framework/EditorToolbar.vue')),
        RightAside: defineAsyncComponent(() => import('@/components/framework/RightAside.vue')),
        ProgressionHierarchy: defineAsyncComponent(() => import('./ProgressionHierarchy.vue')),
        draggable: defineAsyncComponent(() => import('vuedraggable'))
    },
    created: function() {
        if (this.framework !== null) {
            this.refreshPage();
            this.spitEvent('viewChanged');
        }
    },
    mounted: async function() {
        if (!this.framework) {
            const frameworkId = this.$route.params.frameworkId;
            if (frameworkId) {
                try {
                    const fw = await EcConceptScheme.get(frameworkId);
                    if (fw) {
                        const editorStore = useEditorStore();
                        editorStore.setFramework(fw);
                        editorStore.clearFrameworkCommentData();
                        editorStore.setProgressionMode(true);
                        this.refreshPage();
                        this.spitEvent('viewChanged');
                        await this.$nextTick();
                        let documentBody = document.getElementById('concept');
                        if (documentBody) {
                            documentBody.addEventListener('scroll', debounce(this.scrollFunction, 20, {'immediate': true}));
                        }
                        if (this.isCeasn) {
                            this.getConceptCtids();
                            this.getConceptRegistryUrls();
                        }
                        return;
                    }
                } catch (e) {
                    appError(e);
                }
            }
            this.$router.push({name: "frameworks"});
            return;
        }
        let documentBody = document.getElementById('concept');
        documentBody.addEventListener('scroll', debounce(this.scrollFunction, 20, {'immediate': true}));
        if (this.isCeasn) {
            this.getConceptCtids();
            this.getConceptRegistryUrls();
        }
    },
    beforeUnmount() {
    },
    watch: {
        shortId: function() {
            this.refreshPage();
        },
        frameworkDrag: function() {
            if (this.frameworkDrag.length > 0) {
                let id = EcRemoteLinkedData.trimVersionFromUrl(this.frameworkDrag[0].obj.id);
                this.moveToTopLevel(id);
                this.frameworkDrag = [];
                this.doneDragging = true;
            }
        }
    },
    methods: {
        scrollFunction(e) {
            let documentObject = document.getElementsByClassName('parent-object');
            let scrollValue = e.target.scrollTop;
            if (scrollValue > 0) {
                this.parentObjectClass = 'parent-object scrolled';
                this.scrolled = true;
            } else {
                this.parentObjectClass = 'parent-object';
                this.scrolled = false;
            }
        },
        handleSearch: function(e) {
            const appStore = useAppStore();
            appStore.openModal(e);
        },
        onCancelEditMultiple: function() {
            this.showEditMultiple = false;
        },
        onEditMultiple: function() {
            this.showEditMultiple = true;
            var payload = {
                profile: this.progressionLevelProfile,
                selectedCompetencies: this.selectedArray,
                component: 'MultiEdit'
            };
            const appStore = useAppStore();
            appStore.openModal(payload);
        },
        onEditNode: function() {
            this.editingFramework = true;
        },
        onDoneEditingNode: async function() {
            const editorStore = useEditorStore();
            editorStore.setFramework(await EcRepository.get(this.framework.shortId()));
            editorStore.setNewFramework(null);
            this.editingFramework = false;
        },
        selectedArrayEvent: function(ary) {
            this.selectedArray = ary;
        },
        refreshPage: function() {
            if (!this.framework) {
                appLog("no framework to refresh");
                return;
            }
            this.setDefaultLanguage();
            this.highlightCompetency = [];
            if (this.queryParams.highlightCompetency) {
                if (!EcArray.isArray(highlightCompetency)) {
                    this.highlightCompetency = [this.queryParams.highlightCompetency];
                } else {
                    this.highlightCompetency = this.queryParams.highlightCompetency;
                }
            }
        },
        getDisplayStringFrom: function(n) {
            if (n != null && EcArray.isArray(n)) {
                if ((n).length > 0) {
                    n = (n)[0];
                }
            }
            if (n != null && EcObject.isObject(n) && (n)["@value"]) {
                return (n)["@value"];
            }
            return n;
        },
        onOpenExportModal() {
            const editorStore = useEditorStore();
            const appStore = useAppStore();
            editorStore.setItemToExport(this.framework);
            appStore.openModal({component: 'ExportOptionsModal', title: 'Export Concept Scheme'});
        },
        changeProperties: function(type) {
            this.properties = type;
        },
        onSelectButtonClick: function(ids) {
            this.selectButton(ids);
        },
        moveToTopLevel: async function(id) {
            let me = this;
            let concept = await EcConcept.get(id);
            if (concept["skos:broader"]) {
                if (!EcArray.isArray(concept["skos:broader"])) {
                    concept["skos:broader"] = [concept["skos:broader"]];
                }
                let parent = await EcConcept.get(concept["skos:broader"][0]);
                let fromIndex = parent["skos:narrower"].indexOf(id);
                parent["skos:narrower"].splice(fromIndex, 1);
                repo.saveTo(parent, function() {}, function() {});
                delete concept["skos:broader"];
            }
            this.framework["skos:hasTopConcept"].push(id);
            concept["skos:topConceptOf"] = this.framework.shortId();
            repo.saveTo(concept, function() {
                repo.saveTo(me.framework, function() {
                    me.refreshPage();
                }, function() {});
            }, function() {});
        }
    }
};
</script>

<style lang="scss">
    @import '@/scss/framework.scss';

</style>