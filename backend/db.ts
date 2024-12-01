import mysql from "mysql2";

require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
});

connection.connect((err) => {
  if (err) {
    console.error("error connecting to the database: " + err.stack);
    return;
  }
  console.log("connected to the database as id " + connection.threadId);
});

export default connection;
