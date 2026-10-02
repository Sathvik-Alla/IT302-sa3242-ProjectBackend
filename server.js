/**
 * Name: Sathvik Alla
 * Date: October 2, 2026
 * Course: IT-302-001
 * Assignment: Phase 2 Read MongoDB Data using Node.js Assignment
 * Email: sa3242@njit.edu
 */

import express from "express";
import cors from "cors";
import starWars from "./api/starwars.route.js";

const app = express();

app.use(cors());
app.use(express.json());

// Endpoint containing UCID as required: api/v1/sa3242/starwars
app.use("/api/v1/sa3242/starwars", starWars);
app.use("{*splat}", (req, res) => res.status(404).json({ error: "not found" }));

export default app;