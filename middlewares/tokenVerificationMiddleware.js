const jwt = require("jsonwebtoken");
const config = require("../config/config");

const tokenVerification = (req, res, next) => {
  const headerToken = req.headers["authorization"];
  if (!headerToken) {
    return res.status(401).send({ message: "Token is required" });
  }
  const token = headerToken.split(" ")[1];
  try {
    const decoded = jwt.verify(token, config.secretKey);
    res.locals.decoded = decoded;
  } catch (error) {
    console.log(error);
    return res.status(401).send({ message: "Invalid token" });
  }
  next();
};

module.exports = {
  tokenVerification,
};
