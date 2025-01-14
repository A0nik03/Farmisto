const { verifyToken } = require("./TokenAuth");

const Authentication = async(req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    // console.log("Authentication header: " + authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "Unauthorized: No token provided" });
    }

    const token = authHeader?.split(" ")[1];
    const person = await verifyToken(token);
    console.log("Person from token: ", person);

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
