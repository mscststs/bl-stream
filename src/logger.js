const log4js = require('log4js');
const NODE_ENV = process.env.NODE_ENV || 'prod';


// 根据环境设置输出日志设置
const FILEPATH = "/usr/local/APPLOG/ACCESS";
const APPENDER = NODE_ENV === 'dev' ? ['console'] : ['data_file', 'console'];

log4js.configure({
  appenders: {
    console: { // 记录器1:输出到控制台
      type: 'console',
      layout: {
        type: "pattern",
        pattern: "%d{yyyy-MM-dd hh:mm:ss}|%p|%c|%m"
      }
    },
    data_file: { // ：记录器2：输出到日期文件
      type: "dateFile",
      filename: FILEPATH, // 您要写入日志文件的路径
      alwaysIncludePattern: true, // （默认为false） - 将模式包含在当前日志文件的名称以及备份中
      daysToKeep: 30,
      pattern: "_yyyyMMdd.log",
      encoding: 'utf-8', // default "utf-8"，文件的编码
      layout: {
        type: "pattern",
        pattern: "%d{yyyy-MM-dd hh:mm:ss}|%p|%c|%m"
      }
    },

  },
  categories: {
    default: {
      appenders: APPENDER,
      level: 'all'
    },
  }

});


module.exports = log4js.getLogger('trace');
