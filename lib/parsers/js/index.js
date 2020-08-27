const acorn = require('acorn');
const treeWalker = require('./tree-walker');

module.exports = function(file, api={}) {
    const ast = acorn.parse(file.toString(), api);
    treeWalker(ast);
    return ast;
}