const { addUser, deleteUser, getAllUsers, getUserById, updateUser, getUserByEmail } = require("../controller/user.controller");

const userRouter =require("express").Router();

userRouter.get("/", (req, res) =>{
    res.send("Hello sir!");
});

userRouter.get("/", getAllUsers);
userRouter.get("/email/:email", getUserByEmail);
userRouter.get("/:id", getUserById);
userRouter.post("/", addUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

module.exports = userRouter;