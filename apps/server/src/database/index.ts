import pg from "pg";
import { Client, Pool } from "pg";

export const client = new Client();
export default new Pool();
