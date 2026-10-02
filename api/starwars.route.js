/**
 * Name: Sathvik Alla
 * Date: October 2, 2026
 * Course: IT-302-001
 * Assignment: Phase 2 Read MongoDB Data using Node.js Assignment
 * Email: sa3242@njit.edu
 */

import express from "express";
import StarWarsController from "./starwars.controller.js";

const router = express.Router();

router.route("/").get(StarWarsController.apiGetStarWars);

export default router;