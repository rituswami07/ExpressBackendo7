require("dotenv").config({ quiet: true});

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routers/user.router");
const authRouter = require("./routers/auth.router");

const server = express(); 

const PORT = process.env.PORT || 8080;
const cookieParser = require("cookie-parser");

const morgan = require("morgan");
const { authMiddle1ware } = require("./middlewares/auth.middleware");
const { loggingMiddleware } = require("./middlewares/logging.middleware");
const corsOptions = require("./config/cors.config");

server.use(express.urlencoded({ extended: true}));
server.use(cookieParser());

server.use(cors(corsOptions));
server.use(morgan("dev"))


server.use(express.json());
 server.use(express.static(path.join(__dirname, 'public')));

// Routes
server.get("/", (req, res) => {
  res.send("Server is up and running!");
});

server.get("/test", (req, res) => {
  res.send("Test route working");
});

server.use("/api/v1/users", userRouter);
server.use(authRouter);

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
