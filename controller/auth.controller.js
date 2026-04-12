const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/tokens");
const { generateToken } = require("../middlewares/auth.middleware");
const User = require("../model/user.model");
const { comparePassword,hashPassword } = require("../utils/hash");

const {
  saveRefreshToken,
  findRefreshToken,
  deleteRefreshToken,
} = require("../model/refreshToken.model");

// 🔹 LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // TODO: Replace with DB validation
  const user = await findUserByEmail(email);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const payload = { id: user.id, email: user.email };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken({ id: user.id });

  await saveRefreshToken(user.id, refreshToken);

  res
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true, // true in production (HTTPS)
      sameSite: "strict",
      path: "/api/auth/refresh",
    })
    .json({ accessToken });
};
exports.register = async (req, res) => {
  const { name,email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(404).json({ error: "Account Already Exist!" });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = new User({ name,email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "Account Created Successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 REFRESH TOKEN
exports.refresh = async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ message: "No refresh token" });
  }

  try {
    const decoded = verifyRefreshToken(token);

    const stored = await findRefreshToken(token);
    if (!stored) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // 🔥 Generate new access token
    const newAccessToken = generateAccessToken({
      id: decoded.id,
    });

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(403).json({ message: "Expired or invalid token" });
  }
};

// 🔹 LOGOUT
exports.logout = async (req, res) => {
  const token = req.cookies.refreshToken;

  if (token) {
    await deleteRefreshToken(token);
  }

  res.clearCookie("refreshToken");
  res.json({ message: "Logged out" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Account Doesn't Exist!" });
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid Password!" });
    }
    const token = await generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};