const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const GenerateToken = (farmer) => {
  const token = JWT.sign(
    { id: farmer._id, email: farmer.farmerEmail },
    process.env.SECRET_KEY,
    { expiresIn: "3d" }
  );
  return token;
};

const verifyToken = (token) => {
  try {
    const farmer = JWT.verify(token, process.env.SECRET_KEY);
    return farmer;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { GenerateToken, verifyToken };
