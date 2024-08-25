import { Pool } from "pg";

import config from "./config";

const pool = new Pool({
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  host: config.DB_HOST,
  port: Number(config.DB_PORT),
  database: config.DB_NAME
});

const query = async (text: string, params?: any[]) => pool.query(text, params);

export default query;


// const {Pool} = require("pg")
// const pool = new Pool({
//     host: 'localhost',
//     port: 5432,
//     user: "user123",
//     password: "password123",
//     database: "db123"
// })

// // pool.connect().then(() => {
// //     pool.query('SELECT NOW()', (err, res) => {
// //       console.log(res.rows)
// //       pool.end()
// //     });
// //   });

// module.exports = pool