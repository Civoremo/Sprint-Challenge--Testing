const express = require("express");
const games = require("../games/gamesModel.js");

const server = express();
server.use(express.json());

server.get("/games", async (req, res) => {
    const result = await games.getAll();

    res.status(200).json(result);
});

server.get("/games/:id", async (req, res) => {
    const gameID = req.params.id;

    if (!isNaN(gameID)) {
        const genre = await games.getById(gameID);

        res.status(200).json(genre);
    } else {
        res.status(500).json("Could not find game with ID");
    }
});

server.post("/games", async (req, res) => {
    const game = {
        title: "Music Game",
        genre: "Wannabe Musicians",
        releaseYear: "2005",
    };
    const id = await games.insert(game);

    res.status(200).json(id);
});

module.exports = server;
