const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // decodes token id
      // token은 user._id를 통해 만들어짐
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // passwrd를 제외하고 요청한 user의 정보를 가져옴
      req.user = await User.findById(decoded.id).select("-password");
      next();

      // req.user = await
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
