const pool = require("../db/pool");

const items = {
  findAll: () =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }

        connection.query("SELECT * FROM items", (err, result) => {
          connection.release();
          if (err) {
            return reject(err);
          }
          resolve(result);
        });
      });
    }),
  findItemById: (id) =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }
        connection.query(
          "SELECT * FROM items WHERE id=?;",
          id,
          (err, result) => {
            connection.release();
            if (err) {
              return reject(err);
            }
            resolve(result);
          }
        );
      });
    }),
  findItemsByUserId: (userId) =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }
        connection.query(
          "SELECT * FROM items WHERE userId LIKE ?;",
          userId,
          (err, result) => {
            connection.release();
            if (err) {
              return reject(err);
            }
            resolve(result);
          }
        );
      });
    }),
  findByItem: (item) =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }
        const selectQuery =
          "SELECT * FROM items WHERE itemName LIKE ? AND category LIKE ? AND price LIKE ?;";
        connection.query(
          selectQuery,
          [item.itemName, item.category, item.price],
          (err, result) => {
            connection.release();
            if (err) {
              return reject(err);
            }
            resolve(result);
          }
        );
      });
    }),
  create: (item) =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }

        const query = connection.query(
          "INSERT INTO items SET ?;",
          item,
          (err, result) => {
            connection.release();
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      });
    }),
  deleteById: (id) =>
    new Promise((resolve, reject) => {
      const deleteQuery = "DELETE FROM items WHERE id=?;";
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }

        connection.query(deleteQuery, id, (err, result) => {
          connection.release();
          if (err) {
            return reject(err);
          }
          resolve(result);
        });
      });
    }),
};

module.exports = items;
