const path = require('path')
const fs = require('fs')

module.exports = function recFindByExt(base,ext,files,result) 
{
    files = files || fs.readdirSync(base);
    result = result || [] 

    files.forEach( 
        function (file) {
            let newbase = path.join(base,file)
            if ( fs.statSync(newbase).isDirectory() )
            {
                result = recFindByExt(newbase,ext,fs.readdirSync(newbase),result)
            }
            else
            {
                if ( file.substr(-1*(ext.length+1)) == '.' + ext )
                {
                    result.push(newbase)
                } 
            }
        }
    )
    return result
}