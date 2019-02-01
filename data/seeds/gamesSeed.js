exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex("games")
        .truncate()
        .then(function() {
            // Inserts seed entries
            return knex("games").insert([
                { title: "Action Game 1", genre: "action", releaseYear: 1998 },
                {
                    title: "Action Game Two",
                    genre: "action",
                    releaseYear: 1994,
                },
                { title: "Pretend World", genre: "rpg", releaseYear: 2001 },
                {
                    title: "Figure This Out",
                    genre: "puzzle",
                    releaseYear: 2012,
                },
                {
                    title: "SportsBall Ultimate",
                    genre: "sport",
                    releaseYear: 2019,
                },
            ]);
        });
};
