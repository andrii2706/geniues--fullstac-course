module.exports = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(404).send({ message: "User not found" });
    }
    if (req.user.role !== "admin") {
      return res.status(500).json({ message: `User don't have permisson` });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
