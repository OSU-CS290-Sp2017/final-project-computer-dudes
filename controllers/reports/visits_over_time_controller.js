const VisitsPerMinuteQuery = require('../../queries/visits_per_minute_query.js');

class VisitsOverTimeController {
  static async index(request, response) {
    const siteId = request.params["siteId"];
    const interval = request.query["interval"];
    const range = request.query["range"];
  
    const visitsPerMinuteQuery = new VisitsPerMinuteQuery(request.app.pool);
  
    const report = await visitsPerMinuteQuery.run(siteId, range, interval);
  
    const results = {};
    report.forEach((r) => { results[r["interval"]] = r["count"]; });
    response.json(results);
  }
}

module.exports = VisitsOverTimeController;
