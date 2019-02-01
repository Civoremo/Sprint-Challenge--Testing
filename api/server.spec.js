const request = require("supertest");
const server = require("./server.js");

describe("server.js", () => {
    describe("GET /games enpoint", () => {
        it("should respond with status code 200", async () => {
            let response = await request(server).get("/games");

            expect(response.status).toBe(200);
        });

        it("should respond with json", async () => {
            let response = await request(server).get("/games");

            expect(response.type).toMatch(/json/i);
        });

        it("should check that response is not undefined", async () => {
            let response = await request(server).get("/games");

            expect(response).not.toEqual(undefined);
        });
    });

    describe("GET /games/:id endpoint", () => {
        it("should respond with status code 200", async () => {
            let response = await request(server).get("/games/1");

            expect(response.status).toBe(200);
        });

        it("should respond with genre of object id: 1 to be action", async () => {
            const response = await request(server).get("/games/1");
            const [{ genre }] = response.body;

            expect(genre).toEqual("action");
        });

        it("should respond with error code 500 if id is not a number", async () => {
            const response = await request(server).get("/games/b");

            expect(response.status).toBe(500);
        });

        it("should respond with status code 404", async () => {
            const response = await request(server).get("/games/1500");

            expect(response.status).toBe(404);
        });
    });

    describe("POST /games endpoint", () => {
        it("should return status code 200 on successful insert", async () => {
            const body = {
                title: "Music Game",
                genre: "Wannabe Musicians",
                releaseYear: "2005",
            };
            const response = await request(server)
                .post("/games")
                .send(body);

            expect(response.status).toBe(200);
        });

        it("should respond with status code 500 if insert did not work", async () => {
            const body = { title: "Fake Game" };
            const response = await request(server)
                .post("/games")
                .send(body);

            expect(response.status).toBe(422);
        });

        it("should respond with title of new game inserted", async () => {
            const body = { title: "Fav Game", genre: "MMO", releaseYear: 2004 };
            const response = await request(server)
                .post("/games")
                .send(body);

            expect(response.body.title).toEqual(body.title);
        });
    });
});
