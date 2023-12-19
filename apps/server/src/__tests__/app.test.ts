import { app } from "../app";
import request from "supertest";

describe("server", () => {
  it("has a health route", async () => {
    expect.assertions(1);
    const response = await request(app).get("/health");
    expect(response.statusCode).toEqual(200);
  });
});
