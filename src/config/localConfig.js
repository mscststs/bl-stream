const fs = require('fs');

function readFile(...params) {
  return new Promise((resolve, reject) => {
    fs.readFile(...params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

let conf = null;

module.exports = async function readConfig(filePath = './conf.json') {
  if (conf) {
    return conf;
  }
  try {
    conf = await readFile(filePath);
    conf = conf.toString();
    conf = JSON.parse(conf);
    console.log(`✔ Local Config > Success`);
  } catch (e) {
    console.log(`✖ Local Config > Failed`);
    console.error(`Read Local Config Failed ${filePath}`, e.message);
    return {};
  }

  return conf;
};
