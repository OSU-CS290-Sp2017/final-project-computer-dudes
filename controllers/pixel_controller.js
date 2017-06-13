const VisitRepository = require('../repositories/visit_repository.js');

class PixelController {
}

PixelController.create = async (request, response) => {
  const visitRepo = new VisitRepository(request.app.pool);

  const visit = {
    site_id: request.query.site_id,
    resource: request.query.resource,
    referrer: request.query.referrer,
    title: request.query.title,
    user_agent: request.query.user_agent,
  }

  const result = await visitRepo.create(visit);
  response.send(200);
}

module.exports = PixelController;
