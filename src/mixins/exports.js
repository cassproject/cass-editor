export default {
    methods: {
        exportAsn: function(link) {
            window.open(link.replace("/data/", "/asn/"), '_blank');
        },
        exportJsonld: function(link) {
            window.open(link, '_blank');
        },
        exportRdfQuads: function(link) {
            var fileName = this.framework.getName();
            var me = this;
            this.get(link, null, {"Accept": "text/n4"}, function(success) {
                me.download(fileName + ".n4", success);
            }, function(failure) {
                appLog(failure);
            });
        },
        exportRdfJson: function(link) {
            var fileName = this.framework.getName();
            var me = this;
            this.get(link, null, {"Accept": "application/rdf+json"}, function(success) {
                me.download(fileName + ".rdf.json", success);
            }, function(failure) {
                appLog(failure);
            });
        },
        exportRdfXml: function(link) {
            var fileName = this.framework.getName();
            var me = this;
            this.get(link, null, {"Accept": "application/rdf+xml"}, function(success) {
                me.download(fileName + ".rdf.xml", success);
            }, function(failure) {
                appLog(failure);
            });
        },
        exportTurtle: function(link) {
            var fileName = this.framework.getName();
            var me = this;
            this.get(link, null, {"Accept": "text/turtle"}, function(success) {
                me.download(fileName + ".turtle", success);
            }, function(failure) {
                appLog(failure);
            });
        },
        exportCtdlasnJsonld: function(link) {
            window.open(link.replace("/data/", "/ceasn/"), '_blank');
        },
        exportCtdlasnCsv: function(link) {
            var me = this;
            EcRemote.getExpectingString(link.replace("/data/", "/ceasn/"), null, function(success) {
                CSVExport.exportCTDLASN(JSON.parse(success), me.framework.getName());
            }, function(error) {
                appLog(error);
            });
        },
        exportCsv: function() {
            CSVExport.exportFramework(this.framework.id, appLog, appLog);
        },
        exportCasePackages: function(guid) {
            window.open(this.repo.selectedServer + "ims/case/v1p0/CFPackages/" + guid, '_blank');
        },
        exportCaseItems: function(guid) {
            window.open(this.repo.selectedServer + "ims/case/v1p0/CFItems/" + guid, '_blank');
        },
        download: function(fileName, data) {
            var blob = new Blob([data], {type: "text/plain;charset=utf-8"});
            saveAs(blob, fileName);
        }
    }
};