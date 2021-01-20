<template>
    <aside
        id="right-side-bar__comments"
        class="menu has-background-lightest">
        <div class="right-aside-bar__title">
            <h3 class="is-size-3 is-family-secondary">
                {{ objectName }}
            </h3>
            <span class="tag is-info">{{ objectTypeForDisplay }}</span>
        </div>
        <div class="buttons">
            <div
                class="button is-primary"
                @click="openObject"
                v-if="objectType !== 'CreativeWork'">
                <span>Open {{ objectTypeForDisplay }}</span>
                <span class="icon">
                    <i class="fa fa-folder-open" />
                </span>
            </div>
        </div>
        <div v-if="objectType === 'CreativeWork'">
            {{ object.url }}
        </div>
        <div
            class="cass__right-side--details"
            v-if="objectType === 'Directory' || objectType === 'Framework' || objectType === 'ConceptScheme'">
            <div class="cass__right-side--details-wrapper">
                <h3
                    class="is-family-secondary is-size-5">
                    Details
                </h3>
                <div class="cass__right-side--details-list-item">
                    <b>Last Modified:</b> {{ lastModified }}
                </div>
                <!-- open -->
                <span
                    class="cass__right-side--details-list-section"
                    v-if="object.directory">
                    <b>Directory:</b> {{ getName(object.directory) }}
                    <span
                        class="button is-primary is-outlined is-small"
                        @click="goToParentDirectory">
                        Open
                    </span>
                </span>
                <!-- open parent directoriy -->
                <span
                    class="cass__right-side--details-list-item"
                    v-else-if="object.parentDirectory">
                    <b>Parent Directory:</b> {{ getName(object.parentDirectory) }}
                    <span
                        title="Navigate to parent directory"
                        class="inline-link is-small"
                        @click="goToParentDirectory">
                        <span>Go to parent</span>
                        <span class="icon">
                            <i class="fa fa-folder-open" />
                        </span>
                    </span>
                </span>
                <!-- date created -->
                <div
                    class="cass__right-side--details-list-item">
                    <b>
                        Date Created:
                    </b>
                    {{ dateCreated }}
                </div>
                <!-- number of directories -->
                <div
                    class="cass__right-side--details-list-item"
                    v-if="objectType === 'Directory'">
                    <b>Subdirectories:</b>
                    {{ numSubdirectories }}
                </div>
                <!-- object count -->
                <div
                    class="cass__right-side--details-list-item"
                    v-if="objectType === 'Directory'">
                    <b>Objects:</b>
                    {{ numObjects }}
                </div>
                <!-- item count -->
                <div
                    class="cass__right-side--details-list-item"
                    v-if="objectType === 'Framework'">
                    <b>Item Count:</b>
                    {{ object.competency ? object.competency.length : 0 }}
                </div>
                <!-- published date -->
                <div
                    class="cass__right-side--details-list-item"
                    v-if="object.Published">
                    <b>Published Date:</b>
                    {{ object.Published }}
                </div>
                <!-- approved -->
                <div
                    class="cass__right-side--details-list-item"
                    v-if="object.Approved">
                    <b>Approved Date:</b>
                    {{ object.Approved }}
                </div>
                <!-- publisher name -->
                <div
                    class="cass__right-side--details-list-item"
                    v-if="publisherName">
                    <b>Publisher:</b>
                    {{ publisherName }}
                </div>
                <!-- creator -->
                <div
                    class="cass__right-side--details-list-item"
                    v-else-if="creatorName">
                    <b>Creator:</b>
                    {{ creatorName }}
                </div>
                <!-- description -->
                <div
                    class="cass__right-side--details-list-section"
                    v-if="objectDescription">
                    <b>Description</b>
                    <div>{{ objectDescription }}</div>
                </div>
                <span
                    class="cass__right-side--details-section">
                    <span>
                        <b>Share:</b>
                    </span>
                    <span
                        class="inline-link"
                        title="Copy URL to the clipboard."
                        v-clipboard="shareLink"
                        v-clipboard:success="successfulClip"
                        v-clipboard:error="errorClip">
                        <span
                            :title="shareLink">copy share link</span>
                        <span class="icon">
                            <i
                                v-if="clipStatus === 'success'"
                                class="fa fa-check" />
                            <i
                                v-else-if="clipStatus === 'error'"
                                class="fa fa-times" />
                            <i
                                v-else
                                class="fa fa-link"
                                name="copyURL" />
                        </span>
                    </span>
                </span>
            </div>
            <div
                v-if="canEditObject && canEditDirectory"
                class="cass__right-side--details-wrapper">
                <h3
                    class="is-family-secondary is-size-5">
                    Actions
                </h3>
                <div
                    class="cass__right-side--details-list-item"
                    v-if="objectType === 'CreativeWork'">
                    {{ object.url }}
                </div>
                <div
                    class="cass__right-side--details-list-section">
                    <div
                        class="cass__right-side--details-list-section">
                        <b>Copy/Move</b>
                    </div>
                    <div
                        class="cass__right-side--details-list-section">
                        <div
                            class="button is-small is-outlined is-primary"
                            v-if="objectType === 'Framework' || objectType === 'CreativeWork' || objectType === 'Directory'"
                            @click="copyingToDirectory=true"
                            :disabled="movingToDirectory">
                            <span>copy to directory</span>
                            <span class="icon">
                                <i class="fa fa-copy" />
                            </span>
                        </div>
                    </div>
                    <div
                        class="cass__right-side--details-list-section">
                        <div
                            class="button is-outlined is-small is-primary"
                            v-if="objectType === 'Framework' || objectType === 'CreativeWork' || objectType === 'Directory'"
                            @click="movingToDirectory=true"
                            :disabled="copyingToDirectory">
                            <span>Move to directory</span>
                            <span class="icon">
                                <i class="fa fa-exchange-alt" />
                            </span>
                        </div>
                    </div>
                    <ul v-if="copyingToDirectory || movingToDirectory">
                        Choose a directory
                        <li
                            v-for="directory in directoryOptions"
                            :key="directory"
                            @click="copyOrMove(directory)">
                            {{ directory.name }}
                        </li>
                        <li
                            @click="removeFromDirectory"
                            v-if="movingToDirectory">
                            Remove from directory
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </aside>
</template>
<script>
import common from '@/mixins/common.js';

export default {
    name: 'ListItemInfo',
    mixins: [common],
    data() {
        return {
            numSubdirectories: "unknown",
            numObjects: "unknown",
            copyingToDirectory: false,
            movingToDirectory: false,
            repo: window.repo,
            frameworksToProcess: 0,
            clipStatus: 'ready'
        };
    },
    methods: {
        successfulClip({value, event}) {
            appLog('success', value);
            this.clipStatus = 'success';
            setTimeout(() => {
                this.clipStatus = 'ready';
            }, 1000);
        },
        errorClip({value, event}) {
            appLog('error', value);
            this.clipStatus = 'error';
            setTimeout(() => {
                this.clipStatus = 'ready';
            }, 1000);
        },
        setNumSubdirectoriesAndObjects: function() {
            let me = this;
            if (this.objectType === "Directory") {
                me.repo.searchWithParams("(@type:Directory AND parentDirectory:\"" + this.object.shortId() + "\")", {'size': 10000}, null, function(results) {
                    me.numSubdirectories = results.length;
                    if (results.length === 10000) {
                        me.numSubdirectories = "More than 10,000";
                    }
                }, function(error) {
                    appError(error);
                    me.numSubdirectories = "unknown";
                });
                me.repo.searchWithParams("(directory:\"" + this.object.shortId() + "\")", {'size': 10000}, null, function(results) {
                    me.numObjects = results.length;
                    if (results.length === 10000) {
                        me.numObjects = "More than 10,000";
                    }
                }, function(error) {
                    appError(error);
                    me.numObjects = "unknown";
                });
            }
        },
        openObject: function() {
            let me = this;
            if (this.objectType === "Directory") {
                this.$store.commit('app/selectDirectory', this.object);
                if (this.$route.name !== "directory") {
                    this.$router.push({name: "directory"});
                }
                this.$store.commit('app/closeRightAside');
            } else if (this.$store.getters['editor/conceptMode']) {
                EcConceptScheme.get(this.object.id, function(success) {
                    me.$store.commit('editor/framework', success);
                    me.$store.commit('editor/clearFrameworkCommentData');
                    me.$store.commit('app/setCanViewComments', me.canViewCommentsCurrentFramework());
                    me.$store.commit('app/setCanAddComments', me.canAddCommentsCurrentFramework());
                    me.$router.push({name: "conceptScheme", params: {frameworkId: me.object.id}});
                }, appError);
            } else {
                EcFramework.get(this.object.id, function(success) {
                    me.$store.commit('editor/framework', success);
                    me.$store.commit('editor/clearFrameworkCommentData');
                    me.$store.commit('app/setCanViewComments', me.canViewCommentsCurrentFramework());
                    me.$store.commit('app/setCanAddComments', me.canAddCommentsCurrentFramework());
                    me.$router.push({name: "framework", params: {frameworkId: me.object.id}});
                }, appError);
            }
        },
        getName: function(field) {
            let name = EcArray.isArray(field) ? field : [field];
            if (Thing.getDisplayStringFrom(name).toLowerCase().indexOf("http") !== -1) {
                return this.resolveNameFromUrl(Thing.getDisplayStringFrom(name));
            } else {
                return Thing.getDisplayStringFrom(name);
            }
        },
        goToParentDirectory: function() {
            let me = this;
            let directoryId = this.object.directory ? this.object.directory : this.object.parentDirectory;
            EcDirectory.get(directoryId, function(result) {
                me.$store.commit('app/selectDirectory', result);
                if (me.$route.name !== "directory") {
                    me.$router.push({name: "directory"});
                }
                me.$store.commit('app/closeRightAside');
            }, appError);
        },
        copyOrMove: function(directory) {
            this.frameworksToProcess = 0;
            // To do: add confirmation step once we have this in the right spot
            if (this.copyingToDirectory && this.objectType === 'Framework') {
                this.copyFrameworkToDirectory(directory, this.object);
            } else if (this.copyingToDirectory && this.objectType === 'CreativeWork') {
                this.copyResourceToDirectory(directory, this.object);
            } else if (this.copyingToDirectory && this.objectType === 'Directory') {
                this.copySubdirectoryToDirectory(directory, this.object);
            } else if (this.movingToDirectory && this.objectType === 'Framework') {
                this.moveFrameworkToDirectory(directory, this.object);
            } else if (this.movingToDirectory && this.objectType === 'CreativeWork') {
                this.moveResourceToDirectory(directory, this.object);
            } else if (this.movingToDirectory && this.objectType === 'Directory') {
                this.moveSubdirectoryToDirectory(directory, this.object);
            }
        },
        removeFromDirectory: function() {
            if (this.objectType === 'Framework') {
                this.removeFrameworkFromDirectory();
            } else if (this.objectType === 'CreativeWork') {
                this.removeResourceFromDirectory();
            } else if (this.objectType === 'Directory') {
                this.removeSubdirectoryFromDirectory();
            }
        },
        multiput: function(toSave, shouldRefresh) {
            let me = this;
            this.frameworksToProcess--;
            if (this.frameworksToProcess <= 0) {
                this.repo.multiput(toSave, function(success) {
                    me.copyingToDirectory = false;
                    me.movingToDirectory = false;
                    if (shouldRefresh) {
                        // If removing or moving, need to refresh search results
                        me.$store.commit('app/refreshSearch', true);
                    }
                }, appError);
            }
        },
        copyFrameworkToDirectory: function(directory, framework, toSaveFromSubdirectory) {
            let toSave = [];
            if (toSaveFromSubdirectory) {
                toSave = toSaveFromSubdirectory;
            }
            var f = new EcFramework();
            f.copyFrom(framework);
            if (this.queryParams.newObjectEndpoint != null) {
                f.generateShortId(this.queryParams.newObjectEndpoint);
            } else {
                f.generateId(this.repo.selectedServer);
            }
            f.directory = directory.shortId();
            f["schema:dateCreated"] = new Date().toISOString();
            f["schema:dateModified"] = new Date().toISOString();
            delete f.owner;
            delete f.reader;
            if (directory.owner) {
                f.owner = directory.owner;
            }
            if (directory.reader) {
                f.reader = directory.reader;
            }
            if (EcIdentityManager.ids.length > 0) {
                f.addOwner(EcIdentityManager.ids[0].ppk.toPk());
            }
            f['ceasn:derivedFrom'] = framework.id;
            let competencyMap = {};
            // to do: replace all the competency (etc) URLs in framework object and THEN push framework obj
            if (framework.competency && framework.competency.length > 0) {
                this.copyCompetenciesToDirectory(f, toSave, competencyMap);
            } else if (framework.level && framework.level.length > 0) {
                this.copyLevelsToDirectory(f, toSave, competencyMap);
            } else if (framework.relation && framework.relation.length > 0) {
                this.copyRelationsToDirectory(f, toSave, competencyMap);
            } else {
                toSave.push(f);
                this.multiput(toSave);
            }
        },
        copyCompetenciesToDirectory: function(framework, toSave, competencyMap) {
            let me = this;
            new EcAsyncHelper().each(framework.competency, function(competencyId, done) {
                EcCompetency.get(competencyId, function(competency) {
                    var c = new EcCompetency();
                    c.copyFrom(competency);
                    if (me.queryParams.newObjectEndpoint != null) {
                        c.generateShortId(me.queryParams.newObjectEndpoint);
                    } else {
                        c.generateId(me.repo.selectedServer);
                    }
                    competencyMap[competency.shortId()] = c.shortId();
                    let index = framework.competency.indexOf(competencyId);
                    if (index !== -1) {
                        framework.competency[index] = c.shortId();
                    }
                    c["schema:dateCreated"] = new Date().toISOString();
                    c["schema:dateModified"] = new Date().toISOString();
                    delete c.owner;
                    delete c.reader;
                    if (framework.owner) {
                        c.owner = framework.owner;
                    }
                    if (framework.reader) {
                        c.reader = framework.reader;
                    }
                    c['ceasn:derivedFrom'] = competency.id;
                    toSave.push(c);
                    done();
                }, done);
            }, function(competencyIds) {
                if (framework.level && framework.level.length > 0) {
                    me.copyLevelsToDirectory(framework, toSave, competencyMap);
                } else if (framework.relation && framework.relation.length > 0) {
                    me.copyRelationsToDirectory(framework, toSave, competencyMap);
                } else {
                    toSave.push(framework);
                    me.multiput(toSave);
                }
            });
        },
        copyLevelsToDirectory: function(framework, toSave, competencyMap) {
            let me = this;
            new EcAsyncHelper().each(framework.level, function(levelId, done) {
                EcLevel.get(levelId, function(level) {
                    var c = new EcLevel();
                    c.copyFrom(level);
                    if (me.queryParams.newObjectEndpoint != null) {
                        c.generateShortId(me.queryParams.newObjectEndpoint);
                    } else {
                        c.generateId(me.repo.selectedServer);
                    }
                    let index = framework.level.indexOf(levelId);
                    if (index !== -1) {
                        framework.level[index] = c.shortId();
                    }
                    if (c.competency) {
                        if (!EcArray.isArray(c.competency)) {
                            c.competency = [c.competency];
                        }
                        for (let each in c.competency) {
                            c.competency[each] = competencyMap[c.competency[each]];
                        }
                    }
                    c["schema:dateCreated"] = new Date().toISOString();
                    c["schema:dateModified"] = new Date().toISOString();
                    delete c.owner;
                    delete c.reader;
                    if (framework.owner) {
                        c.owner = framework.owner;
                    }
                    if (framework.reader) {
                        c.reader = framework.reader;
                    }
                    c['ceasn:derivedFrom'] = level.id;
                    toSave.push(c);
                    done();
                }, done);
            }, function(competencyIds) {
                if (framework.relation && framework.relation.length > 0) {
                    me.copyRelationsToDirectory(framework, toSave, competencyMap);
                } else {
                    toSave.push(framework);
                    me.multiput(toSave);
                }
            });
        },
        copyRelationsToDirectory: function(framework, toSave, competencyMap) {
            let me = this;
            new EcAsyncHelper().each(framework.relation, function(relationId, done) {
                EcAlignment.get(relationId, function(relation) {
                    var c = new EcAlignment();
                    c.copyFrom(relation);
                    if (me.queryParams.newObjectEndpoint != null) {
                        c.generateShortId(me.queryParams.newObjectEndpoint);
                    } else {
                        c.generateId(me.repo.selectedServer);
                    }
                    let index = framework.relation.indexOf(relationId);
                    if (index !== -1) {
                        framework.relation[index] = c.shortId();
                    }
                    if (relation.source && competencyMap[relation.source]) {
                        c.source = competencyMap[relation.source];
                    }
                    if (relation.target && competencyMap[relation.target]) {
                        c.target = competencyMap[relation.target];
                    }
                    c["schema:dateCreated"] = new Date().toISOString();
                    c["schema:dateModified"] = new Date().toISOString();
                    delete c.owner;
                    delete c.reader;
                    if (framework.owner) {
                        c.owner = framework.owner;
                    }
                    if (framework.reader) {
                        c.reader = framework.reader;
                    }
                    c['ceasn:derivedFrom'] = relation.id;
                    toSave.push(c);
                    done();
                }, done);
            }, function(competencyIds) {
                toSave.push(framework);
                me.multiput(toSave);
            });
        },
        copyResourceToDirectory: function(directory, resource, toSaveFromSubdirectory) {
            let me = this;
            let c = new CreativeWork();
            if (this.queryParams.newObjectEndpoint != null) {
                c.generateShortId(this.queryParams.newObjectEndpoint);
            } else {
                c.generateId(this.repo.selectedServer);
            }
            c.name = resource.name;
            c.url = resource.url;
            c.directory = directory.shortId();
            if (directory.owner) {
                c.owner = directory.owner;
            }
            if (directory.reader) {
                c.reader = directory.reader;
            }
            if (EcIdentityManager.ids.length > 0) {
                c.addOwner(EcIdentityManager.ids[0].ppk.toPk());
            }
            if (toSaveFromSubdirectory) {
                toSaveFromSubdirectory.push(c);
                me.multiput(toSaveFromSubdirectory);
            } else {
                me.repo.saveTo(c, function() {
                    appLog("Resource copied: " + c.id);
                    me.copyingToDirectory = false;
                }, appError);
            }
        },
        copySubdirectoryToDirectory: function(directory, oldSubdirectory, passedInToSave) {
            let me = this;
            let toSave = [];
            if (passedInToSave) {
                toSave = passedInToSave;
            }
            let subdirectory = new EcDirectory();
            subdirectory.copyFrom(oldSubdirectory);
            if (this.queryParams.newObjectEndpoint != null) {
                subdirectory.generateShortId(this.queryParams.newObjectEndpoint);
            } else {
                subdirectory.generateId(this.repo.selectedServer);
            }
            subdirectory.parentDirectory = directory.shortId();
            subdirectory["schema:dateCreated"] = new Date().toISOString();
            subdirectory["schema:dateModified"] = new Date().toISOString();
            delete subdirectory.owner;
            delete subdirectory.reader;
            if (directory.owner) {
                subdirectory.owner = directory.owner;
            }
            if (directory.reader) {
                subdirectory.reader = directory.reader;
            }
            if (EcIdentityManager.ids.length > 0) {
                subdirectory.addOwner(EcIdentityManager.ids[0].ppk.toPk());
            }
            subdirectory['ceasn:derivedFrom'] = oldSubdirectory.id;
            toSave.push(subdirectory);
            // to do: search for parentDirectory - allow nested copies
            this.repo.search("(directory:\"" + oldSubdirectory.shortId() + "\" OR parentDirectory:\"" + oldSubdirectory.shortId() + "\")", function() {}, function(success) {
                me.frameworksToProcess += success.length;
                new EcAsyncHelper().each(success, function(obj, done) {
                    if (obj.type === 'Framework') {
                        me.copyFrameworkToDirectory(subdirectory, obj, toSave);
                    } else if (obj.type === 'CreativeWork') {
                        me.copyResourceToDirectory(subdirectory, obj, toSave);
                    } else if (obj.type === 'Directory') {
                        me.frameworksToProcess--;
                        me.copySubdirectoryToDirectory(subdirectory, obj, toSave);
                    }
                    done();
                }, function(ids) {
                    if (ids.length === 0) {
                        me.multiput(toSave);
                    }
                });
            }, appError);
        },
        moveFrameworkToDirectory: function(directory, framework, toSaveFromSubdirectory) {
            let toSave = [];
            if (toSaveFromSubdirectory) {
                toSave = toSaveFromSubdirectory;
            }
            framework.owner = directory.owner;
            framework.reader = directory.reader;
            framework.directory = directory.shortId();
            framework["schema:dateModified"] = new Date().toISOString();
            toSave.push(framework);
            let subobjects = [];
            if (framework.competency && framework.competency.length > 0) {
                subobjects = framework.competency;
            }
            if (framework.level && framework.level.length > 0) {
                subobjects = subobjects.concat(framework.level);
            }
            if (framework.relation && framework.relation.length > 0) {
                subobjects = subobjects.concat(framework.relation);
            }
            if (subobjects.length > 0) {
                this.moveSubobjectsToDirectory(subobjects, directory, toSave);
            } else {
                this.multiput(toSave, true);
            }
        },
        moveSubobjectsToDirectory: function(subobjects, directory, toSave) {
            let me = this;
            new EcAsyncHelper().each(subobjects, function(id, done) {
                EcRepository.get(id, function(obj) {
                    obj.owner = directory.owner;
                    obj.reader = directory.reader;
                    obj["schema:dateModified"] = new Date().toISOString();
                    toSave.push(obj);
                    done();
                }, done);
            }, function(ids) {
                me.multiput(toSave, true);
            });
        },
        moveResourceToDirectory: function(directory, resource, toSaveFromSubdirectory) {
            let me = this;
            resource.owner = directory.owner;
            resource.reader = directory.reader;
            resource.directory = directory.shortId();
            if (toSaveFromSubdirectory) {
                toSaveFromSubdirectory.push(resource);
                me.multiput(toSaveFromSubdirectory, true);
            } else {
                me.repo.saveTo(resource, function() {
                    appLog("resource moved");
                    me.$store.commit('app/refreshSearch', true);
                    me.movingToDirectory = false;
                }, appError);
            }
        },
        moveSubdirectoryToDirectory: function(directory, subdirectory, passedInToSave) {
            // to do: make sure there are no circular dependencies
            let me = this;
            let toSave = [];
            if (passedInToSave) {
                toSave = passedInToSave;
            }
            subdirectory.parentDirectory = directory.shortId();
            subdirectory["schema:dateModified"] = new Date().toISOString();
            subdirectory.owner = directory.owner;
            subdirectory.reader = directory.reader;
            toSave.push(subdirectory);
            this.repo.search("(directory:\"" + subdirectory.shortId() + "\" OR parentDirectory:\"" + subdirectory.shortId() + "\")", function() {}, function(success) {
                me.frameworksToProcess += success.length;
                new EcAsyncHelper().each(success, function(obj, done) {
                    if (obj.type === 'Framework') {
                        me.moveFrameworkToDirectory(subdirectory, obj, toSave);
                    } else if (obj.type === 'CreativeWork') {
                        me.moveResourceToDirectory(subdirectory, obj, toSave);
                    } else if (obj.type === "Directory") {
                        me.frameworksToProcess--;
                        me.moveSubdirectoryToDirectory(subdirectory, obj, toSave);
                    }
                    done();
                }, function(ids) {
                    if (ids.length === 0) {
                        me.multiput(toSave, true);
                    }
                });
            }, appError);
        },
        removeFrameworkFromDirectory: function() {
            let framework = this.object;
            let me = this;
            let toSave = [];
            EcDirectory.get(framework.directory, function(directory) {
                if (directory.owner) {
                    for (let each of directory.owner) {
                        framework.removeOwner(EcPk.fromPem(each));
                    }
                    framework.addOwner(EcIdentityManager.ids[0].ppk.toPk());
                }
                if (directory.reader) {
                    for (let each of directory.reader) {
                        framework.removeReader(EcPk.fromPem(each));
                    }
                }
                delete framework.directory;
                framework["schema:dateModified"] = new Date().toISOString();
                toSave.push(framework);
                let subobjects = [];
                if (framework.competency && framework.competency.length > 0) {
                    subobjects = framework.competency;
                }
                if (framework.level && framework.level.length > 0) {
                    subobjects = subobjects.concat(framework.level);
                }
                if (framework.relation && framework.relation.length > 0) {
                    subobjects = subobjects.concat(framework.relation);
                }
                if (subobjects.length > 0) {
                    me.removeSubobjectsFromDirectory(subobjects, directory, toSave);
                } else {
                    this.multiput(toSave, true);
                }
            }, appError);
        },
        removeSubobjectsFromDirectory: function(subobjects, directory, toSave) {
            let me = this;
            new EcAsyncHelper().each(subobjects, function(id, done) {
                EcRepository.get(id, function(obj) {
                    if (directory.owner) {
                        for (let each of directory.owner) {
                            obj.removeOwner(EcPk.fromPem(each));
                        }
                        obj.addOwner(EcIdentityManager.ids[0].ppk.toPk());
                    }
                    if (directory.reader) {
                        for (let each of directory.reader) {
                            obj.removeReader(EcPk.fromPem(each));
                        }
                    }
                    obj["schema:dateModified"] = new Date().toISOString();
                    toSave.push(obj);
                    done();
                }, done);
            }, function(ids) {
                me.multiput(toSave, true);
            });
        },
        removeResourceFromDirectory: function() {
            let me = this;
            EcDirectory.get(this.object.directory, function(directory) {
                if (directory.owner) {
                    for (let each of directory.owner) {
                        me.object.removeOwner(EcPk.fromPem(each));
                    }
                    me.object.addOwner(EcIdentityManager.ids[0].ppk.toPk());
                }
                if (directory.reader) {
                    for (let each of directory.reader) {
                        me.object.removeReader(EcPk.fromPem(each));
                    }
                }
                delete me.object.directory;
                me.repo.saveTo(me.object, function() {
                    appLog("resource removed");
                    me.$store.commit('app/refreshSearch', true);
                    me.movingToDirectory = false;
                }, appError);
            }, appError);
        },
        removeSubdirectoryFromDirectory: function() {
            let me = this;
            let toSave = [];
            let subdirectory = this.object;
            EcDirectory.get(subdirectory.parentDirectory, function(directory) {
                if (directory.owner) {
                    for (let each of directory.owner) {
                        subdirectory.removeOwner(EcPk.fromPem(each));
                    }
                    subdirectory.addOwner(EcIdentityManager.ids[0].ppk.toPk());
                }
                if (directory.reader) {
                    for (let each of directory.reader) {
                        subdirectory.removeReader(EcPk.fromPem(each));
                    }
                }
                delete subdirectory.parentDirectory;
                subdirectory["schema:dateModified"] = new Date().toISOString();
                toSave.push(subdirectory);
                let subobjects = [];
                me.repo.search("directory:\"" + subdirectory.shortId() + "\"", function() {}, function(success) {
                    me.frameworksToProcess = success.length;
                    new EcAsyncHelper().each(success, function(obj, done) {
                        subobjects.push(obj.shortId());
                        if (obj.competency && obj.competency.length > 0) {
                            subobjects = subobjects.concat(obj.competency);
                        }
                        if (obj.level && obj.level.length > 0) {
                            subobjects = subobjects.concat(obj.level);
                        }
                        if (obj.relation && obj.relation.length > 0) {
                            subobjects = subobjects.concat(obj.relation);
                        }
                        if (subobjects.length > 0) {
                            me.removeSubobjectsFromDirectory(subobjects, directory, toSave);
                        }
                        done();
                    }, function(ids) {
                        if (ids.length === 0) {
                            me.multiput(toSave, true);
                        }
                    });
                }, appError);
            }, appError);
        }
    },
    mounted: function() {
        this.setNumSubdirectoriesAndObjects();
    },
    computed: {
        objectName: function() {
            let name = this.object.name;
            if (!name && this.object["dcterms:title"]) {
                name = this.object["dcterms:title"];
            } else if (!name && this.object["skos:prefLabel"]) {
                name = this.object["skos:prefLabel"];
            }
            return Thing.getDisplayStringFrom(name);
        },
        objectDescription: function() {
            let description = this.object.description;
            if (!description && this.object["dcterms:description"]) {
                description = this.object["dcterms:description"];
            } else if (!description && this.object["skos:definition"]) {
                description = this.object["skos:definition"];
            }
            return Thing.getDisplayStringFrom(description);
        },
        objectShortId: function() {
            return this.object.shortId();
        },
        object: function() {
            return this.$store.getters['app/rightAsideObject'];
        },
        objectType: function() {
            return this.object.type;
        },
        objectTypeForDisplay: function() {
            if (this.objectType === 'CreativeWork') {
                return "Resource";
            }
            if (this.objectType === "ConceptScheme") {
                if (this.queryParams.ceasnDataFields === 'true') {
                    return "Concept Scheme";
                } else {
                    return "Taxonomy";
                }
            }
            return this.objectType;
        },
        lastModified: function() {
            if (this.object.getTimestamp()) {
                return this.$moment(new Date(this.object.getTimestamp())).format("MMM D YYYY");
            }
            if (this.object["schema:dateModified"]) {
                return this.$moment(new Date(this.object['schema:dateModified'])).format("MMM D YYYY");
            }
            return "unknown";
        },
        dateCreated: function() {
            if (this.object["schema:dateCreated"]) {
                return this.$moment(new Date(this.object['schema:dateCreated'])).format("MMM D YYYY");
            }
            return "unknown";
        },
        publisherName: function() {
            if (this.object['ceasn:publisherName']) {
                if (this.getName(this.object['ceasn:publisherName'])) {
                    return this.getName(this.object['ceasn:publisherName']);
                }
            }
            if (this.object['schema:publisher']) {
                if (this.getName(this.object['schema:publisher'])) {
                    return this.getName(this.object['schema:publisher']);
                }
            }
            return null;
        },
        creatorName: function() {
            if (this.object['schema:creator']) {
                if (this.getName(this.object['schema:creator'])) {
                    return this.getName(this.object['schema:creator']);
                }
            }
            return null;
        },
        shareLink: function() {
            let link = window.location.href;
            link = link.replace('/frameworks', '').replace('/directory', '');
            if (this.objectType === "Directory") {
                return (link + "?directoryId=" + this.objectShortId);
            } else if (this.$store.getters['editor/conceptMode'] === true) {
                return (link + "?concepts=true&frameworkId=" + this.objectShortId);
            }
            return (link + "?frameworkId=" + this.objectShortId);
        },
        directoryOptions: function() {
            let me = this;
            return this.$store.getters['app/directoryList'].filter(directory => {
                return (directory.shortId() !== me.object.shortId() &&
                    (me.object.parentDirectory ? (directory.shortId() !== me.object.parentDirectory) : true) &&
                    (me.object.directory ? (directory.shortId() !== me.object.directory) : true));
            });
        },
        canEditObject: function() {
            return this.object.canEditAny(EcIdentityManager.getMyPks());
        },
        canEditDirectory: function() {
            if (this.object.directory) {
                return EcDirectory.getBlocking(this.object.directory).canEditAny(EcIdentityManager.getMyPks());
            } else if (this.object.parentDirectory) {
                return EcDirectory.getBlocking(this.object.parentDirectory).canEditAny(EcIdentityManager.getMyPks());
            }
            // Object is not in a directory
            if (this.objectType === 'ConceptScheme') {
                return false;
            }
            return true;
        },
        queryParams: function() {
            return this.$store.getters['editor/queryParams'];
        }
    },
    watch: {
        objectShortId: function() {
            this.setNumSubdirectoriesAndObjects();
        }
    }
};
</script>

<style lang="scss">
    @import './../../scss/list-item-info.scss';
</style>