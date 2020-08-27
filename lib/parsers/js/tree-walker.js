const acorn = require("acorn")
const walk = require("acorn-walk")

module.exports = function(ast) {
    walk.simple(ast, {
        Literal(node) {
          console.log(`Found a literal: ${node.value}`)
        }
      })
}