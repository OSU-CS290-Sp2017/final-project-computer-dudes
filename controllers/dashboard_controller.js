const SiteRepository = require('../repositories/site_repository.js');
const VisitRepository = require('../repositories/visit_repository.js');
const VisitsPerMinuteQuery = require('../queries/visits_per_minute_query.js');

class DashboardController {
  static async index(request, response) {
    const siteRepo = new SiteRepository(request.app.pool);
    const sites = await siteRepo.all();
  
    response.render('dashboard/index', {
      sites: sites,
    });
  };
  
  static async show(request, response) {
    const siteId = request.params["siteId"];
    const visitsPerMinuteQuery = new VisitsPerMinuteQuery(request.app.pool);
  
    const hourlyVisits = await visitsPerMinuteQuery.run(siteId, 'hour', 'minute');
    const dailyVisits = await visitsPerMinuteQuery.run(siteId, 'day', 'hour');
  
    response.render('dashboard/show', {
      siteId: siteId,
      hourlyVisits: JSON.stringify(hourlyVisits),
      dailyVisits: JSON.stringify(dailyVisits),
    });
  };
}

module.exports = DashboardController;
