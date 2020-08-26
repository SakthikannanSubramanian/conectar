const jwtToken = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  //Get the token from the header
  const token = req.header("x-auth-token");

  //check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorisation denied" });
  }

  //Verify token
  try {
    const decode = jwtToken.verify(token, config.get("jwtSecret"));
    req.user = decode.user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "token is not valid" });
  }
};
