/* eslint-disable no-console */
import { app } from "./app";

const port = "5000";
app.listen(port, () => {
  console.log(`⚡️[server]: server is running at http://localhost:${port}`);
});
