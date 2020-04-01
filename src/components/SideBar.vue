<template>
    <aside
        v-if="showSidebar"
        class="menu has-background-primary has-text-white">
        <div
            class="menu-label has-text-white is-size-3">
            Username
            <!-- might need later to close -->
            <div
                v-if="false"
                class="icon is-pulled-right">
                <i class="fa fa-caret-right" />
            </div>
        </div>

        <div>
            Role title
        </div>
        <div>
            Organization Name
        </div>
        <div
            class="menu-label">
            Competencies & Frameworks
        </div>
        <ul class="menu-list">
            <li class="has-text-white">
                <router-link to="/">
                    Frameworks
                </router-link>
            </li>
            <li
                class="has-text-white"
                @click="$emit('createNewFramework')">
                <a> New Framework</a>
            </li>
            <li class="has-text-white">
                <router-link to="/crosswalk">
                    Crosswalk Frameworks
                </router-link>
            </li>
            <li class="has-text-white">
                <router-link to="/import">
                    Import
                </router-link>
            </li>
        </ul>
        <div
            class="menu-label">
            Activity
        </div>
        <ul class="menu-list" />
        <div
            class="menu-label">
            Configuration
        </div>
        <ul class="menu-list">
            <li>
                <router-link to="/config">
                    Configurations
                </router-link>
            </li>
            <li>
                <router-link to="/usergroup">
                    Users/Groups
                </router-link>
            </li>
        </ul>
    </aside>
</template>

<script>

import ctdlAsnCsvExample from 'file-loader!../../files/CTDL-ASN.ONET.example.csv';
import ctdlAsnCsvTemplate from 'file-loader!../../files/CTDL-ASN.ONET.template.csv';
import csvExampleCompetencies from 'file-loader!../../files/CAP Software Engineering - Competencies.csv';
import csvExampleRelations from 'file-loader!../../files/CAP Software Engineering - Relations.csv';
import csvTemplateCompetencies from 'file-loader!../../files/Template - Competencies.csv';
import csvTemplateRelations from 'file-loader!../../files/Template - Relations.csv';
import ctdlAsnJsonld from 'file-loader!../../files/DQP.jsonld';
import asnRdfJson from 'file-loader!../../files/D2695955';
import medbiquitous from 'file-loader!../../files/educational_achievement_sample_1June2012.xml';
import csvConceptExample from 'file-loader!../../files/Concept Scheme Example.csv';
import csvConceptTemplate from 'file-loader!../../files/Concept Scheme Template.csv';
import ctdlAsnJsonldConcepts from 'file-loader!../../files/ConnectingCredentialsLevels.jsonld';
export default {
    name: 'Sidebar',
    props: {
        method: {
            default: ''
        },
        showSidebar: {
            default: false,
            type: Boolean
        },
        queryParams: Object
    },
    data() {
        return {
            serverUrl: null,
            url: null
        };
    },
    watch: {
        serverUrl: function() {
            this.$emit('updateUrl', this.serverUrl);
        },
        url: function() {
            this.$emit('updateUrl', this.url);
        }
    },
    computed: {
        currentRoute: function() {
            return this.$route.path;
        },
        supportedFiles: function() {
            return this.queryParams.concepts === 'true' ? this.supportedConceptFileTypes : this.supportedFileTypes;
        }
    }
};
</script>
<style>
.menu {
    position: fixed;
    z-index: 2;
    top: 0;
    left:0;
    height: calc(100vh - 47px);
    margin-top: 50px;
    bottom: 0;
    overflow-y: scroll;
}
</style>