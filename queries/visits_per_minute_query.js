const Query = require('./query.js');

const VISITS_PER_MINUTE_SQL= `
with timeslices as (
  select
    interval,
    0 as blank_count
  from generate_series(
    date_trunc($2, (current_timestamp at time zone 'utc'))::timestamp,
    (current_timestamp at time zone 'utc')::timestamp, 
    $4
  ) as interval
)
select
  timeslices.interval as interval,
  coalesce(visits_per_interval.count, timeslices.blank_count) as count
from timeslices
left outer join (
  select
    date_trunc($3, timestamp) as interval,
    count(*) as count
  from visits
  where site_id = $1
  group by interval
) as visits_per_interval on visits_per_interval.interval = timeslices.interval
order by timeslices.interval
`;

class VisitsPerMinuteQuery extends Query {
  run(siteId, range, interval) {
    return new Promise((resolve, reject) => {
      let params = [
        siteId,
        range, 
        interval, 
        '1 ' + interval
      ];

      this.conn.query(VISITS_PER_MINUTE_SQL, params, (err, results) => {
        if (err) reject(err);
        resolve(results.rows);
      });
    });
  }
}

module.exports = VisitsPerMinuteQuery;
