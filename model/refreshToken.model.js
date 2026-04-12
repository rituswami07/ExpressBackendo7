// models/refreshToken.model.js

// Replace with real DB (Mongoose/Prisma/Sequelize)
const refreshTokens = new Map();

const saveRefreshToken = async (userId, token) => {
  refreshTokens.set(token, { userId });
};

const findRefreshToken = async (token) => {
  return refreshTokens.get(token);
};

const deleteRefreshToken = async (token) => {
  refreshTokens.delete(token);
};

module.exports = {
  saveRefreshToken,
  findRefreshToken,
  deleteRefreshToken,
};