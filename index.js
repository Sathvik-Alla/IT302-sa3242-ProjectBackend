/**
 * Name: Sathvik Alla
 * Date: October 16, 2026
 * Course: IT-302-001
 * Assignment: Phase 3 C.U.D. MongoDB Data using Node.js
 * Email: sa3242@njit.edu
 */

import app from "./server.js";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import StarWarsDAO from "./dao/starwarsDAO.js";
import CommentsDAO from "./dao/commentsDAO.js";

dotenv.config();

const port = process.env.PORT || 5000;

MongoClient.connect(process.env.STARWARS_DB_URI)
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await StarWarsDAO.injectDB(client);
    await CommentsDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  });