const jwt = require("jsonwebtoken");
const { userModel } = require("../models/user.model");
require("dotenv").config();

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { userID } = decoded;

    const user = await userModel.findById(userID);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.body.customerName = decoded.name;
    req.body.client = decoded.userID;
    req.user = user;

    console.log(req.user);
    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Invalid token" });
    }

    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { authenticate };

