<template>
    <div
        id="drag-and-drop"
        @dragenter.prevent="handleDragEnter($event)"
        @dragleave.prevent="handleDragLeave($event)"
        @click="openFileExplorer()"
        @dragover.prevent
        @drop.prevent="addFile"
        :class="{ 'is-dragged-over': isDraggedOver}">
        <input
            type="file"
            :disabled="!uploadDisabled"
            @change="fileChange"
            ref="file"
            style="display: none;">
        <div class="section">
            <div class="columns is-centered is-multiline">
                <div class="has-text-centered">
                    <i class="fas fa-file fa-3x has-text-primary mb-2" />
                </div>
                <div
                    v-if="files.length === 0"
                    class="column is-12">
                    <div class="is-size-5">
                        Drag and drop a file
                        <div class="is-size-6 pt-1 pb-2">
                            - or -
                        </div>
                        <button
                            class="is-primary button is-outlined">
                            Browse
                        </button>
                    </div>
                </div>


                <div class="column is-12">
                    <ul>
                        <li
                            class="is-size-6"
                            v-for="file in files"
                            :key="file"
                            style="display: inline; vertical-align: middle;">
                            <span class="has-text-weight-medium">
                                {{ file.name }} ({{ kb(file.size) }} kb)
                                <button
                                    title="Remove"
                                    @click="removeFile(file)"
                                    class="button is-small is-text">
                                    <span class="icon">
                                        <i class="fa fa-times" />
                                    </span>
                                </button>
                            </span>
                        </li>
                    </ul>
                </div><div class="column is-12">
                    <button
                        class="button is-outlined is-primary is-medium"
                        :disabled="uploadDisabled"
                        @click="process">
                        <span>
                            Process Files
                        </span>
                        <span class="icon is-large">
                            <i class="fas fa-arrow-right" />
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {useAppStore} from '@/stores/app';

export default {
    name: 'DragAndDrop',
    data() {
        return {
            files: [],
            isDraggedOver: false,
            counter: 0
        };
    },
    computed: {
        uploadDisabled() {
            return this.files.length === 0;
        }
    },
    watch: {
    },

    mounted: function() {
        const appStore = useAppStore();
        appStore.clearImportFiles();
    },
    methods: {
        kb(val) {
            return Math.floor(val / 1024);
        },
        handleDragEnter(e) {
            this.counter++;
            if (e.target.id) {
                if (e.target.id === 'drag-and-drop') {
                    this.isDraggedOver = true;
                }
            }
        },
        handleDragLeave(e) {
            this.counter--;
            if (e.target) {
                if (e.target.id === 'drag-and-drop') {
                    if (this.counter === 0) {
                        this.isDraggedOver = false;
                    }
                }
            }
        },
        openFileExplorer() {
            if (this.uploadDisabled) {
                this.$refs.file.click();
            }
        },
        fileChange(e) {
            appLog(e);
            let selectedFiles = e.target.files;
            if (selectedFiles) {
                ([...selectedFiles]).forEach(f => {
                    this.files.push(f);
                });
            } else {
                this.files = [];
            }
        },
        addFile(e) {
            let droppedFiles = e.dataTransfer.files || e.target.files;
            if (!droppedFiles) return;
            ([...droppedFiles]).forEach(f => {
                this.files.push(f);
            });
            this.isDraggedOver = false;
        },
        removeFile(file) {
            this.files = this.files.filter(f => {
                return f !== file;
            });
            this.$refs.file.value = '';
            this.$emit('clear-files');
        },
        process() {
            const appStore = useAppStore();
            appStore.setImportFiles(this.files);
            appStore.setImportTransition('processFiles');
        }
    }
};

</script>

<style lang="scss">

#drag-and-drop {
    height: 100%;
}
#drag-and-drop.is-dragged-over {
    height: 100% !important;
    width: 100% !important;
    background-color: rgba(var(--primary-rgb), .2);
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>
