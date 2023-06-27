import express from "express";
import morgan from "morgan";
import cors from "cors";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";
import categoryRouter from "./routes/category.routes.js";
import ratingRouter from "./routes/rating.routes.js";
import addressRouter from "./routes/address.routes.js";
import cartRouter from "./routes/cart.routes.js";
import orderRouter from "./routes/order.routes.js";

const app = express();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ecommerce API',
      version: '1.0.0',
      description: "This is a Ecommerce API that Allows you to create users, authenticate them and update their data. It also has endpoints to add, edit and delete addresses, categories, products, manage the shopping cart, orders and make payments through Paypal.\n\nSome useful links:\n- [The source API definition for the Ecommerce](https://github.com/jahazieljbh/e-commerce-api)",
      contact: {
        email: 'jahaziel.hernandez.jbh@gmail.com'
      },
      license: {
        name: 'Apache 2.0',
        url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000', // Replace with your server URL
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to your API route files
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/v1/user', userRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/rating', ratingRouter);
app.use('/api/v1/address', addressRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/order', orderRouter);
app.use('/api/v1/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.static("public"));

export default app;