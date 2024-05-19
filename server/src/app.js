import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.subscribe(express.static("public"));

// Router Imports
import customerRouter from "./routes/customer.routes.js";

// Routes Usage
app.use("/api/v1/customer", customerRouter);

export { app };
