/**
 * Name: Sathvik Alla
 * Date: October 2, 2026
 * Course: IT-302-001
 * Assignment: Phase 2 Read MongoDB Data using Node.js Assignment
 * Email: sa3242@njit.edu
 */

import StarWarsDAO from "../dao/starwarsDAO.js";

export default class StarWarsController {
  static async apiGetStarWars(req, res, next) {
    const itemsPerPage = req.query.itemsPerPage
      ? parseInt(req.query.itemsPerPage, 10)
      : 20;
    const pageNumber = req.query.pageNumber
      ? parseInt(req.query.pageNumber, 10)
      : 0;

    let filters = {};
    if (req.query.name) {
      filters.name = req.query.name;
    } else if (req.query.title) {
      filters.title = req.query.title;
    }

    const { starWarsList, totalNumStarWars } = await StarWarsDAO.getStarWars({
      filters,
      page: pageNumber,
      itemsPerPage,
    });

    let response = {
      star_wars: starWarsList,
      page: pageNumber,
      filters: filters,
      entries_per_page: itemsPerPage,
      total_results: totalNumStarWars,
    };
    res.json(response);
  }
}