const express = require('express');
const commentsListRouter = express.Router();

const {
  list_of_comments,
  one_comment
} = require("../controllers/commentsListController")

/* GET home page. */
commentsListRouter.get('/', list_of_comments);
commentsListRouter.get('/:id', one_comment);

module.exports = commentsListRouter;
