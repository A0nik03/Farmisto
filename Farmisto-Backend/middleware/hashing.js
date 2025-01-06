const bcrypt = require('bcrypt');
const { GenerateToken } = require('../authentication/TokenAuth');

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        return new Error("Failed to hash password");
    }
}

const comparePassword = async (farmer, password, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        if (isMatch) {
            const token = GenerateToken(farmer);
            return token;
        } else {
            return new Error("Password does not match");
        }
    } catch (error) {
        return new Error("Failed to compare password");
    }
}

module.exports = { hashPassword, comparePassword };
