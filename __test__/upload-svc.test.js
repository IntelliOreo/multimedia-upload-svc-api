const app = require("../src/upload-svc");
const supertest = require("supertest");
const request = supertest(app);

it("gets / endpoint", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);

});