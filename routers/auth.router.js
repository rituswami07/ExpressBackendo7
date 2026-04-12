const { logout, refresh, login, register } = require("../controller/auth.controller");
const authRouter = require("express").Router();

authRouter.post("/auth/login",login );
authRouter.post("/auth/register",register );
authRouter.post("/auth/refresh", refresh);
authRouter.post("/auth/logout", logout);
module.exports = authRouter;

