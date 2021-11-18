const express = require('express');
const citiesRouter = express.Router();

const {
  list_of_cities,
  one_city
} = require("../controllers/citiesController")

/* GET home page. */
citiesRouter.get('/', list_of_cities);
citiesRouter.get('/:id', one_city);

module.exports = citiesRouter;
