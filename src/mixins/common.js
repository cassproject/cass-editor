export default {
    methods: {
        spitEvent: function(message, id, page) {
            var evt = {
                message: message,
                changed: id,
                selectedFramework: this.framework == null ? null : this.framework.shortId(),
                selectedCompetency: this.selectedCompetency == null ? null : this.selectedCompetency.shortId(),
                selectedFrameworkObject: this.framework == null ? null : JSON.parse(this.framework.toJson()),
                selectedCompetencyObject: this.selectedCompetency == null ? null : JSON.parse(this.selectedCompetency.toJson()),
                selectedFrameworkName: this.framework == null ? null : (this.framework.getName == null ? this.framework["dcterms:title"] : this.framework.getName()),
                selectedCompetencyName: this.selectedCompetency == null ? null : (this.selectedCompetency.getName == null ? this.selectedCompetency["skos:prefLabel"] : this.selectedCompetency.getName()),
                visiblePage: page
            };
            /*if (queryParams.ceasnDataFields == "true") {
                if (framework != null)
                    if (framework.getGuid != null) {
                        if (framework.getGuid().startsWith("ce-"))
                            evt.selectedFrameworkCtid = framework == null ? null : framework.getGuid();
                        else if (framework.getGuid().matches("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$"))
                            evt.selectedFrameworkCtid = framework == null ? null : "ce-" + framework.getGuid();
                        else
                            evt.selectedFrameworkCtid = "ce-" + new UUID(3, "nil", framework.shortId()).format();
        
                    }
                if (selectedCompetency != null)
                    if (selectedCompetency.getGuid != null) {
                        if (selectedCompetency.getGuid().startsWith("ce-"))
                            evt.selectedCompetencyCtid = selectedCompetency == null ? null : selectedCompetency.getGuid();
                        else if (selectedCompetency.getGuid().matches("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$"))
                            evt.selectedCompetencyCtid = selectedCompetency == null ? null : "ce-" + selectedCompetency.getGuid();
                        else
                            evt.selectedCompetencyCtid = "ce-" + new UUID(3, "nil", framework.shortId() + selectedCompetency.shortId()).format();
                    }
            }*/
            console.log(evt);
            /*if (parent != null)
                if (queryParams.origin != null && queryParams.origin != '')
                    parent.postMessage(evt, queryParams.origin);*/
        }
    }
};