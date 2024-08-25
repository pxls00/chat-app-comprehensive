import dotenv from "dotenv";
dotenv.config();
import express from "express";
// import cors from "cors";
import config from "./config";

import apiRouter from "./routes"
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error-middleware";
const PORT = config.PORT;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api", apiRouter);
app.use(errorMiddleware);
const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server started at http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log("Server caused error when started", error)
    }
}

start()