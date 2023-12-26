const jwt = require("jsonwebtoken");

function authJwt(req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(" ")[1];
    console.log("token===>", token);
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded.accountId;
    next();
  } catch (error) {
    console.log(error);
  }
}
module.exports = authJwt;
