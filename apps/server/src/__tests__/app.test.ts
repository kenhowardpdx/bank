import { app } from "@serverapp.js";
import request from "supertest";
import { getBillsByUserId } from "@servermodels/bill.js";

jest.mock("../models/bill");

describe("server", () => {
  it("has a health route", async () => {
    expect.assertions(1);
    const response = await request(app).get("/health");
    expect(response.statusCode).toEqual(200);
  });

  it("has a bills route", async () => {
    (getBillsByUserId as jest.Mock).mockResolvedValue([
      {
        id: 1,
        name: "Test",
        startDate: new Date(),
        endDate: null,
        amount: "100.00",
        frequency: "MONTHLY",
      },
    ]);
    expect.assertions(1);
    const response = await request(app).get("/api/v1/bills");
    expect(response.statusCode).toEqual(200);
  });
});
