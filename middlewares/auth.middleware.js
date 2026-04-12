const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  console.log("Authenticating...");

  try {
    let token;

    // ✅ 1. Try cookie first (primary)
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // ✅ 2. Optional fallback to Authorization header
    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      token = authHeader.split(" ")[1];
    }

    // ❌ No token found
    if (!token) {
      return res.status(401).json({
        error: "Unauthorized: No token provided",
      });
    }

    // ✅ Verify token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedToken; // {id, email, role}
    next();
  } catch (err) {
    return res.status(401).json({
      error: "Invalid or expired token",
    });
  }
}

const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

module.exports = { authMiddleware, generateToken };