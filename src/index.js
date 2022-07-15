const http = require('http');
const createApp = require('./app');
const readConfig = require('./config');

const servers = [];

async function init() {
  // 初始化配置文件，开启服务器
  const config = await readConfig();
  // 检查 http server
  try {
    const httpServer = http.createServer(createApp(config));
    httpServer.listen(config.http.port);
    servers.push(httpServer);
    console.log(`|- HTTP Server Started : ${config.http.port}`);
  } catch (e) {
    console.error('|- HTTP Server Init Failed', e.message);
  }
}

module.exports = init;
