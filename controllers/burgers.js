const Burger = require("../models/Burger");
const express = require("express");

const router = express.Router();

/* HTML Routes */
router.get("/", async function (req, res) {
  const data = await Burger.findAll();
  console.log(data);
  res.render("body", { burgers: data });
});

/* API ROUTES */
router.get("/api/burgers", async function (req, res) {
  try {
    const burgers = await Burger.findAll();
    res.status(200).json({ data: burgers });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/api/burgers", async function (req, res) {
  try {
    const burger = new Burger(req.body);
    let foo = await burger.save();
    res.status(201).json({ data: foo });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.patch("/api/burgers/:id", async function (req, res) {
  const burger = await Burger.findById(req.params.id);
  if (!burger) return res.status(404).end();

  burger.eaten = true;

  try {
    await burger.save();
    res.status(200).json(burger);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
