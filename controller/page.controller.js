class PageController {
  getPage_main = async (req, res) => {
    res.render("main");
  };

  getPage_login = async (req, res) => {
    res.render("login");
  };

  getPage_signup = async (req, res) => {
    res.render("signup");
  };

  getPage_home = async (req, res) => {
    res.render("home");
  };

  getPage_about = async (req, res) => {
    res.render("about");
  };

  getPage_goods = async (req, res) => {
    res.render("goods");
  };

  getPage_goodsdetail = async (req, res) => {
    res.render("goodsdetail");
  };

  getPage_cart = async (req, res) => {
    res.render("cart");
  };

  getPage_order = async (req, res) => {
    res.render("order");
  };

  getPage_mypage = async (req, res) => {
    res.render("mypage");
  };

  accountLogOut = async (req, res) => {
    res.clearCookie("accessToken");
    res.redirect("/api");
  };
}

module.exports = PageController;
