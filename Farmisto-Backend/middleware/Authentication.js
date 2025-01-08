const { verifyToken } = require("./TokenAuth");

const Authentication = (req, res, next) => {
  try {
    const token = req.headers.cookie.split("=")[1];
    if (!token) {
      return res.status(401).json({ msg: "Unauthorized: No token provided" });
    }

    const farmer = verifyToken(token);
    if (!farmer) {
      return res.status(401).json({ msg: "Unauthorized: Invalid or expired token" });
    }

    req.farmer = farmer;
    next();
  } catch (err) {
    console.error("Error in token authentication:", err.message);
    return res.status(500).json({ msg: "Server Error: Authentication failed" });
  }
};

module.exports = Authentication;
