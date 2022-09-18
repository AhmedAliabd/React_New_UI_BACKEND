//@Desc Login user
//@Route /API/USERS/login
//@Access public
const loginUser = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("please include all fields");
  }
  res.status(200).json({ message: "user controller" });
};

module.exports = {
  loginUser,
};
