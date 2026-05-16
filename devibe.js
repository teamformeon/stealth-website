const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css') || file.endsWith('.js') || file.endsWith('.html')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('./src');
files.push('./package.json', './README.md', './index.html'); // additional files

let modifiedCount = 0;

files.forEach(f => {
    if (!fs.existsSync(f)) return;

    let content = fs.readFileSync(f, 'utf8');

    let newContent = content
        // Name changes
        .replace(/\bStealth\b/g, 'Formeon')
        .replace(/\bstealth\b/g, 'formeon')

        // De-vibe aggressive gradients
        .replace(/bg-gradient-to-[a-z]+\s+from-[a-z0-9-]+\s+to-[a-z0-9-]+/g, 'bg-neutral-900')
        .replace(/bg-gradient-to-[a-z]+\s+from-[a-z0-9-]+\s+via-[a-z0-9-]+\s+to-[a-z0-9-]+/g, 'bg-neutral-900')
        .replace(/text-transparent\s+bg-clip-text\s+bg-gradient-to-[a-z]+\s+from-[a-z0-9-]+\s+to-[a-z0-9-]+/g, 'text-neutral-900')

        // Simplify shadows
        .replace(/shadow-\[0_0_.*?\]/g, 'shadow-sm')
        .replace(/shadow-2xl/g, 'shadow-md')
        .replace(/shadow-xl/g, 'shadow-sm')

        // Remove aggressive animations or blurs entirely
        .replace(/animate-pulse/g, '')
        .replace(/backdrop-blur-[a-z0-9-\[\]]+/g, '');

    if (content !== newContent) {
        fs.writeFileSync(f, newContent);
        modifiedCount++;
    }
});

console.log(`Modified ${modifiedCount} files for devibing and renaming.`);
