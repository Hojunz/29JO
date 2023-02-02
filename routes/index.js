const express = require("express");
const router = express.Router();

const usersRouter = require("./users.routes");
const mypageRouter = require("./mypage.routes");

router.use("/user", usersRouter);
router.use('/mypage', mypageRouter)

module.exports = router;