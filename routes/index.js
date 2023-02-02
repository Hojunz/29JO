const express = require("express");
const router = express.Router();

const app = express();

const usersRouter = require("./users.routes");
const goodsRouter = require('./goods.routes')

router.use("/user", usersRouter);
router.use("/goods", goodsRouter)
module.exports = router;