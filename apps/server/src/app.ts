import express from "express";
import bodyParser from "body-parser";
import { router as api } from "@serverapi/v1/router.js";

const app = express();
const router = express.Router();

app.use(bodyParser.json());

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET");
  next();
});

router.get("/health", (req, res) => {
  res.status(200).send("Ok");
});

app.use("/", router);
app.use("/api/v1", api);

export { app };
