const parser = require('angular-html-parser')

// becomes this AST:
module.exports = function(html) {
    return parser.parse(html);
}