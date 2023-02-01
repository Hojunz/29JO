const express = require("express");
const router = express.Router();

const app = express();

const usersRouter = require("./users.routes");

router.use("/user", usersRouter);

module.exports = router;