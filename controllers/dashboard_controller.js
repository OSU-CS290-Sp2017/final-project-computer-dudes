const SiteRepository = require('../repositories/site_repository.js');
const VisitRepository = require('../repositories/visit_repository.js');
const VisitsPerMinuteQuery = require('../queries/visits_per_minute_query.js');

class DashboardController {
}

DashboardController.index = (request, response) => {
  const sites = new SiteRepository(request.app.pool).all();

  Promise.all([sites]).then(values => {
    response.render('dashboard/index', {
      sites: values[0], 
    });
  });
};

DashboardController.show = (request, response) => {
  const siteId = request.params["siteId"];

  const hourlyVisits = new VisitsPerMinuteQuery(request.app.pool).run(siteId, 'hour', 'minute');
  const dailyVisits = new VisitsPerMinuteQuery(request.app.pool).run(siteId, 'day', 'hour');

  Promise.all([hourlyVisits, dailyVisits]).then(values => {
    response.render('dashboard/show', {
      siteId: siteId,
      hourlyVisits: JSON.stringify(values[0]),
      dailyVisits: JSON.stringify(values[1]),
    });
  });
};

module.exports = DashboardController;
