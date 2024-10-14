import { Router } from "express";
import HttpStatusCode from "@app/status/index.js";
import { getForecast } from "@bank/forecast";
import { getBillsByUserId } from "@app/models/bill.js";

type JSONObject = {
  [key: string]: string | number | JSONObject | Array<JSONObject> | null;
};

const router = Router();

router.get("/", (req, res) => {
  res.status(501).send();
});

router.post("/login", (req, res) => {
  const body = req.body as unknown;
  if (typeof body !== "object") {
    res.statusCode = HttpStatusCode.UNAUTHORIZED;
    res.send({
      statusCode: HttpStatusCode.UNAUTHORIZED,
      message: HttpStatusCode[HttpStatusCode.UNAUTHORIZED],
    });
    return;
  }
});

router.get("/bills", async (req, res) => {
  const userId = 1; // To be retrieved from the request
  const bills = await getBillsByUserId(userId);
  res.send({ data: bills });
});

router.post("/forecast", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const body = req.body as unknown;
  if (
    typeof body === "object" &&
    body !== null &&
    Object.prototype.hasOwnProperty.call(body, "bills") &&
    Array.isArray((<JSONObject>body).bills) &&
    Object.prototype.hasOwnProperty.call(body, "startDate") &&
    typeof (<JSONObject>body).startDate === "string"
  ) {
    const startDate = new Date((<JSONObject>body).startDate as string);
    const endDate =
      typeof (<JSONObject>body).endDate === "string"
        ? new Date((<JSONObject>body).endDate as string)
        : undefined;
    const incomePerCycle =
      typeof (<JSONObject>body).incomePerCycle === "number"
        ? ((<JSONObject>body).incomePerCycle as number)
        : 0;
    const startingBalance =
      typeof (<JSONObject>body).startingBalance === "number"
        ? ((<JSONObject>body).startingBalance as number)
        : 0;
    const forecast = getForecast(
      incomePerCycle,
      startingBalance,
      startDate,
      endDate,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (<JSONObject>body).bills as Array<any>,
    );
    return res.send({ data: forecast });
  }
  res.statusCode = 400;
  res.send({ statusCode: 400, message: "Bad Request" });
});

export { router };
