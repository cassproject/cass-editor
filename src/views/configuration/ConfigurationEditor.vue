<template>
    <div>
        <configuration-list-item v-if="configViewMode == 'list'"></configuration-list-item>
        <configuration-details v-if="configViewMode == 'detail'"></configuration-details>
        <button @click="showListView">list</button><button @click="showDetailView">detail</button>
    </div>
</template>

<script>
// @ is an alias to /src
import ConfigurationListItem from '../../components/configuration/ConfigurationListItem';
import ConfigurationDetails from "../../components/configuration/ConfigurationDetails";

export default {
    name: 'ConfigurationEditor',
    components: {
        ConfigurationDetails,
        ConfigurationListItem
    },
    data: () => ({
        configViewMode: "list",
        currentConfig: {},
        configList: []
    }),
    methods: {
        showListView() {
            this.configViewMode = "list";
        },
        showDetailView() {
            this.configViewMode = "detail";
        },
        buildConfigList() {
        }
    },
    mounted() {
        this.buildConfigList();
    }
};
</script>
