// Get the connection to the database
const DB = require("../db");
const connection = new DB({ database: "burgers_db" }).connection;
const orm = require("../config/orm");

class Burger {
  constructor({ name, eaten = false }) {
    this.name = name;
    this.eaten = eaten;
  }

  static async findAll() {
    let allBurgers = await orm.selectAll("burgers");
    return allBurgers;
  }

  static async create(data) {
    let newBurger = await orm.insertOne(
      "burgers",
      "name",
      "eaten",
      data.name,
      false
    );
    return newBurger;
  }

  static async eat(id) {
    let updated = await orm.updateOne("burgers", "eaten", true, id);
    return updated;
  }
}

module.exports = Burger;
