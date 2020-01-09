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
                    :profile="profile">
                    <slot />
                </HierarchyNode>
            </draggable>
        </ul>
    </div>
</template>
<script>
import HierarchyNode from '@/lode/components/lode/HierarchyNode.vue';
import draggable from 'vuedraggable';
export default {
    name: 'ConceptHierarchy',
    props: {
        container: Object,
        containerType: String,
        editable: Boolean,
        repo: Object,
        profile: Object
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
    computed: {
        hierarchy: function() {
            var me = this;
            if (this.container == null) return null;
            if (!this.once) return this.structure;
            console.log("Computing hierarchy.");
            var precache = [];
            if (this.container["skos:hasTopConcept"] != null) { precache = precache.concat(this.container["skos:hasTopConcept"]); }
            this.repo.multiget(precache, function(success) {
                me.computeHierarchy();
            }, console.error, console.log);
            return this.structure;
        },
        // True if the current client can edit this object.
        canEdit: function() {
            if (this.editable !== true) {
                return false;
            }
            return this.container.canEditAny(EcIdentityManager.ids);
        }
    },
    methods: {
        computeHierarchy: function() {
            var me = this;
            this.structure = [];
            if (this.container == null) { return r; }
            if (this.container["skos:hasTopConcept"] !== null) {
                for (var i = 0; i < this.container["skos:hasTopConcept"].length; i++) {
                    var c = EcConcept.getBlocking(this.container["skos:hasTopConcept"][i]);
                    this.structure.push({"obj": c, "children": []});
                    if (c["skos:narrower"]) {
                        this.addChildren(c, i);
                    }
                }
            }
            this.once = false;
        },
        addChildren: function(c, i) {
            for (var j = 0; j < c["skos:narrower"].length; j++) {
                var subC = EcConcept.getBlocking(c["skos:narrower"][j]);
                this.structure[i].children.push({"obj": subC, "children": []});
                if (subC["skos:narrower"]) {
                    this.addChildren(subC, j);
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
            if (fromId !== toId) {
                var fromIndex = this.container[this.containerNodeProperty].indexOf(fromId);
                console.log(fromIndex);
                this.container[this.containerNodeProperty].splice(fromIndex, 1);
                var toIndex = null;
                if (toId == null || toId === undefined) {
                    toIndex = -1;
                } else {
                    toIndex = this.container[this.containerNodeProperty].indexOf(toId);
                }
                console.log(toIndex);
                if (plusup > 0 && fromIndex <= toIndex) { toIndex += plusup; }
                if (plusup < 0 && fromIndex < toIndex) { toIndex += plusup; }
                if (toIndex === -1) {
                    this.container[this.containerNodeProperty].push(fromId);
                } else {
                    this.container[this.containerNodeProperty].splice(toIndex, 0, fromId);
                }
            }
            if (fromContainerId !== toContainerId) {
                if (removeOldRelations === true) {
                    for (var i = 0; i < this.container[this.containerEdgeProperty].length; i++) {
                        var a = window[this.edgeType].getBlocking(this.container[this.containerEdgeProperty][i]);
                        if (a == null) { continue; }
                        if (a[this.edgeRelationProperty] === this.edgeRelationLiteral) {
                            if (a[this.edgeTargetProperty] == null) continue;
                            if (a[this.edgeSourceProperty] == null) continue;
                            if (a[this.edgeSourceProperty] !== fromId) continue;
                            console.log("Identified edge to remove: ", JSON.parse(a.toJson()));
                            this.container[this.containerEdgeProperty].splice(i--, 1);
                        }
                    }
                }
                if (toContainerId != null && toContainerId !== "") {
                    var a = new window[this.edgeType]();
                    if (EcIdentityManager.ids != null && EcIdentityManager.ids.length > 0) {
                        a.addOwner(EcIdentityManager.ids[0]);
                    }
                    var source = window[this.nodeType].getBlocking(fromId);
                    var target = window[this.nodeType].getBlocking(toContainerId);
                    a.assignId(this.repo.selectedServer, EcCrypto.md5(source.shortId()) + "_" + this.edgeRelationLiteral + "_" + EcCrypto.md5(target.shortId()));
                    a.source = source.shortId();
                    a.target = target.shortId();
                    a.relationType = this.edgeRelationLiteral;
                    this.container[this.containerEdgeProperty].push(a.shortId());
                    console.log("Added edge: ", JSON.parse(a.toJson()));
                    this.repo.saveTo(a, console.log, console.error);
                }
            }
            this.repo.saveTo(this.stripEmptyArrays(this.container), console.log, console.error);
            this.dragging = false;
        },
        add: function(containerId) {
            this.once = true;
            var c = new window[this.nodeType]();
            c.generateId(this.repo.selectedServer);
            if (EcIdentityManager.ids != null && EcIdentityManager.ids.length > 0) {
                c.addOwner(EcIdentityManager.ids[0]);
            }
            this.container[this.containerNodeProperty].push(c.shortId());
            console.log("Added node: ", JSON.parse(c.toJson()));
            this.repo.saveTo(c, console.log, console.error);

            var a = new window[this.edgeType]();
            if (EcIdentityManager.ids != null && EcIdentityManager.ids.length > 0) {
                a.addOwner(EcIdentityManager.ids[0]);
            }
            var source = c;
            var target = window[this.nodeType].getBlocking(containerId);
            a.assignId(this.repo.selectedServer, EcCrypto.md5(source.shortId()) + "_" + this.edgeRelationLiteral + "_" + EcCrypto.md5(target.shortId()));
            a.source = source.shortId();
            a.target = target.shortId();
            a.relationType = this.edgeRelationLiteral;
            this.container[this.containerEdgeProperty].push(a.shortId());
            console.log("Added edge: ", JSON.parse(a.toJson()));
            this.repo.saveTo(a, console.log, console.error);
            this.repo.saveTo(this.stripEmptyArrays(this.container), console.log, console.error);
        },
        // Supports save() by removing reactify arrays.
        stripEmptyArrays(o) {
            // TODO: Investigate use of Vue.$set instead of reactification method.
            if (EcArray.isArray(o)) {
                if (o.length === 0) {
                    return null;
                }
                for (var i = 0; i < o.length; i++) {
                    o[i] = this.stripEmptyArrays(o[i]);
                    if (o[i] == null) {
                        o.splice(i--, 1);
                    }
                }
            } else if (EcObject.isObject(o)) {
                for (var key in o) {
                    var value = this.stripEmptyArrays(o[key]);
                    if (value == null) {
                        delete o[key];
                    }
                }
            }
            return o;
        }
    }
};
</script>