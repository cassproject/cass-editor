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
        <td class="is-narrow">
            <div class="field">
                <input
                    :disabled="readOnly || enforceRequired"
                    v-model="localRequired"
                    :id="property"
                    type="checkbox"
                    :name="property"
                    class="switch">
                <label :for="property" />
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
                    class="button is-small is-primary"
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
                    class="button is-small is-danger"
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
            localLabel: this.label,
            localDescription: this.description,
            localRequired: this.required,
            localPriority: this.priority
        };
    },
    methods: {
        changeLabel: function(evt) {
            this.$emit('change', this.propertyParent, this.property, 'label', evt.srcElement.value);
        },
        changeDescription: function(evt) {
            this.$emit('change', this.propertyParent, this.property, 'description', evt.srcElement.value);
        },
        changeRequired: function(evt) {
            let retVal = false;
            if (evt.srcElement.value.equals('true')) retVal = true;
            this.$emit('change', this.propertyParent, this.property, 'required', retVal);
        },
        changePriority: function(evt) {
            this.$emit('change', this.propertyParent, this.property, 'priority', evt.srcElement.value);
        }
    }
};
</script>