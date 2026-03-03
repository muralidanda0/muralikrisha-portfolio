const express = require("express");
const cors = require("cors");

const app = express();
const contactRoutes = require("./routes/contact");
app.use("/api/contact", contactRoutes);
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;