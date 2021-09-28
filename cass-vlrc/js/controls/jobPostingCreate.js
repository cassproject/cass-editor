Vue.component('jobPostingCreate', {
    props: [],
    data: function () {
        return {
            jobPostingObject: null,
            candidateRequirement: "",
            title: "New Position",
            description: "",
            additionalType: "jobPostingType://gig",
            skills: [],
            candidates: [],
        };
    },
    computed: {
        type: {
            get: function () {
                return this.additionalType;
            },
            set: function (newVal) {
                this.additionalType = newVal;
            }
        }
    },
    created: function () {
        this.jobPostingObject = new JobPosting();
        this.jobPostingObject.addOwner(EcPk.fromPem(app.me));
        var me = this;
        this.$nextTick(function () {
            $(".tags").autocomplete({
                source: function (request, response) {
                    EcCompetency.search(repo, request.term, function (competencies) {
                        var eah = new EcAsyncHelper();
                        eah.each(competencies, function (competency, callback) {
                            competency.label = competency.getName();
                            competency.value = competency.shortId();
                            EcFramework.search(repo, 'competency:"' + competency.getGuid() + '"',
                                function (frameworks) {
                                    if (frameworks.length > 0) competency.label += " (from " + frameworks[0].getName() + ")";
                                    callback();
                                }, callback);
                        }, function (competencies) {
                            response(competencies);
                        });
                    }, console.error, {
                        size: 20
                    });
                },
                select: function (event, ui) {
                    me.skills.push(ui.item.shortId());
                    me.candidateRequirement = "";
                }
            });
        });
    },
    methods: {
        saveNewPosting: function () {
            this.jobPostingObject.skills = this.skills;
            this.jobPostingObject.description = this.description;
            this.jobPostingObject.title = this.title;
            this.jobPostingObject.additionalType = this.additionalType;
            this.jobPostingObject.generateId(repo.selectedServer);
            var jobPosting = this.jobPostingObject;
            EcRepository.save(this.jobPostingObject, function () {
                app.jobPostings.unshift(jobPosting);
            }, console.error);
            this.skills = [];
            this.jobPostingObject = new JobPosting();
            this.title = "New Position";
            this.description = "New Position";
            this.additionalType = "jobPostingType://gig";
            this.jobPostingObject.addOwner(EcPk.fromPem(app.me));
        },
        removeRequirement: function (index) {
            this.skills.splice(index, 1);
        },
        removeCandidate: function (index) {
            this.candidates.splice(index, 1);
        },
        readFromClipboard: function () {
            var me = this;
            navigator.clipboard.readText()
                .then(text => {
                    console.log('Pasted content: ', text);
                    var lines = text.split(/\r?\n/);
                    var first = true;
                    var title = "";
                    var description = "";
                    me.candidates = [];
                    for (var i = 0; i < lines.length; i++) {
                        var line = lines[i].trim().replace(/	/g, "");
                        if (line == "") continue;
                        if (first) {
                            me.title = line;
                            first = false;
                        } else {
                            if (line.endsWith(":"))
                                ;
                            else if (line.startsWith("•") || line.startsWith("-") || line.startsWith("*"))
                                me.candidates.push(line.substring(1));
                            else
                                description += "\n" + line;
                        }
                        description = description.trim();
                    }
                    me.description = description;
                    app.$nextTick(function () {
                        $(".autoSuggest").autocomplete({
                            source: function (request, response) {
                                EcRepository.unsigned = true;
                                EcCompetency.search(repo, request.term, function (competencies) {
                                    var eah = new EcAsyncHelper();
                                    eah.each(competencies, function (competency, callback) {
                                        competency.label = competency.getName();
                                        competency.value = competency.shortId();
                                        EcFramework.search(repo, 'competency:"' + competency.getGuid() + '"',
                                            function (frameworks) {
                                                if (frameworks.length > 0) competency.label += " (from " + frameworks[0].getName() + ")";
                                                callback();
                                            }, callback);
                                    }, function (competencies) {
                                        competencies.unshift({
                                            label: " ---------- Add this as a new competency. ---------- ",
                                            value: "ADD"
                                        });
                                        response(competencies);
                                    });
                                }, console.error, {
                                    size: 20,
                                    sort: JSON.stringify([{
                                        "_score": "desc"
                                    }])
                                });
                                EcRepository.unsigned = false;
                            },
                            select: function (event, ui) {
                                var after = function () {
                                    me.skills.push(ui.item.shortId());
                                    var iam = $(event.target)[0];
                                    $(".autoSuggest").each(function (index) {
                                        if (this == iam)
                                            me.candidates.splice(index, 1);
                                    });
                                    me.$nextTick(function () {
                                        $(".autoSuggest").first().autocomplete('search');
                                    });
                                }
                                if (ui.item.value == "ADD") {
                                    var c = new EcCompetency();
                                    c.addOwner(EcPk.fromPem(app.me));
                                    c.name = $(event.target).val().trim();
                                    c.generateId(repo.selectedServer);
                                    ui.item = c;
                                    EcRepository.save(c, after, console.error);
                                    return;
                                }
                                after();
                            }
                        });
                        $(".autoSuggest").first().autocomplete('search');
                    });
                });
        }
    },
    template: '<div class="jobPostingCreate"><hr><h3>New Posting</h3>' +
    '<select v-model="type">' +
    '<option value="jobPostingType://gig">Gig</option>' +
    '<option value="jobPostingType://job">Job</option>' +
    '<option value="jobPostingType://position">Position</option>' +
    '<option value="jobPostingType://temp">Temporary Position</option>' +
    '</select>' +
    '<input type="text" placeholder="Position, Job or Gig Title." id="jobPostingCreateTitle" v-model="title"/>' +
    '<textarea placeholder="Position, Job or Gig Description." id="jobPostingCreateDescription" v-model="description"/>' +
    '<h4 v-if="skills != null && skills.length > 0">An applicant for this job should be able to:</h4>' +
    '<ul><div v-for="(item,index) in skills" :key="item"><button v-on:click="removeRequirement(index);">Remove</button><competency :uri="item" :parentCompetent="true"/></div></ul>' +
    '<ul><div v-for="(item,index) in candidates"><button v-on:click="removeCandidate(index);">Remove</button><input :value="item" class="autoSuggest" /></div></ul>' +
    '<label for="tags">Add Requirements: </label><input type="text" class="tags" v-model="candidateRequirement">' +
    '<button v-on:click="saveNewPosting">Create New Posting</button><button v-on:click="readFromClipboard">Read from Clipboard</button>' +
    '</div>'
});
