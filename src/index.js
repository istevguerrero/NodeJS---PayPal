import express from "express";
import morgan from "morgan";
import paymentRoutes from "../src/routes/payment_routes"

const app = express();

app.use(morgan("dev"));

app.use(paymentRoutes);

app.listen(3000);

console.log("Server on port 3000");