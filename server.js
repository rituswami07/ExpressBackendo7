require("dotenv").config({ quiet: true });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routers/user.router");
const server = express();

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

const HOST = process.env.HOST || "localhost";

server.use(cors());
server.use(express.static("public"));

server.use(express.json());

server.get("/" , (req,res)=>{
    res.send("Server is up and running!")
})
server.use("/api/v1/users" ,userRouter);


server.listen(PORT, HOST,()=>{
    console.log(`listening on http://${HOST}:${PORT}`);
});

mongoose.connect(process.env.MONGO_URI)
    .then((mongo)=>console.log(`connected to ${mongo.connections[0].host}`))
    .catch((err) => console.log(err.message));