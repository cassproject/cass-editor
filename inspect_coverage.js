
const fs = require('fs');
const path = require('path');

const directoryPath = '.nyc_output';
const files = fs.readdirSync(directoryPath).filter(file => file.endsWith('.json'));

if (files.length === 0) {
    console.log("No JSON files found.");
} else {
    // Get the most recent file
    const latestFile = files.map(file => ({
        name: file,
        time: fs.statSync(path.join(directoryPath, file)).mtime.getTime()
    })).sort((a, b) => b.time - a.time)[0].name;

    console.log(`Inspecting ${latestFile}`);
    const content = JSON.parse(fs.readFileSync(path.join(directoryPath, latestFile), 'utf8'));
    const keys = Object.keys(content);
    console.log(`Total keys: ${keys.length}`);
    console.log("Sample keys:", keys.slice(0, 5));
    console.log("Vue files:", keys.filter(k => k.endsWith('.vue')));
}
