const path = require('path')
const fs = require('fs');
let envType = process.env.ENV_TYPE;

let content = `let env = "${envType}";
export default env;`;
fs.writeFile('./src/config/env.js',content,function(err){
    if(err){
        throw err;
    }
});