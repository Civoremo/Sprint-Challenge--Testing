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
        const result = await games.getById(gameID);

        if (result.length !== 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json("Game with that ID could not be found");
        }
    } else {
        res.status(500).json("Could not find game with ID");
    }
});

server.post("/games", async (req, res) => {
    const game = req.body;
    if (game.title && game.genre) {
        const [id] = await games.insert(game);
        const [created] = await games.getById(id);
        res.status(200).json(created);
    } else {
        res.status(422).json("insert failed");
    }
});

module.exports = server;
