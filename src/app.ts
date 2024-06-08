import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import routes from "./routes/routes";

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Routes
app.use("/api", routes);

export default app;
