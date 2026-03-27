require("dotenv").config({ quiet: true});

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routers/user.router");

const server = express(); 

const PORT = process.env.PORT || 8080;

// Middleware
server.use(cors());
server.use(express.static("public"));
server.use(express.json());

// Routes
server.get("/", (req, res) => {
  res.send("Server is up and running!");
});

server.use("/api/v1/users", userRouter);

// ✅ ONLY ONE listen + bind 0.0.0.0
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then((mongo) =>
    console.log(`Connected to ${mongo.connections[0].host}`)
  )
  .catch((err) => console.log(err.message));