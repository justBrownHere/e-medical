const Users = require("../models/userModel");

const doctorAuth = async (req, res, next) => {
  try {
    const user = await Users.findOne({ _id: req.user.id });

    if (user.role === "R3")
      return res.status(500).json({ msg: "Admin resources access denied." });

    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = doctorAuth;
