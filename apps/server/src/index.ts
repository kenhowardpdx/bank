/* eslint-disable no-console */
import db from "@serverdatabase/index.js";
import { app } from "@serverapp.js";
import { exit } from "process";

const port = "5000";
const sqlStartUp = async () => {
  // if db doesn't connect, exit.
  try {
    const result = await db.query("SELECT * FROM users");
    console.log(`[db]: database has ${result.rowCount} users.`);
  } catch (error: unknown) {
    let msg = "unknown error connecting to the database";
    if (typeof error === "string") {
      msg = error;
    } else if (error instanceof Error) {
      msg = error.message;
    }
    console.error(msg);
    exit(1);
  }
};

sqlStartUp()
  .then(() => {
    app.listen(port, () => {
      console.log(`⚡️[server]: server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
  });
