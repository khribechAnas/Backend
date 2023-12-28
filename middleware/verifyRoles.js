function verifyRoles(roles) {
  const user = req.user
  return (req, res, next)=> {
    if(user && roles.includes(user.role)){
      next()
    }else{
      res.status(403).json("Not Allowed")
    }
  }
}
module.exports = verifyRoles;
