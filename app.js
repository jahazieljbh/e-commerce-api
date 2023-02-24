import express from "express";
import userRouter from "./routes/user.routes.js";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', userRouter);

export default app;