const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

const AdminController = require("../controller/admin.controller");
const admincontroller = new AdminController()
const GoodsController = require('../controller/goods.controller')
const goodsController = new GoodsController();
const OrderController = require('../controller/order.controller')
const orderController = new OrderController()
router.use(authMiddleware, (req,res,next) => {
  const User = res.locals.user
  if(User.type !== "1") {
    res.status(400).json({message: "권한이 없습니다."})
  }
  next()
})
router.get('/', admincontroller.findUser)
router.patch('/:userId', admincontroller.ChageUser)
router.get('/goods', goodsController.getGoods)
router.post('/goods',goodsController.addGoods)
router.put('/goods/:goodsId',goodsController.updateGoods)
router.delete('/goods/:goodsId',goodsController.deleteGoods)
router.put('/order', orderController.updateOrder)
module.exports = router;