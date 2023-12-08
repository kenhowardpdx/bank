/* eslint-disable no-console */
import express from "express";

const app = express();
const router = express.Router();
const port = "5000";

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET');
    next();
});

router.get('/health', (req, res) => {
    res.status(200).send('Ok');
});

app.use('/api/v1', router);

const server = app.listen(port, () => {
    console.log(`⚡️[server]: server is running at http://localhost:${port}`);
});

export { app, server };
