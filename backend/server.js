import express from "express";
const port = process.env.PORT;
const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Welcome Home" });
});
app.listen(port, () => console.log(`Server running of port ${port}`));
