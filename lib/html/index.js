const fs = require('fs');
const path = require('path');
const recursiveFind = require('../utils/recursivefind');
const JSparser = require('../parsers/js/index');
const HTMLparser = require('../parsers/html/index');
const pretty = require('prettier');
const attris = require('./rules/js/remove-extra-attributes');
const attris2 = require('./rules/php/remove-extra-attributes');
const HTMLrules = {
    attris
};

function getAbs(p) {
    return path.join(process.cwd(), p);
}

module.exports = function(options) {
    const dirPath = options.src;
    const list = ['html', 'php', 'js', 'jsx'].map(ext => {
        const sub = recursiveFind(dirPath, ext);
        if(sub && sub.length) {
            sub.forEach(p => {
                const absPath = getAbs(p);
                if(ext === 'html') {
                    const contents = fs.readFileSync(absPath, 'utf8');
                    const fileName = path.basename(absPath);
                    let content = attris(contents);
                    console.log("after", content)
                    process.exit(0)
                    const newPath = path.join(__dirname, '..', '..', 'test', '__fixtures__', fileName);
                    fs.writeFileSync(newPath, content, 'utf8');
                } else if(ext === 'php') {
                /*     const fileName = path.basename(absPath);
                    const contents = fs.readFileSync(absPath, 'utf8');
                    const content = attris2(contents);
                    const newPath = path.join(__dirname, '..', '..', 'test', fileName); */
                    /* fs.writeFileSync(newPath, content, 'utf8'); */
                } else if(ext === 'js') {
                    //const ast = JSparser(fs.readFileSync(absPath));
                    //process.exit(0);
                } else if(ext === 'jsx') {
    
                }
              })
        }
        return sub;
    }).filter(e => e && e.length > 0);
}