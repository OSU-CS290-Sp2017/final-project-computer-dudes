const rq = require('request-promise-native');

function weatherglass(appUrl) {
  return (request, response, next) => {
    if (request.path !== '/track.gif') {
      rq({ uri: `${appUrl}/track.gif?site_id=weatherglass.com&resource=sites&title=&user_agent=` })
    }

    next();
  };
}

module.exports = weatherglass;
