const express = require("express");
const {
  createUserInfo,
  getAllUser,
  getSingleUser,
  updateUserInfo,
  deleteUser,
} = require("../controllers/UserController");
const { isAuthenticationUser } = require("../middlewares/UserAuth");
const router = express.Router();

router.use(express.json());

router.route('/createUser').post(isAuthenticationUser ,createUserInfo);
router.route('/getAllUser').get(isAuthenticationUser, getAllUser);
router.route('/getUserById/:id').get(isAuthenticationUser,getSingleUser);
router.route('/updateInfo/:id').put(isAuthenticationUser,updateUserInfo);
router.route('/deleteUser/:id').delete(isAuthenticationUser,deleteUser);

module.exports=router
