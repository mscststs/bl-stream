const Koa = require('koa');
const cors = require('koa2-cors');
const root = require('./router');
const addons = require('./addons/index.js');
const bodyParser = require('koa-bodyparser');
const mount = require('koa-mount');
const koaStatic = require('koa-static');
const path = require('path');


function createApp(config) {
  const app = new Koa();

  // 前端静态文件
  app.use(mount("/", koaStatic(path.join(__dirname, '../frontend'))));

  if (config.prefix) {
    root.prefix(config.prefix || ""); // Set Prefix
  }

  app.use(cors({
    maxAge: 66666666,
    credentials: true,
    origin: function (ctx) {
      return ctx.header.origin;
    }
  }));

  app.use(bodyParser());

  app.use(addons); // 初始化逻辑

  app.use(root.routes()).use(root.allowedMethods()); // 路由

  return app.callback();
}

module.exports = createApp;
