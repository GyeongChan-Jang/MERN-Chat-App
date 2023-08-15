const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

// 회원가입
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  // form 값이 빈 값일 때
  if (!name || !email || !password) {
    res.status(400);
    throw new Error();
  }

  const userExists = await User.findOne({ email });

  // 이미 user가 있을 때
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  // user 객체가 만들어졌을 때
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to Create the User");
  }
});

// 로그인
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  console.log(user);

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  }
});

// /api/user?search=abc
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  // 현재 로그인한 사람의 정보는 제외하고 가져오기, $ne: not equal
  // authMiddleware에서 req.user에 현재 로그인한 사람의 정보를 넣어줬기 때문에 사용 가능
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });

  res.send(users);
});

module.exports = { registerUser, authUser, allUsers };
