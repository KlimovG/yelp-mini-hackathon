const express = require('express');
const commentsRouter = express.Router();

const {
  list_of_comments,
  one_comment
} = require("../controllers/commentsController")

/* GET home page. */
commentsRouter.get('/', list_of_comments);
commentsRouter.get('/:id', one_comment);

module.exports = commentsRouter;
