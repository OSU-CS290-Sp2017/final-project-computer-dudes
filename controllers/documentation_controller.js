class DocumentationController {
  static async index(request, response) {
    response.render('documentation', {});
  }
}

module.exports = DocumentationController;
