<template>
    <div>
        <div class="columns">
            <div class="column is-2">
                {{ relationship }}
            </div>
            <div class="column is-2">
                <div v-if="readOnly">{{ localLabel }}</div>
                <div v-if="!readOnly">
                    <input type="text" v-model="localLabel" @change="changeLabel">
                </div>
            </div>
            <div class="column is-2">
                <div v-if="readOnly">{{ localEnabled }}</div>
                <div v-if="!readOnly">
                    <select v-model="localEnabled" @change="changeEnabled">
                        <option :value="true">true</option>
                        <option :value="false">false</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'relationshipListItem',
    props: {
        relationship: {
            type: String,
            default: ''
        },
        label: {
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
            let retVal = false;
            if (evt.srcElement.value.equals('true')) retVal = true;
            this.$emit('change', this.relationship, 'enabled', retVal);
        }
    }
};
</script>


<style lang="scss" scoped>
</style>