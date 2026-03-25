const { addUser, deleteUser, getAllUsers, getUserById, updateUser } = require("../controller/user.controller");

const userRouter =require("express").Router();

userRouter.get("/greet", (req, res) =>{
    res.send("Hello sir!");
});

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/", addUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

module.exports = userRouter;