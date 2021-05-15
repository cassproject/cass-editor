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
    <Component
        @create-directory="$emit('create-directory', $event)"
        view="modal"
        @close="$emit('app/closeModal')"
        @cancel="$emit('app/closeModal')"
        :content="dynamicModalContent"
        :is="dynamicModal" />
</template>

<script>
import Share from '@/components/modalContent/Share.vue';
import MultiEdit from '@/components/modalContent/MultiEdit.vue';
import SearchModal from '@/components/modalContent/SearchModal.vue';
import Single from '@/components/modalContent/Single.vue';
import AddComment from '@/components/modalContent/AddComment.vue';
import AddDirectory from '@/components/modalContent/AddDirectory.vue';
import DeleteDirectoryConfirm from '@/components/modalContent/DeleteDirectoryConfirm.vue';
import DeleteCommentConfirm from '@/components/modalContent/DeleteCommentConfirm.vue';
import SupportedImportDetails from '@/components/modalContent/SupportedImportDetails.vue';
import DeleteConfigurationConfirm from '@/components/modalContent/DeleteConfigurationConfirm.vue';
import FrameworkConfiguration from '@/components/modalContent/FrameworkConfiguration.vue';
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
        Share,
        MultiEdit,
        SearchModal,
        AddComment,
        DeleteCommentConfirm,
        DeleteDirectoryConfirm,
        SupportedImportDetails,
        Single,
        AddDirectory,
        DeleteConfigurationConfirm,
        FrameworkConfiguration
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
        }

    },
    watch: {

    }
};
</script>


<style lang="scss">
    @import '@/scss/frameworks.scss';


</style>