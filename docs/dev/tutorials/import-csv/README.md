# Import CSV

Importing competencies from a CSV is a good way of showing how an application would use CaSS.

For each row of the CSV file, we'll generate a Competency object. This pattern may be extrapolated out to SQL based tables or any other relational import.

This example uses [PapaParse](http://papaparse.com/), a JavaScript CSV tool, for easier iteration over the CSV.

```js
var f = new EcFramework();
f.generateId("https://dev.cassproject.org/api/");
f.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());

Papa.parse(
    file,

    {
        // Once entire file is read...
        complete: function (results) {
            // Get resulting array
            var data = results.data;
            if (data.length === undefined || data.length == 0) {
                alert("Invalid CSV");
                return;
            }

            // Column indices
            var nameIndex = 1;
            var descriptionIndex = 2;
            var scopeIndex = null;
            var idIndex = 0;

            for (var i = 0; i < data.length; i++) {
                // Create a new competency
                var c = new EcCompetency();

                // Skip invalid names
                if (data[i][nameIndex] === undefined || data[i][nameIndex] == "")
                continue;

                // Populate the object
                if (nameIndex != null) c.name = data[i][nameIndex];
                if (descriptionIndex != null) c.description = data[i][descriptionIndex];
                if (scopeIndex != null) c.scope = data[i][scopeIndex];

                // If we have an existing ID, use it. Otherwise, generate one
                var shortId = null;
                if (idIndex !== null) {
                    c.id = data[i][idIndex];
                    shortId = c.shortId();
                }
                if (idIndex !== null)
                    transformId(data[i][idIndex], c, repo.selectedServer);
                else
                    c.generateId(repo.selectedServer);

                // Add ourselves as an owner
                if (identity != null)
                    c.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());

                // Add the competency to the framework & save
                f.addCompetency(c.shortId());
                EcRepository.save(c,console.log,console.log);
            }

            // Save the framework to the repository
            EcRepository.save(f,console.log,console.log);
        }
    }
);
```