const SitesController = require('./controllers/sites_controller.js');
const DocumentationController = require('./controllers/documentation_controller.js');
const PixelController = require('./controllers/pixel_controller.js');
const VisitsOverTimeController = require('./controllers/reports/visits_over_time_controller.js');
const SessionsController = require('./controllers/sessions_controller.js');
const RegistrationsController = require('./controllers/registrations_controller.js');
const IndexController = require('./controllers/index_controller.js');
const require_authentication = require('./middleware/require_authentication.js');

function router(app) {
  app.get('/sites', require_authentication(), SitesController.index);
  app.post('/sites', require_authentication(), SitesController.store);
  app.get('/sites/new', require_authentication(), SitesController.create);
  app.get('/sites/:siteId/delete', require_authentication(), SitesController.destroy);
  app.get('/sites/:siteId', require_authentication(), SitesController.show);

  app.get('/sites/:siteId/reports/visits_over_time', require_authentication(), VisitsOverTimeController.index);

  app.get('/documentation', DocumentationController.index);
  app.get('/track.gif', PixelController.create);
  app.get('/signup', RegistrationsController.create);
  app.post('/signup', RegistrationsController.store);
  app.get('/login', SessionsController.create);
  app.post('/login', SessionsController.store);
  app.get('/logout', SessionsController.destroy);

  app.get('/', IndexController.index);
}

module.exports = router;
