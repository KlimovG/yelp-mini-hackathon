const db = require("../database/client");

const list_of_cities = (req, res) => {
  db.query('SELECT * FROM city;')
    .then((dbData) => res.json(dbData.rows))
    .catch((err) => res.sendStatus(500));
}
const one_city = (req, res) => {

  const { id } = req.params;
  const oneCity = {
    text: "SELECT * FROM city WHERE id = $1;",
    values: [id],
  };

  db.query(oneCity)
    .then((dbData) => res.json(dbData.rows))
    .catch((err) => res.sendStatus(500));

}

module.exports = {
  list_of_cities,
  one_city
}