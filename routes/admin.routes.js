const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

const AdminController = require("../controller/admin.controller");
const admincontroller = new AdminController()

router.use(authMiddleware, (req,res,next) => {
  const User = res.locals.user
  if(User.type !== "1") {
    res.status(400).json({message: "권한이 없습니다."})
  }
  next()
})

router.get('/', admincontroller.findUser)
router.patch('/:userId', admincontroller.ChageUser)

module.exports = router;