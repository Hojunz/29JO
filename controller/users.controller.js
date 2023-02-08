const UserService = require("../service/users.service");
const jwt = require("jsonwebtoken");
const { secretKey, option } = require("../config/secretKey");
const { readSync } = require("fs");

class UsersController {
  userService = new UserService();
  // 회원가입
  createUser = async (req, res, next) => {
    try {
      const {
        email,
        nickname,
        password,
        confirmPassword,
        address,
        phoneNumber,
        type,
      } = req.body;

      if (password !== confirmPassword) {
        return res
          .status(400)
          .json({ message: "비밀번호가 일치하지 않습니다." });
      }
      const user = await this.userService.createUser(
        email,
        nickname,
        password,
        address,
        phoneNumber,
        type
      );
      return res.status(201).json({ message: "회원가입 성공" });
    } catch (error) {
      return res.status(400).json({ errormessage: error.message });
    }
  };
  //로그인
  loginUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await this.userService.loginUser(email);

      if (email !== user.email || password !== user.password) {
        res
          .status(400)
          .json({ message: "이메일이나 패스워드가 일치하지 않습니다." });
      }
      const token = jwt.sign({ id: user.id }, secretKey, option);

      res.cookie("x_auth", token, {
        httpOnly: true,
        maxAge: 0.5 * 60 * 60 * 1000,
      });
      res.status(200).json({ message: "로그인에 성공했습니다." });
    } catch (error) {
      res.status(400).json({ errormessage: error.message });
    }
  };
  //로그인 확인
  loginInfo = async (req, res, next) => {
    const User = res.locals.user;
    res.json({ info: User });
  };
  //로그아웃
  logoutUser = async (req, res, next) => {
    res.clearCookie("x_auth");
    return res.status(200).send({ message: "로그아웃 완료" });
  };
  //이메일로 패스워드 찾기
  findPW = async (req, res, next) => {
    try {
      const { email } = req.body;
      const userPw = await this.userService.findPw(email);

      res.status(200).json({ userPw });
    } catch (error) {
      return res.status(400).json({ errorMessage: error.message });
    }
  };
}

module.exports = UsersController;
