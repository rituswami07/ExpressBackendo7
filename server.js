require("dotenv").config({ quiet: true});

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routers/user.router");

const server = express(); 

const PORT = process.env.PORT || 8080;

const morgan = require("morgan");
const authRequest = require("./middlewares/auth.middleware");
server.use(cors({
  origin: [
    "http://localhost:3000",
    "https://frontend-dusky-kappa-76.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
server.use(authRequest);
server.use(morgan("dev"))


server.use(express.static(path.join(__dirname, 'public')));
server.use(express.json());

// Routes
server.get("/", (req, res) => {
  res.send("Server is up and running!");
});

server.get("/test", (req, res) => {
  res.send("Test route working");
});

server.use("/api/v1/users", userRouter);

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

mongoose.connect(process.env.MONGO_URI)
  .then((mongo) => {
    console.log(`Connected to ${mongo.connections[0].host}`);

    server.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });

  })
  .catch((err) => console.log(err.message));
