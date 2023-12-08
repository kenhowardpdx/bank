import express from "express";
import { router as api } from "./api/v1/router";

const app = express();
const router = express.Router();

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
