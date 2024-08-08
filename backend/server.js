import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middlware/errorMiddleware.js";
import userRoutes from "./routes/userRoute.js";
import postRoutes from "./routes/postRoutes.js";
import chatBot from "./routes/chatBot.js";
import conncetDB from "./config/db.js";
const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
conncetDB();

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/chatbot", chatBot);
app.get('/', (req, res) =>{
    res.status(200).json({message: "Successfully Deployed"})
})

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running of port ${port}`));
