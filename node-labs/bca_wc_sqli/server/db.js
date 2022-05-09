const sqlite3 = require('sqlite3').verbose();
const pool = new sqlite3.Database('./database/vulndb');

// handle async/await operation
pool.query = (sql, params) => {
  return new Promise((resolve, reject) => {
    pool.all(sql, params, (error, rows) => {
      if (error)
        reject(error);
      else
        resolve({ rows: rows });
    });
  });
};

module.exports = pool;
