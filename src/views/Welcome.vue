<template>
    <div id="welcome">
        <div class="section">
            <div class="columns is-mobile">
                <div class="column is-9">
                    <h1 class="title is-size-1">
                        Welcome to CaSS
                    </h1>
                    <h3 class="subtitle is-size-3">
                        Competency Authoring Tools
                    </h3>
                    <p class="pb-4">
                        CaSS Authoring Tools support authoring frameworks, importing existing frameworks from supported
                        document types, and editing competency frameworks within the system.  You can navigate to the
                        <router-link
                            class="custom-link local"
                            to="/frameworks">
                            frameworks page
                        </router-link> and start creating
                        framework right away without following the below steps.
                    </p>
                    <div class="py-2">
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
                <div class="column is-3 px-4 py-4">
                    <h2 class="title is-size-3">
                        Helpful links
                    </h2>
                    <h2 class="header has-text-weight-bold is-size-5">
                        Documentation
                    </h2>
                    <ul>
                        <li>
                            <a
                                class="custom-link external"
                                href="/docs/framework-properties/"
                                target="_blank">Framework properties
                            </a>
                        </li>
                        <li>
                            <a
                                class="custom-link external"
                                href="/docs/competency-properties/"
                                target="_blank">
                                Competency properties</a>
                        </li>
                        <li>
                            <a
                                class="custom-link external"
                                href="/docs/configuration/"
                                target="_blank">
                                Configuration</a>
                        </li>
                        <li>
                            <a
                                class="custom-link external"
                                href="/docs/users-and-groups/"
                                target="_blank">
                                User groups</a>
                        </li>
                    </ul>


                    <h2 class="header pt-4 has-text-weight-bold is-size-5">
                        Resources
                    </h2>
                    <ul>
                        <li>
                            <a
                                class="custom-link external"
                                href="https://adlnet.gov/resources/publications/2020/03/Competency-Framework-Development-Process-Report/"
                                target="_blank">Authoring Report</a>
                        </li>
                        <li>
                            <a
                                class="custom-link external"
                                href="https://cassproject.org"
                                target="_blank">cassproject.org</a>
                        </li>
                        <li>
                            <a
                                class="custom-link external"
                                href="http://devs.cassproject.org/"
                                target="_blank">CaSS Developer Guide</a>
                        </li>
                        <li>
                            <a
                                class="custom-link external"
                                href="http://docs.cassproject.org/"
                                target="_blank">CaSS Official Documentation</a>
                        </li>
                        <li>
                            <a
                                class="custom-link external"
                                href="https://github.com/cassproject"
                                target="_blank">CaSS on Github</a>
                        </li>
                        <li>
                            <a
                                class="custom-link external"
                                href="https://adlnet.gov/"
                                target="_blank">Advanced Distributed Learning Initiative</a>
                        </li>
                    </ul>
                    <h2 class="header pt-4  has-text-weight-bold is-size-5">
                        Import Example Frameworks
                        <span
                            class="icon is-small"
                            v-if="importing">
                            <i class="fa fa-spinner fa-pulse" />
                        </span>
                        <span
                            v-if="error"
                            class="help is-danger">
                            {{ error }}
                        </span>
                    </h2>
                    <ul>
                        <li>
                            <a
                                class="custom-link external"
                                @click="importOnetBasicSkills"
                                target="_blank">ONET: Basic Skills</a>
                        </li>
                        <li>
                            <a
                                class="custom-link external"
                                @click="importHarvardEmotionalIntelligence"
                                target="_blank">Harvard: Emotional Intelligence</a>
                        </li>
                        <li>
                            <a
                                class="custom-link external"
                                @click="importACTCollaborativeProblemSolving"
                                target="_blank">ACT: Collaborative Problem Solving</a>
                        </li>
                    </ul>


                    <h2 class="header pt-4 has-text-weight-bold is-size-5">
                        Legacy Demo CaSS Applications
                    </h2>
                    <ul>
                        <li>
                            <a
                                class="custom-link external"
                                :href="baseRepoUrl + 'cass-vlrc'"
                                target="_blank">Dashboards</a>
                        </li>
                        <li>
                            <a
                                class="custom-link external"
                                :href="baseRepoUrl + 'cass-gap-analysis'"
                                target="_blank">GAP Analysis</a>
                        </li>
                        <li>
                            <a
                                class="custom-link external"
                                :href="baseRepoUrl + 'cass-profile'"
                                target="_blank">Profile Explorer</a>
                        </li>
                        <li>
                            <a
                                class="custom-link external"
                                :href="baseRepoUrl + 'cass-viewer'"
                                target="_blank">Framework Explorer</a>
                        </li>
                    </ul>
                    <h2 class="header pt-4 has-text-weight-bold is-size-5">
                        Get in touch
                    </h2>
                    <ul>
                        <li>
                            <a
                                class="custom-link external"
                                href="https://docs.google.com/a/eduworks.com/forms/viewform?bc=transparent&embedded=true&f=Arial%252C%2BVerdana%252C%2Bsans-serif&hl=en&htc=%2523666666&id=1BMaboapV0IaS8iGnCJut2obPZ9y3CWkxXuvy-7krcgE&lc=%2523003965&pli=1&tc=%2523444444&ttl=0"
                                target="_blank">Join the Slack Channel</a>
                        </li>
                        <li>
                            <a
                                class="custom-link external"
                                href="mailto:cass@eduworks.com"
                                target="_blank">Email us</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';
import casslogo from '@/assets/cass-logo-white.svg';
import common from '@/mixins/common.js';
import harvard from 'file-loader!../../files/Harvard Emotional Intelligence.csv';

export default {
    name: 'Welcome',
    data() {
        return {
            casslogo: casslogo,
            importing: false,
            error: null,
            repo: window.repo,
            harvardFile: harvard,
            baseRepoUrl: ""
        };
    },
    mixins: [common],
    mounted: function() {
        let index = this.repo.selectedServer.lastIndexOf('api');
        this.baseRepoUrl = this.repo.selectedServer.slice(0, index);
        console.log(this.baseRepoUrl);
    },
    computed: {
        ...mapState({
            loggedInPerson: state => state.user.loggedOnPerson,
            queryParams: state => state.editor.queryParams
        })
    },
    methods: {
        importSuccess: function(framework) {
            this.importing = false;
            this.$router.push({name: "framework", params: {frameworkId: framework.shortId()}});
        },
        importOnetBasicSkills: function() {
            let url = "https://www.onetcenter.org/ctdlasn/graph/ce-07c25f74-9119-11e8-b852-782bcb5df6ac";
            let me = this;
            this.importing = true;
            this.error = null;
            EcRemote.getExpectingString(url, null, function(result) {
                result = JSON.parse(result);
                var graph = result["@graph"];
                if (graph != null) {
                    me.importJsonLd(result);
                } else {
                    me.error = "Import Error";
                    me.importing = false;
                }
            }, function(failure) {
                me.error = "Import Error";
                me.importing = false;
            });
        },
        importJsonLd: function(data) {
            var formData = new FormData();
            if (data != null && data !== undefined) {
                formData.append('data', JSON.stringify(data));
            }
            var identity = EcIdentityManager.ids[0];
            if (identity != null) { formData.append('owner', identity.ppk.toPk().toPem()); }
            let me = this;
            me.$store.commit('app/importFramework', null);
            EcRemote.postInner(this.repo.selectedServer, "ctdlasn", formData, null, function(data) {
                if (data.indexOf("ctdlasn") !== -1) {
                    var data1 = data.substring(0, data.indexOf("ctdlasn"));
                    var data2 = data.substring(data.indexOf("ctdlasn") + 7);
                    data = data1 + "data" + data2;
                }
                var framework = EcFramework.getBlocking(data);
                me.$store.commit('app/importFramework', framework);
                me.$store.commit('editor/framework', framework);
                me.spitEvent("importFinished", framework.shortId(), "importPage");
                me.importSuccess(framework);
            }, function(failure) {
                me.error = "Import Error";
                me.importing = false;
            });
        },
        importHarvardEmotionalIntelligence: function() {
            this.importing = true;
            this.error = null;
            let ceo = null;
            if (EcIdentityManager.ids.length > 0) { ceo = EcIdentityManager.ids[0]; }
            let me = this;
            EcRemote.getExpectingString(me.harvardFile, null, function(result) {
                CTDLASNCSVImport.importFrameworksAndCompetencies(me.repo, result, function(frameworks, competencies, relations) {
                    if (me.queryParams.ceasnDataFields === true) {
                        for (var i = 0; i < frameworks.length; i++) {
                            if (frameworks[i]["schema:inLanguage"] == null || frameworks[i]["schema:inLanguage"] === undefined) {
                                me.setDefaultLanguage();
                                frameworks[i]["schema:inLanguage"] = defaultLanguage;
                            }
                        }
                    }
                    var all = frameworks.concat(competencies).concat(relations);
                    me.repo.multiput(all, function() {
                        for (var i = 0; i < frameworks.length; i++) {
                            me.$store.commit('app/importFramework', frameworks[i]);
                            me.$store.commit('editor/framework', frameworks[i]);
                            me.spitEvent("importFinished", frameworks[i].shortId(), "importPage");
                        }
                        me.importSuccess(frameworks[0]);
                    }, function(failure) {
                        me.error = "Import Error";
                        me.importing = false;
                    });
                }, function() {}, ceo);
            }, function(failure) {
                me.error = "Import Error";
                me.importing = false;
            });
        },
        importACTCollaborativeProblemSolving: function() {
            this.importing = true;
            this.error = null;
            var me = this;
            var serverUrl = "http://opensalt.opened.com/";
            var id = "https://frameworks.act.org/uri/73a4ee28-ceeb-11e7-bfb5-b1077cd4fffe";
            var uuid = "73a4ee28-ceeb-11e7-bfb5-b1077cd4fffe";
            var identity = EcIdentityManager.ids[0];
            var formData = new FormData();
            if (identity != null) { formData.append('owner', identity.ppk.toPk().toPem()); }
            EcRemote.postInner(this.repo.selectedServer, "ims/case/harvest?caseEndpoint=" + serverUrl + "&dId=" + uuid, formData, null, function(success) {
                EcFramework.get(id, function(f) {
                    me.$store.commit('editor/framework', f);
                    me.spitEvent("importFinished", f.shortId(), "importPage");
                    me.$store.commit('app/importFramework', f);
                    me.importSuccess(f);
                }, function() {
                    me.error = "Import Error";
                    me.importing = false;
                });
            }, function(failure) {
                me.error = "Import Error";
                me.importing = false;
            });
        }
    }
};
</script>