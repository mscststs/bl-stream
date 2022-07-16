const hash = require('hash-sum');
const path = require('path');
const fs = require('fs/promises');
const parse = require("./compiler.js");

module.exports = function(rootPath, options){
  const cache = {};
  return async function(ctx, next){
    let filePath = ctx.path;
    if(!filePath.endsWith('.vue')){
      await next();
      return;
    }
    // 检查请求的文件是否和rootPath 匹配
    let targetPath = path.join(rootPath, filePath);
    try{
      if(cache[targetPath]){
        ctx.body = cache[targetPath];
        ctx.type = 'application/javascript';
      }else{
        // 读取文件内容
        let content = await fs.readFile(targetPath, 'utf8');
        if(content){
          const id = hash(targetPath + content);
          let result = await parse(content, id);
          cache[targetPath] = result;
          ctx.body = result;
          ctx.type = 'application/javascript';
        }else{
          await next();
        }
      }
    }catch(e){
      await next();
    }
  }
}