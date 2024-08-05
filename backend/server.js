import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { notFound, errorHandler } from "./middlware/errorMiddleware.js";
import userRoutes from "./routes/userRoute.js";
import conncetDB from "./config/db.js";
const port = process.env.PORT;

const app = express();

conncetDB();

app.use("/api/users", userRoutes);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running of port ${port}`));
