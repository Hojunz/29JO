const { User } = require("../models");

class UserRepository {
  //회원가입
  createUser = async (email, nickname, password, address, phoneNumber, type) => {
    const createUserdata = await User.create({ email, nickname, password, address, phoneNumber, type });
    return createUserdata;
  };
  //로그인
  loginUser = async (email) => {
    const user = await User.findOne({ where: {email}})
    return user
  }
  // 이메일로 패스워드 찾기
  findPw = async(email) => {
    const userPw = await User.findOne({
      attributes: ['password'],
      where: {email}
    })
    return userPw
  }
}

module.exports = UserRepository;