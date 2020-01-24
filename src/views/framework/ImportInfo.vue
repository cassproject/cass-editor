<template>
    <div id="import-info">
        <div class="columns is-multiline import-info__container">
            <div class="column is-12">
                <h3 class="is-size-5 has-text-weight-bold">
                    We've detected a framework.
                </h3>
            </div>
            <div class="column is-12">
                <p class="is-size-6">
                    Please review the details below and accept to continue to the framework preview.
                </p>
            </div>
            <div class="column is-12">
                <p class="has-text-weight-bold is-size-7">
                    CaSS detected <b>{{ importDetails.rowsDetected }}</b> rows and <b>{{ importDetails.columnsDetected }}</b> columns
                </p>
            </div>
            <div class="column is-12">
                <p class="has-text-weight-bold is-size-7">
                    CaSS Detected the following file type
                </p>
                <div class="section">
                    <p class="is-size-7">
                        {{ importDetails.fileType }}
                    </p>
                    <a class="button is-text is-small">
                        Not the right file type? Select a different file type.</a>
                </div>
            </div>
            <div class="column is-12">
                <p class="has-text-weight-bold is-size-7">
                    CaSS detected the following competency format
                </p>
                <div class="section">
                    <p class="is-size-7">
                        {{ importDetails.formatType }}
                    </p>
                    <a class="button is-text is-small">
                        Not the right file format? Select a different file format.</a>
                </div>
            </div>
        </div>
        <div class="buttons is-right">
            <div
                @click="acceptImportInfo"
                class="button is-primary is-small">
                Accept and continue
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ImportInfo',
    data() {
        return {
            importDetails: {
                competenciesDetected: 12,
                rowsDetected: 4,
                columsDetected: 12,
                fileType: 'docx',
                formatType: 'Department of Labor'
            },
            importErrors: [
                'bad file type',
                'no headers'
            ]
        };
    },
    methods: {
        acceptImportInfo() {
            this.$emit('acceptImportInfo');
        }
    }
};
</script>
<style lang="scss">
    @import './../../variables.scss';
#import-info {
    color: $black;
    padding: 1rem;
}
.import-info__container {
    border: solid 1px $black;
    border-radius: 10px;
    padding: 12px;
}
</style>