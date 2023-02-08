const express = require("express");
const router = express.Router();

const pageRouter = require("./page.routes");
const usersRouter = require("./users.routes");
const goodsRouter = require("./goods.routes");
const mypageRouter = require("./mypage.routes");
const adminRouter = require("./admin.routes");

router.use("/", pageRouter);
router.use("/user", usersRouter);
router.use("/goods", goodsRouter);
router.use("/mypage", mypageRouter);
router.use("/admin", adminRouter);

module.exports = router;
