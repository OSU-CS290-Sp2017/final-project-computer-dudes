const express = require('express'); 
const pg = require('pg');
const handlebars = require('express-handlebars');
const morgan = require('morgan');
const url = require('url');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const PostgresSessionStore = require('connect-pg-simple')(session);
const flash = require('connect-flash');

const weatherglass = require('./middleware/weatherglass.js');
const router = require('./router.js');

const app = express();
const port = process.env.PORT || 5000;
const appUrl = process.env.APP_URL || `http://localhost:${port}`;
const databaseUrl = process.env.DATABASE_URL || "postgres://jonahgeorge:@localhost/weatherglass_development";
const params = url.parse(databaseUrl);
const auth = params.auth.split(':');

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.pool = new pg.Pool({
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  max: 10,
  idleTimeoutMillis: 30000,
});

app.use(cors());
app.use(express.static('public'))
app.use(morgan('combined'));
app.use(weatherglass(appUrl));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'keyboardcat',
  store: new PostgresSessionStore({pool: app.pool, tableNames: 'sessions'})
}));
app.use(flash());
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

router(app);

app.listen(port, () => {
  console.log('Listening on ' + port);
});

