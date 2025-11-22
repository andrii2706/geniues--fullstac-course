function errorHandler(err, res, item) {
  if (!item) {
    return res.status(404).json({ message: "Api not found" });
  } else if (err) {
    return res.status(500).json({ message: err });
  }
}

module.exports = errorHandler;
