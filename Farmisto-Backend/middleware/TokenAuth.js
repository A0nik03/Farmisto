const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Generate a JWT token
const GenerateToken = (farmer) => {
  const token = JWT.sign(
    { id: farmer._id, email: farmer.farmerEmail },
    process.env.SECRET_KEY,
    { expiresIn: "3d" }
  );
  return token;
};

// Verify a JWT token
const verifyToken = (token) => {
  if (!token || typeof token !== "string") {
    console.error("Invalid token format");
    return null;
  }
  try {
    const farmer = JWT.verify(token, process.env.SECRET_KEY);
    return farmer;
  } catch (err) {
    console.error("Error verifying token:", err.message);
    return null;
  }
};

module.exports = { GenerateToken, verifyToken };
