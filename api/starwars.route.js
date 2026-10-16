/**
 * Name: Sathvik Alla
 * Date: October 16, 2026
 * Course: IT-302-001
 * Assignment: Phase 3 C.U.D. MongoDB Data using Node.js
 * Email: sa3242@njit.edu
 */

import express from "express";
import StarWarsController from "./starwars.controller.js";
import CommentsController from "./comments.controller.js";

const router = express.Router();

router.route("/").get(StarWarsController.apiGetStarWars);
router
    .route("/comments")
    .post(CommentsController.apiPostComment)
    .put(CommentsController.apiUpdateComment)
    .delete(CommentsController.apiDeleteComment);

export default router;