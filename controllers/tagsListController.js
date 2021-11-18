const db = require("../database/client");

const list_of_tags = (req, res) => {
  db.query('SELECT * FROM tag;')
    .then((dbData) => res.json(dbData.rows))
    .catch((err) => res.sendStatus(500));
}
const one_tag = (req, res) => {

  const { id } = req.params;
  const oneTag = {
    text: "SELECT * FROM tag WHERE id = $1;",
    values: [id],
  };

  db.query(oneTag)
    .then((dbData) => res.json(dbData.rows))
    .catch((err) => res.sendStatus(500));

}

module.exports = {
  list_of_tags,
  one_tag
}