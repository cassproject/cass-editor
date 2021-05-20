<!--
Dynamic component used to display various modal content such as
search, edit multiple competencies, view single competency, export,
share framework settings, and more.

To add content to this modal, imort the relevant component and trigger it
by this.$store.commit('app/showmodal', payload); Where payload at minimum
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
            view="modal"
            @close="$emit('app/closeModal')"
            @cancel="$emit('app/closeModal')"
            :content="dynamicModalContent"
            :is="dynamicModal" />
    </div>
</template>

<script>
export default {
    name: 'DynamicModal',
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
        'Share': () => import('@/components/modalContent/Share.vue'),
        'MultiEdit': () => import('@/components/modalContent/MultiEdit.vue'),
        'SearchModal': () => import('@/components/modalContent/SearchModal.vue'),
        'AddComment': () => import('@/components/modalContent/AddComment.vue'),
        'DeleteCommentConfirm': () => import('@/components/modalContent/DeleteCommentConfirm.vue'),
        'DeleteDirectoryConfirm': () => import('@/components/modalContent/DeleteDirectoryConfirm.vue'),
        'SupportedImportDetails': () => import('@/components/modalContent/SupportedImportDetails.vue'),
        'Single': () => import('@/components/modalContent/Single.vue'),
        'AddDirectory': () => import('@/components/modalContent/AddDirectory.vue'),
        'DeleteConfigurationConfirm': () => import('@/components/modalContent/DeleteConfigurationConfirm.vue'),
        'FrameworkConfiguration': () => import('@/components/modalContent/FrameworkConfiguration.vue'),
        'DeleteCompetencyConfirm': () => import('@/components/modalContent/DeleteCompetencyConfirm.vue'),
        'DeleteFrameworkConfirm': () => import('@/components/modalContent/DeleteFrameworkConfirm.vue'),
        'DeleteLevelConfirm': () => import('@/components/modalContent/DeleteLevelConfirm.vue'),
        'DeleteConceptConfirm': () => import('@/components/modalContent/DeleteConceptConfirm.vue'),
        'DeleteConceptSchemeConfirm': () => import('@/components/modalContent/DeleteConceptSchemeConfirm.vue'),
        'ExportOptionsModal': () => import('@/components/modalContent/ExportOptionsModal.vue'),
        'RemovePropertyConfirm': () => import('@/components/modalContent/RemovePropertyConfirm.vue'),
        'RequiredPropertyModal': () => import('@/components/modalContent/RequiredPropertyModal.vue')
    },
    data() {
        return {
        };
    },
    computed: {
        showModal: function() {
            return this.$store.getters['app/showModal'];
        },
        dynamicModalContent: function() {
            if (this.showModal) {
                return this.$store.getters['app/dynamicModalContent'];
            } else {
                return {};
            }
        },
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
    @import '@/scss/frameworks.scss';


</style>