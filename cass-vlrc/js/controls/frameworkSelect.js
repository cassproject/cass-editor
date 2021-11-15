Vue.component('frameworkSelect', {
    props: ['uri'],
    computed: {
        name: {
            get: function () {
                if (this.uri == null) return "Invalid Framework";
                return EcFramework.getBlocking(this.uri).getName();
            }
        },
        description: {
            get: function () {
                if (this.uri == null) return "Could not resolve URI.";
                var description = EcFramework.getBlocking(this.uri).getDescription();
                if (description == null || description == "")
                    return "A collection of " + this.count + " topic" + (this.count > 1 ? "s" : "") + ".";
            }
        },
        count: {
            get: function () {
                if (this.uri == null) return "Could not resolve URI.";
                var f = EcFramework.getBlocking(this.uri);
                if (f == null || f.competency == null)
                    return 0;
                return f.competency.length;
            }
        }
    },
    methods: {
        setFramework: function () {
            app.selectedFramework = EcFramework.getBlocking(this.uri);
            setTimeout(function () {
                $("#rad2").click();
            }, 100);
        }
    },
    template: '<li class="frameworkSelect tile" v-on:click="setFramework">' +
        '<span class="frameworkSelectName">{{ name }}</span> ({{ count }} topics)' +
        '<small v-if="description" class="frameworkSelectDescription block">{{ description }}</small>' +
        '</li>'
});
