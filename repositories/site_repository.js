const Repository = require('./repository.js');

const SITES_ALL_SQL = 'SELECT DISTINCT site_id FROM visits';

class SiteRepository extends Repository {
  all() {
    return new Promise((resolve, reject) => {
      this.conn.query(SITES_ALL_SQL, (err, results) => {
        if (err) reject(err);
        resolve(results.rows);
      });
    });
  }
}

module.exports = SiteRepository;
