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
    });

    describe("POST /games endpoint", () => {
        it("should return status code 200 on successful insert", async () => {
            const response = await request(server).post("/games");

            expect(response.status).toBe(200);
        });
    });
});
