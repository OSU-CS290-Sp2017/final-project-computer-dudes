const ApplicationController = require('./application_controller.js');

class DocumentationController extends ApplicationController {
  static async index(request, response) {
    response.render('documentation', {});
  }
}

module.exports = DocumentationController;
