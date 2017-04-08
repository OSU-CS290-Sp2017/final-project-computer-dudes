const express = require('express');
const pg = require('pg');
const handlebars = require('express-handlebars');
const morgan = require('morgan');

const DashboardController = require('./controllers/dashboard_controller.js');
const DocumentationController = require('./controllers/documentation_controller.js');
const TestController = require('./controllers/test_controller.js');
const PixelController = require('./controllers/pixel_controller.js');

const app = express();

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'))
app.use(morgan('combined'));

app.pool = new pg.Pool({
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, 
  max: 10,
  idleTimeoutMillis: 30000,
});

app.get('/', DashboardController.index);
app.get('/documentation', DocumentationController.index);
app.get('/test', TestController.index);
app.get('/track.gif', PixelController.create);

app.listen(5000, () => {
  console.log('Listening on 5000');
});
