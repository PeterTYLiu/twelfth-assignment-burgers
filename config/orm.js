// Get the connection to the database
const DB = require("../db");
const connection = new DB({ database: "burgers_db" }).connection;

// Object Relational Mapper (ORM)

// The ?? signs are for swapping out table or column names
// The ? signs are for swapping out other values

const orm = {
  selectAll: async function (table) {
    const [rows] = await connection.query(`SELECT * FROM ??;`, [table]);
    return rows;
  },

  insertOne: async function (table, col1, col2, val1, val2) {
    const sql = `INSERT INTO ?? (??, ??) VALUES (?, ?)`;
    let newItem = await connection.query(sql, [table, col1, col2, val1, val2]);
    return newItem;
  },

  updateOne: async function (table, col, val, id) {
    const sql = `UPDATE ?? SET ?? = ? WHERE id = ?`;
    let updated = await connection.query(sql, [table, col, val, id]);
    return updated;
  },
};

module.exports = orm;
