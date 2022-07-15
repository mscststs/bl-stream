const Controller = require('../../template/controller');

module.exports = class extends Controller {

  async log() {
    this.logger.log('LOG BY Interface------------');
    return 'OK';
  }

  async info(params, body, query) {
    const request = this.ctx.request;
    return {
      request,
      query,
      body
    };
  }

  async config() {
    return this.ctx.config;
  }

  async env() {
    return {
      "ctx.env": this.ctx.env,
      "process.env": process.env,
    };
  }
};
