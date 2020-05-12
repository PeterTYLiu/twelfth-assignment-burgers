// Get the connection to the database
const DB = require("../db");
const connection = new DB({ database: "burgers_db" }).connection;

class Burger {
  constructor({ name, eaten = false }) {
    this.name = name;
    this.eaten = eaten;
  }

  static async findAll() {
    const [rows] = await connection.query(`SELECT * FROM burgers;`);
    return rows;
  }

  // static async findAllUneaten() {
  //   const [rows] = await connection.query(
  //     `SELECT * FROM burgers WHERE "eaten" = FALSE;`
  //   );
  //   return rows;
  // }

  // static async findAllEaten() {
  //   const [rows] = await connection.query(
  //     `SELECT * FROM burgers WHERE "eaten" = TRUE;`
  //   );
  //   return rows;
  // }

  static async findById(id) {
    const [rows] = await connection.query(
      `SELECT * FROM burgers WHERE id = ?;`,
      [parseInt(id)]
    );

    let burger = null;
    if (rows.length) {
      burger = new Burger(rows[0]);
      burger.id = id;
    }
    return burger;
  }

  async save() {
    if (this.id) {
      return this.update();
    } else {
      return this.create();
    }
  }

  async create() {
    const sql = `INSERT INTO burgers (name, eaten) VALUES (?, ?)`;
    const [result] = await connection.query(sql, [this.name, this.eaten]);
    this.id = result.insertId;
    return this;
  }

  async update() {
    const sql = `UPDATE burgers SET ? WHERE id = ?`;
    await connection.query(sql, [
      { name: this.name, eaten: this.eaten },
      this.id,
    ]);
    return this;
  }
}

module.exports = Burger;
