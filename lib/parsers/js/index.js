const acorn = require('acorn')

module.exports = function(file, api) {
    const ast = acorn.parse(file.toString());
    console.log(ast)
}