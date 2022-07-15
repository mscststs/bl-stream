const getConfig = require('./config');


module.exports = async function (ctx, next) {
  ctx.config = await getConfig(ctx);

  await next(); // 中间件处理
};
