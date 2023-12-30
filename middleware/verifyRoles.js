function verifyRoles(roles) {
  return (req, res, next) => {
    const user = req.user;
    if (user && roles.includes(user.role)) {
      next();
    } else {
      res.status(403).json("Not Allowed");
    }
  };
}
module.exports = verifyRoles;
