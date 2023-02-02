const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

const AdminController = require("../controller/admin.controller");
const admincontroller = new AdminController()

router.use(authMiddleware, (req,res,next) => {
  next()
})

router.get('/', admincontroller.findUser)

module.exports = router;