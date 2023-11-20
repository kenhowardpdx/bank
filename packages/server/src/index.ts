import express from "express";

const app = express();
const port = "5000";

app.listen(port, () => {
    console.log(`⚡️[server]: server is running at http://localhost:${port}`);
});
