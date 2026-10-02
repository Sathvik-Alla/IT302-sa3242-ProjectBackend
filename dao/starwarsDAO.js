/**
 * Name: Sathvik Alla
 * Date: October 2, 2026
 * Course: IT-302-001
 * Assignment: Phase 2 Read MongoDB Data using Node.js Assignment
 * Email: sa3242@njit.edu
 */

let starWars;

export default class StarWarsDAO {
  static async injectDB(conn) {
    if (starWars) {
      return;
    }
    try {
      starWars = await conn
        .db(process.env.STARWARS_NS)
        .collection("star_wars_sa3242");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in StarWarsDAO: ${e}`
      );
    }
  }

  static async getStarWars({
    filters = null,
    page = 0,
    itemsPerPage = 20,
  } = {}) {
    let query;
    if (filters) {
      if ("name" in filters) {
        query = { name: { $regex: filters["name"], $options: "i" } };
      } else if ("title" in filters) {
        query = { name: { $regex: filters["title"], $options: "i" } };
      }
    }

    let cursor;
    try {
      cursor = await starWars.find(query);
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { starWarsList: [], totalNumStarWars: 0 };
    }

    const displayCursor = cursor
      .limit(itemsPerPage)
      .skip(itemsPerPage * page);

    try {
      const starWarsList = await displayCursor.toArray();
      const totalNumStarWars = await starWars.countDocuments(query);

      return { starWarsList, totalNumStarWars };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or count documents, ${e}`
      );
      return { starWarsList: [], totalNumStarWars: 0 };
    }
  }
}