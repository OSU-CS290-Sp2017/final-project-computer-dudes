const Repository = require('./repository.js');

const INSERT_SQL = `
  insert into sites (name) 
  values ($1) 
  returning *;
`;

const DESTROY_SQL = `
  delete from users_sites  
  where site_id = $1
`;

const INSERT_USERS_SITES_SQL = `
  insert into users_sites (user_id, site_id) 
  values ($1, $2) 
  returning *;
`

const FIND_SQL = `
  select *
  from sites
  where id = $1
`;

const WHERE_USER_ID_SQL = `
  select sites.*
  from sites
  left join users_sites on users_sites.site_id = sites.id
  where users_sites.user_id = $1
`;

class SiteRepository extends Repository {
  find(id) {
    return new Promise((resolve, reject) => {
      this.conn.query(FIND_SQL, [id], (err, results) => {
        if (err) reject(err);
        resolve(results.rows[0]);
      });
    });
  }

  whereUserId(id) {
    return new Promise((resolve, reject) => {
      this.conn.query(WHERE_USER_ID_SQL, [id], (err, results) => {
        if (err) reject(err);
        resolve(results.rows);
      });
    });
  }

  insert(name) {
    return new Promise((resolve, reject) => {
      this.conn.query(INSERT_SQL, [name], (err, results) => {
        if (err) reject(err);
        resolve(results.rows[0]);
      });
    });
  }

  insertUsersSites(userId, siteId) {
    return new Promise((resolve, reject) => {
      this.conn.query(INSERT_USERS_SITES_SQL, [userId, siteId], (err, results) => {
        if (err) reject(err);
        resolve(results.rows[0]);
      });
    });
  }

  destroy(id) {
    return new Promise((resolve, reject) => {
      this.conn.query(DESTROY_SQL, [id], (err, results) => {
        if (err) reject(err);
        resolve(results.rows[0]);
      });
    });
  }
}

module.exports = SiteRepository;
