const express = require("express");
const router = express.Router();
const {userRegister,userLogin,getUser,updateUser,deleteUser} = require("../controller/userController");


router.post("/userRegister",userRegister);
router.post("/userLogin",userLogin);
router.get("/getUser",getUser);
router.post("/updateuser/:id",updateUser);
router.delete("/deleteuser/:id",deleteUser)


module.exports = router;