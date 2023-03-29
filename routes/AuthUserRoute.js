const express = require("express");
const {
  registerUser,
  loginUser,
  logOut,
  getAllUsers,
  getSingleUser,
  deleteUser,
} = require("../controllers/UserAuthController");
const { isAuthenticationUser } = require("../middlewares/UserAuth");
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logOut").get(logOut);

router.route("/users").get(getAllUsers);
router
  .route("/user/:id")
  .get(isAuthenticationUser, getSingleUser)

  .delete(isAuthenticationUser, deleteUser);

module.exports = router;
