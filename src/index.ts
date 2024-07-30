import express, { Request, Response } from "express";
import dotenv from "dotenv";
import db from "./models/database";
import routes from "./routes";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

dotenv.config();
const app = express();

const PORT = process.env.PORT;
const PORT_PROD = process.env.PORT_PROD;

app.use(express.json());
app.use(morgan("dev"))
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "https://virtual-risk-front.vercel.app",
    credentials: true,
  })
);

app.use("/api", routes);

db.sync({ force: false })
  .then(() => {
    app.listen(PORT_PROD, () => console.log(`Server running on port ${PORT_PROD}`));
  })
  .catch((error) => console.error(error));
