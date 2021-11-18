const db = require("../database/client");

const list_of_restaurants = (req, res) => {
  db.query('SELECT * FROM restaurant;')
    .then((dbData) => res.json(dbData.rows))
    .catch((err) => res.sendStatus(500));
}
const one_restaurant = (req, res) => {

  const { id } = req.params;
  const oneRestaurant = {
    text: "SELECT * FROM restaurant WHERE id = $1;",
    values: [id],
  };

  db.query(oneRestaurant)
    .then((dbData) => res.json(dbData.rows))
    .catch((err) => res.sendStatus(500));

}

module.exports = {
  list_of_restaurants,
  one_restaurant
}