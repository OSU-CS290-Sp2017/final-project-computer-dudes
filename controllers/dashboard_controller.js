const VisitRepository = require('../repositories/visit_repository.js');
const VisitsPerMinuteQuery = require('../queries/visits_per_minute_query.js');

class DashboardController {
}

DashboardController.index = (request, response) => {
  const visits = new VisitRepository(request.app.pool).all();
  const data = new VisitsPerMinuteQuery(request.app.pool).run();

  Promise.all([data, visits]).then(values => {
    response.render('dashboard', {
      data: JSON.stringify(values[0]),
      visits: values[1],
    });
  });
};

module.exports = DashboardController;
