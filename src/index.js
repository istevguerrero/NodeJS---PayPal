import express from "express";
import morgan from "morgan";
import paymentRoutes from "../src/routes/payment_routes"
import { portNumber } from "./config";
const app = express();

app.use(morgan("dev"));

app.use(paymentRoutes);

app.listen(portNumber);

console.log("Server on port 3000");