const express = require("express");
const games = require("../games/gamesModel.js");

const server = express();
server.use(express.json());

server.get("/games", async (req, res) => {
    const result = await games.getAll();

    res.status(200).json(result);
});

module.exports = server;
