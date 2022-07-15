const readConfig = require('../../config');

module.exports = async function getConfig() {
  const config = await readConfig();
  return config;
};
