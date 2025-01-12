const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Generate a JWT token
const GenerateToken = (person) => {
  const token = JWT.sign(
    {
      id: person._id,
      email: person.farmerEmail || person.email,
      name: person.userName || person.farmerName,
    },
    process.env.SECRET_KEY,
    { expiresIn: "3d" }
  );
  return token;
};

// Verify a JWT token
const verifyToken = async(req,res,next) => {
  const token=req.headers.authorization?.split('')[1];
  if (!token || typeof token !== "string") {
    console.error("Invalid token format");
    return { success: false, error: "Invalid token format" };
  }
  try {
    const person = JWT.verify(token, process.env.SECRET_KEY);
    req.person=person;
    next();
  } catch (err) {
    console.error("Error verifying token:", err.message);
    return { success: false, error: err.message };
  }
};

module.exports = { GenerateToken, verifyToken };
