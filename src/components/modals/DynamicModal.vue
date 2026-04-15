<!--
Dynamic component used to display various modal content such as
search, edit multiple competencies, view single competency, export,
share framework settings, and more.

To add content to this modal, imort the relevant component and trigger it
by store.app().setShowModal(payload); Where payload at minimum
returns an object with component: 'View' so the dynamic :is=dynamicModal
returns content.

Notes: If a modal should go on top of an existing modal - such as some delete / warning modals
it should always be produced in its own modal as to not replace the existing modal.
-->
<template>
    <div>
        <Component
            :title="title"
            @create-directory="$emit('create-directory', $event)"
            @create-another-directory="$emit('create-another-directory', $event)"
            view="modal"
            @close="$emit('app/closeModal')"
            @cancel="$emit('app/closeModal')"
            :content="dynamicModalContent"
            :is="dynamicModal" />
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { mapState } from 'pinia';
import store from '@/stores/index.js';
export default {
    name: 'DynamicModal',
    emits: ["create-directory","create-another-directory","app/closeModal"],
    props: {
        type: {
            default: 'info',
            type: String
        },
        color: {
            default: 'white',
            type: String
        }
    },
    components: {
        'Share': defineAsyncComponent(() => import('@/components/modalContent/Share.vue')),
        'MultiEdit': defineAsyncComponent(() => import('@/components/modalContent/MultiEdit.vue')),
        'SearchModal': defineAsyncComponent(() => import('@/components/modalContent/SearchModal.vue')),
        'AddComment': defineAsyncComponent(() => import('@/components/modalContent/AddComment.vue')),
        'DeleteCommentConfirm': defineAsyncComponent(() => import('@/components/modalContent/DeleteCommentConfirm.vue')),
        'DeleteDirectoryConfirm': defineAsyncComponent(() => import('@/components/modalContent/DeleteDirectoryConfirm.vue')),
        'SupportedImportDetails': defineAsyncComponent(() => import('@/components/modalContent/SupportedImportDetails.vue')),
        'Single': defineAsyncComponent(() => import('@/components/modalContent/Single.vue')),
        'AddDirectory': defineAsyncComponent(() => import('@/components/modalContent/AddDirectory.vue')),
        'DeleteConfigurationConfirm': defineAsyncComponent(() => import('@/components/modalContent/DeleteConfigurationConfirm.vue')),
        'FrameworkConfiguration': defineAsyncComponent(() => import('@/components/modalContent/FrameworkConfiguration.vue')),
        'DeleteCompetencyConfirm': defineAsyncComponent(() => import('@/components/modalContent/DeleteCompetencyConfirm.vue')),
        'DeleteFrameworkConfirm': defineAsyncComponent(() => import('@/components/modalContent/DeleteFrameworkConfirm.vue')),
        'DeleteLevelConfirm': defineAsyncComponent(() => import('@/components/modalContent/DeleteLevelConfirm.vue')),
        'DeleteConceptConfirm': defineAsyncComponent(() => import('@/components/modalContent/DeleteConceptConfirm.vue')),
        'DeleteConceptSchemeConfirm': defineAsyncComponent(() => import('@/components/modalContent/DeleteConceptSchemeConfirm.vue')),
        'RemoveCompetencyConfirm': defineAsyncComponent(() => import('@/components/modalContent/RemoveCompetencyConfirm.vue')),
        'ExportOptionsModal': defineAsyncComponent(() => import('@/components/modalContent/ExportOptionsModal.vue')),
        'RequiredPropertyModal': defineAsyncComponent(() => import('@/components/modalContent/RequiredPropertyModal.vue')),
        'DuplicateImport': defineAsyncComponent(() => import('@/components/modalContent/DuplicateImport.vue')),
        'ImportError': defineAsyncComponent(() => import('@/components/modalContent/ImportError.vue')),
        'ShareAssertions': defineAsyncComponent(() => import('@/components/modalContent/ShareAssertions.vue')),
        'LogoutSuccess': defineAsyncComponent(() => import('@/components/modalContent/LogoutSuccess.vue')),
        'MessageOfTheDay': defineAsyncComponent(() => import('@/components/modalContent/MessageOfTheDay.vue'))
    },
    data() {
        return {
        };
    },
    computed: {
        ...mapState(store.app,{
            showModal: state => state.showModal,
            dynamicModalContent: state => state.dynamicModalContent || {}
        }),
        dynamicModal: function() {
            if (this.dynamicModalContent) {
                return this.dynamicModalContent.component;
            } else {
                return '';
            }
        },
        title: function() {
            if (this.dynamicModalContent && this.dynamicModalContent.title) {
                return this.dynamicModalContent.title;
            } else {
                return '';
            }
        }

    },
    watch: {

    }
};
</script>


<style lang="scss">
    @use '@/scss/frameworks.scss';


</style>