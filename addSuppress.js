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
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('./src');
let changed = 0;

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');

    // Add suppressHydrationWarning to <button if it doesn't already have it
    let newContent = content.replace(/<(button|motion\.button)(?![^>]*suppressHydrationWarning)/g, '<$1 suppressHydrationWarning');

    if (content !== newContent) {
        fs.writeFileSync(f, newContent);
        changed++;
    }
});

console.log(`Added suppressHydrationWarning to ${changed} files.`);
