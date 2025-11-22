const bcrypt = require("bcrypt");

const User = require("../models/userModel");

module.exports = async (req, res, next) => {
  if (req.header.authorization && req.headers.authorization === -1) {
    return res.status(400).json({ message: "User is not logined" });
  }

  const base64Creadentials = req.headers.authorization.split(" ")[1];

  const credentials = Buffer.from(base64Creadentials, "base64").toString(
    "ascii"
  );

  const [email, password] = credentials.split(":");

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "User is not logined" });
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return res.status(400).json({ message: "Invalid password or email" });
  }

  req.user = user._doc;

  next();
};
