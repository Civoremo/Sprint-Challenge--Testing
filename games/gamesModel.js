const db = require("../data/dbConfig.js");

module.exports = {
    insert,
    getAll,
    getById,
    remove,
};

async function insert(game) {
    return await db("games").insert(game);
}

async function getAll() {
    return db("games");
}

async function getById(id) {
    return db("games").where({ id });
}

async function remove(id) {
    return null;
}
