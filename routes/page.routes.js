const express = require("express");
const router = express.Router();

const PageController = require("../controller/page.controller");
const pageController = new PageController();

router.get("/", pageController.getPage_main);
router.get("/login", pageController.getPage_login);
router.get("/signup", pageController.getPage_signup);
router.get("/home", pageController.getPage_home);
router.get("/about", pageController.getPage_about);
router.get("/good", pageController.getPage_goods);
router.get("/good/:goodid", pageController.getPage_goodsdetail);
router.get("/cart", pageController.getPage_cart);
router.get("/order", pageController.getPage_order);
router.get("/mypage", pageController.getPage_mypage);
router.get("/logout", pageController.accountLogOut);

module.exports = router;
