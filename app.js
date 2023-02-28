import express from "express";
import morgan from "morgan";
import cors from "cors";
import usersRouter from "./routes/user.routes.js";
import producstRouter from "./routes/product.routes.js"
import categoryRouter from "./routes/category.routes.js"

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/products', producstRouter);
app.use('/api/categories', categoryRouter);

export default app;