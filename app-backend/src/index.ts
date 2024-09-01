import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import http from "http";
import config from "./config";
import socketio from "./socketio";


import apiRouter from "./routes"
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error-middleware";
import rateLimit from "./middleware/limiter-request";

const PORT = config.PORT;
const app = express();
const server = http.createServer(app);
socketio(server);

app.use(express.json());
app.use(cookieParser());
app.use(cors(config.CORS_CONF));
app.use("/api", rateLimit, apiRouter);
app.use(errorMiddleware);


const start = async () => {
    try {
        server.listen(PORT, () => {
            console.log(`Server started at http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log("Server caused error when started", error)
    }
}

start()