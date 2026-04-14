const fs = require('fs');
const path = require('path');

// Extract ALL store actions robustly
const storeDir = 'src/stores';
const validActions = new Set();

fs.readdirSync(storeDir).forEach(file => {
    if (!file.endsWith('.js')) return;
    const content = fs.readFileSync(path.join(storeDir, file), 'utf8');
    
    // Just find any action definition matching `setSomeProperty(` or `setSomeProperty:` across the entire file
    const regex = /(set[A-Z][a-zA-Z0-9_]*|import[A-Z][a-zA-Z0-9_]*|csv[A-Z][a-zA-Z0-9_]*|clear[a-zA-Z0-9_]*|[a-z]+Mode|addAnother|nodeInFocus|cutId|copyId|paste|addEditsToUndo)\s*(?:[(:]|:\s*function|:\s*\()/g;
    let m;
    while ((m = regex.exec(content)) !== null) {
        validActions.add(m[1]);
    }
});

console.log("Parsed actions:", Array.from(validActions).join(', '));

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else if (file.endsWith('.spec.js')) { 
            results.push(file);
        }
    });
    return results;
}

const files = walk('tests/e2e');
let piniaCount = 0;
let vueCount = 0;

const knownRenames = {
    'showSideNav': 'openSideNav',
    'showRightAside': 'openRightAside',
    'showModal': 'setShowModal'
};

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    let oldContent = content;

    // --- VUE 3 FIXES ---
    if (content.includes('__vue__')) {
        content = content.replace(/(\w+)\.__vue__\.(\w+)/g, '$1.__vueParentComponent.ctx.$2');
        content = content.replace(/(\w+)\.__vue__/g, '$1.__vueParentComponent');
        content = content.replace(/const vm = (\w+)\.__vueParentComponent;/g, 'const vm = $1.__vueParentComponent.ctx;');
        content = content.replace(/vm\.\$options\.name/g, '(vm.$options?.name || vm.__name)');
    }

    // --- PINIA FIXES ---
    if (content.includes('$store')) {
        content = content.replace(/window\.app && window\.app\.\$store/g, 'window.__stores');
        content = content.replace(/window\.app\.\$store/g, 'window.__stores');

        content = content.replace(/(\w+)\.getters\['(\w+)\/(\w+)'\]/g, '$1.$2.$3');
        content = content.replace(/(\w+)\.state\.(\w+)\.(\w+)/g, '$1.$2.$3');

        // Commits and dispatches
        const replaceStoreAction = (match, storeObj, mod, action, rest) => {
            let finalAction = action;

            if (knownRenames[action]) {
                finalAction = knownRenames[action];
            } else if (validActions.has(action)) {
                finalAction = action;
            } else {
                let capitalized = action.charAt(0).toUpperCase() + action.slice(1);
                if (validActions.has('set' + capitalized)) {
                    finalAction = 'set' + capitalized;
                } else if (action.startsWith('import') && validActions.has('setImport' + action.substring(6))) {
                    finalAction = 'setImport' + action.substring(6);
                } else if (action.startsWith('csv') && validActions.has('setCsv' + action.substring(3))) {
                    finalAction = 'setCsv' + action.substring(3);
                } else if (validActions.has('set' + action)) {
                    finalAction = 'set' + action;
                }
            }

            if (rest.trim().startsWith(',')) {
                let afterComma = rest.substring(rest.indexOf(',') + 1);
                return `${storeObj}.${mod}.${finalAction}(${afterComma}`;
            } else {
                return `${storeObj}.${mod}.${finalAction}()` + rest.substring(rest.indexOf(')') + 1);
            }
        };

        content = content.replace(/(\w+)\.commit\('(\w+)\/(\w+)'(.*)/g, replaceStoreAction);
        content = content.replace(/(\w+)\.dispatch\('(\w+)\/(\w+)'(.*)/g, replaceStoreAction);
    }

    if (content !== oldContent) {
        fs.writeFileSync(f, content);
        if (oldContent.includes('__vue__')) vueCount++;
        if (oldContent.includes('$store')) piniaCount++;
        console.log('Fixed', f);
    }
});

console.log(`Summary: Fixed ${vueCount} Vue files, ${piniaCount} Pinia files.`);
