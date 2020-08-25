<template>
    <div class="organization">
        <Thing
            :obj="organization"
            :repo="repo"
            :clickToLoad="false"
            :profile="profile" />
        <span
            class="info-tag"
            v-if="timestamp"
            :title="new Date(timestamp)">Last modified {{ lastModified }}</span>
        <span
            class="info-tag"
            v-if="organization['schema:dateCreated']"
            :title="new Date(organization['schema:dateCreated'])">Created {{ $moment(organization['schema:dateCreated']).fromNow() }}</span>
        <span
            class="info-tag"
            v-if="organization['Approved']"
            :title="organization['Approved']">Approved</span>
        <span
            class="info-tag"
            v-if="organization['Published']"
            :title="organization['Published']">Published</span>
        <hr>
    </div>
</template>
<script>
import Thing from '@/lode/components/lode/Thing.vue';
import saveAs from 'file-saver';
import common from '@/mixins/common.js';
export default {
    name: "Organization",
    props: {
        exportType: String
    },
    mixins: [common],
    data: function() {
        return {
            repo: window.repo,
            organization: null
        };
    },
    computed: {
        timestamp: function() {
            if (this.organization.getTimestamp && this.organization.getTimestamp()) {
                return this.organization.getTimestamp();
            } else if (this.organization["schema:dateModified"]) {
                return this.organization["schema:dateModified"];
            } else {
                return null;
            }
        },
        lastModified: function() {
            if (this.organization == null) return "Unknown.";
            if (this.timestamp) {
                return this.$moment(this.timestamp).fromNow();
            } else {
                return null;
            }
        },
        profile: function() {
            var me = this;

            return {
                "http://schema.org/name": {
                    ...this.$store.state.lode.schemataLookup["http://schema.org/Organization"]["http://schema.org/name"],
                    "http://www.w3.org/2000/01/rdf-schema#comment": [{"@language": "en", "@value": "Name of the organization."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Organization Name"}]
                },
                "http://schema.org/employee": {
                    profile: {
                        "http://schema.org/name": {
                            "@id": "http://schema.org/name",
                            "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                            "http://schema.org/domainIncludes": [{"@id": "http://schema.org/Person"}],
                            "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                            "http://www.w3.org/2000/01/rdf-schema#comment": [{"@language": "en", "@value": "Name of the person."}],
                            "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Person Name"}]
                        }
                    },
                    ...this.$store.state.lode.schemataLookup["http://schema.org/Organization"]["http://schema.org/employee"],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Employees"}]
                },
                "http://schema.org/subOrganization": {
                    profile: function() { return me.profile; },
                    ...this.$store.state.lode.schemataLookup["http://schema.org/Organization"]["http://schema.org/subOrganization"],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Department"}]
                }
            };
        }
    },
    components: {Thing},
    created: function() {
        this.organization = this.$store.state.editor.organization;
        if (EcRepository.shouldTryUrl(this.organization.id) === false && this.organization.id.indexOf(this.repo.selectedServer) === -1) {
            this.exportGuid = EcCrypto.md5(this.organization.id);
        } else {
            this.exportGuid = this.organization.getGuid();
        }
        this.exportLink = this.repo.selectedServer + "data/" + this.exportGuid;
    },
    watch: {
    },
    methods: {
        download: function(fileName, data) {
            var blob = new Blob([data], {type: "text/plain;charset=utf-8"});
            saveAs(blob, fileName);
        }
    }
};
</script>

<style lang="scss" scoped>

.page-organization{
    .e-Thing-ul{

        margin-top:0px;
    }
    .e-Thing-always-ul .e-name{
        label{
            display:none;
        }
    }

    .e-Thing-always-ul .e-description{
        label{
            display:none;
        }
        font-size:.8rem;
    }

    .e-Organization{
        ul{margin-left:0px;}
        a {display:none;}
        >.expand{}
        >.compact{}
        >.editable{}
        >.delete-thing{}
        .e-Property-text{font-size:larger;}
    }

    .e-Competency{
        a {
            display:none;
        }
        >.expand{
        }
        >.compact{
        }
        >.editable {
        }
        >.delete-thing {
        }
    }
    .e-HierarchyNode{
        >ul{
            padding-left:1rem;
            >div{
                border:1px dashed whitesmoke;
            }
        }
        >.icon{
            width:0px;
            height:0px;
            margin:0px;
            line-height:0px;
            display:block;
            position:relative;
            left:-.5rem;
            top:-2rem;
        }
        padding-left:1rem;
    }
    .dragging{
        div{
            border:1px dashed gray !important;
            .drag-footer::before{
                content:'' !important
            }
            .drag-footer{
            }
        }
    }
}

</style>