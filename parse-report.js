const fs = require('fs');

try {
    const raw = fs.readFileSync('playwright-report.json', 'utf-8');
    const report = JSON.parse(raw);

    const failedTests = [];

    // Helper to traverse
    function checkSuites(suites) {
        if (!suites) return;
        for (const suite of suites) {
            if (suite.specs) {
                for (const spec of suite.specs) {
                    const isFailed = spec.tests.some(t => {
                        return t.results.some(r => r.status !== 'passed' && r.status !== 'skipped');
                    });
                    if (isFailed) {
                        failedTests.push({ file: spec.file, title: spec.title });
                    }
                }
            }
            checkSuites(suite.suites);
        }
    }

    checkSuites(report.suites);

    if (failedTests.length > 0) {
        console.log("FAILURES FOUND:");
        console.log(JSON.stringify(failedTests, null, 2));
    } else {
        console.log("ALL TESTS PASSED OR NO FAILURES DETECTED IN REPORT.");
    }
} catch (e) {
    console.error("Error reading or parsing report:", e.message);
}
