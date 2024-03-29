<template>
    <tr>
        <th>
            {{ property }}
        </th>
        <td>
            <div v-if="readOnly">
                {{ localLabel }}
            </div>
            <div
                class="field"
                v-if="!readOnly">
                <div class="control">
                    <input
                        class="input is-small"
                        type="text"
                        v-model="localLabel"
                        @change="changeLabel">
                </div>
            </div>
        </td>
        <td>
            <div v-if="readOnly">
                {{ localDescription }}
            </div>
            <div
                class="field"
                v-if="!readOnly">
                <div class="control">
                    <input
                        type="text"
                        class="input is-small"
                        v-model="localDescription"
                        @change="changeDescription">
                </div>
            </div>
        </td>
        <td>
            <div v-if="readOnly">
                {{ localHeading }}
            </div>
            <div
                class="field"
                v-if="!readOnly">
                <div class="control">
                    <input
                        type="text"
                        class="input is-small"
                        v-model="localHeading"
                        @change="changeHeading">
                </div>
            </div>
        </td>
        <td class="is-narrow">
            <div class="field">
                <div class="control is-size-3">
                    <input
                        :disabled="readOnly || enforceRequired || enforceNotRequired"
                        v-model="localRequired"
                        :id="property + propertyParent"
                        type="checkbox"
                        :name="property + propertyParent"
                        class="switch is-outlined"
                        @change="changeRequired">
                    <label :for="property + propertyParent" />
                </div>
            </div>
        </td>
        <td>
            <div v-if="readOnly || enforcePrimary">
                {{ localPriority }}
            </div>
            <div
                class="select is-small"
                v-if="!readOnly && !enforcePrimary">
                <select
                    v-model="localPriority"
                    @change="changePriority">
                    <option value="primary">
                        primary
                    </option>
                    <option value="secondary">
                        secondary
                    </option>
                    <option value="tertiary">
                        tertiary
                    </option>
                </select>
            </div>
        </td>
        <td>
            <div v-if="custom && readOnly">
                <div
                    class="button"
                    @click="$emit('manage', propertyParent, propertyIndex)">
                    <div class="icon">
                        <i class="fa fa-cog" />
                    </div>
                </div>
            </div>
            <div v-if="custom && !readOnly">
                <div
                    class="button is-small is-outlined is-primary"
                    @click="$emit('manage', propertyParent, propertyIndex)">
                    <span class="icon">
                        <i class="fa fa-cog" />
                    </span>
                </div>
            </div>
        </td>
        <td>
            <div v-if="custom && !readOnly">
                <div
                    class="button is-small is-outlined is-danger"
                    @click="$emit('delete', propertyParent, propertyIndex)">
                    <span class="icon">
                        <i class="fa fa-trash" />
                    </span>
                </div>
            </div>
        </td>
    </tr>
</template>

<script>
export default {
    name: 'FrameworkCompetencyPropertyListItem',
    props: {
        propertyParent: {
            type: String,
            default: ''
        },
        property: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        },
        required: {
            type: Boolean,
            default: false
        },
        priority: {
            type: String,
            default: ''
        },
        heading: {
            type: String,
            default: ''
        },
        custom: {
            type: Boolean,
            default: false
        },
        readOnly: {
            type: Boolean,
            default: true
        },
        enforceRequired: {
            type: Boolean,
            default: true
        },
        enforceNotRequired: {
            type: Boolean,
            default: false
        },
        enforcePrimary: {
            type: Boolean,
            default: true
        },
        propertyIndex: {
            type: Number
        }
    },
    data: function() {
        return {
            localLabel: '',
            localDescription: '',
            localRequired: false,
            localPriority: '',
            localHeading: ''
        };
    },
    watch: {
        'propertyParent': function() {
            this.init();
        },
        'property': function() {
            this.init();
        }
    },
    methods: {
        changeLabel: function(evt) {
            this.$emit('change', this.propertyParent, this.property, 'label', evt.srcElement.value);
        },
        changeDescription: function(evt) {
            this.$emit('change', this.propertyParent, this.property, 'description', evt.srcElement.value);
        },
        changeRequired: function(evt) {
            let retVal = evt.target.checked;
            this.$emit('change', this.propertyParent, this.property, 'required', retVal);
        },
        changePriority: function(evt) {
            this.$emit('change', this.propertyParent, this.property, 'priority', evt.srcElement.value);
        },
        changeHeading: function(evt) {
            this.$emit('change', this.propertyParent, this.property, 'heading', evt.srcElement.value);
        },
        init: function() {
            this.localLabel = this.label;
            this.localDescription = this.description;
            this.localRequired = this.required;
            this.localPriority = this.priority;
            this.localHeading = this.heading;
        }
    },
    mounted() {
        this.init();
    }

};
</script>