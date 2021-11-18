const express = require('express');
const restaurantsListRouter = express.Router();

const {
  list_of_restaurants,
  one_restaurant
} = require("../controllers/restaurantsListController")

/* GET home page. */
restaurantsListRouter.get('/', list_of_restaurants);
restaurantsListRouter.get('/:id', one_restaurant);

module.exports = restaurantsListRouter;
