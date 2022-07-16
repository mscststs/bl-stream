const fs = require('fs');
const path = require('path');
const compiler = require("../src/middleware/vueCompiler/compiler.js");


function getFileContent(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

(async ()=>{
  let source = getFileContent(path.join(__dirname, '../frontend/js/main.vue'));
  let val = await compiler(source);
  console.log(val)
})()