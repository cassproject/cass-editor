<template>
    <div class="single modal-card">
        <header class="modal-card-head has-background-primary">
            <p class="modal-card-title has-text-white is-size-2">
                <template v-if="dynamicModalContent.parentName['@value']">
                    <span>{{ dynamicModalContent.parentName['@value'] }}</span>
                    <br><br>
                </template>
                <b>{{ dynamicModalContent.type }}</b>
            </p>
            <button
                @click="$store.commit('app/closeModal')"
                class="delete"
                aria-label="close" />
        </header>
        <section class="modal-card-body">
            <Component
                :is="dynamicThing"
                :uri="dynamicModalContent.uri"
                :expandInModal="true" />
            <div class="section">
                <h4 class="header">
<<<<<<< HEAD
                    This competency is listed in <b>{{ numberOfParentFrameworks }}</b> framework<span v-if="numberOfParentFrameworks > 1">s</span>
=======
                    This <b>{{ dynamicModalContent.type }}</b> is listed in <b>{{ numberOfParentFrameworks }}</b> {{ dynamicModalContent.objectType === "Concept" ? "concept schemes" : "frameworks"}}
>>>>>>> dev
                </h4>
                <ul class="single__list">
                    <li
                        class="single__list-element"
                        v-for="(parentFramework, index) in parentFrameworks"
                        :key="index">
                        <a
                            :title="parentFramework.name"
                            class="single__li-a"
                            @click="goToFramework(parentFramework)">
                            <span>{{ parentFramework.name }}</span>
                            <div
                                :title="parentFramework.name"
                                class="button is-outlined is-small is-primary">
                                <span class="icon">
                                    <i class="fa fa-external-link-alt" />
                                </span>
                                <span>
                                    open
                                </span>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </section>
        <footer class="modal-card-foot">
            <div class="buttons is-right is-fullwidth">
                <!--to do, make sure level is updated in framework after
                    edit is made -->
                <button
                    @click="edit=true"
                    class="button is-outlined is-primary"
                    v-if="dynamicModalContent.objectType==='Level'">
                    Edit {{ dynamicModalContent.type }}
                </button>
                <button
                    @click="$store.commit('app/closeModal')"
                    class="button is-outlined is-large is-primary">
                    return to framework editor
                </button>
            </div>
        </footer>
    </div>
</template>

<script>
import {mapState} from 'vuex';

import Thing from '@/lode/components/lode/Thing.vue';
import ThingEditing from '@/lode/components/lode/ThingEditing.vue';

export default {
    name: 'Single',
    components: {Thing, ThingEditing},
    data() {
        return {
            edit: false,
            parentFrameworks: [],
            repo: window.repo
        };
    },
    computed: {
        ...mapState({
            framework: state => state.editor.framework,
            dynamicModalContent: state => state.app.modal.dynamicModalContent
        }),
        dynamicThing: function() {
            if (this.edit) {
                return 'ThingEditing';
            } else {
                return 'Thing';
            }
        },
        numberOfParentFrameworks: function() {
            return this.parentFrameworks.length;
        }
    },
    methods: {
        goToFramework: function(framework) {
            if (this.framework.shortId() === framework.url && this.dynamicModalContent.objectType !== "Level") {
                return this.goToCompetencyWithinThisFramework();
            }
            this.$store.commit('editor/framework', EcRepository.getBlocking(framework.url));
            if (this.dynamicModalContent.objectType === "Concept") {
                var queryParams = this.$store.state.editor.queryParams;
                queryParams.concepts = "true";
                this.$store.commit('editor/queryParams', queryParams);
                this.$router.push({name: "conceptScheme", params: {frameworkId: framework.url}});
            }
            this.$store.commit('app/closeModal');
        },
        goToCompetencyWithinThisFramework: function() {
            // Scroll to competency
            this.$scrollTo("#scroll-" + this.dynamicModalContent.uri.split('/').pop());
            this.$store.commit('app/closeModal');
        },
        findConceptTrail: function(conceptId) {
            var concept = EcRepository.getBlocking(conceptId);
            if (concept["skos:topConceptOf"]) {
                var scheme = EcConceptScheme.getBlocking(concept["skos:topConceptOf"]);
                this.parentFrameworks.push({name: this.getDisplayStringFrom(scheme["dcterms:title"]), url: scheme.shortId()});
            } else if (concept["skos:broader"]) {
                var parent = EcConcept.getBlocking(concept["skos:broader"]);
                this.findConceptTrail(parent);
            }
        },
        getDisplayStringFrom: function(n) {
            if (n != null && EcArray.isArray(n)) {
                if ((n).length > 0) {
                    n = (n)[0];
                }
            }
            if (n != null && EcObject.isObject(n) && (n).hasOwnProperty("@value")) {
                return (n)["@value"];
            }
            return n;
        }
    },
    mounted() {
        var me = this;
        if (this.dynamicModalContent.objectType === "Level") {
            EcFramework.search(this.repo, "level:\"" + this.dynamicModalContent.uri + "\"", function(success) {
                for (var i = 0; i < success.length; i++) {
                    me.parentFrameworks.push({name: success[i].getName(), url: success[i].shortId()});
                }
            }, function(failure) {
                console.error(failure);
                me.parentFrameworks = [];
            }, null);
        } else if (this.dynamicModalContent.objectType === "Competency") {
            EcFramework.search(this.repo, "competency:\"" + this.dynamicModalContent.uri + "\"", function(success) {
                for (var i = 0; i < success.length; i++) {
                    me.parentFrameworks.push({name: success[i].getName(), url: success[i].shortId()});
                }
            }, function(failure) {
                console.error(failure);
                me.parentFrameworks = [];
            }, null);
        } else {
            this.findConceptTrail(this.dynamicModalContent.uri);
        }
    }
};
</script>


<style lang="scss">
    @import '@/scss/variables.scss';

.single {
    .lode__thing {
        padding-left: 0rem;
        .field {
            padding-left: .25rem;
        }
    }
    .lode__thing:hover {
        padding-lefT: 0rem;
        color: $dark;
    }
    .lode__thing-editing {
        padding: 0;
        box-shadow: none;
        .field {
            padding-left: 0rem;
        }
    }
    .single__list {
        width: 100%;
        .single__list-element {
            padding: .25rem 0rem;
            .single__li-a {
                display: flex;
                flex-wrap: no-wrap;
                justify-content: space-between;
            }
        }
    }
    .modal-card-title {
        max-width: 95%;
    }
}
</style>