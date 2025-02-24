import request from "supertest";
import { app, server } from "../src/app";
import { Server } from "http";

describe("Posts API", () => {
  let serverInstance: Server;

  beforeAll(() => {
    serverInstance = server;
  });

  afterAll((done) => {
    serverInstance.close(done);
  });
  it("should create a new post", async () => {
    const response = await request(app)
      .post("/api/post")
      .send({ content: "Hello, World!" });
    expect(response.status).toBe(201);
  });

  it("should retrieve all posts", async () => {
    await request(app)
      .post("/api/post")
      .send({ content: "Eyal" });
    const response = await request(app).get("/api/post");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0].content).toBe("Eyal");
  });
});
