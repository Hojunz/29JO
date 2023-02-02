const express = require("express");
const router = express.Router();

const GoodsController = require('../controllers/goods.controller')
const goodsController = new GoodsController();

router.get('/', goodsController.getGoods)
router.post('/',goodsController.addGoods)
module.exports = router;
