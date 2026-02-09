<template>
    <modal-template :active="true">
        <template slot="modal-header">
            Create directory
        </template>
        <template slot="modal-body">
            <div
                class="field">
                <div class="label">
                    <label>Name of new directory</label>
                </div>
                <div class="control">
                    <div class="control">
                        <input
                            class="input"
                            placeholder="Name of new directory"
                            v-model="directoryName"
                            id="add-directory-name-input">
                    </div>
                </div>
            </div>
        </template>
        <template slot="modal-foot">
            <div
                class="field">
                <div class="buttons">
                    <div
                        class="button is-dark is-outlined"
                        @click="$store.commit('app/closeModal')"
                        id="add-directory-cancel-button">
                        Cancel
                    </div>
                    <div
                        class="button is-primary"
                        :class="directoryName.length === 0 ? 'is-disabled' : ''"
                        :disabled="directoryName.length === 0"
                        @click="$emit('create-directory', directoryName)"
                        id="add-directory-create-button">
                        Create
                    </div>
                    <div
                        class="button is-primary"
                        :class="directoryName.length === 0 ? 'is-disabled' : ''"
                        :disabled="directoryName.length === 0"
                        @click="$emit('create-another-directory', directoryName)"
                        id="add-directory-create-another-button">
                        Create and add another
                    </div>
                </div>
            </div>
        </template>
    </modal-template>
</template>

<script>
import ModalTemplate from '@/components/modalContent/ModalTemplate.vue';
export default {
    name: 'AddDirectoryModal',
    data() {
        return {
            subdirectoryName: '',
            directoryName: ''
        };
    },
    components: {
        ModalTemplate
    }
};
</script>