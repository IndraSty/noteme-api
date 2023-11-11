import express from "express";

import { publicRouter } from "../routes/public-routes.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import userRouter from "../routes/routes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

export const app = express();
dotenv.config();

app.use(cors());
app.use(cookieParser())
app.use(express.json());
app.use(publicRouter);
app.use(userRouter);

app.use(errorMiddleware);


