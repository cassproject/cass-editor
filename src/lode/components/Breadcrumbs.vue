<template>
    <nav
        class="breadcrumb is-small is-black"
        aria-label="breadcrumbs">
        <ul
            v-for="framework in breadCrumbInfo"
            :key="framework.id">
            <li
                v-for="each in directoryBreadCrumbInfo[framework.id]"
                :key="each">
                <a :title="each.title"> {{ each.shortName }}</a>
            </li>
            <li>
                <a
                    class="has-text-dark"
                    :title="framework.title">
                    {{ framework.shortName }}
                </a>
            </li>
            <li
                v-for="each in parentBreadCrumbInfo[framework.id]"
                :key="each">
                <a
                    class="has-text-dark"
                    :title="each.title"> {{ each.shortName }}</a>
            </li>
            <li
                v-for="each in parentConcepts"
                :key="each">
                <a class="has-text-dark">
                    {{ getName(each) }}</a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'Breadcrumbs',
    props: {
        competency: Object
    },
    data() {
        return {
            repo: window.repo,
            frameworks: [],
            parentCompetencies: {},
            parentConcepts: [],
            frameworkGraph: new EcFrameworkGraph(),
            directoryTrail: {}
        };
    },
    computed: {
        parentBreadCrumbInfo: function() {
            if (this.parentCompetencies === {}) {
                return;
            }
            let info = this.parentCompetencies;
            let newInfo = {};
            for (const property in info) {
                let item = info[property];
                newInfo[property] = [];
                for (let i = 0; i < item.length; i++) {
                    if (item[i]) {
                        newInfo[property][i] = {};
                        let name = '';
                        let shortName = '';
                        let title = '';
                        if (item[i] === '...') {
                            name = item[i];
                            title = "This framework contains more than 500 competencies";
                            shortName = item[i];
                        } else if (i < item.length - 1) {
                            name = "...";
                            title = this.getName(item[i]);
                            shortName = "...";
                        } else {
                            name = this.getName(item[i]);
                            if (name.length > 29) {
                                shortName = name.substr(0, 29);
                            } else {
                                shortName = name;
                            }
                            title = name;
                        }
                        let crumb = {
                            name: name,
                            shortName: shortName,
                            title: title
                        };
                        newInfo[property][i] = crumb;
                    }
                }
            }
            return newInfo;
        },
        directoryBreadCrumbInfo: function() {
            if (this.directoryTrail === {}) {
                return;
            }
            let info = this.directoryTrail;
            let newInfo = {};
            for (const property in info) {
                let item = info[property];
                newInfo[property] = [];
                for (let i = 0; i < item.length; i++) {
                    if (item[i]) {
                        newInfo[property][i] = {};
                        let name = '';
                        let shortName = '';
                        let title = '';
                        if (i !== 0 && i < item.length - 1) {
                            name = "...";
                            title = this.getName(item[i]);
                            shortName = "...";
                        } else {
                            name = this.getName(item[i]);
                            if (name.length > 29) {
                                shortName = name.substr(0, 29);
                            } else {
                                shortName = name;
                            }
                            title = name;
                        }
                        let crumb = {
                            name: name,
                            shortName: shortName,
                            title: title
                        };
                        newInfo[property][i] = crumb;
                    }
                }
            }
            return newInfo;
        },
        breadCrumbInfo: function() {
            let info = [];
            let me = this;
            for (let i = 0; i < me.frameworks.length; i++) {
                info.push({});
                let name = me.getName(me.frameworks[i]);
                let title;
                if (name !== '...') {
                    title = name;
                }
                info[i].name = name;
                if (name.length > 29) {
                    info[i].shortName = name.substr(0, 29) + '...';
                } else {
                    info[i].shortName = name;
                }
                info[i].title = title;
                info[i].id = me.frameworks[i].id;
            }
            return info;
        }
    },
    created: function() {
        if (this.competency.type === "Competency") {
            this.searchFrameworks();
        } else if (this.competency.type === "Directory") {
            this.findDirectoryTrail(this.competency);
        } else if (this.competency.type === "Framework") {
            this.findFrameworkTrail(this.competency);
        } else {
            this.findConceptTrail(this.competency);
        }
    },
    methods: {
        searchFrameworks: function() {
            var me = this;
            EcFramework.search(this.repo, "competency:\"" + this.competency.shortId() + "\"", function(success) {
                for (var i = 0; i < success.length; i++) {
                    me.frameworks.push(success[i]);
                    if (success[i].directory) {
                        me.findFrameworkTrailForCompetency(success[i]);
                    }
                }
                me.computeParentCompetencies();
            }, function(failure) {
                appError(failure);
                me.frameworks = [];
            }, null);
        },
        computeParentCompetencies: function() {
            var me = this;
            for (let i = 0; i < this.frameworks.length; i++) {
                let frameworkId = this.frameworks[i].id;
                this.$set(this.parentCompetencies, frameworkId, []);
                if (this.frameworks[i].competency && this.frameworks[i].competency.length > 500) {
                    me.parentCompetencies[frameworkId].push("...");
                } else {
                    this.frameworkGraph.addFramework(this.frameworks[i], this.repo, function(success) {
                        let parents = [];
                        me.getParents(me.competency.id, parents, function() {
                            for (let j = 0; j < parents.length; j++) {
                                me.parentCompetencies[frameworkId].push(parents[j]);
                            }
                        });
                    }, function(failure) {
                        appError(failure);
                    });
                }
            }
        },
        getParents: function(competencyId, parents, callback) {
            var foundAParent = false;
            var me = this;
            for (var i = 0; i < me.frameworkGraph.edges.length; i++) {
                if (me.frameworkGraph.edges[i].source.id === competencyId && me.frameworkGraph.edges[i].edge.relationType === "narrows") {
                    var parentId = me.frameworkGraph.edges[i].destination.id;
                    parents.unshift(me.frameworkGraph.competencyMap[parentId]);
                    foundAParent = true;
                    this.getParents(parentId, parents, callback);
                    break;
                }
            }
            if (!foundAParent) {
                callback();
            }
        },
        findConceptTrail: async function(concept) {
            if (concept["skos:topConceptOf"]) {
                var scheme = await EcConceptScheme.get(concept["skos:topConceptOf"]);
                if (scheme) {
                    this.frameworks.push(scheme);
                }
            } else if (concept["skos:broader"]) {
                var parent;
                if (EcArray.isArray(concept["skos:broader"])) {
                    parent = await EcConcept.get(concept["skos:broader"][0]);
                } else {
                    parent = await EcConcept.get(concept["skos:broader"]);
                }
                this.parentConcepts.unshift(parent);
                this.findConceptTrail(parent);
            }
        },
        findDirectoryTrail: function(directory) {
            let me = this;
            if (directory.parentDirectory) {
                EcDirectory.get(directory.parentDirectory, function(parent) {
                    if (parent && !parent.parentDirectory) {
                        me.frameworks.push(parent);
                    } else if (parent) {
                        me.parentConcepts.unshift(parent);
                        me.findDirectoryTrail(parent);
                    }
                }, appError);
            }
        },
        findFrameworkTrail: function(framework) {
            let me = this;
            if (framework.directory) {
                EcDirectory.get(framework.directory, function(parent) {
                    if (parent && !parent.parentDirectory) {
                        me.frameworks.push(parent);
                    } else if (parent) {
                        me.parentConcepts.unshift(parent);
                        me.findDirectoryTrail(parent);
                    }
                }, appError);
            }
        },
        findFrameworkTrailForCompetency: function(framework) {
            let me = this;
            if (framework.directory) {
                EcDirectory.get(framework.directory, function(parent) {
                    if (parent) {
                        me.directoryTrail[framework.id] = [];
                        me.directoryTrail[framework.id].push(parent);
                        if (parent.parentDirectory) {
                            me.findDirectoryTrailForCompetency(parent, framework.id);
                        }
                    }
                }, appError);
            }
        },
        findDirectoryTrailForCompetency: function(directory, frameworkId) {
            let me = this;
            if (directory.parentDirectory) {
                EcDirectory.get(directory.parentDirectory, function(parent) {
                    if (parent) {
                        me.directoryTrail[frameworkId].unshift(parent);
                        if (parent.parentDirectory) {
                            me.findDirectoryTrailForCompetency(parent, frameworkId);
                        }
                    }
                }, appError);
            }
        },
        getName: function(object) {
            if (object === "...") {
                return object;
            }
            if (this.competency.type === "Competency" || this.competency.type === "Level" || this.competency.type === "Framework") {
                return object.getName();
            }
            if (this.competency.type === "Directory") {
                return schema.Thing.getDisplayStringFrom(object.name);
            }
            if (object["skos:prefLabel"]) {
                return schema.Thing.getDisplayStringFrom(object["skos:prefLabel"]);
            } else if (object["dcterms:title"]) {
                return schema.Thing.getDisplayStringFrom(object["dcterms:title"]);
            }
        }
    }
};
</script>
<style lang="scss">
.breadcrumb {
    padding-left: .0rem;
    width: 100% !important;
    font-weight: 400;
    a {
        color: grey;
    }
}
.breadcrumb:not(:last-child) {
    margin-bottom: .0rem !important;
}
.arrow-icon {
    visibility: hidden;
}


</style>