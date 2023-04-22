const express = require("express");
const items = require("./routes/items");
const users = require("./routes/users");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://frontend-final-project-aleksi.onrender.com",
    ],
  })
);
app.use(express.json());

app.use("/api/items", items);
app.use("/api/users", users);

app.get("/health", (req, res) => {
  res.send("OK");
});

module.exports = app;
