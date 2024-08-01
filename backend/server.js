import express from "express";
import userRoutes from "./routes/userRoute.js";
const port = process.env.PORT;
const app = express();

app.use("/api/users", userRoutes);
app.get("/", (req, res) => {
  res.json({ message: "Welcome Home" });
});
app.listen(port, () => console.log(`Server running of port ${port}`));
