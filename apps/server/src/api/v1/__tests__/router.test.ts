import { router } from "@app/api/v1/router.js";
import type { Express } from "express";
import express from "express";
import request from "supertest";

let app: Express;

beforeAll(() => {
  app = express();
  app.use("/api", router);
});

describe("router", () => {
  it("has a NOT IMPLEMENTED '/' route", async () => {
    expect.assertions(1);
    const response = await request(app).get("/api/");
    expect(response.statusCode).toEqual(501);
  });
});
