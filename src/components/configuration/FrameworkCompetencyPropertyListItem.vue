<template>
    <div>
        <div class="columns">
            <div class="column is-2">
                {{ property }}
            </div>
            <div class="column is-2">
                <div v-if="readOnly">{{ localLabel }}</div>
                <div v-if="!readOnly">
                    <input type="text" v-model="localLabel" @change="changeLabel">
                </div>
            </div>
            <div class="column is-4">
                <div v-if="readOnly">{{ localDescription }}</div>
                <div v-if="!readOnly">
                    <input type="text" v-model="localDescription" @change="changeDescription">
                </div>
            </div>
            <div class="column is-1">
                <div v-if="readOnly || enforceRequired">{{ localRequired }}</div>
                <div v-if="!readOnly && !enforceRequired">
                    <select v-model="localRequired" @change="changeRequired">
                        <option :value="true">true</option>
                        <option :value="false">false</option>
                    </select>
                </div>
            </div>
            <div class="column is-2">
                <div v-if="readOnly">{{ localPriority }}</div>
                <div v-if="!readOnly">
                    <select v-model="localPriority" @change="changePriority">
                        <option value="primary">primary</option>
                        <option value="secondary">secondary</option>
                        <option value="tertiary">tertiary</option>
                    </select>
                </div>
            </div>
            <div class="column is-1">
                <div v-if="custom && readOnly">
                    <button @click="$emit('manage', propertyParent, propertyIndex)">View</button>
                </div>
                <div v-if="custom && !readOnly">
                    <button @click="$emit('manage', propertyParent, propertyIndex)">Edit</button>
                    <button @click="$emit('delete', propertyParent, propertyIndex)">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'frameworkCompetencyPropertyListItem',
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