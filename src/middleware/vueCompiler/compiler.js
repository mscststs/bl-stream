const sfcCompiler = require("@vue/compiler-sfc")
const {rewriteDefault} = sfcCompiler
const less = require("less")

module.exports = async function (source, hash){
  const styleId = `_style_${hash}`
  let {descriptor} = sfcCompiler.parse(source);
  /**
   * descriptor:{
   *  script: {
   *   content: '',
   *   type: '',
   * },
   */
  let script = descriptor.script;
  let template = descriptor.template;
  let styles = descriptor.styles;

  if(styles.find(item => item.type === 'less')){
    //Less Compiler
    await Promise.all(styles.map(async(item)=>{
      if(item.lang === 'less'){
        let {content} = item;
        let {css} = await less.render(content);
        item.content = css;
      }
    }))
  }


  let main = rewriteDefault(script.content, "_main_", []);
  let result = `
${main}
const _styleContents = ${JSON.stringify(
  styles.map(item => item.content).join("\n")
)}
`;
if(hash){
  result += `
!(()=>{
  const rawStyle = document.getElementById("${styleId}");
  if(rawStyle){
    rawStyle.textContent = _styleContents;
  }else{
    let style = document.createElement('style');
    ${hash ? `style.id = "${styleId}";` : ""}
    style.textContent = _styleContents;
    document.head.appendChild(style);
  }
})();
`
}else{
  result += `
!(()=>{
  let style = document.createElement('style');
  style.textContent = _styleContents;
  document.head.appendChild(style);
})();
`
}
result += `
export default {
  ..._main_,
  template: ${JSON.stringify(template.content)},
}`

  return result;
}