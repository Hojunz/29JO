const express = require("express");
const router = express.Router();

const GoodsController = require('../controllers/goods.controller')
const goodsController = new GoodsController();

router.get('/', goodsController.getGoods)


router.post('/',goodsController.addGoods)
router.delete('/:goodsId',goodsController.deleteGoods)
router.put('/:goodsId',goodsController.updateGoods)
module.exports = router;
