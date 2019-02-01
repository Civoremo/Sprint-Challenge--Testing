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
});
