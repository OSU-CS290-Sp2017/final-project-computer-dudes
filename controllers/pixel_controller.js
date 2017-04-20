const VisitRepository = require('../repositories/visit_repository.js');

class PixelController {
}

PixelController.create = (request, response) => {
  const repo = new VisitRepository(request.app.pool);

  const visit = {
    site_id: request.query.site_id,
    resource: request.query.resource,
    referrer: request.query.referrer,
    title: request.query.title,
    user_agent: request.query.user_agent,
  }

  repo.create(visit).then(results => response.send(200));
}

module.exports = PixelController;
