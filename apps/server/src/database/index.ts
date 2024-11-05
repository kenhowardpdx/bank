import pg from "pg";
const { Client, Pool } = pg;

export const client = new Client();
export default new Pool();
