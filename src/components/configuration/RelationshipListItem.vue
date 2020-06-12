<!--
    Fills a row in ConfigurationDetails.vue
    RelationshipListItem component
-->
<template>
    <tr>
        <th>
            {{ relationship }}
        </th>
        <td>
            <div v-if="readOnly">
                {{ localLabel }}
            </div>
            <div v-if="!readOnly">
                <input
                    type="text"
                    class="input is-small"
                    v-model="localLabel"
                    @change="changeLabel">
            </div>
        </td>
        <td>
            <div
                class="field">
                <input
                    :disabled="readOnly"
                    @change="changeEnabled"
                    v-model="localEnabled"
                    :id="relationship + scope"
                    type="checkbox"
                    :name="relationship + scope"
                    class="switch">
                <label :for="relationship + scope" />
            </div>
        </td>
    </tr>
</template>

<script>
export default {
    name: 'RelationshipListItem',
    props: {
        relationship: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        scope: {
            type: String,
            default: ''
        },
        enabled: {
            type: Boolean,
            default: true
        },
        readOnly: {
            type: Boolean,
            default: true
        }
    },
    data: function() {
        return {
            localLabel: this.label,
            localEnabled: this.enabled
        };
    },
    methods: {
        changeLabel: function(evt) {
            this.$emit('change', this.relationship, 'label', evt.srcElement.value);
        },
        changeEnabled: function(evt) {
            // let retVal = false;
            // if (evt.srcElement.value.equals('true')) retVal = true;
            let retVal = evt.target.checked;
            console.log("evt", evt);
            this.$emit('change', this.relationship, 'enabled', retVal);
        }
    }
};
</script>


<style lang="scss" scoped>
</style>