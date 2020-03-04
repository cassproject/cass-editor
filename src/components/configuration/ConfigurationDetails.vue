<template>
    <div>
        <label>Name: </label>
        <input
            type="text"
            v-model="config.name"
            :readonly="readOnly">
        <br>
        <label>Description: </label>
        <input
            type="text"
            v-model="config.description"
            :readonly="readOnly">
        <br>
        <br>
        <!-- ************************************** Framework Properties ************************************************ -->
        <h5>Framework Properties</h5>
        <div class="columns">
            <div class="column is-2 listHdr">
                property
            </div>
            <div class="column is-2 listHdr">
                label
            </div>
            <div class="column is-4 listHdr">
                description
            </div>
            <div class="column is-1 listHdr">
                required
            </div>
            <div class="column is-2 listHdr">
                priority
            </div>
            <div class="column is-1 listHdr">
            </div>
        </div>
        <FrameworkCompetencyPropertyListItem
            name="id"
            :label="config.fwkIdLabel"
            :description="config.fwkIdDescription"
            :required="true"
            :priority="config.fwkIdPriorty"
            :custom="false"
            :readOnly="readOnly"
            :enforceRequired="true">
        </FrameworkCompetencyPropertyListItem>
        <FrameworkCompetencyPropertyListItem
            name="name"
            :label="config.fwkNameLabel"
            :description="config.fwkNameDescription"
            :required="true"
            priority="primary"
            :custom="false"
            :readOnly="readOnly"
            :enforceRequired="true">
        </FrameworkCompetencyPropertyListItem>
        <FrameworkCompetencyPropertyListItem
            name="description"
            :label="config.fwkDescLabel"
            :description="config.fwkDescDescription"
            :required="config.fwkDescIsRequired"
            :priority="config.fwkDescPriority"
            :custom="false"
            :readOnly="readOnly"
            :enforceRequired="false">
        </FrameworkCompetencyPropertyListItem>
        <p>TODO custom framework properties</p>
        <br>
        <br>
        <!-- ************************************** Competency Properties ************************************************ -->
        <h5>Competency Properties</h5>
        <div class="columns">
            <div class="column is-2 listHdr">
                property
            </div>
            <div class="column is-2 listHdr">
                label
            </div>
            <div class="column is-4 listHdr">
                description
            </div>
            <div class="column is-1 listHdr">
                required
            </div>
            <div class="column is-2 listHdr">
                priority
            </div>
            <div class="column is-1 listHdr">
            </div>
        </div>
        <FrameworkCompetencyPropertyListItem
            name="id"
            :label="config.compIdLabel"
            :description="config.compIdDescription"
            :required="true"
            :priority="config.compIdPriorty"
            :custom="false"
            :readOnly="readOnly"
            :enforceRequired="true">
        </FrameworkCompetencyPropertyListItem>
        <FrameworkCompetencyPropertyListItem
            name="name"
            :label="config.compNameLabel"
            :description="config.compNameDescription"
            :required="true"
            priority="primary"
            :custom="false"
            :readOnly="readOnly"
            :enforceRequired="true">
        </FrameworkCompetencyPropertyListItem>
        <FrameworkCompetencyPropertyListItem
            name="description"
            :label="config.compDescLabel"
            :description="config.compDescDescription"
            :required="config.compDescIsRequired"
            :priority="config.compDescPriority"
            :custom="false"
            :readOnly="readOnly"
            :enforceRequired="false">
        </FrameworkCompetencyPropertyListItem>
        <FrameworkCompetencyPropertyListItem
            name="type"
            :label="config.compTypeLabel"
            :description="config.compTypeDescription"
            :required="config.compTypeIsRequired"
            :priority="config.compTypePriority"
            :custom="false"
            :readOnly="readOnly"
            :enforceRequired="false">
        </FrameworkCompetencyPropertyListItem>
        <p>TODO custom competency properties</p>
        <br>
        <br>
        <!-- ************************************** Competency Type Enforcement ************************************************ -->
        <h5>Competency Type Enforcement (optional)</h5>
        <p>Leave this section empty to allow competencies of any type</p>
        <p>TODO...fill this in</p>
        <div class="columns">
            <div class="column is-2 listHdr">
                label
            </div>
            <div class="column is-4 listHdr">
                value
            </div>
        </div>
        <br>
        <br>
        <!-- ************************************** Allow Levels ************************************************ -->
        <h5>Allow Levels?</h5>
        <div v-if="readOnly">
            {{ config.compAllowLevels }}
        </div>
        <div v-if="!readOnly ">
            <select v-model="config.compAllowLevels">
                <option :value="true">
                    true
                </option>
                <option :value="false">
                    false
                </option>
            </select>
        </div>
        <br>
        <br>
        <!-- ************************************** Competency Relationships ************************************************ -->
        <h5>Competency Relationships</h5>
        <div class="columns">
            <div class="column is-2 listHdr">
                relationship
            </div>
            <div class="column is-2 listHdr">
                label
            </div>
            <div class="column is-2 listHdr">
                enabled
            </div>
        </div>
        <br>
        <br>
        <!-- ************************************** Resource Alignments ************************************************ -->
        <h5>Resource Alignment</h5>
        <div class="columns">
            <div class="column is-2 listHdr">
                type
            </div>
            <div class="column is-2 listHdr">
                enabled
            </div>
        </div>
        <br>
        <br>
        <!-- ************************************** Actions ************************************************ -->
        <div v-if="!readOnly">
            <button @click="$emit('save')">save</button><button @click="$emit('cancel')">cancel</button>
        </div>
        <div v-if="readOnly">
            <button @click="$emit('back')">back</button>
        </div>
    </div>
</template>

<script>
import FrameworkCompetencyPropertyListItem from "./FrameworkCompetencyPropertyListItem";

export default {
    name: 'configurationDetails',
    props: {
        config: {
            type: Object
        },
        readOnly: {
            type: Boolean,
            default: true
        }
    },
    components: {
        FrameworkCompetencyPropertyListItem
    }
};
</script>

<style lang="scss" scoped>
    h3 {
        font-size: 2rem;
        padding-bottom: 1rem;
    }
    h4 {
        font-size: 1.6rem;
        padding-bottom: 1rem;
    }
    h5 {
        font-size: 1.3rem;
        padding-bottom: .5rem;
    }
    .listHdr {
        font-weight: bold;
    }
</style>
