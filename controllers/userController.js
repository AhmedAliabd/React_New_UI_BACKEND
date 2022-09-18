//@Desc Login user
//@Route /API/USERS/login
//@Access public
const loginUser = (req, res) => {
  res.status(200).json({ message: "user controller" });
};

module.exports = {
  loginUser,
};
