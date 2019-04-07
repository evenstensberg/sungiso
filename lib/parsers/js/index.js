const j = require('jscodeshift');

module.exports = function(file, api) {
    file = file.toString();
    const ast = j(file);
    ast.find(j.ForStatement)
    .forEach(p => {
        
        // Flat for loop
        if(p.value.init.type !== "AssignmentExpression") {
            let initVar = j.variableDeclaration('var',
            [j.variableDeclarator(
              j.identifier('i'),
              null
            )]
          );
          p.parentPath.value.unshift(initVar);
          p.value.init = j.assignmentExpression('=', j.identifier('i'), j.literal(0))

          // lengthy boi
          if(p.value.test.right.property.name === "length") {
            let arrVar = j.variableDeclaration('var',[j.variableDeclarator(j.identifier('arrLength'),p.value.test.right)]);
            p.parentPath.value.unshift(arrVar);
            p.value.test.right = j.identifier('arrLength')
          }
           // arr.length > i dette er tydeligvis en greie.... æsj
          /* if(p.value.test.left.property.name === "length") {} */
        }

        // incomplete for loop
        if(p.value.init.type === "AssignmentExpression") {}
    });
    return ast.toSource();
}