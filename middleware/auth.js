const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No Token Provided!");

  try {
    const decoded = jwt.verify(token, "MyPrivateKey");
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(404).send("Invalid Token");
  }
};
