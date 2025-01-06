const { verifyToken } = require("./TokenAuth");

const CookiesAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    const farmer = verifyToken(token);
    if (!farmer) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    req.farmer = farmer;
    next();
  } catch (err) {
    console.log(err);
  }
};
module.exports = CookiesAuth;
