const { verifyToken } = require("./TokenAuth");

const Authentication = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const person = verifyToken(token);

    if (!person) {
      return res.status(401).json({ msg: "Unauthorized: Invalid or expired token" });
    }

    req.user = person;
    next();
  } catch (err) {
    console.error("Error in token authentication:", err.message);
    return res.status(500).json({ msg: "Server Error: Authentication failed" });
  }
};

module.exports = Authentication;
