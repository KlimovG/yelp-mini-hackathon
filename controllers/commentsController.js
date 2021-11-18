const db = require("../database/client");

const list_of_comments = async (req, res) => {
  db.query('SELECT * FROM comment;')
    .then((dbData) => res.json(dbData.rows))
    .catch((err) => res.sendStatus(500));
}
const one_comment = async (req, res) => {
  const { id } = req.params;
  const oneComment = {
    text: "SELECT * FROM comment WHERE id = $1;",
    values: [id],
  };

  db.query(oneComment)
    .then((dbData) => res.json(dbData.rows))
    .catch((err) => res.sendStatus(500));
}

module.exports = {
  list_of_comments,
  one_comment
}