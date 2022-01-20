import pg from "pg";

import { db } from "../config/config.js";
console.log({
  user: db.user,
  host: db.host,
  database: db.database,
  password: db.password,
  port: db.port,
  ssl: {rejectUnauthorized: false}
})
//gives us a pool, creating a pool called pg.Pool.
const pool = new pg.Pool({
    user: db.user,
    host: db.host,
    database: db.database,
    password: db.password,
    port: db.port,
    ssl: {rejectUnauthorized: false}
  });

  export default function query(text, params, callback) {
   return pool.query(text, params, callback);
};