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

const Node = require('../../../utils/ast');

const parser = require('../../../parsers/html/index');

const removeTypes = node => {
    if(node.name === 'head') {
        node.children.forEach(child => {
            if(child.name === 'style') {
                if(child.attrs) {
                   child.attrs = child.attrs.filter( attr => {
                       return attr.name !== 'type' 
                   })
                }

            }
        })
    }
    return node;
}

const addTypes = node => {
    if(node instanceof Attribute) {
        node.type = "attribute";
    } else if(node instanceof Comment) {
        node.type = "comment";
    } else if(node instanceof Element){
        node.type = "element";
    } else if(node instanceof Text) {
        node.type = "text";
    } else if(node instanceof DocType) {
        node.type = "docType"
    } else {
      throw new Error(`Unexpected node ${JSON.stringify(node)}`);
    }
}
function traverseAndBuild(node) {
    let attris = ''
    if(node.attrs && node.attrs.length > 0) {
        node.attrs.forEach(child => {
            attris += traverseAndBuild(child);
        });
    }
    let childContent = '';
    if(node.children && node.children.length > 0) {
        node.children.forEach( child => {
            childContent += traverseAndBuild(child);
        });
    }

    if(node.type === "attribute") {
         node.content = `${node.name}='${node.value}'`
         return node.content;
    } else if(node.type === "comment") {
        node.content = `<!-- ${node.value} -->`;
        return node.content;
    } else if(node.type === "element"){
        if(attris && !childContent) {
            node.content = `<${node.name} ${attris}></${node.name}>`;
            return node.content;
        }
        else if(attris && childContent) {
            node.content = `<${node.name} ${attris}>${childContent}</${node.name}>`;
            return node.content;
        } else if(!attris && childContent) {
            node.content = `<${node.name}>${childContent}</${node.name}>`;
            return node.content;
        }
    } else if(node.type === "text") {
        node.content = node.value;
        return node.content;
    } else if(node.type === "docType") {
        node.content = "<!DOCTYPE " + node.value + ">";
        return node.content;
    }
    if(node.type === "root") {
        let s = '';
        node.children.forEach(c => {
            s += c.content
        });
        return s;
    }
    return node.content;
}

function parse(input) {
    const { rootNodes } = parser(input);
    visitAll(
        new class extends RecursiveVisitor {
          visit(node) {
            removeTypes(node)
            addTypes(node);
          }
        }(),
        rootNodes
      );
    return rootNodes;
}
module.exports = function(input) {
    const rawAst = {
        type: "root",
        sourceSpan: { start: { offset: 0 }, end: { offset: input.length } },
        children: parse(input)
      };
    const newNode = new Node(rawAst);
    let string = traverseAndBuild(newNode);
    console.log(string);
    process.exit(0)
    return string;
}