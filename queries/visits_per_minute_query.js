const Query = require('./query.js');

const VISITS_PER_MINUTE_SQL= `
with timeslices as (
  select
    minute,
    0 as blank_count
  from generate_series(
    date_trunc('hour', (current_timestamp at time zone 'utc'))::timestamp,
    (current_timestamp at time zone 'utc')::timestamp, '1 minute'
  ) as minute
)
select
  timeslices.minute as minute,
  coalesce(visits_per_minute.count, timeslices.blank_count) as count
from timeslices
left outer join (
  select
    date_trunc('minute', timestamp) as minute,
    count(*) as count
  from visits
  group by minute
) as visits_per_minute on visits_per_minute.minute = timeslices.minute
order by timeslices.minute
`;

class VisitsPerMinuteQuery extends Query {
  run() {
    return new Promise((resolve, reject) => {
      this.conn.query(VISITS_PER_MINUTE_SQL, (err, results) => {
        if (err) reject(err);
        resolve(results.rows);
      });
    });
  }
}

module.exports = VisitsPerMinuteQuery;
