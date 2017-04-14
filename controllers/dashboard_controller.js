const VisitRepository = require('../repositories/visit_repository.js');
const VisitsPerMinuteQuery = require('../queries/visits_per_minute_query.js');

class DashboardController {
}

DashboardController.index = (request, response) => {
  const hourlyVisits = new VisitsPerMinuteQuery(request.app.pool).run('hour', 'minute');
  const dailyVisits = new VisitsPerMinuteQuery(request.app.pool).run('day', 'hour');

  Promise.all([hourlyVisits, dailyVisits]).then(values => {
    response.render('dashboard', {
      hourlyVisits: JSON.stringify(values[0]),
      dailyVisits: JSON.stringify(values[1]),
    });
  });
};

module.exports = DashboardController;
