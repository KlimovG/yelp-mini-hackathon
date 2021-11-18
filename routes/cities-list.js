const express = require('express');
const citiesListRouter = express.Router();

const {
  list_of_cities,
  one_city
} = require("../controllers/citiesListController")

/* GET home page. */
citiesListRouter.get('/', list_of_cities);
citiesListRouter.get('/:id', one_city);

module.exports = citiesListRouter;
