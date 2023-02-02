const express = require("express");
const router = express.Router();

const usersRouter = require("./users.routes");
const mypageRouter = require("./mypage.routes");
const adminRouter = require('./admin.routes')

router.use("/user", usersRouter);
router.use('/mypage', mypageRouter)
router.use('/admin', adminRouter)

module.exports = router;