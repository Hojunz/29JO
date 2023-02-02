const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

const MyPageController = require("../controller/mypage.controller");
const mypagecontroller = new MyPageController();

router.use(authMiddleware, (req,res,next) => {
  next()
})

router.get('/', mypagecontroller.myInfo)


module.exports = router;