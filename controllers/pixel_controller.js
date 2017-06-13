const ApplicationController = require('./application_controller.js');
const VisitRepository = require('../repositories/visit_repository.js');

class PixelController extends ApplicationController {
  static async create(request, response) {
    const visitRepo = new VisitRepository(request.app.pool);

    const visit = {
      site_id: request.query.site_id,
      resource: request.query.resource,
      referrer: request.query.referrer,
      title: request.query.title,
      user_agent: request.query.user_agent,
    }

    const result = await visitRepo.create(visit);
    response.sendStatus(200);
  }
}

module.exports = PixelController;
