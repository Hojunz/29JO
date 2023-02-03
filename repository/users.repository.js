const { User } = require("../models");

class UserRepository {
  //회원가입
  createUser = async (email, nickname, password, address, phoneNumber, type, grade) => {
    const createUserdata = await User.create({ email, nickname, password, address, phoneNumber, type, grade });
    return createUserdata;
  };
  //로그인
  loginUser = async (email) => {
    const user = await User.findOne({ where: {email}})
    return user
  }
}

module.exports = UserRepository;