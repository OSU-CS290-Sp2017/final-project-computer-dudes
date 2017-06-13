const ApplicationController = require('./application_controller.js');

class IndexController extends ApplicationController {
  static async index(request, response) {
    response.render('index/index', {});
  }
}

module.exports = IndexController;
