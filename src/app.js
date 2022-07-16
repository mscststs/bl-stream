const Koa = require('koa');
const cors = require('koa2-cors');
const compress = require('koa-compress')
const root = require('./router');
const addons = require('./addons/index.js');
const bodyParser = require('koa-bodyparser');
const koaStatic = require('koa-static');
const path = require('path');
const vueCompiler = require("./middleware/vueCompiler")


function createApp(config) {
  const app = new Koa();

  app.use(compress({
    threshold: 2048,
    gzip: {
      flush: require('zlib').constants.Z_SYNC_FLUSH
    },
    deflate: {
      flush: require('zlib').constants.Z_SYNC_FLUSH,
    },
    br: true // disable brotli
  }))

  // Vue SFC 解析
  app.use(vueCompiler(path.join(__dirname, '../frontend')));

  // 前端静态文件
  app.use(koaStatic(path.join(__dirname, '../frontend'),{
    maxage: 100000,
  }));

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
