<template>
    <div class="e-Hierarchy">
        <ul
            class="e-Hierarchy-ul"
            v-if="hierarchy">
            <draggable
                v-model="hierarchy"
                :disabled="canEdit != true"
                :group="{ name: 'test' }"
                @start="beginDrag"
                @end="endDrag">
                <HierarchyNode
                    v-for="item in hierarchy"
                    :key="item.obj.id"
                    :obj="item.obj"
                    :dragging="dragging"
                    :canEdit="canEdit"
                    :hasChild="item.children"
                    :profile="profile"
                    :exportOptions="exportOptions"
                    :highlightList="highlightList"
                    :selectMode="selectMode"
                    :selectAll="selectAll"
                    @add="add"
                    @beginDrag="beginDrag"
                    @move="move"
                    @deleteObject="deleteObject"
                    @exportObject="exportObject"
                    @select="select"
                    :isEditingContainer="isEditingContainer"
                    @editingThing="handleEditingContainer($event)"
                    :parentStructure="hierarchy"
                    :parent="container">
                    <slot />
                </HierarchyNode>
            </draggable>
        </ul>
        <i
            v-if="canEdit"
            class="drag-footer fa fa-plus"
            @click="add(container.shortId())" />
    </div>
</template>
<script>
import HierarchyNode from '@/lode/components/lode/HierarchyNode.vue';
import draggable from 'vuedraggable';
import common from '@/mixins/common.js';
export default {
    name: 'ConceptHierarchy',
    props: {
        container: Object,
        containerType: String,
        editable: Boolean,
        repo: Object,
        profile: Object,
        queryParams: Object,
        exportOptions: Array,
        highlightList: Array,
        selectMode: Boolean,
        selectAll: Boolean,
        isEditingContainer: Boolean
    },
    data: function() {
        return {
            structure: [],
            once: true,
            dragging: false,
            controlOnStart: false
        };
    },
    components: {HierarchyNode, draggable},
    mixins: [common],
    computed: {
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
            if (this.editable !== true) {
                return false;
            }
            return this.container.canEditAny(EcIdentityManager.getMyPks());
        }
    },
    watch: {
        container: {
            handler() {
                this.once = true;
            },
            deep: true
        }
    },
    methods: {
        handleEditingContainer: function(e) {
            if (e) {
                this.$emit('editingContainer', true);
            } else {
                this.$emit('editingContainer', false);
            }
        },
        computeHierarchy: function() {
            this.structure.splice(0, this.structure.length);
            if (this.container == null) { return r; }
            if (this.container["skos:hasTopConcept"] !== null && this.container["skos:hasTopConcept"] !== undefined) {
                for (var i = 0; i < this.container["skos:hasTopConcept"].length; i++) {
                    var c = EcConcept.getBlocking(this.container["skos:hasTopConcept"][i]);
                    this.structure.push({"obj": c, "children": []});
                    if (c["skos:narrower"]) {
                        this.addChildren(this.structure, c, i);
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
                fromContainer[fromProperty].splice(fromIndex, 1);
                if (fromContainerId && moveComp[fromProperty2]) {
                    EcArray.setRemove(moveComp[fromProperty2], fromContainerId);
                    if (moveComp[fromProperty2].length === 0) {
                        delete moveComp[fromProperty2];
                    }
                } else {
                    delete moveComp[fromProperty2];
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
                    me.repo.saveTo(toContainer, function() {
                        me.repo.saveTo(moveComp, console.log, console.error);
                        me.computeHierarchy();
                    }, console.log);
                }, console.error);
            }
            this.dragging = false;
        },
        add: function(containerId) {
            var me = this;
            var c = new EcConcept();
            if (this.queryParams.newObjectEndpoint) {
                c.generateShortId(newObjectEndpoint);
            } else {
                c.generateId(this.repo.selectedServer);
            }
            c["schema:dateCreated"] = new Date().toISOString();
            if (EcIdentityManager.ids != null && EcIdentityManager.ids.length > 0) {
                c.addOwner(EcIdentityManager.ids[0].ppk.toPk());
            }
            this.setDefaultLanguage();
            c["skos:prefLabel"] = {"@language": this.$store.state.editor.defaultLanguage, "@value": "New Concept"};
            c["skos:inScheme"] = this.container.shortId();
            if (containerId === this.container.shortId()) {
                if (!EcArray.isArray(this.container["skos:hasTopConcept"])) {
                    this.container["skos:hasTopConcept"] = [];
                }
                this.container["skos:hasTopConcept"].unshift(c.shortId());
                c["skos:topConceptOf"] = this.container.shortId();
                this.container["schema:dateModified"] = new Date().toISOString();
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
                if (!EcArray.isArray(parent["skos:narrower"])) {
                    parent["skos:narrower"] = [];
                }
                parent["skos:narrower"].unshift(c.shortId());
                this.container["schema:dateModified"] = new Date().toISOString();
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
            console.log("Added node: ", JSON.parse(c.toJson()));
        },
        select: function(objId, checked) {
            this.$emit('select', objId, checked);
        },
        deleteObject: function(thing) {
            this.$emit('deleteObject', thing);
        },
        exportObject: function(thing, type) {
            this.$emit('exportObject', thing, type);
        }
    }
};
</script>