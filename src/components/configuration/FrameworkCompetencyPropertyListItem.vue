<template>
    <div>
        <div class="columns">
            <div class="column is-2">
                {{ name }}
            </div>
            <div class="column is-2">
                <div v-if="readOnly">
                    {{ label }}
                </div>
                <div v-if="!readOnly">
                    <input type="text" v-model="label">
                </div>
            </div>
            <div class="column is-4">
                <div v-if="readOnly">
                    {{ description }}
                </div>
                <div v-if="!readOnly">
                    <input type="text" v-model="description">
                </div>
            </div>
            <div class="column is-1">
                <div v-if="readOnly || enforceRequired">
                    {{ required }}
                </div>
                <div v-if="!readOnly && !enforceRequired">
                    <select v-model="required">
                        <option :value="true">
                            true
                        </option>
                        <option :value="false">
                            false
                        </option>
                    </select>
                </div>
            </div>
            <div class="column is-2">
                <div v-if="readOnly">
                    {{ priority }}
                </div>
                <div v-if="!readOnly">
                    <select v-model="priority">
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
            </div>
            <div class="column is-1">
                <div v-if="custom">
                    <button>Modify</button>
                    <button>Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'frameworkCompetencyPropertyListItem',
    props: {
        name: {
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
        }
    }
};
</script>