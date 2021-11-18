const express = require('express');
const tagsListRouter = express.Router();

const {
  list_of_tags,
  one_tag
} = require("../controllers/tagsListController")

/* GET home page. */
tagsListRouter.get('/', list_of_tags);
tagsListRouter.get('/:id', one_tag);

module.exports = tagsListRouter;