const bcrypt = require("bcryptjs");

const SALT_ROUND =10;

exports.hashPassword = async (plainPassword) => {
    return await bcrypt.hash(plainPassword, SALT_ROUND);
};

exports.comparePassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
}