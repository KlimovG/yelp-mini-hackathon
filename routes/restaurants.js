const express = require('express');
const restaurantsRouter = express.Router();

const {
  list_of_restaurants,
  one_restaurant
} = require("../controllers/restaurantsController")

/* GET home page. */
restaurantsRouter.get('/', list_of_restaurants);
restaurantsRouter.get('/:id', one_restaurant);

module.exports = restaurantsRouter;
