const fs = require('fs');
const path = require('path');
const recursiveFind = require('../utils/recursivefind');
const PHPparser = require('../parsers/php/index');
const JSparser = require('../parsers/js/index');
const HTMLparser = require('../parsers/html/index');
const pretty = require('prettier');
const attris = require('./rules/remove-extra-attributes');

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
                    // html opts
                    const contents = fs.readFileSync(absPath, 'utf8');
                    const fileName = path.basename(absPath);
                    let content = attris(contents);
                  /*   let content;
                    Object.keys(HTMLrules).forEach( rule => {
                        content = HTMLrules[rule](ast)
                    }); */
                    const newPath = path.join(__dirname, '..', '..', 'test', fileName);
                    fs.writeFileSync(newPath, content, 'utf8');
                    process.exit(0)
                } else if(ext === 'php') {
                          // parse php code and make it better with rulesSet
                // parser(absPath)
                //  process.exit(0)
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