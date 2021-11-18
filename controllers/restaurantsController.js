const db = require("../database/client");

const list_of_restaurants = async (req, res) => {
  // const restaurants = {
  //   text: `
  //   SELECT  r.id, r.name as restname, co.id as comment_id, co.text as comment_text, co.date as comment_date, ci.name as city_name, t.name as tag_name
  //   FROM restaurant r
  //   FULL OUTER JOIN comment co ON co.restaurant_id = r.id
  //   FULL OUTER JOIN city ci ON ci.id = r.city_id
  //   FULL OUTER JOIN restaurant_has_tag rt ON rt.id_restaurant = r.id
  //   FULL OUTER JOIN tag t ON t.id = rt.id_tag;

  //   `,

  // }

  const restaurantQuery = {
    text: `
  SELECT r.id AS restaurant_id, r.name AS restaurant_name, ct.name AS city_name
  FROM restaurant r
  JOIN city ct
  ON ct.id = r.city_id;
`,
  }

  const commentsQuery = {
    text: `
  SELECT r.id as rest_id, co.id AS comment_id, co.text AS comment_text, co.date AS comment_date
  FROM restaurant r
  JOIN comment co
  ON co.restaurant_id = r.id;
`,
  }
  const tagsQuery = {
    text: `
  SELECT t.name as tag_name, t.id AS tag_id, rt.id_restaurant, r.id AS rest_id
  FROM restaurant r
  JOIN restaurant_has_tag rt ON rt.id_restaurant = r.id
  JOIN tag t ON t.id = rt.id_tag;
`,
  }

  try {
    const { rows: restaurantAndCityData } = await db.query(restaurantQuery)
    const { rows: commentsData } = await db.query(commentsQuery)
    const { rows: tagsData } = await db.query(tagsQuery)
    const tagsArray = Object.values(tagsData["0"])
    restaurantAndCityData.map((item, i) => {
      const resultComment = []
      const resultTags = []
      for (let j = 0; j < commentsData.length; j++) {
        if (item.restaurant_id === commentsData[j].rest_id) {
          resultComment.push(commentsData[j])
        }

      }
      for (let j = 0; j < tagsData.length; j++) {
        if (item.restaurant_id === tagsData[j].id_restaurant) {
          resultTags.push(tagsData[j])
        }

      }
      item.comments = resultComment
      item.tags = resultTags
    })

    const result = restaurantAndCityData


    res.json(result)

    // console.log(commentsData)
  } catch (e) {
    res.status(500).send(e.message)
  }

}




const one_restaurant = async (req, res) => {

  const { id } = req.params;

  const restaurantQuery = {
    text: `
  SELECT r.id AS restaurant_id, r.name AS restaurant_name, ct.name AS city_name
  FROM restaurant r
  JOIN city ct
  ON ct.id = r.city_id
  WHERE r.id = $1
`,
    values: [id]
  }

  const commentsQuery = {
    text: `
  SELECT co.id AS comment_id, co.text AS comment_text, co.date AS comment_date
  FROM restaurant r
  JOIN comment co
  ON co.restaurant_id = r.id
  WHERE r.id = $1
`,
    values: [id]
  }
  const tagsQuery = {
    text: `
  SELECT t.name as tag_name
  FROM restaurant r
  JOIN restaurant_has_tag rt ON rt.id_restaurant = r.id
  JOIN tag t ON t.id = rt.id_tag
  WHERE r.id = $1;
`,
    values: [id]
  }

  try {
    const { rows: restaurantAndCityData } = await db.query(restaurantQuery)
    const { rows: commentsData } = await db.query(commentsQuery)
    const { rows: tagsData } = await db.query(tagsQuery)
    const tagsArray = Object.values(tagsData["0"])

    const result = {
      ...restaurantAndCityData["0"],
      comments: commentsData,
      tags: tagsArray,
    }

    res.json(result)

    // console.log(commentsData)
  } catch (e) {
    res.status(500).send(e.message)
  }

  // const oneRestaurant = {
  //   // text: "SELECT * FROM restaurant WHERE id = $1;",
  //   text: `
  //   SELECT  r.id, r.name as restname, co.id as comment_id, co.text as comment_text, co.date as comment_date, ci.name as city_name, t.name as tag_name
  //   FROM restaurant r
  //   INNER JOIN comment co ON co.restaurant_id = r.id 
  //   INNER JOIN city ci ON ci.id = r.city_id
  //   INNER JOIN restaurant_has_tag rt ON rt.id_restaurant = r.id
  //   INNER JOIN tag t ON t.id = rt.id_tag
  //   WHERE r.id = $1;
  //   `,
  //   values: [id],
  // };

  // db.query(oneRestaurant)
  //   .then((dbData) => res.json(dbData.rows))
  //   .catch((err) => res.status(500).send(err.message));


}

module.exports = {
  list_of_restaurants,
  one_restaurant
}