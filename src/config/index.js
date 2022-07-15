const localConfigReader = require("./localConfig");


let rawConfig = null;

module.exports = async function () {
  if (rawConfig) {
    return rawConfig;
  }
  const [tafConfig, rainbowConfig, localConfig] = await Promise.all([
    localConfigReader("./conf.json")
  ]);
  rawConfig = Object.assign({}, tafConfig, rainbowConfig, localConfig);

  const host = process.env.HOST || process.env.IP || rawConfig.http.host || '127.0.0.1';
  const port = process.env.PORT || rawConfig.http.port || 8888;
  
  rawConfig.http = {
    host,
    port
  }; // 使用 process.env 覆写

  return rawConfig;
};
