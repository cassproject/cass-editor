<template>
    <div id="welcome">
        <div class="section">
            <h1 class="title is-size-1">
                Welcome to CaSS
            </h1>
            <h3 class="subtitle is-size-3">
                Competency Authoring Tools
            </h3>
            <p>
                CaSS Authoring Tools support authoring frameworks, importing existing frameworks from supported
                document types, and editing competency frameworks within the system.  You can navigate to the
                <router-link
                    class="custom-link local"
                    to="/frameworks">
                    frameworks page
                </router-link> and start creating
                framework right away without following the below steps.
            </p>
            <div class="py-3">
                <div class="py-2">
                    <h3 class="title is-size-2">
                        Getting Started
                    </h3>
                    <h4 class="has-text-weight-semibold is-size-4">
                        1. Create your user and login
                    </h4>
                    <p class="is-size-6">
                        Navigate to the <router-link
                            to="/login"
                            class="custom-link local">
                            login screen
                        </router-link> and select create a new user.  Input your details. After creation,
                        login to your account using the username you created. You can now access the user and groups manager as well as create comments on frameworks.
                    </p>
                </div>
                <div class="py-2">
                    <h4 class="has-text-weight-semibold is-size-4">
                        2. Create user groups for collaborating
                    </h4>
                    <p class="is-size-6">
                        If your team members have also created their account, and you are logged in, you can navigate to
                        the <router-link
                            to="/users"
                            class="custom-link local">
                            user/groups page
                        </router-link> and  configure a group with defined readers and authors.
                    </p>
                </div>
                <div class="py-2">
                    <h4 class="has-text-weight-semibold is-size-4">
                        3. Create a configuration
                    </h4>
                    <p class="is-size-6">
                        The <router-link
                            class="custom-link local"
                            to="/configuration">
                            configuration manager
                        </router-link> allows you to have full control over the properties you can
                        add to frameworks and competencies. This includes relationship types and resource types.
                        Configure the labels you want to use on editable forms for managing these properties.
                    </p>
                </div>
                <div class="py-1">
                    <h4 class="has-text-weight-semibold is-size-4">
                        4. Author a framework
                    </h4>
                    <p class="is-size-6">
                        Navigate to the <router-link
                            class="custom-link local"
                            to="/frameworks">
                            framework page
                        </router-link> and create a new framework. Give your framework a memorable name and save it.
                    </p>
                </div>
                <div class="py-1">
                    <h4 class="has-text-weight-semibold is-size-4">
                        5. Collaborate with your team
                    </h4>
                    <p class="is-size-6">
                        Members with view access will be able to read and comment on the framework when logged in.
                        Members with admin access will be able to view, edit, manage users, and delete the framework
                        when logged in. Use comments to create dialogues around your authoring process.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';
import casslogo from '@/assets/cass-logo-white.svg';

export default {
    name: 'Welcome',
    data() {
        return {
            casslogo: casslogo
        };
    },
    mounted: function() {
        this.$store.commit('app/showSideNav');
    },
    computed: {
        ...mapState({
            loggedInPerson: state => state.user.loggedOnPerson,
            queryParams: state => state.editor.queryParams
        })
    }
};
</script>