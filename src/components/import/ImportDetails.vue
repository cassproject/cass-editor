<!--ImportDetails.vue
    Used as an interstitial screen in the import workflow
    Can display basic details for framework acceptance
-->
<template>
    <div
        class="section import-details"
        v-if="importFramework && importTransition === 'detail'">
        <!-- interstitial screen will go here -->
        <div class="import-details__section">
            <h3 class="subtitle is-size-3 has-text-weight-normal">
                The following details were detected.
            </h3>
            <p class="is-size-6 has-text-weight-light">
                If these details don't look correct, please verify your file
                is correct and import again.
            </p>
            <ul class="is-size-6 detected-import-details">
                <li v-if="detailsDetected.columns > 0">
                    <span class="icon has-text-success">
                        <i class="fa fa-check-circle" />
                    </span>
                    CaSS detected <b>{{ detailsDetected.columns }}</b> columns
                </li>
                <li v-if="detailsDetected.rows > 0">
                    <span class="icon has-text-success">
                        <i class="fa fa-check-circle" />
                    </span>
                    CaSS detected <b>{{ detailsDetected.rows }}</b> rows
                </li>
                <li>
                    <span class="icon has-text-success">
                        <i class="fa fa-check-circle" />
                    </span>
                    CaSS detected <b>{{ detailsDetected.competencies }}</b> competencies in the imported framework
                </li>
                <li>
                    <span class="icon has-text-success">
                        <i class="fa fa-check-circle" />
                    </span>
                    CaSS detected a <b>{{ detailsDetected.fileType }}</b> file type
                </li>
                <li v-if="detailsDetected.headers">
                    <span class="icon has-text-success">
                        <i class="fa fa-check-circle" />
                    </span>
                    <b>Header rows detected</b>
                </li>
            </ul>
            <!--accept details -->
            <div class="buttons is-right">
                <div
                    @click="cancelImport"
                    class=" button is-light is-small is-pulled-right is-dark is-outlined">
                    <span>
                        Cancel
                    </span>
                    <span class="icon">
                        <i class="fa fa-times-circle" />
                    </span>
                </div>
                <div
                    @click="$store.commit('app/importTransition', 'preview')"
                    v-if="importTransition === 'detail'"
                    class="button is-small is-primary is-outlined">
                    <span>
                        Accept Details & Review
                    </span>
                    <span class="icon is-small">
                        <i class="fas fa-arrow-right" />
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ImportDetails',
    props: {
        detailsDetected: Object
    },
    components: {

    },
    computed: {
        importErrors: function() {
            return this.$store.getters['app/importErrors'];
        },
        importFile: function() {
            return this.$store.getters['app/importFiles'];
        },
        importTransition: function() {
            return this.$store.getters['app/importTransition'];
        },
        importType: function() {
            return this.$store.getters['app/importType'];
        },
        importFileType: function() {
            return this.$store.getters['app/importFileType'];
        },
        importFramework: function() {
            return this.$store.getters['app/importFramework'];
        },
        importStatus: function() {
            return this.$store.getters['app/importStatus'];
        }
    },
    methods: {
        cancelImport: function() {
            this.$emit("delete-object", this.importFramework);
            this.$store.dispatch('app/clearImport');
        }
    }
};
</script>