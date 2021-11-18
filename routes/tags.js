const express = require('express');
const tagsRouter = express.Router();

const {
  list_of_tags,
  one_tag
} = require("../controllers/tagsController")

/* GET home page. */
tagsRouter.get('/', list_of_tags);
tagsRouter.get('/:id', one_tag);

module.exports = tagsRouter;