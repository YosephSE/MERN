import express from "express";
import { notFound, errorHandler } from "./middlware/errorMiddleware.js";
import userRoutes from "./routes/userRoute.js";
const port = process.env.PORT;
const app = express();

app.use("/api/users", userRoutes);
app.get("/", (req, res) => {
  res.json({ message: "Welcome Home" });
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running of port ${port}`));
