module.exports = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User is not logined" });
    }

    if (req.user.role !== "admin") {
      return res.status(500).json({ message: `User doesn't have permition` });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
