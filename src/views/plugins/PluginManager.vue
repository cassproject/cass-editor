<template>
    <div id="plugin-manager">
        PLUGIN MANAGER!!!
    </div>
</template>

<script>
// @ is an alias to /src
import {cassUtil} from '../../mixins/cassUtil';

export default {
    mixins: [cassUtil],
    props: {
        view: {
            default: '',
            type: String
        }
    },
    name: 'PluginManager',
    components: {
    },
    computed: {
    },
    data: () => ({
    }),
    methods: {
    },
    updated() {
    },
    mounted() {
    }
};
</script>

<style lang="scss" scoped>
    h3 {
        font-size: 2rem;
        padding-bottom: 0rem;
    }
    h4 {
        font-size: 1.6rem;
        padding-bottom: 1rem;
    }
    h4 {
        font-size: 1.3rem;
        padding-bottom: .5rem;
    }
    .listHdr {
        font-weight: bold;
    }
</style>

