const PHPparser = require('../../../parsers/php/index');

module.exports = function(content) {
    const ast = PHPparser.parseCode(content, {
        parser: {
            debug: false, 
            locations: false,
            extractDoc: false,
            suppressErrors: false
          },
          lexer: {
            all_tokens: false,
            comment_tokens: false,
            mode_eval: false,
            asp_tags: false,
            short_tags: false
          }
    });
    let a = new RegExp()
    ast.children[0].value = ast.children[0].value.replace('type="text/javascript"', '')
    ast.children[0].value = ast.children[0].value.replace("asd.type = 'text/javascript';", '')
    ast.children[0].value = ast.children[0].value.replace('type="text/javascript"', '')
    return ast.children[0].value;
}