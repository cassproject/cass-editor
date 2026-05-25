<template>
    <modal-template
        :active="true"
        size="small"
        content="deleteConfiguration"
        type="primary"
        @close="useAppStore().closeModal()">
        <template #modal-header>
            Framework Configuration
        </template>
        <template #modal-body>
            <div class="p-4">
                <configuration-list view="modal" />
            </div>
        </template>
        <template #modal-foot>
            <div class="buttons is-spaced">
                <button
                    class="button is-primary"
                    @click="useAppStore().closeModal()">
                    Done
                </button>
            </div>
        </template>
    </modal-template>
</template>

<script>
import ModalTemplate from './ModalTemplate.vue';
import ConfigurationList from '@/components/configuration/ConfigurationList.vue';

import {cassUtil} from '../../mixins/cassUtil';
import common from '@/mixins/common.js';
import { useAppStore } from '@/stores/app';

export default {
    mixins: [cassUtil, common],
    name: 'FrameworkConfiguration',
    components: {
        ModalTemplate,
        ConfigurationList
    },
    data() {
        return {
            typedInName: '',
            loggedInPersonEcPk: {},
            commentToSave: {},
            commentIsBusy: false,
            numDirectories: 1,
            repo: window.repo
        };
    },
    props: {
        name: {
            type: String,
            default: ''
        }
    },
    methods: {
        useAppStore
    },
    updated() {
    },
    mounted() {
    }
};
</script>

<style lang="scss">

</style>