class DocumentationController {
}

DocumentationController.index = (request, response) => {
  response.render('documentation', {});
}

module.exports = DocumentationController;
