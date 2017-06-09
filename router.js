const DashboardController = require('./controllers/dashboard_controller.js');
const DocumentationController = require('./controllers/documentation_controller.js');
const PixelController = require('./controllers/pixel_controller.js');
const VisitsOverTimeController = require('./controllers/reports/visits_over_time_controller.js');
const SessionsController = require('./controllers/sessions_controller.js');
const RegistrationsController = require('./controllers/registrations_controller.js');


function router(app) {
  app.get('/', DashboardController.index);
  app.get('/sites/:siteId', DashboardController.show);
  app.get('/sites/:siteId/reports/visits_over_time', VisitsOverTimeController.index);
  app.get('/documentation', DocumentationController.index);
  app.get('/track.gif', PixelController.create);
  app.get('/signup', RegistrationsController.create);
  app.post('/signup', RegistrationsController.store);
  app.get('/login', SessionsController.create);
  app.post('/login', SessionsController.store);
  app.get('/logout', SessionsController.destroy);
}

module.exports = router;
