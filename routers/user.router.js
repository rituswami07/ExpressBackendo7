const { addUser, deleteUser, getAllUsers, getUserById, updateUser, getUserByEmail } = require("../controller/user.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

const userRouter =require("express").Router();

userRouter.get("/greet", (req, res) =>{
    res.send("Hello sir!");
});

userRouter.post("/", addUser);


userRouter.use(authMiddleware);

userRouter.get("/", getAllUsers);
userRouter.get("/email/:email", getUserByEmail);
userRouter.get("/:id", getUserById);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

module.exports = userRouter;