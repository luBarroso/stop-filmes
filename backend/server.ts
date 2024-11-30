import express from "express";
import configDotenv from "./src/config/dotenv";
import routes from "./src/routes/routes";
import cors from "cors";
import connection from "./db";

configDotenv();

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `${process.env.APP_NAME} app listening at http://localhost:${port}`
  );
});
