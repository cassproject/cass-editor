<template>
    <div class="single modal-card">
        <header class="modal-card-head has-background-primary">
            <p class="modal-card-title has-text-white is-size-2">
                <span>{{ dynamicModalContent.parentName['@value'] }}</span>
                <br>
                <br>
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
                    This <b>{{ dynamicModalContent.type }}</b> is listed in <b>{{ numberOfParentFrameworks }}</b> frameworks
                </h4>
                <ul class="single__list">
                    <li
                        class="single__list-element"
                        v-for="(parentFramework, index) in parentFrameworks"
                        :key="index">
                        <a
                            :title="parentFramework.name"
                            class="single__li-a"
                            :href="parentFramework.url"
                            target="__blank">
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
                    v-if="dynamicModalContent.type==='Level'">
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
            numberOfParentFrameworks: 4,
            parentFrameworks: [
                {
                    name: 'this one',
                    url: 'https://cool.com'
                },
                {
                    name: 'this one',
                    url: 'https://cool.com'
                },
                {
                    name: 'this one',
                    url: 'https://cool.com'
                },
                {
                    name: 'this one',
                    url: 'https://cool.com'
                }
            ]
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
        }
    },
    methods: {

    },
    mounted() {

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