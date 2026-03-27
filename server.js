require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routers/user.router");

const app = express(); // ✅ use app

const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

app.use("/api/v1/users", userRouter);

// ✅ ONLY ONE listen + bind 0.0.0.0
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then((mongo) =>
    console.log(`Connected to ${mongo.connections[0].host}`)
  )
  .catch((err) => console.log(err.message));