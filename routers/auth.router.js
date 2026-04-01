const { generateToken } = require("../middlewares/auth.middleware");
const User = require("../model/user.model");
const { comparePassword } = require("../utils/hash");

const authRouter = require("express").Router();

authRouter.post("/auth/login", async (req , res) => {
    const {email, password} = req.body;



         try {
        const user = await User.findOne({ email });
        if (!user) {
        return res.status(404).json({ error: "Account Doesn't Exist!"});
        }
        const isPasswordValid = await comparePassword(password, user.password);
        if(!isPasswordValid) {
            return res.status(401).json({ error: "Invalid Password"});
        }
        const token = await generateToken(user);
        res.json({ token });
        }catch (err) {
    
        res.status(500).json({ error: err.message });
        }
});
module.exports = authRouter;