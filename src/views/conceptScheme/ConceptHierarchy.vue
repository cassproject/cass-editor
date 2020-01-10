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
            this.structure.splice(0, this.structure.length);
            if (this.container == null) { return r; }
            if (this.container["skos:hasTopConcept"] !== null) {
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
                if (subC["skos:narrower"]) {
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