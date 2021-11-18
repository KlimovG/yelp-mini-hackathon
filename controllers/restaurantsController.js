const db = require("../database/client");

const list_of_restaurants = (req, res) => {
  const restaurants = {
    text: `
    SELECT  r.id, r.name as restname, co.id as comment_id, co.text as comment_text, co.date as comment_date, ci.name as city_name, t.name as tag_name
    FROM restaurant r
    FULL OUTER JOIN comment co ON co.restaurant_id = r.id
    FULL OUTER JOIN city ci ON ci.id = r.city_id
    FULL OUTER JOIN restaurant_has_tag rt ON rt.id_restaurant = r.id
    FULL OUTER JOIN tag t ON t.id = rt.id_tag;

    `,

  }
  db.query(restaurants)
    .then((dbData) => res.json(dbData.rows))
    .catch((err) => res.status(500).send(err.message));
}
// const list_of_restaurants = (req, res) => {
//   db.query('SELECT * FROM restaurant;')
//     .then((dbData) => res.json(dbData.rows))
//     .catch((err) => res.sendStatus(500));
// }



const one_restaurant = (req, res) => {

  const { id } = req.params;
  const oneRestaurant = {
    // text: "SELECT * FROM restaurant WHERE id = $1;",
    text: `
    SELECT  r.id, r.name as restname, co.id as comment_id, co.text as comment_text, co.date as comment_date, ci.name as city_name, t.name as tag_name
    FROM restaurant r
    INNER JOIN comment co ON co.restaurant_id = r.id 
    INNER JOIN city ci ON ci.id = r.city_id
    INNER JOIN restaurant_has_tag rt ON rt.id_restaurant = r.id
    INNER JOIN tag t ON t.id = rt.id_tag
    WHERE r.id = $1;
    `,
    values: [id],
  };

  db.query(oneRestaurant)
    .then((dbData) => res.json(dbData.rows))
    .catch((err) => res.status(500).send(err.message));


}

module.exports = {
  list_of_restaurants,
  one_restaurant
}