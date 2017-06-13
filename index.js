const express = require('express');
const pg = require('pg');
const handlebars = require('express-handlebars');
const morgan = require('morgan');
const url = require('url');
const cors = require('cors');

const DashboardController = require('./controllers/dashboard_controller.js');
const DocumentationController = require('./controllers/documentation_controller.js');
const TestController = require('./controllers/test_controller.js');
const PixelController = require('./controllers/pixel_controller.js');
const VisitsOverTimeController = require('./controllers/reports/visits_over_time_controller.js');

const app = express();

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(cors());
app.use(express.static('public'))
app.use(morgan('combined'));

const port = process.env.PORT || 5000;
const params = url.parse(process.env.DATABASE_URL || "postgres://jonahgeorge:@localhost/weatherglass_development");
const auth = params.auth.split(':');

app.pool = new pg.Pool({
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  max: 10,
  idleTimeoutMillis: 30000,
});

app.get('/', DashboardController.index);
app.get('/sites/:siteId', DashboardController.show);
app.get('/sites/:siteId/reports/visits_over_time', VisitsOverTimeController.index);
app.get('/documentation', DocumentationController.index);
app.get('/test', TestController.index);
app.get('/track.gif', PixelController.create);

app.listen(port, () => {
  console.log('Listening on ' + port);
});
