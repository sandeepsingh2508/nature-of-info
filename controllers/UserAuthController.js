const ErrorHandler = require("../utiles/ErrorHandler");
const catchAsyncError = require("../middlewares/CatchAsyncError");
const sendToken = require("../utiles/jwtToken");
const User = require("../models/UserAuthSchema");
// const sendEmail = require("../utils/sendEmail");
// const crypto = require("crypto");

//register user
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
  });

  sendToken(user, 201, res);
  // const token = user.getJWTToken();
  // res.status(201).json({
  //   success: true,
  //   token,
  // });
});

//login user
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  //checking if user has given email or password
  if (!email || !password) {
    return next(new ErrorHandler("please enter email and password", 401));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  sendToken(user, 200, res);
});

//Logout
exports.logOut = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

//User DetailsById
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

//getAllUser
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const user = await User.find();
  res.status(200).json({
    success: true,
    user,
  });
});
//Delete User
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findByIdAndRemove(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id:${req.params.id}`)
    );
  }
  // await user.remove();
  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});
