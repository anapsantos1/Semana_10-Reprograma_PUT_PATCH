const controller = require("../controllers/seriesControllers");

const express = require("express");
const router = express.Router();

router.get("/", controller.home);
router.get("/todos", controller.getAll);
router.get("/titulo", controller.getByTitle)
router.get("/autor", controller.getByWriters)
router.get("/genero", controller.getGenre)
router.get("/:id", controller.getById)


module.exports = router