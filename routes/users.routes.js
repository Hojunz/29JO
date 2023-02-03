const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

const UsersController = require("../controller/users.controller");
const userscontroller = new UsersController();
const CartController = require("../controller/cart.controller");
const cartcontroller = new CartController();
const GoodsController = require('../controller/goods.controller')
const goodsController = new GoodsController

router.post("/signup", userscontroller.createUser);
router.post("/login", userscontroller.loginUser);

router.use(authMiddleware, (req,res,next) => {
  next()
})
router.get('/', goodsController.getGoods)
router.get("/me", userscontroller.loginInfo);
router.get('/cart',cartcontroller.userFindCart)
router.post('/cart',cartcontroller.createCart)
router.put('/cart/:cartId',cartcontroller.updateCart)
router.delete('/cart/:cartId',cartcontroller.deleteCart)
router.post("/logout", userscontroller.logoutUser);

module.exports = router;