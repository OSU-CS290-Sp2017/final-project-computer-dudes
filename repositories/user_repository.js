const Repository = require('./repository.js');
const User = require('../models/user.js');

const FIND_SQL =
  "select * from users where id = $1";

const FIND_BY_EMAIL_AND_PASSWORD_SQL = 
  "select * from users where email = lower($1) and password_digest = crypt($2, password_digest)";

const INSERT_SQL = 
  "insert into users (name, email, password_digest) values ($1, lower($2), crypt($3, gen_salt('bf', 8))) returning *";

class UserRepository extends Repository {
  find(id) {
    return new Promise((resolve, reject) => {
      this.conn.query(FIND_SQL, [id], (err, results) => {
        if (err) reject(err);

        if (results.rows.length > 0) {
          resolve(results.rows[0]);
        } else {
          resolve(null);
        }
      });
    });
  }

  findByEmailAndPassword(email, password) {
    return new Promise((resolve, reject) => {
      this.conn.query(FIND_BY_EMAIL_AND_PASSWORD_SQL, [email, password], (err, results) => {
        if (err) reject(err);

        if (results.rows.length > 0) {
          resolve(results.rows[0]);
        } else {
          resolve(null);
        }
      });
    });
  }

  insert(name, email, password) {
    return new Promise((resolve, reject) => {
      this.conn.query(INSERT_SQL, [name, email, password], (err, results) => {
        if (err) reject(err);
        resolve(results.rows[0]);
      });
    });
  }
}

module.exports = UserRepository;
