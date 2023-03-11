import express from "express";
import morgan from "morgan";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";
import categoryRouter from "./routes/category.routes.js";
import ratingRouter from "./routes/rating.routes.js";
import addressRouter from "./routes/address.routes.js";
import cartRouter from "./routes/cart.routes.js";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/category', categoryRouter);
app.use('/api/rating', ratingRouter);
app.use('/api/address', addressRouter);
app.use('/api/cart', cartRouter);

export default app;