/* eslint-disable no-console */
import db from "./database";
import { app } from "./app";
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

app.listen(port, async () => {
  await sqlStartUp();
  console.log(`⚡️[server]: server is running at http://localhost:${port}`);
});
