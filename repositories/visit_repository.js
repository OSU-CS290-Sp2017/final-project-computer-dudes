const Repository = require('./repository.js');

const VISITS_ALL_SQL = 'SELECT * FROM visits';
const VISIT_CREATE_SQL = `
  insert into visits 
  (site_id, resource, referrer, title, user_agent) 
  values ($1, $2, $3, $4, $5)
`;

class VisitRepository extends Repository {
  all() {
    return new Promise((resolve, reject) => {
      this.conn.query(VISITS_ALL_SQL, (err, results) => {
        if (err) reject(err);
        resolve(results.rows);
      });
    });
  }

  create(visit) {
    let params = [
      visit.site_id, 
      visit.resource, 
      visit.referrer, 
      visit.title, 
      visit.user_agent, 
    ]; 
 
    return new Promise((resolve, reject) => {
      this.conn.query(VISIT_CREATE_SQL, params, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = VisitRepository;
