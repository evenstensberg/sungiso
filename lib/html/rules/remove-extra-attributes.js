const {
    RecursiveVisitor,
    visitAll,
    Attribute,
    CDATA,
    Comment,
    DocType,
    Element,
    Text
  } = require("angular-html-parser/lib/compiler/src/ml_parser/ast");
  const {
    ParseSourceSpan
  } = require("angular-html-parser/lib/compiler/src/parse_util");
  const {
    getHtmlTagDefinition
  } = require("angular-html-parser/lib/compiler/src/ml_parser/html_tags");

  const parser = require('../../parsers/html/index');

const removeTypes = node => {
    if(node.name === 'head') {
        node.children.forEach(child => {
            if(child.name === 'style') {
                if(child.attrs) {
                   child.attrs.forEach( attr => {
                       if(attr.name === 'type') {
                           attr.value = "9";
                           
                       }
                   })
                }

            }
        })
    }
    return node;
}


module.exports = function(input) {
    const { rootNodes } = parser(input);
    visitAll(
        new class extends RecursiveVisitor {
          visit(node) {
            return removeTypes(node);
          }
        }(),
        rootNodes
      );
    return rootNodes[2].sourceSpan.end.file.content
}