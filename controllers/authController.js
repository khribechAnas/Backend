export const login = (req, res, next) => {
  try {
    const { email, password } = req.body;
    // const user = await Account.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }
    const isPassValid = bcrypt.compareSync(password, user.password);
    if (!isPassValid) res.status(400).json({ msg: "User does not exist" });

    res.status(200).json({ user, token });
  } catch (error) {
    console.log("Error logging in: " + error);
    next(error);
  }
};
