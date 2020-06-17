<template>
    <div class="lode__hierarchy">
        <div
            class="hierarchy-buttons columns is-gapless is-paddingless is-mobile is-marginless is-paddingless">
            <!-- CONTROLS FOR SELECT: ENABLED MULTI EDIT  -->
            <div
                v-if="view !== 'import'"
                id="check-radio-all-column"
                class="column is-narrow">
                <div
                    class="field">
                    <input
                        class="is-checkradio"
                        id="selectAllCheckbox"
                        type="checkbox"
                        name="selectAllCheckbox"
                        v-model="selectAll">
                    <label for="selectAllCheckbox" />
                </div>
            </div>
            <!-- CONTROLS FOR EXPAND  -->
            <div class="column is-narrow">
                <div
                    v-if="expanded"
                    class="icon is-vcentered"
                    @click="expanded=false">
                    <i class="fa fa-caret-down has-text-primary is-size-2" />
                </div>
                <div
                    v-else-if="!expanded"
                    class="icon is-vcentered"
                    @click="expanded=true">
                    <i class="fa fa-caret-right has-text-primary is-size-2" />
                </div>
                <div
                    v-else
                    class="icon is-vcentered">
                    <i class="fa fa-circle is-size-7 has-text-light" />
                </div>
                <div
                    v-if="selectButtonText"
                    @click="$emit('selectButtonClick', selectedArray)"
                    class="button is-small is-outlined is-primary">
                    {{ selectButtonText }}
                </div>
            </div>
            <!-- MULTI EDIT BUTTONS -->
            <div class="column is-narrow">
                <div
                    class="buttons">
                    <div
                        v-if="multipleSelected && !addingNode && view !== 'import' && canEdit"
                        @click="$emit('editMultipleEvent')"
                        class="button is-small is-outlined is-primary">
                        <span class="icon">
                            <i class="fa fa-cog" />
                        </span>
                        <span>
                            Edit multiple
                        </span>
                    </div>
                    <!-- if multiple are selected allow for edit multiple -->
                    <div
                        @click="addingNode = true;"
                        v-if="!addingNode && canEdit"
                        class="button is-small is-outlined is-primary">
                        <span class="icon">
                            <i class="fa fa-plus-circle" />
                        </span>
                        <span>
                            Add Concept
                        </span>
                    </div>
                    <div
                        v-if="addingNode"
                        @click="addingNode = false;"
                        class="button is-outlined is-small is-dark ">
                        <span class="icon">
                            <i class="fa fa-times" />
                        </span>
                        <span>cancel</span>
                    </div>
                    <div
                        v-if="addingNode"
                        @click="add(container.shortId(), null); addingNode = false;"
                        class="button is-outlined is-small is-primary ">
                        <span class="icon">
                            <i class="fa fa-plus" />
                        </span>
                        <span>
                            create new
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <template
            v-if="hierarchy">
            <draggable
                v-bind="dragOptions"
                v-model="hierarchy"
                tag="ul"
                class="lode__hierarchy-ul"
                :disabled="canEdit !== true || !isDraggable"
                :group="{ name: 'test' }"
                @start="beginDrag"
                handle=".handle"
                @end="endDrag">
                <HierarchyNode
                    :view="view"
                    @createNewNodeEvent="onCreateNewNode"
                    :subview="subview"
                    @mountingNode="handleMountingNode"
                    v-for="(item, index) in hierarchy"
                    :key="item.obj.id"
                    :obj="item.obj"
                    class="lode__hierarchy-li"
                    :dragging="dragging"
                    :canEdit="canEdit"
                    :hasChild="item.children"
                    :profile="profile"
                    :exportOptions="exportOptions"
                    :highlightList="highlightList"
                    :selectAll="selectAll"
                    :newFramework="newFramework"
                    :index="index"
                    :frameworkEditable="canEdit"
                    :selectedArray="selectedArray"
                    @add="add"
                    @beginDrag="beginDrag"
                    @move="move"
                    @deleteObject="deleteObject"
                    @exportObject="exportObject"
                    @select="select"
                    :parentStructure="hierarchy"
                    :parent="container"
                    @draggableCheck="onDraggableCheck"
                    :properties="properties"
                    :expandAll="expanded==true"
                    :parentChecked="false" />
            </draggable>
        </template>
    </div>
</template>
<script>

import common from '@/mixins/common.js';
var hierarchyTimeout;
export default {
    name: 'ConceptHierarchy',
    props: {
        container: Object,
        containerType: String,
        repo: Object,
        profile: Object,
        exportOptions: Array,
        highlightList: Array,
        selectMode: Boolean,
        selectAll: Boolean,
        containerTypeGet: String,
        viewOnly: Boolean,
        newFramework: Boolean,
        properties: String,
        view: {
            type: String,
            default: 'framework'
        },
        subview: {
            type: String,
            default: ''
        }
    },
    data: function() {
        return {
            structure: [],
            once: true,
            dragging: false,
            controlOnStart: false,
            filter: 'showAll',
            dragIcon: 'fa-arrows-alt',
            dragOptions: {
                delay: 100,
                disabled: false,
                ghostClass: 'ghost-drag',
                chosenClass: 'chosen-drag',
                dragClass: 'drag',
                scrollSensitivity: 200,
                forceFallback: true
            },
            multipleSelected: false,
            addingNode: false,
            selectedArray: [],
            selectButtonText: null,
            expanded: true,
            isDraggable: true
        };
    },
    components: {
        HierarchyNode: () => import('@/lode/components/lode/HierarchyNode.vue'),
        draggable: () => import('vuedraggable')
    },
    mixins: [common],
    computed: {
        queryParams: function() {
            return this.$store.getters['editor/queryParams'];
        },
        hierarchy: function() {
            var me = this;
            if (this.container == null) return null;
            if (!this.once) return this.structure;
            console.log("Computing hierarchy.");
            var precache = [];
            if (this.container["skos:hasTopConcept"] != null) { precache = precache.concat(this.container["skos:hasTopConcept"]); }
            if (precache.length > 0) {
                this.repo.multiget(precache, function(success) {
                    me.computeHierarchy();
                }, console.error, console.log);
            } else {
                me.computeHierarchy();
            }
            return this.structure;
        },
        // True if the current client can edit this object.
        canEdit: function() {
            if (this.viewOnly === true) {
                return false;
            }
            return this.container.canEditAny(EcIdentityManager.getMyPks());
        },
        recomputeHierarchy: function() {
            return this.$store.getters['editor/recomputeHierarchy'];
        }
    },
    watch: {
        container: {
            handler() {
                this.once = true;
            },
            deep: true
        },
        selectedArray: function() {
            if (this.selectedArray.length > 1) {
                this.multipleSelected = true;
            } else {
                this.multipleSelected = false;
            }
            this.$emit('selectedArray', this.selectedArray);
        },
        // Concepts can't just depend on fields on the container object like frameworks can for reactivity
        recomputeHierarchy: function() {
            if (this.recomputeHierarchy) {
                this.once = true;
                this.$store.commit('editor/recomputeHierarchy', false);
            }
        }
    },
    mounted: function() {
        if (this.queryParams) {
            if (this.queryParams.singleSelect) {
                this.selectButtonText = this.queryParams.singleSelect;
            }
            if (this.queryParams.select) {
                if (this.queryParams.select !== "" && this.queryParams.select !== "select") {
                    this.selectButtonText = this.queryParams.select;
                }
            }
        }
    },
    methods: {
        onCreateNewNode: function(parentId, previousSiblingId) {
            this.add(parentId, previousSiblingId);
        },
        /*
         * when a child node is mounted it emits an event
         * and a timeout is started
         */
        handleMountingNode: function() {
            this.startTime();
        },
        /*
         * each mount resets the timeout
         * if the timeout length is met (no new nodes)
         * the done loading event is triggered
         */
        startTime: function() {
            hierarchyTimeout = setTimeout(() => {
                this.$emit('doneLoadingNodes');
            }, 1000);
        },
        computeHierarchy: function() {
            this.structure.splice(0, this.structure.length);
            if (this.container == null) { return r; }
            if (this.container["skos:hasTopConcept"] !== null && this.container["skos:hasTopConcept"] !== undefined) {
                for (var i = 0; i < this.container["skos:hasTopConcept"].length; i++) {
                    var c = EcConcept.getBlocking(this.container["skos:hasTopConcept"][i]);
                    if (c) {
                        this.structure.push({"obj": c, "children": []});
                        if (c["skos:narrower"]) {
                            this.addChildren(this.structure, c, i);
                        }
                    }
                }
            }
            this.once = false;
        },
        addChildren: function(structure, c, i) {
            for (var j = 0; j < c["skos:narrower"].length; j++) {
                var subC = EcConcept.getBlocking(c["skos:narrower"][j]);
                structure[i].children.push({"obj": subC, "children": []});
                if (subC && subC["skos:narrower"]) {
                    this.addChildren(structure[i].children, subC, j);
                }
            }
        },
        // WARNING: The Daemon of OBO lingers in these here drag and move methods. The library moves the objects, and OBO will then come get you!
        beginDrag: function() {
            this.dragging = true;
            if (event !== undefined) {
                this.controlOnStart = event.originalEvent.ctrlKey || event.originalEvent.shiftKey;
            }
        },
        endDrag: function(foo) {
            console.log(foo.oldIndex, foo.newIndex);
            var toId = null;
            var plusup = 0;
            if (foo.from.id === foo.to.id) {
                if (foo.newIndex < this.hierarchy.length) {
                    toId = this.hierarchy[foo.newIndex].obj.shortId();
                }
                plusup = 1;
            } else {
                if (foo.to.children[foo.newIndex] === undefined) {
                    toId = foo.to.id;
                } else {
                    if (foo.newIndex + 1 < foo.to.children.length) {
                        toId = foo.to.children[foo.newIndex + 1].id;
                    }
                }
            }
            this.move(
                this.hierarchy[foo.oldIndex].obj.shortId(),
                toId,
                foo.from.id,
                foo.to.id,
                !this.controlOnStart, plusup);
        },
        move: function(fromId, toId, fromContainerId, toContainerId, removeOldRelations, plusup) {
            this.once = true;
            var me = this;
            if (fromContainerId === toContainerId) {
                var container = EcConcept.getBlocking(toContainerId);
                var property = "skos:narrower";
                if (container === null) {
                    container = this.container;
                    property = "skos:hasTopConcept";
                }
                var initialValue = container[property] ? container[property].slice() : null;
                var fromIndex = container[property].indexOf(fromId);
                container[property].splice(fromIndex, 1);
                if (toId == null || toId === undefined) {
                    if (!EcArray.isArray(container[property])) {
                        container[property] = [];
                    }
                    container[property].push(fromId);
                } else {
                    var toIndex = container[property].indexOf(toId);
                    container[property].splice(toIndex, 0, fromId);
                }
                me.$store.commit('editor/addEditsToUndo', [{operation: "update", id: container.shortId(), fieldChanged: [property], initialValue: [initialValue]}]);
                container["schema:dateModified"] = new Date().toISOString();
                if (this.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[container.id] !== true) {
                    container = EcEncryptedValue.toEncryptedValue(container);
                }
                this.repo.saveTo(container, function() {
                    me.computeHierarchy();
                }, console.error);
            } else {
                var moveComp = EcConcept.getBlocking(fromId);
                var fromContainer = EcConcept.getBlocking(fromContainerId);
                var fromProperty = "skos:narrower";
                var fromProperty2 = "skos:broader";
                var toContainer = EcConcept.getBlocking(toContainerId);
                var toProperty = "skos:narrower";
                var toProperty2 = "skos:broader";
                if (fromContainer === null) {
                    fromContainer = this.container;
                    fromProperty = "skos:hasTopConcept";
                    fromProperty2 = "skos:topConceptOf";
                }
                if (toContainer === null) {
                    toContainer = this.container;
                    toProperty = "skos:hasTopConcept";
                    toProperty2 = "skos:topConceptOf";
                }
                var fromIndex = fromContainer[fromProperty].indexOf(fromId);
                var fromPropInitialValue = fromContainer[fromProperty].slice();
                var fromProp2InitialValue = moveComp[fromProperty2] ? moveComp[fromProperty2].slice() : null;
                var toPropInitialValue = toContainer[toProperty] ? toContainer[toProperty].slice() : null;
                var toProp2InitialValue = moveComp[toProperty2] ? moveComp[toProperty2].slice() : null;
                fromContainer[fromProperty].splice(fromIndex, 1);
                if (fromContainerId && moveComp[fromProperty2]) {
                    EcArray.setRemove(moveComp[fromProperty2], fromContainerId);
                    if (moveComp[fromProperty2].length === 0) {
                        delete moveComp[fromProperty2];
                    }
                } else {
                    delete moveComp[fromProperty2];
                }
                fromContainer["schema:dateModified"] = new Date().toISOString();
                if (this.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[fromContainer.id] !== true) {
                    fromContainer = EcEncryptedValue.toEncryptedValue(fromContainer);
                }
                this.repo.saveTo(fromContainer, function() {
                    if (toId == null || toId === undefined) {
                        if (!EcArray.isArray(toContainer[toProperty])) {
                            toContainer[toProperty] = [];
                        }
                        toContainer[toProperty].push(fromId);
                    } else {
                        var toIndex = toContainer[toProperty].indexOf(toId);
                        toContainer[toProperty].splice(toIndex, 0, fromId);
                    }
                    if (!EcArray.isArray(moveComp[toProperty2])) {
                        moveComp[toProperty2] = [];
                    }
                    if (toContainerId) {
                        moveComp[toProperty2].push(toContainerId);
                    } else {
                        moveComp[toProperty2].push(me.container.shortId());
                    }
                    me.$store.commit('editor/addEditsToUndo', [
                        {operation: "update", id: fromContainer.shortId(), fieldChanged: [fromProperty], initialValue: [fromPropInitialValue]},
                        {operation: "update", id: toContainer.shortId(), fieldChanged: [toProperty], initialValue: [toPropInitialValue]},
                        {operation: "update", id: moveComp.shortId(), fieldChanged: [fromProperty2, toProperty2], initialValue: [fromProp2InitialValue, toProp2InitialValue]}
                    ]);
                    toContainer["schema:dateModified"] = new Date().toISOString();
                    moveComp["schema:dateModified"] = new Date().toISOString();
                    if (me.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[toContainer.id] !== true) {
                        toContainer = EcEncryptedValue.toEncryptedValue(toContainer);
                    }
                    if (me.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[moveComp.id] !== true) {
                        moveComp = EcEncryptedValue.toEncryptedValue(moveComp);
                    }
                    me.repo.saveTo(toContainer, function() {
                        me.repo.saveTo(moveComp, console.log, console.error);
                        me.computeHierarchy();
                    }, console.log);
                }, console.error);
            }
            this.dragging = false;
        },
        add: function(containerId, previousSibling) {
            var me = this;
            var c = new EcConcept();
            if (this.queryParams.newObjectEndpoint) {
                c.generateShortId(this.queryParams.newObjectEndpoint);
            } else {
                c.generateId(this.repo.selectedServer);
            }
            c["schema:dateCreated"] = new Date().toISOString();
            c["schema:dateModified"] = new Date().toISOString();
            if (EcIdentityManager.ids != null && EcIdentityManager.ids.length > 0) {
                c.addOwner(EcIdentityManager.ids[0].ppk.toPk());
            }
            if (this.container.owner && this.container.owner.length > 0) {
                for (var j = 0; j < this.container.owner.length; j++) {
                    var owner = this.container.owner[j];
                    c.addOwner(EcPk.fromPem(owner));
                }
            }
            if (this.container.reader && this.container.reader.length > 0) {
                for (var j = 0; j < this.container.reader.length; j++) {
                    var reader = this.container.reader[j];
                    r.addReader(EcPk.fromPem(reader));
                }
            }
            this.setDefaultLanguage();
            c["skos:prefLabel"] = {"@language": this.$store.state.editor.defaultLanguage, "@value": "New Concept"};
            c["skos:inScheme"] = this.container.shortId();
            if (containerId === this.container.shortId()) {
                var initialValue = this.container["skos:hasTopConcept"] ? this.container["skos:hasTopConcept"].slice() : null;
                if (!EcArray.isArray(this.container["skos:hasTopConcept"])) {
                    this.container["skos:hasTopConcept"] = [];
                }
                if (previousSibling == null || previousSibling === undefined) {
                    this.container["skos:hasTopConcept"].unshift(c.shortId());
                } else {
                    // Insert immediately after the sibling
                    var index = this.container["skos:hasTopConcept"].indexOf(previousSibling);
                    this.container["skos:hasTopConcept"].splice(index + 1, 0, c.shortId());
                }
                c["skos:topConceptOf"] = this.container.shortId();
                me.$store.commit('editor/addEditsToUndo', [
                    {operation: "addNew", id: c.shortId()},
                    {operation: "update", id: this.container.shortId(), fieldChanged: ["skos:hasTopConcept"], initialValue: [initialValue]}
                ]);
                this.container["schema:dateModified"] = new Date().toISOString();
                c["schema:dateModified"] = new Date().toISOString();
                if (this.$store.state.editor.private === true) {
                    c = EcEncryptedValue.toEncryptedValue(c);
                    if (EcEncryptedValue.encryptOnSaveMap[me.container.id] !== true) {
                        me.container = EcEncryptedValue.toEncryptedValue(me.container);
                    }
                }
                this.repo.saveTo(c, function() {
                    me.repo.saveTo(me.container, function() {
                        me.once = true;
                    }, console.error);
                }, console.error);
            } else {
                c["skos:broader"] = [containerId];
                var parent = EcConcept.getBlocking(containerId);
                var initialValue = parent["skos:narrower"] ? parent["skos:narrower"].slice() : null;
                if (!EcArray.isArray(parent["skos:narrower"])) {
                    parent["skos:narrower"] = [];
                }
                if (previousSibling == null || previousSibling === undefined) {
                    parent["skos:narrower"].unshift(c.shortId());
                } else {
                    // Insert immediately after the sibling
                    var index = parent["skos:narrower"].indexOf(previousSibling);
                    parent["skos:narrower"].splice(index + 1, 0, c.shortId());
                }
                me.$store.commit('editor/addEditsToUndo', [
                    {operation: "addNew", id: c.shortId()},
                    {operation: "update", id: parent.shortId(), fieldChanged: ["skos:narrower"], initialValue: [initialValue]}
                ]);
                this.container["schema:dateModified"] = new Date().toISOString();
                c["schema:dateModified"] = new Date().toISOString();
                parent["schema:dateModified"] = new Date().toISOString();
                if (this.$store.state.editor.private === true) {
                    c = EcEncryptedValue.toEncryptedValue(c);
                    if (EcEncryptedValue.encryptOnSaveMap[parent.id] !== true) {
                        parent = EcEncryptedValue.toEncryptedValue(parent);
                    }
                    if (EcEncryptedValue.encryptOnSaveMap[me.container.id] !== true) {
                        me.container = EcEncryptedValue.toEncryptedValue(me.container);
                    }
                }
                this.repo.saveTo(c, function() {
                    me.repo.saveTo(parent, function() {
                        me.repo.saveTo(me.container, function() {
                            me.once = true;
                        }, console.error);
                    }, console.error);
                }, console.error);
            }
            this.$store.commit("editor/newCompetency", c.shortId());
            console.log("Added node: ", JSON.parse(c.toJson()));
        },
        select: function(objId, checked) {
            if (checked) {
                EcArray.setAdd(this.selectedArray, objId);
            } else {
                EcArray.setRemove(this.selectedArray, objId);
            }
        },
        deleteObject: function(thing) {
            this.$emit('deleteObject', thing);
        },
        exportObject: function(thing, type) {
            this.$emit('exportObject', thing, type);
        },
        onDraggableCheck: function(checked) {
            this.isDraggable = checked;
        }
    }
};
</script>

<style lang="scss">
    @import './../../scss/variables.scss';


</style>